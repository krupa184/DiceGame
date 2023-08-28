/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, dice2, gameplaying, oldDice, winScore, diceDom, diceDomm;
init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(!gameplaying){
        return;
    }
    //1.random number
    // oldDice=dice;
    dice= Math.floor(Math.random() * 6) + 1;
    dice2= Math.floor(Math.random() * 6) + 1;
    //2.disply the result
    diceDom = document.getElementById('dice1');
    diceDom.style.display ='block';
    diceDom.src ='dice-' + dice + '.png';

    diceDomm = document.getElementById('dice2');
    diceDomm.style.display ='block';
    diceDomm.src ='dice-' + dice2 + '.png';
    
    //3.update the round score if the rolled number was not a 1
    if(dice===1||dice2===1){//(dice===6 && oldDice===6)
        // scores[activePlayer]=0
        // document.getElementById('current-'+activePlayer).textContent='0';
        
        nextPlayer();
    } else{
        roundScore+=dice+dice2;
        document.getElementById('current-'+activePlayer).textContent=roundScore;
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(!gameplaying){
        return;
    }
    // 1. update the score of active player, on screen as well
    scores[activePlayer] += roundScore;
    document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
    //2.check who is win?
    if(scores[activePlayer]>=winScore){
        document.getElementById('name-'+ activePlayer).textContent='winner';
        

        hideDice();
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gameplaying=false;
    }else {
        nextPlayer();
    }
    
})
document.querySelector('.btn-new').addEventListener('click',init);
function init(){
    winScore= prompt("Enter Your Winning score:");
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameplaying=true;
 
    hideDice();
    var scoreIds=['score-0','score-1','current-0','current-1'];
     for(var i=0;i<scoreIds.length;i++){
        document.getElementById(scoreIds[i]).textContent='0';
     }
     document.getElementById('name-0').textContent='Player 1';
     document.getElementById('name-1').textContent='Player 2';
     document.querySelector('.player-0-panel').classList.remove('winner');
     document.querySelector('.player-1-panel').classList.remove('winner');
     document.querySelector('.player-0-panel').classList.remove('active');
     document.querySelector('.player-1-panel').classList.remove('active');
     document.querySelector('.player-0-panel').classList.add('active');
    }

function nextPlayer(){
    dice=0;
    roundScore=0;
    document.getElementById('current-'+activePlayer).textContent=roundScore;
    activePlayer=activePlayer===0?1:0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // document.querySelector('.dice').style.display='none';
    hideDice();
}
function hideDice(){
    // document.querySelector('.dice').style.display='none'; 
    diceDom = document.getElementById('dice1').style.display ='none';
    diceDom = document.getElementById('dice2').style.display ='none';   
}

