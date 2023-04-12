let game = {
    teams: ['lakers','celtics', 'gsw', 'bulls', 'heat','nets',
        'cavs', 'mavs', 'hawks', 'knicks', 'spurs', 'wolves'
    ],
   

    // ----- Checking Game Actions -----

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){
        let card = this.cards.filter(card => card.id === id)[0];

        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            return true;
        } else {
            this.secondCard = card;
            this.lockMode = true;
            return true;
        }


        
    },
    fLockMode: function(){
        this.lockMode = false;
    },

    checkCardsMatch: function(){
        return this.firstCard.icon == this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    cards: null,

    // ----- Create Cards Functions/Methods -----
    createCardsFromTeams : function(){

        this.cards = [];

        this.teams.forEach((team)=>{
            this.cards.push((this.createPairFromTeam(team)));
        })
        this.cards = this.cards.flatMap(pair => pair); // "desmembra" um item do array e o retorna no array.
        console.log(this.cards);
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