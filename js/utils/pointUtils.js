import { gameReset, showDealer } from "./boardUtils.js";

// Checks if Dealer or Player has Busted
export function bust(points, user){
    if (points > 21){
        alert(user + " bust(s)!!");
        
        if (user == "You"){
            chipTotal(false);
        } else {
            chipTotal(true);
        }

        // Reset Game
        gameReset();
    }
}

// Prompts chip bet
export function getBet(){
    let promptCheck = false;
    let playerChips = document.querySelector("#player-chips");

    while (!promptCheck){
        window.bet = parseInt(prompt("How many whole chips would you like to bet?"));
        if (window.bet > window.chips){
            alert("You do not have " + window.bet + " chips. Please try again.");
        } else if (window.bet <= window.chips){
            promptCheck = true;
            window.chips -= window.bet;
            playerChips.textContent = "Chips: " + window.chips;
        } else {
            alert("Invalid entry, please try enter an integer value.");
        }
    }
}

// Pass a Player or Dealer Hand Array, Returns Current Points
export function calculatePoints(array){
    let sum = 0;
    let pointsArray = array.map(index => parseInt(index.value));

    pointsArray.forEach(index => sum += index);

    // Converts Ace values to "1" as necessary
    while ((sum > 21) && (pointsArray.indexOf(11) != -1)){
        let aceIndex = pointsArray.indexOf(11);
        sum = 0;
        pointsArray[aceIndex] = 1;
        pointsArray.forEach(index => sum += index);
    }
    return sum;
}

// Checks Who Won
export function checkWinner(){
    let playerPoints = calculatePoints(window.playerCards);
    let dealerPoints = calculatePoints(window.dealerCards);

    showDealer();

    setTimeout(() => {
        // Checks to see who wins
        if (playerPoints >= dealerPoints) {
            alert("Player Wins!");
            chipTotal(true);
        } else if ((dealerPoints > playerPoints) && (dealerPoints <= 21)){
            alert("Dealer Wins!");
            chipTotal(false);
        } else {
            alert("Dealer Busts!");
            chipTotal(true);
        }
        gameReset();
    }, 500);
}


// Updates Chips based on win or loss
export function chipTotal(winner){
    let playerChips = document.querySelector("#player-chips");
    if (winner) {
        window.chips += 2 * window.bet;
    } 
    playerChips.textContent = "Chips: " + window.chips;
}