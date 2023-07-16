import { Card, decks } from 'cards';
import { Socket } from 'socket.io';
import { getSocketFromUser } from './server';

type User = {
    id: number;
    name: string;
    hand: Card[];
    stack: number;
    betSize: number;
}

class PokerGame {
    public readonly users: User[];
    public readonly deck: decks.StandardDeck;
    private community: Card[];
    public readonly potSize: number;
    public constructor (
        public readonly bigBlind: number,
        public readonly smallBlind: number
    ) {
        this.deck = new decks.StandardDeck();
        this.community = [];
    }
    public addPlayer (userId: number, name: string, startingStack: number) {
        this.users.push({id: userId, name: name, hand: [], stack: startingStack, betSize: 0});
    }
    public startRound () {
        this.deck.shuffleAll();
        this.users.forEach((user) => {
            user.hand = this.deck.draw(2);
        });
        this.community = this.deck.draw(5);
        this.users.forEach((user) => {
            const socket = getSocketFromUser(user.id);
            socket.emit("new game state", this);
        })
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
    public joinGame (userId: number, gameId: string, name: string, startingStack: number) {
        const game: PokerGame = this.games[gameId];
        game.addPlayer(userId, name, startingStack);
    }
}