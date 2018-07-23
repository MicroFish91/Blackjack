// Creates a Shuffled 52 Card Deck
function createDeck(){

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

// Pulls a Random Card out of the Deck and Returns the Card Object
function randomCard(cardDeck) {

    var indexVal = Math.floor(Math.random() * (cardDeck.length - 1));

    var newCard = cardDeck[indexVal];

    cardDeck.splice(indexVal, 1);

    return newCard;
}

// Takes an Element Object and appends a Random Card to it
function appendImage(cardID, appendLocation){
    var image = document.createElement("img");
    image.src = "images/" + cardID + ".jpg";
    appendLocation.appendChild(image);
}

// Pass a Player or Dealer Hand Array, Returns Current Points
function calculatePoints(array){
    
    var sum = 0;
    var pointsArray = array.map(function(index){
        return parseInt(index.value);
    });

    pointsArray.forEach(function(index){
        sum += index;
    });

    // Converts Ace values to "1" as necessary
    while ((sum > 21) && (pointsArray.indexOf(11) != -1)){
        var aceIndex = pointsArray.indexOf(11);
        sum = 0;
        pointsArray[aceIndex] = 1;

        pointsArray.forEach(function(index){
            sum += index;
        });
    }

    return sum;
}

// Checks if Dealer or Player has Busted
function bust(points, user){
    if (points > 21){
        alert(user + " bust(s)!!");
        
        // Reset Game
        gameReset();
    }
}

// Reset the Game Board
function gameReset(){
    
    // Empty Hands
    dealerCards = [];
    playerCards = [];

    if (cardDeck.length < 4) {
        alert("Reshuffling Deck!");
        cardDeck = createDeck();
    }

    // Image Parent Elements
    var dHand = document.querySelector("#dealer-hand");
    var pHand = document.querySelector("#player-hand");

    // Img Arrays
    var dealerHand = document.querySelectorAll("#dealer-hand img");

    var playerHand = document.querySelectorAll("#player-hand img");

    dealerHand.forEach(function(index){
        dHand.removeChild(index);
    });

    playerHand.forEach(function(index){
        pHand.removeChild(index);
    });

    // Points Reset
    document.querySelector("#player-points").textContent = "Points: ";
    document.querySelector("#dealer-points").textContent = "Points: ";
}

// Checks Who Won
function checkWinner(){
    var playerPoints = calculatePoints(playerCards);
    var dealerPoints = calculatePoints(dealerCards);

    // Checks to see who wins
    if (playerPoints >= dealerPoints) {
        alert("Player Wins!");
    } else if ((dealerPoints > playerPoints) && (dealerPoints <= 21)){
        alert("Dealer Wins!");
    } else {
        alert("Dealer Busts!");
    }

    // gameReset();

}

// Show Dealer's Hand
function showDealer() {
    var images = dealerHand.querySelectorAll("img");
    
    // Remove old images
    images.forEach(function(index){
        dealerHand.removeChild(index);
    });

    // Add new images
    dealerCards.forEach(function(index){
        appendImage(index.urlID, dealerHand);
    });

}

// function bet(){
//     var bet = "";
    
//     var promptCheck = false;

//     while (!promptCheck){

//         bet = parseInt(prompt("How many whole chips would you like to bet?"));

//         if (bet > chips){
//             alert("You do not have " + bet + " chips. Please try again.");
//         } else if (bet <= chips){
//             promptCheck = true;
//         } else {
//             alert("Invalid entry, please try enter an integer value.");
//         }
//     }
// }

// function chipTotal(winner){
    
//     var playerChips = querySelector("#player-chips");

//     if winner {
//         chips += bet;
//     } else {
//         chips -= bet;
//     }

//     playerChips.textContent = "Chips: " + chips;

// }


// Main
// Initialize variables
// Button Elements
var deal = document.querySelector("#deal-button");
var hit = document.querySelector("#hit-button");
var stand = document.querySelector("#stand-button");

// Dealer and Hand Elements
var dealerHand = document.querySelector("#dealer-hand");
var playerHand = document.querySelector("#player-hand");

// Card Deck
var cardDeck = createDeck();

// Dealer and Player Hand, Holds List of Current Cards
var dealerCards = [];
var playerCards = [];

var points = 0;
// var chips = 50;

// Deal Event (Triggered by clicking the deal button)
deal.addEventListener("click", () => {

    gameReset();

    // Deal for dealer
    dealerCards.push(randomCard(cardDeck));
    dealerCards.push(randomCard(cardDeck));
    appendImage("blue_back", dealerHand);
    appendImage(dealerCards[dealerCards.length - 1].urlID, dealerHand);

    // Deal for Player
    playerCards.push(randomCard(cardDeck));
    playerCards.push(randomCard(cardDeck));
    appendImage(playerCards[playerCards.length - 2].urlID, playerHand);
    appendImage(playerCards[playerCards.length - 1].urlID, playerHand);

    // Calculate Points
    points = calculatePoints(playerCards);
    document.querySelector("#player-points").textContent = "Points: " + points;
    bust(points, "You");
});


// Hit Event (Triggered by clicking the hit button)
hit.addEventListener("click", () => {
    
    if (playerHand.querySelectorAll("img").length != 0) {
        // Add Card
        playerCards.push(randomCard(cardDeck));
        appendImage(playerCards[playerCards.length - 1].urlID, playerHand);

        // Calculate Points
        points = calculatePoints(playerCards);
        document.querySelector("#player-points").textContent = "Points: " + points;

        // Checks for a Bust
        setTimeout(() => {
            bust(points, "You", "Dealer");
        }, 50);
    }

});

// Stand Event (Triggered by clicking the stand button)
stand.addEventListener("click", () => {

    while (calculatePoints(dealerCards) < 17) {
        // Add Card
        dealerCards.push(randomCard(cardDeck));
        appendImage(dealerCards[dealerCards.length - 1].urlID, dealerHand);

        // Calculate Points
        points = calculatePoints(dealerCards);
        document.querySelector("#dealer-points").textContent = "Points: " + points;
    }

    // Checks for a Bust
    setTimeout(() => {
        
        showDealer()
        .then(() => checkWinner())
        .then(() => gameReset());
    }, 100);

});


