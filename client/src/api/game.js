import { BACKEND_URL } from "../config";

export function initSocket(socketId, userId) {
    fetch(`${BACKEND_URL}/api/initsocket?${new URLSearchParams({
        socketId, userId
    })}`, {method: "POST"});
}

export async function createGame() {
    const params = (await fetch(`${BACKEND_URL}/api/newgame`)).text();
    return params;
}