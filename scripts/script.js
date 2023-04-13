const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"
let moveCounter = 0;

// ----- Selectors -----
var gameOverScreen = document.querySelector("#gameOver");
const initialScreen = document.querySelector("#initialScreen");
const easyModeBtn = document.querySelector("#easyModeBtn");
const normalModeBtn = document.querySelector("#normalModeBtn");
const hardModeBtn = document.querySelector("#hardModeBtn");

const cardInterface = document.getElementsByClassName('card');

// ----- Functions -----

hardMode();

function startGame(){
    initializeCards(game.createCardsFromTeams());
    // console.log(cards);
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
    // createCardFace(BACK, card, cardElement);
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
            if (game.checkCardsMatch()){
              game.clearCards();
              if(game.checkGameOver()){
                gameOverScreen.style.display = "flex";
              }
            } else {
               setTimeout(()=>{
               let firstCardView = document.getElementById(game.firstCard.id);
               let secondCardView = document.getElementById(game.secondCard.id);
               
               firstCardView.classList.remove('flip');
               secondCardView.classList.remove('flip');
               game.unflipCards();
               }, 1000);
            }
        }
    }
   
}    

function restartGame(){
    gameBoard.innerHTML = "";
    gameOverScreen.style.display = "none";
    startGame();
}

function hide(){
    initialScreen.style.display = "none";
}

easyModeBtn.addEventListener("click", ()=> {
    game.teams = ['lakers','celtics', 'gsw', 'bulls', 'heat','nets','cavs', 'mavs']
    gameBoard.innerHTML = "";
    startGame();
    gameBoard.style.gridTemplateColumns = " 120px 120px 120px 120px"
    gameBoard.style.gridTemplateRows = " 120px  120px 120px 120px"

});

normalModeBtn.addEventListener("click", normalMode);

function normalMode(){
    game.teams = ['lakers','celtics', 'gsw', 'bulls', 'heat','nets','cavs', 'mavs', 'hawks', 'knicks', 'spurs', 'wolves',
    'clippers', 'suns', 'pelicans', 'kings',]
    gameBoard.innerHTML = "";
    startGame();
    gameBoard.style.gridTemplateColumns = " 120px 120px 120px 120px 120px 120px 120px 120px"
    gameBoard.style.gridTemplateRows = " 120px  120px 120px 120px"
}

function hardMode() {
    game.teams = ['lakers','celtics', 'gsw', 'bulls', 'heat','nets','cavs','mavs', 'hawks', 'knicks',
     'spurs', 'wolves', 'clippers', 'suns', 'pelicans', 'kings', 'bucks', '76ers', 'nuggets', 'grizzlies',
     ,'raptors', 'okc', 'jazz', 'trail-blazers', 'hornets', 'wizards', 'rockets', 'pacers', 'pistons', 'magic' 
    ];
    gameBoard.innerHTML = "";
    startGame();
    gameBoard.style.gridTemplateColumns = " 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px"
    gameBoard.style.gridTemplateRows = " 100px  100px 100px 100px 100px "
    gameBoard.style.gap = "12px"

    game.card
     
};

// function flipAll(){
//     let c = document.getElementsByClassName('card')
//     c.classList = ("flip")
// }

// flipAll()

