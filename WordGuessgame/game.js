const wordList = require('./words');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

const playGame = {
  word: process.env.OVERRIDE || pickWord(wordList),
  turns: 0,
  match: 0,
  isValid: true,
  isMatched: false,
  guesses: [],
  hints: [],
};

console.log("secret word is " + playGame.word);

function addGuess(text) {
  playGame.guesses.push(text);
};

function compare(word, guess) {
  let matches = 0;
  const letterCount = {};
  for (let letter of word.toLowerCase()) {
    letterCount[letter] = letterCount + 1 || 1;
  }
  for (let letter of guess.toLowerCase()) {
    if (letterCount[letter]) {
      letterCount[letter] -= 1;
      matches += 1;
    }
  }
  return matches;
}

function takeTurn(playGame, guess) {
  if (!guess || guess.length != playGame.word.length || !wordList.includes(guess.toUpperCase())) {
    playGame.isValid = false;
    playGame.guesses.pop();
  }
  else if (exactMatch(playGame.word, guess)) {
    playGame.isMatched = true;
    playGame.isValid = true;
    playGame.guesses.pop();
    playGame.turns++;
  }
  else {
    playGame.match = compare(playGame.word, guess);
    if (playGame.match > 0) {
      playGame.isValid = true;
      playGame.turns++;
      playGame.hints.push(`You matched ${playGame.match} letters out of ${playGame.word.length}`);
    }
  }
}

function exactMatch(word, guess) {
  return word.toUpperCase() === guess.toUpperCase();
}

function pickWord(wordList) {
  secretWord = wordList[Math.floor(Math.random() * wordList.length)];
  return secretWord;
}

function resetGame(game, words) {
  game.playGame.hints = [];
  game.playGame.guesses = [];
  playGame.turns = 0;
  playGame.isMatched = false;
  playGame.isValid = true;
  playGame.match = 0;
  playGame.word = game.pickWord(words);
  console.log("play again, Secret word is " + playGame.word);
}

const game = {
  playGame,
  compare,
  exactMatch,
  pickWord,
  takeTurn,
  addGuess,
  resetGame
}

module.exports = game;