import { Router, Request } from "express";
import { gameManager } from "./server";
import { v4 as uuidv4 } from 'uuid';

export const router = Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.get('/newgame', function(req, res) {
    const newId = uuidv4();
    gameManager.newGame(newId);
    res.send(newId);
});