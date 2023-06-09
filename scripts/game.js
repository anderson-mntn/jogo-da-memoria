let game = {
    teams: [],
  
    // ----- Checking Game Moves -----

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){
        let card = this.cards.filter(card => card.id === id)[0];

        console.log(card);

        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }


        
    },
    
    checkCardsMatch: function(){
        
        console.log(moveCounter);
        if(!this.firstCard || !this.secondCard){
            return false;
        } else {
            return this.firstCard.icon == this.secondCard.icon;
        }
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;

    },
    unflipCards:function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },
    
    checkGameOver: function(){
        //Se o length do array retornado for igual a 0 o jogo acabou
        return this.cards.filter(card=>!card.flipped).length == 0;
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
            flipped: false,
        },{
            id: this.createIdWithTeam(team),
            icon: team,
            flipped: false,
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