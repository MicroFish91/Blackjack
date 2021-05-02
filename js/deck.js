export default class Deck {

    constructor(){
        this.deck = [];
        this.createDeck();
    }

    // Creates a Shuffled 52 Card Deck
    createDeck(){
        let suit = ["C", "D", "H", "S"];
        let face = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let cardDeck = [];
        let card = {};

        suit.forEach((suitIndex) => {
            face.forEach((faceIndex) => {
                card.suit = suitIndex;
                card.face = faceIndex;

                //Assign card value
                switch (card.face) {
                    case "A":
                        card.value = 11;
                        break;
                    case "J":
                        card.value = 10;
                        break;
                    case "Q":
                        card.value = 10;
                        break;
                    case "K":
                        card.value = 10;
                        break;
                    default:
                        card.value = parseInt(card.face);
                        break;
                    }
                card.urlID = card.face + card.suit;
                cardDeck.push(card);
                card = {};
            });
        });

        this.deck = this.deckShuffle(cardDeck);
    }

    // Takes a 52 Card Deck, Shuffles it, and Returns a Shuffled Deck of Cards back as an Array of Objects
    deckShuffle(cardDeck) {
        let newArray = [];
        let indexVal = 0;

        for (let indexCount = 51; indexCount >= 0; indexCount--){
            indexVal = Math.floor(Math.random() * indexCount);

            newArray.push(cardDeck[indexVal]);
            cardDeck.splice(indexVal, 1);
        }

        return newArray;
    }

    // Pulls a Random Card out of the Deck and Returns the Card Object
    pullCard() {
        return this.deck.pop();
    }

    checkEmpty() {
        if (this.deck.length < 4) {
            alert("Reshuffling Deck!");
            this.createDeck();
        }
    }
}