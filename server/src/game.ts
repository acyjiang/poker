import { Card, decks } from 'cards';
import { Socket } from 'socket.io';
import { getSocketFromUser } from './server';

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
        public readonly ownerId: string,
        public readonly bigBlind: number,
        public readonly smallBlind: number
    ) {
        this.deck = new decks.StandardDeck();
        this.community = [];
        this.players = [];
        this.observerIDs = [ownerId];
        this.sendUpdate();
    }
    public addPlayer (userId: string, name: string, startingStack: number) {
        this.players.push({id: userId, name: name, hand: [], stack: startingStack, betSize: 0});
    }
    private sendUpdate () {
        console.log(this);
        this.players.forEach((user) => {
            const socket = getSocketFromUser(user.id);
            socket.emit("new game state", this);
        });
        this.observerIDs.forEach((userId) => {
            const socket = getSocketFromUser(userId);
            socket.emit("new game state", this);
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
    public newGame (ownerId: string, gameId: string) {
        this.games[gameId] = new PokerGame(ownerId, 1, 2);
    }
    public joinGame (userId: string, gameId: string, name: string, startingStack: number) {
        const game: PokerGame = this.games[gameId];
        game.addPlayer(userId, name, startingStack);
    }
}