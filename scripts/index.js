const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"


// ----- Selectors -----


// ----- Functions -----


// ----- Start Game Functions -----


startGame();
function startGame(){
    initializeCards(game.createCardsFromTeams());
    // console.log(cards);
}



function initializeCards(cards){
    let gameBoard = document.querySelector("#gameBoard");
    console.log(gameBoard);

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
        cardElementFace.innerHTML = "&lt/&gt";
    }

    element.appendChild(cardElementFace);
}

// ----- Flip Card Function ----- 
function flipCard(card){
    this.classList.add("flip");
}
