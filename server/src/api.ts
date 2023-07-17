import { Router } from "express";
import { gameManager } from "./server";


export const router = Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/', function(req, res) {
    res.send('hello');
});

router.post('/newgame', function(req, res) {
    const newId = 'hello';
    gameManager.newGame(0, newId);
    res.send(newId);
});