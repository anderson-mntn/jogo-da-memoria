const FRONT = "card_front";
const BACK = "card_back";

let teams = ['lakers','celtics', 'gsw', 'bulls',
    'nets','cavs', 'mavs', 'hawks'
];

// ----- Selectors -----


// ----- Functions -----

// Create Cards Function


function createCardsFromTeams(teams){

    let cards = [];

    for (let team of teams){
        cards.push((createCardsFromTeam));
    }
    console.log(cards);
}

function createCardsFromTeam(team){
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
    return team + parseInt(Math.random()) * 1000;
}
createCardsFromTeams(teams)