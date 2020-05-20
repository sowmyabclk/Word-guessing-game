const wordList = require('./words');

const gameSite = {
  gamePage: function (game, words) {
    return `<!DOCTYPE html>
      <html>
         <head>
             <link rel="stylesheet" href="game.css"/>
             <title>Guess word</title>
         </head>
         <body>
            <h1 class = "heading">Guess a ${game.playGame.word.length} letter word </h1>
               <div id="game-app">
                  <div class = "display-words">
                     ${gameSite.getWordList(words)}
                  </div>
               <div class="play-area">
                    ${gameSite.getOutGoing(game)}  
                      <div class = "text-info">
                          <label>  ${gameSite.getMessageStatus(game)} </label>
                      </div>
                </div>
                <div class = "display-panel">
                    <div class="display-hints">
                      ${gameSite.getgueesedWordList(game)}  
                       ${gameSite.getHintsList(game)} 
                    </div>
                <div class = "turns-info">
                    <label>Turns Taken : ${game.playGame.turns}</label>
                </div>
             </div>
         </body>
      </html>`;

  },

  getOutGoing: function (game) {
    return ` 
         <form action = "/sendGame" method="POST">
            <input class ="guess-word" type="" name="text" placeholder="Enter a word"/>
            <button class="to-guess" name="submit" type = "submit" ${gameSite.guessButtonStatus(game)}>Guess</button>
        </form>
        <form action = "/clearGame" method="GET">
            <button class="play-again" name="playAgain" type="submit" ${gameSite.playAgainButtonStatus(game)} >Play again</button>
        </form>
    `;
  },

  guessButtonStatus: function (game) {
    let status;
    if (game.playGame.isMatched) {
      return "disabled";
    }
    else {
      return "enabled";
    }
    return status;
  },

  playAgainButtonStatus: function (game) {
    let status;
    if (game.playGame.isMatched) {
      return "enabled";
    }
    else {
      return "disabled";
    }
    return status;
  },


  getMessageStatus: function (game) {
    if (game.playGame.isMatched) {
      return "CORRECT!  You won in " + game.playGame.turns + " turns!";
    }
    else if (game.playGame.match > 0 && game.playGame.isValid) {
      return "You matched " + game.playGame.match + " letters out of " + game.playGame.word.length;
    }
    else if (!game.playGame.isValid) {
      return "invalid word, select from the list";
    }
    else {
      return " ";
    }
  },

  getWordList: function (words) {
    return `<ul class="words">` +
      words.map(word => `
      <li>
        <div class="word-list">
          <span>${word}</span>
        </div>
      </li>
    `).join('') +
      `</ul>`;

  },
  getgueesedWordList: function (game) {
    return `<ul class = "guessed-word-list">` +
      game.playGame.guesses.map(guess => `
      <li>
        <div class="guessed-list">
          <span>${guess}</span>
        </div>
      </li>
    `).join('') +
      `</ul>`;
  },


  getHintsList: function (game) {
    return `<ul class="hints">` +
      game.playGame.hints.map(hint => `
    <li>
      <div class="hint-list">
        <span>${hint}</span>
      </div>
    </li>
  `).join('') +
      `</ul>`;
  },
}

module.exports = gameSite;