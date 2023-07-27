import { Card, decks } from 'cards';
import { Socket } from 'socket.io';
import { socketIDtoSocketMap } from './server';

type User = {
    id: string;
    name: string;
    hand: string[];
    stack: number;
    betSize: number;
}

class PokerGame {
    public readonly players: User[];
    public readonly observerIDs: Set<string>;
    public readonly deck: decks.StandardDeck;
    private community: string[];
    public readonly potSize: number;
    public constructor (
        public readonly smallBlind: number,
        public readonly bigBlind: number
    ) {
        this.deck = new decks.StandardDeck();
        this.community = [];
        this.players = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
        this.observerIDs = new Set();
        this.sendUpdate();
    }

    public addObserver (userId: string) {
        this.observerIDs.add(userId);
        this.sendUpdate();
    }
    
    private sendUpdate () {
        this.players.forEach((user) => {
            if(user) socketIDtoSocketMap[user.id].emit('state', {players: this.players, community: this.community});
        });
        this.observerIDs.forEach((userId) => {
            socketIDtoSocketMap[userId].emit('state', {players: this.players, community: this.community});
        });
    }

    public startRound () {
        this.deck.shuffleAll();
        this.players.forEach((user) => {
            if(user) user.hand = this.deck.draw(2).map((card) => (card.unicode));
        });
        this.community = this.deck.draw(5).map((card) => (card.unicode));
        this.sendUpdate();
    }

    public sit (userId: string, seat: number) {
        this.observerIDs.delete(userId);
        this.players[seat] = ({id: userId, name: "asdf", hand: [], stack: 400, betSize: 0});
        this.sendUpdate();
    }
}

export default class GameManager {
    public readonly games: Map<string, PokerGame>;
    public constructor () {
        this.games = new Map();
    }
    public newGame (gameId: string) {
        this.games[gameId] = new PokerGame(1, 2);
    }
    public joinGame (userId: string, gameId: string) {
        const game: PokerGame = this.games[gameId];
        game.addObserver(userId);
    }
    public sit (userId: string, gameId: string, seat: number) {
        const game: PokerGame = this.games[gameId];
        game.sit(userId, seat);
    }
    public startGame (gameId: string) {
        const game: PokerGame = this.games[gameId];
        game.startRound();
    }
}