const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');

const words = require('./words');
const game = require('./game');
const gameSite = require('./game-site');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(gameSite.gamePage(game, words));
});

app.post('/sendGame', express.urlencoded({ extended: false }), (req, res) => {
    const { text } = req.body;
    game.addGuess(text);
    game.takeTurn(game.playGame, text);
    res.redirect('/');
});

app.get('/clearGame', (req, res) => {
    game.resetGame(game, words);
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));