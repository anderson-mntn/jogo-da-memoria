const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"
var moveCounter = 0;
var dificulty;


// ----- Selectors -----
var gameOverScreen = document.querySelector("#gameOver");
const initialScreen = document.querySelector("#initialScreen");
const easyModeBtn = document.querySelector("#easyModeBtn");
const normalModeBtn = document.querySelector("#normalModeBtn");
const hardModeBtn = document.querySelector("#hardModeBtn");
const movesCounter = document.querySelector(".movesCounter");
const finalMovesCounter = document.querySelector("#finalMovesCounter");

const cardInterface = document.getElementsByClassName('card');

// ----- Functions -----

normalMode();

function startGame(){
    initializeCards(game.createCardsFromTeams());
    // console.log(cards);
    moveCounter = 0;
    movesCounter.innerHTML = moveCounter;
        
}



function initializeCards(cards){
    let gameBoard = document.querySelector("#gameBoard");
    // console.log(gameBoard);

    game.cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD);

        // Verificando se os icons das cards sao iguais
        cardElement.dataset.icon = card.icon;

        // Event listener de jogada
        cardElement.addEventListener('click', flipCard)

        // Colocando card no tabuleiro
        gameBoard.appendChild(cardElement);

        createCardContent(card, cardElement);

    })
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

// ----- Colocando imagem do time ou </> no card -----

function createCardFace(face, card, element){

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face)
    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = `<img src="./assets/images/nba_logo.png" alt="nba logo">`;
    }

    element.appendChild(cardElementFace);
}

// ----- Flip Card Function ----- 
function flipCard(card){

    if(game.setCard(this.id)){
       this.classList.add("flip");
       if(game.secondCard){
            moveCounter++;
            movesCounter.innerText = moveCounter;
            finalMovesCounter.innerHTML = moveCounter;
            if (game.checkCardsMatch()){
              game.clearCards();
              if(game.checkGameOver()){
                gameOverScreen.style.display = "flex";
              }
            } else {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
               setTimeout(()=>{

               
               firstCardView.classList.remove('flip');
               secondCardView.classList.remove('flip');
               
               
               game.unflipCards();
               }, 1000);
            }
            
        }
    }
   
}    

function restartGame(){
    setTimeout(()=>{
        gameOverScreen.style.display = "none";
        moveCounter = 0;
        game.firstCard = null;
    
        gameBoard.innerHTML = "";
        switch(dificulty){
            case "easy" : easyMode(), console.log(dificulty);
            break;
            case "normal" : normalMode(), console.log(dificulty);
            break;
            case "hard" : hardMode(), console.log(dificulty);
            break;
            default: console.log("diff. change");
        }
    }, 1000)

}

function hide(){
    initialScreen.style.display = "none";
}

function changeDifficulty(){
    initialScreen.style.display = "flex";
    moveCounter = 0;
    game.unflipCards();
    
}

function easyMode(){
    game.teams = ['lakers','celtics', 'gsw', 'bulls', 'heat','nets','cavs', 'mavs']
    gameBoard.innerHTML = "";
    dificulty = "easy"
    startGame();
    gameBoard.style.gridTemplateColumns = "120px 120px 120px 120px"
    gameBoard.style.gridTemplateRows = "120px  120px 120px 120px"
}

function normalMode(){
    game.teams = ['lakers','celtics', 'gsw', 'bulls', 'heat','nets','cavs', 'mavs', 'hawks', 'knicks', 'spurs', 'wolves',
    'clippers', 'suns', 'pelicans', 'kings',]
    gameBoard.innerHTML = "";
    dificulty = "normal";
    
    startGame();
    gameBoard.style.gridTemplateColumns = "120px 120px 120px 120px 120px 120px 120px 120px"
    gameBoard.style.gridTemplateRows = "120px  120px 120px 120px"
}

function hardMode() {
    game.teams = ['lakers','celtics', 'gsw', 'bulls', 'heat','nets','cavs','mavs', 'hawks', 'knicks',
     'spurs', 'wolves', 'clippers', 'suns', 'pelicans', 'kings', 'bucks', '76ers', 'nuggets', 'grizzlies',
     ,'raptors', 'okc', 'jazz', 'trail-blazers', 'hornets', 'wizards', 'rockets', 'pacers', 'pistons', 'magic' 
    ];
    gameBoard.innerHTML = "";
    dificulty = "hard";
    startGame();
    gameBoard.style.gridTemplateColumns = "100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px"
    gameBoard.style.gridTemplateRows = "100px  100px 100px 100px 100px"
    gameBoard.style.gap = "12px"
  
};


