var game = (function () {
    const
        maxNumberOfPieces = 70;
    var
        initialNumberOfPieces = 4,
        initialBadShots = 0,
        currentNumberOfPieces,
        currentBadShots = 0,
        badShots = 0;
        allPieces = [],
        piecesToGuess = []
        amountOfPiecesToGuess = 0,
        allShots = 0,
        level = 1,

        startGame = function (config) {
            if (config && config.numberOfPieces && (config.badShots>=0)) {
                currentNumberOfPieces = config.numberOfPieces;
                currentBadShots = config.badShots;
                console.log("number of pieces: " + currentNumberOfPieces);
                console.log("bad shots: " + currentBadShots);
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
                currentBadShots = initialBadShots;
                console.log("default game.startgame constructor");
            }
            badShots = 0;
            allPieces = [];
            piecesToGuess = [];
            amountOfPiecesToGuess = 0;
            allShots = 0;
            level = 1;
        },

        getPieces = function () {
            var i,
                piece = {id:-1, highlight:false, toGuess:false};
            allPieces = [];
            piecesToGuess = [];
            for(i=0; i < currentNumberOfPieces; i++) {
                piece = {id:i, highlight:false, toGuess:false};
                allPieces.push(piece);
            }
            return allPieces;
        },

        getPiecesToGuess = function () {
            var i,
                originalPiece,
                shuffledPieces = [],
                piece = {id:-1, highlight:true, toGuess:true};
            for(i=0;i<allPieces.length;i++){
                shuffledPieces.push(allPieces[i]);
            }
            shuffledPieces = shuffle(shuffledPieces);
            countAmountOfPiecesToGuess();
            for(i=0; i < amountOfPiecesToGuess; i++) {
                originalPiece = shuffledPieces[i];
                piece = {id:originalPiece.id, highlight:true, toGuess:true};
                piecesToGuess.push(piece);
                console.log(i);
            }
            return piecesToGuess;
        },

        gameButtonClicked = function (id) {
                var i,
                found = false;
                allShots++;
                for(i=0;i<piecesToGuess.length;i++){
                    if(piecesToGuess[i].id == id){
                        goodChoose(id);
                        found = true;
                        piecesToGuess.splice(i, 1);
                    }
                }
                if(!found) {
                    badChoose(id);
                }
                checkGameStatus();
            },

        goodChoose = function (id) {
            console.log("GOOD CHOOSE");
            controller.highlightGreenPiece(id);
        },
        badChoose = function (id) {
            console.log("BAD CHOOSE");
            badShots--;
            if(badShots<0){
                //end game
                console.log("END GAME");
            }else{
                //continue game
                console.log("CONTINUE GAME");
            }
        },
        checkGameStatus = function () {
            if(piecesToGuess.length<1){
                //win
                level++;
                if(currentNumberOfPieces < maxNumberOfPieces){
                    currentNumberOfPieces++;
                }
                controller.gameWonNextLevel(level);
            }
        },
        levelUp = function () {
            level++;
            currentNumberOfPieces++;
        },

        countAmountOfPiecesToGuess = function () {
            var amount = 1 + parseInt(level / 2);
            amountOfPiecesToGuess = amount;
        };

    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'getPiecesToGuess': getPiecesToGuess,
        'levelUp': levelUp,
        'gameButtonClicked': gameButtonClicked
    }
})();

function shuffle(a) {
    var j,
        x,
        i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/*
losowanie liczby z zadanego przedzialu
const min = 1;
const max = 8;
const result =  Math.floor(Math.random() * (max-min+1) + min);
 */