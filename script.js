//return a number between 1 and 6 (roll the dice)
function roll(){
    return Math.trunc(Math.random()*6 + 1 );
}

function namePlayer(playerNumber){
    return (playerNumber%2 == 0)?'1':'2';
}


const currents = Array.from( document.querySelectorAll(".current em") );
console.log(currents);

let currentPlayer = 0;

const btnRoll = document.querySelector(".roll");

btnRoll.addEventListener('click',()=>{
    console.log(`Player ${namePlayer(currentPlayer)} rolled ${roll()}.`);
    currentPlayer++;
});