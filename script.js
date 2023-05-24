//return a number between 1 and 6 (roll the dice)
function roll(){
    return Math.trunc(Math.random()*6 + 1 );
}

function namePlayer(playerNumber){
    return (playerNumber%2 == 0)?'1':'2';
}


//key is number of rolled dice and the value is an array of points to hide
const diceGuide = {
    1 : ['one'],
    2 : ['three','five'],
    3 : ['three','one','five'],
    4 : ['two','three','four','five'],
    5 : ['two','three','four','five','one'],
    6 : ['two','three','four','five','six','seven'],
    7 : ['two','three','four','five','six','seven','one'],
}


function ShowPoints(points){
    points.forEach(point=>{
        const pointToShow = document.querySelector(`#dice .${point}`);
        pointToShow.classList.toggle('hidden');
    })
}
function HideAll(){
    const points = Array.from(document.querySelectorAll('#dice .point'));
    points.forEach(point=>{
        point.classList.add('hidden');
    })
}

function animateDice(rolled){
    HideAll();
    ShowPoints(diceGuide[rolled]);
}




const currents = Array.from( document.querySelectorAll(".current em") );
console.log(currents);

let currentPlayer = 0;
let currentScore = 0;
const btnRoll = document.querySelector(".roll");

btnRoll.addEventListener('click',()=>{
    let rolled = roll();
    animateDice(rolled);
    let playerName = namePlayer(currentPlayer);
    
    if(rolled == 1){
        console.log(`Player ${playerName} rolled a one : RESET!`);
        currentScore = 0;
        currentPlayer++;
    }else{
        console.log(`Player ${playerName} rolled ${rolled}.`);
        currentScore+=rolled;
        console.log(`Player ${playerName}'s score : ${currentScore}`);
    }
    
    
});