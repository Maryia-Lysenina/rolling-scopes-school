// localStorage.clear()

const winnerData = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];
let count = 0;
let countClick = 0;
const cards = document.querySelector('.cards');
    const audio = document.querySelector('audio');
    cards.addEventListener('click', fn => audio.play());
    cards.addEventListener('mousedown', startGame);

const playerName = document.querySelector('.player');

let WIN = false;

let button = document.querySelector('button');
    button.addEventListener('click', reloadDoc);

 //функция перезагрузки страницы при нажатии на кнопку рестарт:
function reloadDoc(){ 
    location.reload();
    dashB ();
}
let result = document.querySelector('.result-block');
let winPlayer = document.querySelector('.winner');
let steps = document.getElementById('steps');
let resWinner = document.querySelector('.result-winner');
let resTie = document.querySelector('.result-tie');
let draw = false;
let tX = false;
let tO = false;
function startGame(event){
    if (!event.target.classList.contains('player-x') && !event.target.classList.contains('player-o')){
        countClick++
        if (count == 0){
            event.target.classList.add('player-x');
            event.target.innerHTML = 'X';
            count++;
            playerName.innerHTML = 'O';
            whoWins(count, event);
            sumWinData(winnerData);
      
        } else if (count != 0) {
            event.target.classList.add('player-o');
            event.target.innerHTML = 'O';
            count--;
            playerName.innerHTML = 'X';
            whoWins(count, event);
            sumWinData(winnerData);
        } 
        if(countClick == 9 && !WIN){
            cards.removeEventListener('click', startGame);
            result.classList.add('active');   
            resTie.classList.add('active');
            audio.src = "./assets/tie.mp3";
            audio.play();   
            draw = true; 
            return draw;
        }
    }
}
function whoWins(counter, event){
    winnerData.forEach((item) => item.forEach((num, index) => {
        if (event.target.getAttribute('data-number') == num){
            if (counter != 0) item.splice(index, 1, -10);       
            else item.splice(index, 1, 10);
        }
        })
    )
}
let countX = 0;
let countO = 0;
function sumWinData(data){
    data.forEach(item => {
        res = item.reduce((sum, cureent) => sum + cureent, 0);
        if(res === -30){
            WIN = true;
            winner('X')
            result.classList.add('active');
            resWinner.classList.add('active');
            audio.src = "./assets/winner.mp3";
            audio.play();
            steps.innerHTML = countClick - Math.floor(countClick/2);
            tX = true; 
            return tX;
        }
        if(res === 30){
            WIN = true;
            winner('O')
            result.classList.add('active');
            resWinner.classList.add('active');
            audio.src = "./assets/winner.mp3";
            audio.play();
            steps.innerHTML = countClick - Math.floor(countClick/2);
            tO = true; 
            return tO;
        }
    })  
}
let arr = [];
let obj = {};
let dashlist = document.querySelector('.list');

function dashB (){
    if (tX){
        const lastScores = JSON.parse(localStorage.getItem('lastScores')) || [];
        let result = dashboardNew('X')
        lastScores.push(result)
        localStorage.setItem('lastScores', JSON.stringify(lastScores));    
    }
    if (tO){
        const lastScores = JSON.parse(localStorage.getItem('lastScores')) || [];
        let result = dashboardNew('O')
        lastScores.push(result)
        localStorage.setItem('lastScores', JSON.stringify(lastScores));   
    } 
    if (draw){
        const lastScores = JSON.parse(localStorage.getItem('lastScores')) || [];
        let result = dashboardNew('')
        lastScores.push(result)
        localStorage.setItem('lastScores', JSON.stringify(lastScores));  
    }
 
}
if (JSON.parse(localStorage.getItem('lastScores'))) {
    addDash();
}
function addDash(){
    const lastScores = JSON.parse(localStorage.getItem('lastScores'));
    lastScores.splice(10);
    for (let i = 0; i < lastScores.length; i++){
        let li = document.createElement('li');
        li.innerHTML = lastScores[i];
        dashlist.append(li);
    }
}
let str;
function dashboardNew(name){
    if (name === 'X'){
        return str =`Team X won with ${countClick - Math.floor(countClick/2)} steps` ;
    }
     if (name === 'O'){
        return str =`Team O won with ${countClick - Math.floor(countClick/2)} steps` ;
    } else {
        return str =`That was draw!` ;
    }
}
function winner(name){
    console.log(name);
    winPlayer.innerHTML = name;
    cards.removeEventListener('click', startGame);
} 

