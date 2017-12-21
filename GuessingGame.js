function generateWinningNumber(){
  return Math.floor(Math.random() * 100) + 1;
}
function shuffle(array){
  var m = array.length, cardIndex;
  while(m){
    cardIndex = Math.floor(Math.random() * (m--));
    [array[cardIndex], array[m]] = [array[m], array[cardIndex]];
  }
  return array;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}



function newGame(){
  return new Game();
}

Game.prototype.difference = function(){
  return Math.abs(this.winningNumber - this.playersGuess);
};

Game.prototype.isLower = function(){
  return this.playersGuess < this.winningNumber ? true : false;
};

Game.prototype.playersGuessSubmission = function(num){
  if (num > 100 || num < 1 || typeof(num) !== 'number'){
      throw "That is an invalid guess.";
  } else {
    this.playersGuess = num;
  }

return this.checkGuess(num);
};


Game.prototype.checkGuess = function(){
  if (this.winningNumber === this.playersGuess){
    return "You Win!";
  } else {
    if (this.pastGuesses.includes(this.playersGuess)){
      return "You have already guessed that number.";
    } else {
      this.pastGuesses.push(this.playersGuess);
      if(this.pastGuesses.length === 5) {
        return 'You Lose.';
      }
    else {
      if (this.difference() < 10) return "You're burning up!";
      else if (this.difference() < 25) return "You're lukewarm.";
      else if (this.difference() < 50) return "You're a bit chilly.";
      else if (this.difference() < 100) return "You're ice cold!";
      }
    }
  }
};

Game.prototype.provideHint = function(){
  var hintArray =[]
  hintArray.push(this.winningNumber)
  var rando1 = generateWinningNumber()
  var rando2 = generateWinningNumber()
  hintArray.push(rando1, rando2)
  return shuffle(hintArray)
}
