// These are the steps we are gonna perform for this project
// 1.Deposit some money
// 2.Determine the number of lines to bet on
// 3.Collect a bet amount
// 4.spin the slot machine
// 5.Check the result and if user has won
// 6.give the user the winnings and update the balance
// 7.play again option

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 3,
    C : 4,
    D : 5 
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("Invalid deposit, try again")
        }
        else{
            return numberDepositAmount;
        }
    }
};


const getNoOfLines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        const NoOfLines = parseFloat(lines);

        if(isNaN(NoOfLines) || NoOfLines<1 || NoOfLines >3){
            console.log("Invalid Numbers, try input correct numbers");
        }
        else{
            return NoOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while(true){
        const stringBet = prompt("Enter the bet amount on each line: ");
        const bet = parseFloat(stringBet);

        if(isNaN(bet) || bet<0 ||  bet > balance/lines){
            console.log("Invalid Bet, try after adding some deposit");
        }
        else{
            return bet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
        const reels = [];
        for(let i=0;i<COLS;i++){
            reels.push([]);
            const reelSymbols = [...symbols];
            for(let j=0;j<ROWS;j++){
                //random Index taken through random function
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                //deleting the randomIndex
                reelSymbols.splice(randomIndex, 1);
            }
        }
        return reels;
};

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i< ROWS;i++){
        rows.push([]);
        for(let j=0;j< COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

const printRows = (rows) => {
    console.log(" ");
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length -1){
                rowString += " | " 
            }
        }
        console.log(rowString);
    }
    console.log(" ");
};

const getWinnings = (transposedrows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = transposedrows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings = bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
};



const game =() =>{
    let balance = deposit();

    while(true){
        console.log("Your Balance : $ " + balance);
        const numberoflines = getNoOfLines();
        console.log("No of Lines Betted on: ", numberoflines);
        let betamount = getBet
        (balance, numberoflines);
        console.log("Bet amount: ", betamount);

        balance = balance - (betamount * numberoflines);

        const reels = spin();
        console.log("reels : ",reels);

        const transposedrows = transpose(reels); 
        console.log("Transposed Rows: ", transposedrows);

        printRows(transposedrows);

        const winnings = getWinnings(transposedrows, betamount, numberoflines);
        console.log("You won, $ "+ winnings.toString());

        balance += winnings;

        if(balance <= 0){
            console.log("You don't have sufficient money!");
            break;
        }

        const playOnceMore = prompt("Do you want to play again (yes/no)? ");

        if(playOnceMore != "yes") break; 
    }
}

game();
