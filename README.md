### Description:The application will be a game to guess a word.

## How to Run the Project

* step-1: Download the Project from git repository
* step-2: npm install to download the necessary packages
* step-3: node server.js to start the project
* step-4: go to http://localhost:3000


## What this project does


The User will enter a word, and the page will do one of:
* Say the word is not one of the permitted words and allow them to enter a new word
* Display that the user has correctly guessed the word and allow them to start a new game
* Say how many letters the word has in common with the word they are trying to guess, without regard to position or case-sensitivity



### Visuals
* The game will display the list of previously guessed words for this word, as well as their number of "matching" letters
* The game will display the number of accepted guesses made (turns taken, not counting invalid words)
* The game will display the list of valid words to guess


### Examples

If `words.js` has the words "TEA, EAT, TEE, PEA, PET, APE" and the game selects TEA as the secret word then:
* TREE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* ATE will give a warning about an invalid word, not increment the turn counter and allow a new guess
* PET will respond with 2 matches and increment the turn counter then allow a new guess
* TEE will respond with 2 matches and increment the turn counter then allow a new guess
* tee will respond with 2 matches and increment the turn counter then allow a new guess
* EAT will respond with 3 matches and increment the turn counter then allow a new guess
* TEA will respond that they have won the game in however many turns and allow them to start a new game with a new randomly selected word from the list


