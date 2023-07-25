import { BACKEND_URL } from "../config";

export async function createGame() {
    const params = (await fetch(`${BACKEND_URL}/api/newgame`)).text();
    return params;
}