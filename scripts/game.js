let game = {
    teams: ['lakers','celtics', 'gsw', 'bulls', 'heat',
        'nets','cavs', 'mavs', 'hawks', 'knicks', 'spurs', 'wolves'
    ],
    cards: null,

    // ----- Create Cards Functions/Methods -----
    createCardsFromTeams : function(){

        this.cards = [];

        this.teams.forEach((team)=>{
            this.cards.push((this.createPairFromTeam(team)));
        })
        this.cards = this.cards.flatMap(pair => pair); // "desmembra" um item do array e o retorna no array.
        this.shuffleCards();
        return this.cards;
    },

    createPairFromTeam : function(team){
        return [{
            id: this.createIdWithTeam(team),
            icon: team,
            flipped:false,
        },{
            id: this.createIdWithTeam(team),
            icon: team,
            flipped:false,
        }]
    },
    createIdWithTeam: function(team){
        return team + parseInt(Math.random() * 1000) ;
    },

    shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            // invertendo/trocando valores de duas variaveis
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}