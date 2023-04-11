const FRONT = "card_front";
const BACK = "card_back";

let teams = ['lakers','celtics', 'gsw', 'bulls', 'hornets',
    'nets','cavs', 'mavs', 'hawks', 'knicks', 'spurs', 'wolves'
];

// ----- Selectors -----


// ----- Functions -----


// ----- Start Game Function -----

let cards = null;

startGame();
function startGame(){
    cards = createCardsFromTeams(teams);
    shuffleCards(cards);
    console.log(cards);
}

function shuffleCards(cards){
    let currentIndex = cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;
        
        // invertendo/trocando valores de duas variaveis
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}


// ----- Create Cards Function -----

createCardsFromTeams(teams)
function createCardsFromTeams(teams){

    let cards = [];

    for (let team of teams){
        cards.push((createPairFromTeam(team)));
    }
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
