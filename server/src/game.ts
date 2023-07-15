import { decks } from 'cards';
import { Socket } from 'socket.io';

class PokerGame {
    public readonly userToSocket: Map<string, Socket>;
    public constructor (
        public readonly id: string,
    ) {
        this.userToSocket = new Map();
    }
    public addPlayer (userId: number) {
        this.userToSocket[userId] = 0;
    }
    public startRound () {
        
    }
}

export default class GameManager {
    public readonly games: Map<string, PokerGame>;
    public constructor () {
        this.games = new Map();
    }
    public newGame () {
        
    }
    public joinGame (userId: number, gameId: string) {
        const game: PokerGame = this.games[gameId];
        game.addPlayer(userId);
    }
}