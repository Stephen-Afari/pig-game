/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore,activePlayer, gamePlaying;
init();
// score=[0,0]; //indicate these initial numbers that will be mutated later.
// roundScore = 0;
// activePlayer =0;



//document.querySelector('#current-'+ activePlayer).textContent = dice;
//document.querySelector('#current-'+ activePlayer).innerHTML= '<em>'+dice+'</em>';
// var x=document.querySelector('#current-0').textContent;
// console.log(x);

var lastDice;
document.querySelector('.btn-roll').addEventListener('click',function(){
   if(gamePlaying){  // The was originally set to true during initialization
      var diceDOM= document.querySelector('.dice');
      var dice = Math.floor(Math.random()*6)+1;
      diceDOM.style.display='block';
      diceDOM.src="dice-"+dice+'.png';
      // update the round score if the rolled number was NOT a 1
   if(lastDice===6 && dice===6){
// player loses scores
        score[activePlayer]=0;
        document.querySelector('#score-'+ activePlayer).textContent=0;
        nextPlayer();
   }else if(dice !==1){
          //Add score
   roundScore+=dice;
   document.querySelector('#current-'+ activePlayer).textContent=roundScore;
      } else{
   //Next Score
   nextPlayer();
   lastDice=dice;
      }

      
   }
   

})

document.querySelector('.btn-hold').addEventListener('click', function(){
 
 if(gamePlaying){
//Add current score to the Global Score
score[activePlayer]+=roundScore;
document.querySelector('#score-'+ activePlayer).textContent=score[activePlayer];

var input = document.querySelector('.final-score').value ;
var winningScore;
//Undefined, o, null or " " are COERCED to false

//Anything else is COERCED to true
if(input){
    var winningScore= input;
} else{
    winningScore =100
}
//check if player won the game

if(score[activePlayer]>=winningScore){
document.querySelector('#name-'+activePlayer).textContent='Winner';
document.querySelector('.dice').style.display='none';
document.querySelector('.player-'+ activePlayer+ '-panel').classList.add('winner');
document.querySelector('.player-'+ activePlayer+ '-panel').classList.remove('active');
gamePlaying= false;  //After we find a winner, we set it to false..
}  else{
//Next Player
nextPlayer();
}
 }
   

  
})

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
   gamePlaying= true;
   score=[0,0]; //indicate these initial numbers that will be mutated later.
roundScore = 0;
activePlayer =0;
document.querySelector('.dice').style.display='none';

document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer(){
   activePlayer === 0 ? activePlayer=1 : activePlayer=0;
   roundScore=0;
   document.getElementById('current-0').textContent= '0';
   document.getElementById('current-1').textContent= '0';
   
   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
   document.querySelector('.dice').style.display='none';
}