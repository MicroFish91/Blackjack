// Imports
import Deck from './deck.js';
import { appendImage, gameReset } from './utils/boardUtils.js';
import { bust, calculatePoints, checkWinner, chipTotal, getBet } from './utils/pointUtils.js';

// Export Global Obj
export let globalObj = {};

// Button Elements
let deal = document.querySelector("#deal-button");
let hit = document.querySelector("#hit-button");
let stand = document.querySelector("#stand-button");

// Dealer and Hand Elements
globalObj.dealerHand = document.querySelector("#dealer-hand");
globalObj.playerHand = document.querySelector("#player-hand");
 
// Card Deck
globalObj.cardDeck = new Deck();

// Dealer and Player Hand, Holds List of Current Cards
globalObj.dealerCards = [];
globalObj.playerCards = [];

globalObj.points = 0;
globalObj.chips = 50;
globalObj.bet = 0;

// Deal Event (Triggered by clicking the deal button)
deal.addEventListener("click", () => {
    gameReset();
    getBet();

    // Deal for dealer
    globalObj.dealerCards.push(globalObj.cardDeck.pullCard());
    globalObj.dealerCards.push(globalObj.cardDeck.pullCard());
    appendImage("blue_back", globalObj.dealerHand);
    appendImage(globalObj.dealerCards[globalObj.dealerCards.length - 1].urlID, globalObj.dealerHand);

    // Deal for Player
    globalObj.playerCards.push(globalObj.cardDeck.pullCard());
    globalObj.playerCards.push(globalObj.cardDeck.pullCard());
    appendImage(globalObj.playerCards[globalObj.playerCards.length - 2].urlID, globalObj.playerHand);
    appendImage(globalObj.playerCards[globalObj.playerCards.length - 1].urlID, globalObj.playerHand);

    // Calculate Points
    globalObj.points = calculatePoints(globalObj.playerCards);
    document.querySelector("#player-points")
    .textContent = "Points: " + globalObj.points;
    bust(globalObj.points, "You");

    // Blackjack! 21 on deal
    if (globalObj.points === 21) {
        globalObj.bet *= 1.5;
        chipTotal(true);

        setTimeout(() => {
            alert("Blackjack!!!");
            gameReset();}, 200);
    }
});


// Hit Event (Triggered by clicking the hit button)
hit.addEventListener("click", () => {
    // Checks if cards need replenishing
    globalObj.cardDeck.checkEmpty();

    if (globalObj.playerHand.querySelectorAll("img").length !== 0) {
        // Add Card
        globalObj.playerCards.push(globalObj.cardDeck.pullCard());
        appendImage(globalObj.playerCards[globalObj.playerCards.length - 1].urlID, globalObj.playerHand);

        // Calculate Points
        globalObj.points = calculatePoints(globalObj.playerCards);
        document.querySelector("#player-points").textContent = "Points: " + globalObj.points;

        // Checks for a Bust
        setTimeout(() => {
            bust(globalObj.points, "You");
        }, 200);
    }
});

// Stand Event (Triggered by clicking the stand button)
stand.addEventListener("click", () => {
    // Checks if cards need replenishing
    globalObj.cardDeck.checkEmpty();

    while (calculatePoints(globalObj.dealerCards) < 17) {
        // Add Card
        globalObj.dealerCards.push(globalObj.cardDeck.pullCard());
        appendImage(globalObj.dealerCards[globalObj.dealerCards.length - 1].urlID, globalObj.dealerHand);

        // Calculate Points
        globalObj.points = calculatePoints(globalObj.dealerCards);
        document.querySelector("#dealer-points").textContent = "Points: " + globalObj.points;
    }

    // Checks for Winner
    setTimeout(() => {
        checkWinner();
    }, 200);
});