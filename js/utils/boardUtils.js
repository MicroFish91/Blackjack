import { globalObj } from '../main.js';

// Takes an Element Object and appends a Random Card to it
export function appendImage(cardID, appendLocation){
    let image = document.createElement("img");
    image.src = "images/" + cardID + ".jpg";
    appendLocation.appendChild(image);
}

// Show Dealer's Hand
export function showDealer() {
    let images = globalObj.dealerHand.querySelectorAll("img"); 
    
    // Remove old images
    images.forEach(index => globalObj.dealerHand.removeChild(index));

    // Add new images
    globalObj.dealerCards.forEach(index => appendImage(index.urlID, globalObj.dealerHand));
}

// Reset the Game Board
export function gameReset(){
    
    // Empty Hands
    globalObj.dealerCards = [];
    globalObj.playerCards = [];
    globalObj.points = 0;

    // Checks to see if cards need replenishing
    globalObj.cardDeck.checkEmpty();

    // Image Parent Elements
    let dHand = document.querySelector("#dealer-hand");
    let pHand = document.querySelector("#player-hand");

    // Img Arrays
    let dealerHand = document.querySelectorAll("#dealer-hand img");
    let playerHand = document.querySelectorAll("#player-hand img");

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