// Creates a Shuffled 52 Card Deck
function createDeck(){

    console.log("made it");

    var suit = ["C", "D", "H", "S"];
    var face = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    var cardDeck = [];
    var card = {};

    suit.forEach(function(suitIndex){
        face.forEach(function(faceIndex){
            card.suit = suitIndex;
            card.face = faceIndex;

            //Assign card value
            switch (card.face) {
                case "A":
                    card.value = 1;
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

    cardDeck = deckShuffle(cardDeck);
    return cardDeck;
}

// Takes a 52 Card Deck, Shuffles it, and Returns a Shuffled Deck of Cards back as an Array of Objects
function deckShuffle(array) {
    var newArray = [];
    var indexVal = 0;
    var indexCount = 51;
    
    while (indexCount >= 0) {
        indexVal = Math.floor(Math.random() * indexCount);

        newArray.push(array[indexVal]);
        array.splice(indexVal, 1);

        indexCount --;
    }

    return newArray;
}

// Main

// Initialize variables
// Button Elements
var deal = document.querySelector("#deal-button");
var hit = document.querySelector("#hit-button");
var stand = document.querySelector("#stand-button");

// Dealer and Hand Elements
var dealerHand = document.querySelector("#dealer-hand");
var playerHand = document.querySelector("#player-hand");

// Deal Event (Triggered by clicking the deal button)
hit.addEventListener("click", () => {
    playerHand.appendChild(document.createElement("img").src = "images/10C.jpg");

    console.log("made it");
});