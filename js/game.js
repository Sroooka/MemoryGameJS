var game = (function () {
    const
        maxNumberOfPieces = 70,
        initialNumberOfPieces = 4,
        initialBadShots = 0;
    var
        currentNumberOfPieces,
        currentBadShots = 0,
        badShots = 0,
        allPieces = [],
        piecesToGuess = [],
        amountOfPiecesToGuess = 0,
        allShots = 0,
        level = 1,
        cheatMode = false,

        startGame = function (config) {
            if (config && config.numberOfPieces && (config.badShots >= 0)) {
                currentNumberOfPieces = config.numberOfPieces;
                currentBadShots = config.badShots;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
                currentBadShots = initialBadShots;
            }
            //clear data when starting new game
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
                piece;

            allPieces = [];
            piecesToGuess = [];

            for (i = 0; i < currentNumberOfPieces; i++) {
                piece = {id: i};
                allPieces.push(piece);
            }
            return allPieces;
        },

        getPiecesToGuess = function () {
            var i,
                originalPiece,
                shuffledPieces = [],
                piece;

            for (i = 0; i < allPieces.length; i++) {
                shuffledPieces.push(allPieces[i]);
            }

            shuffledPieces = shuffle(shuffledPieces);

            piecesToGuess = [];
            countAmountOfPiecesToGuess();

            for (i = 0; i < amountOfPiecesToGuess; i++) {
                originalPiece = shuffledPieces[i];
                piece = {id: originalPiece.id};
                piecesToGuess.push(piece);
            }
            return piecesToGuess;
        },

        gameButtonClicked = function (id) {
            var i,
                found = false,
                color;

            allShots++;

            for (i = 0; i < piecesToGuess.length; i++) {
                if (piecesToGuess[i].id == id) {
                    piecesToGuess.splice(i, 1); //delete found piece from list
                    found = true;
                    color = "green";
                }
            }
            if (!found) {
                badShots++;
                color = "red";
            }
            return checkGameStatus(found, id, color);
        },

        checkGameStatus = function (choosedCorrect, id, color) {
            var shotsLeft = 0,
                status,
                shotsAccuracy,
                gameInfo;
            if (choosedCorrect) {
                if (piecesToGuess.length < 1) {
                    level++;
                    if (currentNumberOfPieces < maxNumberOfPieces) {
                        currentNumberOfPieces++;
                    }
                    status = "win";
                }
            } else {
                if (badShots > currentBadShots) {
                    status = (cheatMode) ? "nothing" : "end";
                } else {

                    status = (cheatMode) ? "nothing" : "continue";
                }
            }
            shotsLeft = currentBadShots - badShots;
            shotsAccuracy = (((allShots - badShots) / allShots) * 100).toFixed(2); //in percent
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

        setCheatMode = function (checkbox) {
            cheatMode = checkbox.checked;
        },

        countAmountOfPiecesToGuess = function () {
            amountOfPiecesToGuess = 1 + parseInt(level / 2);
        };

    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'getPiecesToGuess': getPiecesToGuess,
        'gameButtonClicked': gameButtonClicked,
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