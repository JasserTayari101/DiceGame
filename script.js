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




let currents = Array.from( document.querySelectorAll(".current em") );
let totals = Array.from(document.querySelectorAll(".score"));

const result = document.getElementById('result');

function updateValues(){
    currents = Array.from( document.querySelectorAll(".current em") );
    totals = Array.from(document.querySelectorAll(".score"));


    try{
        if(totals[(currentPlayer-1)%2].textContent >= 50){
            result.textContent = `Player ${namePlayer(currentPlayer-1)} Won!!!`;
            btnRoll.removeEventListener('click',rollGame);
            btnHold.removeEventListener('click',holdGame);
        }
    }catch{
        ;
    }
}




let currentPlayer = 0;  //keep track of players turns
let sides = Array.from(document.querySelectorAll(".side"));
sides[1].style.opacity = .5;



function updatePlayer(){
    sides[currentPlayer%2].style.opacity = .5;
    currentPlayer++;
    sides[currentPlayer%2].style.opacity = 1;
}

let currentScore = 0;   //keep track of the current score
const btnRoll = document.querySelector(".roll");




function rollGame(){
    let rolled = roll();
    animateDice(rolled);
    let playerName = namePlayer(currentPlayer);
    
    if(rolled == 1){
        console.log(`Player ${playerName} rolled a one : RESET!`);
        currentScore = 0;
        currents[currentPlayer%2].textContent = currentScore;
        updatePlayer();
    }else{
        console.log(`Player ${playerName} rolled ${rolled}.`);
        currentScore+=rolled;
        console.log(`Player ${playerName}'s score : ${currentScore}`);
        currents[currentPlayer%2].textContent = currentScore;
    }
    updateValues();

}




btnRoll.addEventListener('click',rollGame);


function holdGame(){
    const total = Number(totals[currentPlayer%2].textContent);

    totals[currentPlayer%2].textContent = total+currentScore; //add to total score
    currents[currentPlayer%2].textContent = 0; //reset current score
    updatePlayer();
    currentScore = 0;
    updateValues();

}


const btnHold = document.querySelector('.hold');

btnHold.addEventListener('click',holdGame)



const btnNewGame = document.querySelector('.reset');

function gameReset(){
    currentPlayer = 0;
    currentScore = 0;
    totals[0].textContent = 0;
    totals[1].textContent = 0;
    sides[1].style.opacity = .5;
    sides[0].style.opacity = 1;
    updateValues();
    btnRoll.addEventListener('click',rollGame);
    btnHold.addEventListener('click',holdGame);
    result.textContent = "";
}


btnNewGame.addEventListener('click',gameReset)