import { Card, decks } from 'cards';
import { Socket } from 'socket.io';

type User = {
    id: number;
    hand: Card[];
    stack: number;
    inPile: number;
}

class PokerGame {
    public readonly userToSocket: Map<number, Socket>;
    public readonly users: User[];
    public readonly deck: decks.StandardDeck;
    private community: Card[];
    public constructor (
    ) {
        this.userToSocket = new Map();
        this.deck = new decks.StandardDeck();
        this.community = [];
    }
    public addPlayer (userId: number, socket: Socket) {
        this.userToSocket[userId] = socket;
    }
    public startRound () {
        this.deck.shuffleAll();
        this.users.forEach((user) => {
            user.hand = this.deck.draw(2);
        });
        this.community = this.deck.draw(5);
        this.users.forEach((user) => {
            const socket = this.userToSocket[user.id];
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
        this.games[gameId] = new PokerGame();
    }
    public joinGame (userId: number, gameId: string, socket: Socket) {
        const game: PokerGame = this.games[gameId];
        game.addPlayer(userId, socket);
    }
    public startGame(gameId: number) {
    }
}