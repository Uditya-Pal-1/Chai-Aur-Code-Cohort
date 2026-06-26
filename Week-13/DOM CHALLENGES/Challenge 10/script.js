const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.querySelector('.movesDisplay');
const timeDisplay = document.querySelector('.timeDisplay');
const resetBtn = document.getElementById('resetBtn');

let cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

let cardsArray = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let lockBoard = false;

let time = 0;
let timerInterval;
let gameStarted = false;

function initializeGame(){
    gameBoard.innerHTML = '';
    flippedCards = []
    moves = 0;
    matches = 0;
    lockBoard = false;
    time = 0
    gameStarted = false
    clearInterval(timerInterval)
    timeDisplay.innerHTML = `Time: 0s`
    movesDisplay.innerHTML = `Moves: ${moves}`
    movesDisplay.innerHTML = `Moves: ${moves}`;

    cardsArray = [...cards, ...cards]
    cardsArray.sort(() => Math.random()-0.5)
    createBoard();
}

function createBoard(){
    cardsArray.forEach((emoji, index) =>{
        const card = document.createElement('div')
        card.classList.add('card')
        card.setAttribute('data-emoji', emoji)
        card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">❓</div>
            <div class="card-back">${emoji}</div>
        </div>
        `
        card.addEventListener('click',function(){
            if(!gameStarted){
                startTimer();
                gameStarted = true;
            }
            if(lockBoard || card.classList.contains('flipped')) return;
            card.classList.add('flipped')
            flippedCards.push(card);
            if(flippedCards.length === 2){
                moves++;
                movesDisplay.innerHTML = `Moves: ${moves}`
                checkForMatch();
            }
        })
    
        gameBoard.appendChild(card)
    })
}

function checkForMatch(){
    lockBoard = true;
    const card1 = flippedCards[0]
    const card2 = flippedCards[1]
    const isMatch = card1.getAttribute('data-emoji') === card2.getAttribute('data-emoji')

    if(isMatch){
        matches++;
        flippedCards = [];
        lockBoard = false
        if(matches ===8){
            clearInterval(timerInterval);
            setTimeout(()=>{
                alert(`You won in ${moves} moves and ${time} seconds!`)
            },500)
        }
    }else{
        setTimeout(()=>{
            card1.classList.remove('flipped')
            card2.classList.remove('flipped')
            flippedCards = []
            lockBoard = false
        }, 1000)
    }
}

function startTimer(){
    timerInterval = setInterval(()=>{
        time++;
        timeDisplay.innerHTML = `Time: ${time}s`
    },1000)
}

resetBtn.addEventListener('click', initializeGame)

initializeGame();