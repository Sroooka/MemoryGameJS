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
        cheatMode = false,

        startGame = function (config) {
            if (config && config.numberOfPieces && (config.badShots>=0)) {
                currentNumberOfPieces = config.numberOfPieces;
                currentBadShots = config.badShots;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
                currentBadShots = initialBadShots;
            }
            badShots = 0;
            allPieces = [];
            piecesToGuess = [];
            amountOfPiecesToGuess = 0;
            allShots = 0;
            level = 1;
            cheatMode = false;
        },

        getPieces = function () {
            var i,
                piece = {id:-1};
            allPieces = [];
            piecesToGuess = [];
            for(i=0; i < currentNumberOfPieces; i++) {
                piece = {id:i};
                allPieces.push(piece);
            }
            return allPieces;
        },

        getPiecesToGuess = function () {
            var i,
                originalPiece,
                shuffledPieces = [],
                piece = {id:-1};
            for(i=0;i<allPieces.length;i++){
                shuffledPieces.push(allPieces[i]);
            }
            shuffledPieces = shuffle(shuffledPieces);
            piecesToGuess = [];
            countAmountOfPiecesToGuess();
            for(i=0; i < amountOfPiecesToGuess; i++) {
                originalPiece = shuffledPieces[i];
                piece = {id:originalPiece.id};
                piecesToGuess.push(piece);
                console.log(i);
            }
            return piecesToGuess;
        },

        gameButtonClicked = function (id) {
                var i,
                    found = false,
                color;
                allShots++;
                for(i=0;i<piecesToGuess.length;i++){
                    if(piecesToGuess[i].id == id){
                        found = true;
                        piecesToGuess.splice(i, 1);
                        color="green";
                    }
                }
                if(!found) {
                    badShots++;
                    color="red";
                }
                return checkGameStatus(found, id, color);
            },

        checkGameStatus = function (choosedCorrect, id, color) {
            var shotsLeft = 0,
                status = "nothing",
            shotsAccuracy = 0,
            gameInfo;
            if(choosedCorrect){
                if(piecesToGuess.length<1) {
                    level++;
                    if (currentNumberOfPieces < maxNumberOfPieces) {
                        currentNumberOfPieces++;
                    }
                    shotsAccuracy = (((allShots - badShots)/allShots) * 100).toFixed(2);; //in percent
                    status = "win";
                }
            } else {
                if(badShots > currentBadShots) {
                    if(!cheatMode){
                        status = "end"
                    }
                } else {
                    shotsLeft = currentBadShots - badShots;
                    shotsAccuracy = (((allShots - badShots)/allShots) * 100).toFixed(2); //in percent
                    status = "continue";
                }
            }
            gameInfo = {
                highlight: color,
                gameStatus: status, // win, end, continue, nothing
                level: level,
                buttonId: id,
                amountToGuess: piecesToGuess.length,
                shotAccuracy: shotsAccuracy,
                shotsLeft: shotsLeft
            };
            return gameInfo;
        },

        levelUp = function () {
            level++;
            currentNumberOfPieces++;
        },

        setCheatMode = function (checkbox) {
            if(checkbox.checked){
                cheatMode = true;
            }else{
                cheatMode = false;
            }
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
        'gameButtonClicked': gameButtonClicked,
        'checkGameStatus': checkGameStatus,
        'setCheatMode': setCheatMode
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