const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"

let teams = ['lakers','celtics', 'gsw', 'bulls', 'hornets',
    'nets','cavs', 'mavs', 'hawks', 'knicks', 'spurs', 'wolves'
];

// ----- Selectors -----


// ----- Functions -----


// ----- Start Game Functions -----

let cards = null;

startGame();
function startGame(){
    cards = createCardsFromTeams(teams);
    shuffleCards(cards);
    console.log(cards);
    initializeCards(cards);
}

function shuffleCards(cards){
    let currentIndex = cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // invertendo/trocando valores de duas variaveis
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}

function initializeCards(cards){
    let gameBoard = document.querySelector("#gameBoard");
    console.log(gameBoard);

    cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add(CARD, "brdr_radius");

        // Verificando se os icons das cards sao iguais
        cardElement.dataset.icon = card.icon;

        // Event listener de jogada
        cardElement.addEventListener('click', flipCard)

        // Colocando card no tabuleiro
        gameBoard.appendChild(cardElement);

        createCardContent(card, cardElement);

    })
}


// ----- Create Cards Functions -----

createCardsFromTeams(teams)
function createCardsFromTeams(teams){

    let cards = [];

    teams.forEach((team)=>{
        cards.push((createPairFromTeam(team)));
    })
    return (cards.flatMap(pair => pair)); // "desmembra" um item do array e o retorna no array.
}

function createPairFromTeam(team){
    return [{
        id: createIdWithTeam(team),
        icon: team,
        flipped:false,
    },{
        id: createIdWithTeam(team),
        icon: team,
        flipped:false,
    }]
}

function createIdWithTeam(team){
    return team + parseInt(Math.random() * 1000) ;
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