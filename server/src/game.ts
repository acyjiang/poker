import { Card, decks } from 'cards';
import { Socket } from 'socket.io';
import { socketIDtoSocketMap } from './server';

type User = {
    id: string;
    name: string;
    hand: Card[];
    stack: number;
    betSize: number;
}

class PokerGame {
    public readonly players: User[];
    public readonly observerIDs: string[];
    public readonly deck: decks.StandardDeck;
    private community: Card[];
    public readonly potSize: number;
    public constructor (
        public readonly smallBlind: number,
        public readonly bigBlind: number
    ) {
        this.deck = new decks.StandardDeck();
        this.community = [];
        this.players = [];
        this.observerIDs = [];
        this.sendUpdate();
    }
    public addObserver (userId: string) {
        this.observerIDs.push(userId);
        this.sendUpdate();
    }
    private sendUpdate () {
        console.log(this);
        this.players.forEach((user) => {
        });
        this.observerIDs.forEach((userId) => {
            socketIDtoSocketMap[userId].emit('state', {players: this.players, community: this.community});
        });
    }
    public startRound () {
        this.deck.shuffleAll();
        this.players.forEach((user) => {
            user.hand = this.deck.draw(2);
        });
        this.community = this.deck.draw(5);
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
}