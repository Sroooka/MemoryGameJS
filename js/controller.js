var controller = function () {
    var pieces = [],
        piecesToGuess = [],
        displayTime,
        gameStarted = false,
        initialNumberOfPieces,
        initialBadShots,
        canShotPieces = true,

        startGame = function () {
            if (canShotPieces) {
                initialNumberOfPieces = view.getInitialNumberOfPieces();
                initialBadShots = view.getInitialBadShots();
                displayTime = view.getDisplayTime();
                gameStarted = true;

                view.flow("");              //clear informations for player
                view.setShotsLeft(initialBadShots);
                view.setLevel(1);
                view.setShotsAccuracy(parseFloat(100).toFixed(2));

                game.startGame({
                    numberOfPieces: initialNumberOfPieces,
                    badShots: initialBadShots
                });
                game.setCheatMode(view.getCheatMode());
                showBoard();

            } else {
                alert("Wait until game end!");
            }
        },

        setAmountToGuess = function (amount) {
            view.setAmountToGuess(amount);
        },

        highlightPieces = function () {
            if (!gameStarted) {
                alert("You must be in game to Highlight pieces!");
            }
            else if (!canShotPieces) {
                alert("Wait until game highlight previous pieces!");
            } else {
                showBoard();

            }
        },

        setGameStarted = function (value){
            gameStarted = value;
        },

        setCanShotPieces = function (value){
            canShotPieces = value;
        },

        highlightGreenPiece = function (id) {
            view.highlightGreenPiece(id);
        },

        highlightRedPiece = function (id) {
            view.highlightRedPiece(id);
        },

        setCheatMode = function (checkbox) {
            game.setCheatMode(checkbox);
        },

        gameWonNextLevel = function (level) {
            view.flow("YOU WON!\nLevel up!");

            setTimeout(function () {
                view.gameWonNextLevel(pieces, level);
            }, 1000);

            setTimeout(function () {
                showBoard();
            }, 2000);
        },

        continueGame = function (level, shotsLeft) {
            canShotPieces = false;
            view.setShotsLeft(shotsLeft);
            view.flow("Bad shot!\nContinuing!");

            setTimeout(function () {
                view.gameContinueAfterBadShot(pieces, level);
            }, 1000);

            setTimeout(function () {
                showBoard();
            }, 3000);
        },
        endGame = function (level) {
            canShotPieces = false;
            gameStarted = false;

            view.setShotsLeft(0);
            view.flow("You lost!\nYour level: " + level);

            setTimeout(function () {
                view.endGame(pieces, level, "#ff1900");
            }, 1000);
            setTimeout(function () {
                view.endGame(pieces, level, "#b4b4b4");
            }, 2200);
            setTimeout(function () {
                view.endGame(pieces, level, "#a0a0a0");
            }, 2400);
            setTimeout(function () {
                view.endGame(pieces, level, "#8c8c8c");
            }, 2600);
            setTimeout(function () {
                view.endGame(pieces, level, "#787878");
            }, 2800);
            setTimeout(function () {
                view.endGame(pieces, level, "#646464");
            }, 3000);
            setTimeout(function () {
                view.endGame(pieces, level, "#505050");
            }, 3200);
            setTimeout(function () {
                view.endGame(pieces, level, "#3c3c3c");
            }, 3400);
            setTimeout(function () {
                view.endGame(pieces, level, "#282828");
            }, 3600);
            setTimeout(function () {
                view.endGame(pieces, level, "#000000");
            }, 3800);

            setTimeout(function () {
                view.showPieces([]);
            }, 4000);

            setTimeout(function () {
                view.flow("Press [Start]\nto create new game!");
                canShotPieces = true;
            }, 4000);
        },

        pieceClicked = function (id) {
            if (!canShotPieces) {
                alert("You can't choose pieces when highlighting!");
            }
            else {
                var extractedId,
                    gameInfo;
                extractedId = parseInt(id.substring(3));            //remove 'btn' from ID
                gameInfo = game.gameButtonClicked(extractedId);

                view.setShotsAccuracy(gameInfo.shotAccuracy);

                if (gameInfo.highlight === "red") {
                    highlightRedPiece(extractedId);
                }
                if (gameInfo.highlight === "green") {
                    highlightGreenPiece(extractedId);
                }

                if (gameInfo.gameStatus === "win") {
                    gameWonNextLevel(gameInfo.level);
                    setAmountToGuess(gameInfo.amountToGuess);
                } else if (gameInfo.gameStatus === "end") {
                    endGame(gameInfo.level);
                } else if (gameInfo.gameStatus === "continue") {
                    continueGame(gameInfo.level, gameInfo.shotsLeft);
                } else {
                    if (gameInfo.amountToGuess) {
                        setAmountToGuess(gameInfo.amountToGuess);
                    }
                }
            }
        },

        showBoard = function () {
            pieces = game.getPieces();
            piecesToGuess = game.getPiecesToGuess();

            setAmountToGuess(piecesToGuess.length);
            canShotPieces = false;
            view.flow("");

            view.showPieces(pieces);

            setTimeout(function () {
                view.highlightPieces(piecesToGuess);
            }, 1000);

            setTimeout(function () {
                view.showPieces(pieces);
            }, displayTime + 1000);

            setTimeout(function () {
                canShotPieces = true;
            }, displayTime + 1000);

            setTimeout(function () {
                view.flow("Go!")
            }, displayTime + 1000);
        };

    return {
        'startGame': startGame,
        'pieceClicked': pieceClicked,
        'setCheatMode': setCheatMode,
        'highlightPieces': highlightPieces,
        'setGameStarted': setGameStarted,
        'setCanShotPieces': setCanShotPieces
    }
}();