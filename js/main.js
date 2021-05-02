// Imports
import Deck from './deck.js';
import { appendImage, gameReset, showDealer } from './utils/boardUtils.js';
import { bust, calculatePoints, checkWinner, chipTotal, getBet } from './utils/pointUtils.js';

// Button Elements
let deal = document.querySelector("#deal-button");
let hit = document.querySelector("#hit-button");
let stand = document.querySelector("#stand-button");

// Dealer and Hand Elements
window.dealerHand = document.querySelector("#dealer-hand");
window.playerHand = document.querySelector("#player-hand");
 
// Card Deck
window.cardDeck = new Deck();

// Dealer and Player Hand, Holds List of Current Cards
window.dealerCards = [];
window.playerCards = [];

window.points = 0;
window.chips = 50;
window.bet = 0;

// Deal Event (Triggered by clicking the deal button)
deal.addEventListener("click", () => {
    gameReset();
    getBet();

    // Deal for dealer
    window.dealerCards.push(window.cardDeck.pullCard());
    window.dealerCards.push(window.cardDeck.pullCard());
    appendImage("blue_back", window.dealerHand);
    appendImage(window.dealerCards[dealerCards.length - 1].urlID, window.dealerHand);

    // Deal for Player
    window.playerCards.push(window.cardDeck.pullCard());
    window.playerCards.push(window.cardDeck.pullCard());
    appendImage(window.playerCards[playerCards.length - 2].urlID, window.playerHand);
    appendImage(window.playerCards[playerCards.length - 1].urlID, window.playerHand);

    // Calculate Points
    window.points = calculatePoints(window.playerCards);
    document.querySelector("#player-points")
    .textContent = "Points: " + points;
    bust(window.points, "You");

    // Blackjack! 21 on deal
    if (window.points === 21) {
        window.bet *= 1.5;
        chipTotal(true);

        setTimeout(() => {
            alert("Blackjack!!!");
            gameReset();}, 200);
    }
});


// Hit Event (Triggered by clicking the hit button)
hit.addEventListener("click", () => {
    // Checks if cards need replenishing
    window.cardDeck.checkEmpty();

    if (window.playerHand.querySelectorAll("img").length !== 0) {
        // Add Card
        window.playerCards.push(window.cardDeck.pullCard());
        appendImage(window.playerCards[playerCards.length - 1].urlID, window.playerHand);

        // Calculate Points
        window.points = calculatePoints(window.playerCards);
        document.querySelector("#player-points").textContent = "Points: " + window.points;

        // Checks for a Bust
        setTimeout(() => {
            bust(window.points, "You");
        }, 200);
    }
});

// Stand Event (Triggered by clicking the stand button)
stand.addEventListener("click", () => {
    // Checks if cards need replenishing
    window.cardDeck.checkEmpty();

    while (calculatePoints(window.dealerCards) < 17) {
        // Add Card
        window.dealerCards.push(window.cardDeck.pullCard());
        appendImage(window.dealerCards[dealerCards.length - 1].urlID, window.dealerHand);

        // Calculate Points
        window.points = calculatePoints(window.dealerCards);
        document.querySelector("#dealer-points").textContent = "Points: " + window.points;
    }

    // Checks for Winner
    setTimeout(() => {
        checkWinner();
    }, 200);
});