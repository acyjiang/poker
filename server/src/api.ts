import { Router, Request } from "express";
import { gameManager, setSocketFromUser } from "./server";

export const router = Router();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

router.post('/initsocket', function(req, res) {
    // TODO: how do u do session user
    console.log(req.query.userId);
    setSocketFromUser(req.query.userId.toString(), req.query.socketId.toString());
});

router.get('/newgame', function(req, res) {
    const newId = 'hello';
    gameManager.newGame('a', newId);
    res.send(newId);
});

router.get('/joingame', function(req, res) {
    const newId = 'hello';
    res.send(newId);
});