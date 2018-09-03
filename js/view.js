var
    sliderNumberOfElements = 4,
    sliderTimeOfDisplay = 5.0,
    sliderBadShots = 0,

    view = (function () {
        var
            getInitialNumberOfPieces = function () {
                return sliderNumberOfElements;
            },

            getInitialBadShots = function () {
                return sliderBadShots;
            },

            getDisplayTime = function () {
                return parseInt(sliderTimeOfDisplay * 1000);
            },

            getCheatMode = function () {
                return document.getElementById('myonoffswitch');
            },

            showPieces = function (receivedPieces) {
                var i,
                    buttonId,
                    pieceButton,
                    elementContainer = document.getElementById("gamebuttons");

                while (elementContainer.hasChildNodes()) {
                    elementContainer.removeChild(elementContainer.lastChild);
                }

                for (i = 0; i < receivedPieces.length; i++) {
                    pieceButton = document.createElement("button");
                    pieceButton.className = "game-button";
                    buttonId = "btn" + receivedPieces[i].id;
                    pieceButton.id = buttonId;
                    pieceButton.setAttribute("onclick", "controller.pieceClicked(this.id)");
                    elementContainer.appendChild(pieceButton);
                }
            },

            setAmountToGuess = function (amount) {
                document.getElementById('piecesleft').innerHTML = amount;
            },

            highlightPieces = function (receivedPieces) {
                var i,
                    buttonIdToFind,
                    receivedPiece;

                for (i = 0; i < receivedPieces.length; i++) {
                    receivedPiece = receivedPieces[i];
                    buttonIdToFind = "btn" + receivedPiece.id;
                    document.getElementById(buttonIdToFind).style.background = '#1B20FF';
                }
            },

            highlightGreenPiece = function (id) {
                var buttonIdToFind;

                buttonIdToFind = "btn" + id;
                document.getElementById(buttonIdToFind).style.background = '#77ff4d';

            },

            highlightRedPiece = function (id) {
                var buttonIdToFind;

                buttonIdToFind = "btn" + id;
                document.getElementById(buttonIdToFind).style.background = '#ff412c';

            },

            gameWonNextLevel = function (receivedPieces, level) {
                var i,
                    foundButton,
                    buttonIdToFind;
                document.getElementById('playerlevel').innerHTML = level;
                for (i = 0; i < receivedPieces.length; i++) {
                    foundButton = receivedPieces[i];
                    buttonIdToFind = "btn" + foundButton.id;
                    document.getElementById(buttonIdToFind).style.background = '#ecff00';
                    document.getElementById(buttonIdToFind).className = "game-button";
                }

            },

            gameContinueAfterBadShot = function (receivedPieces, level) {
                var i,
                    foundButton,
                    buttonIdToFind;
                document.getElementById('playerlevel').innerHTML = level;
                for (i = 0; i < receivedPieces.length; i++) {
                    foundButton = receivedPieces[i];
                    buttonIdToFind = "btn" + foundButton.id;
                    document.getElementById(buttonIdToFind).style.background = '#ce3b25';
                    document.getElementById(buttonIdToFind).className = "game-button";
                }
            },

            endGame = function (receivedPieces, level, color) {
                var i,
                    foundButton,
                    buttonIdToFind;
                document.getElementById('playerlevel').innerHTML = level;
                for (i = 0; i < receivedPieces.length; i++) {
                    foundButton = receivedPieces[i];
                    buttonIdToFind = "btn" + foundButton.id;
                    document.getElementById(buttonIdToFind).style.background = color;
                    document.getElementById(buttonIdToFind).className = "game-button";
                }
            },

            setLevel = function (level) {
                document.getElementById('playerlevel').innerHTML = level;
            },

            setShotsLeft = function (shotsLeft) {
                document.getElementById("shotsleft").innerText = shotsLeft;

                if (shotsLeft < 2) {
                    document.getElementById("shotsleft").style.color = "#ff8194";
                } else if (shotsLeft < 4) {
                    document.getElementById("shotsleft").style.color = "#ffa96a";
                } else if (shotsLeft < 6) {
                    document.getElementById("shotsleft").style.color = "#ffe673";
                } else if (shotsLeft < 8) {
                    document.getElementById("shotsleft").style.color = "#d4ff6d";
                } else {
                    document.getElementById("shotsleft").style.color = "#6dff98";
                }
            },

            setShotsAccuracy = function (shotsAccuracy) {
                document.getElementById("shotaccuracy").innerText = shotsAccuracy;
            },

            flow = function (message) {
                document.getElementById("userinfoflow").innerText = message;
            };

        return {
            'getInitialNumberOfPieces': getInitialNumberOfPieces,
            'showPieces': showPieces,
            'highlightPieces': highlightPieces,
            'getDisplayTime': getDisplayTime,
            'getInitialBadShots': getInitialBadShots,
            'highlightGreenPiece': highlightGreenPiece,
            'gameWonNextLevel': gameWonNextLevel,
            'flow': flow,
            'highlightRedPiece': highlightRedPiece,
            'setShotsLeft': setShotsLeft,
            'gameContinueAfterBadShot': gameContinueAfterBadShot,
            'endGame': endGame,
            'setShotsAccuracy': setShotsAccuracy,
            'setLevel': setLevel,
            'setAmountToGuess': setAmountToGuess,
            'getCheatMode': getCheatMode
        }
    })();

function updateSliderPiece() {
    sliderNumberOfElements = parseInt(document.getElementById("slidernumberofpieces").value, 10);
    document.getElementById('slidernumberofpiecesoutput').innerHTML = sliderNumberOfElements;
}

function updateSliderTime() {
    sliderTimeOfDisplay = parseFloat(document.getElementById("slidertime").value);
    document.getElementById('slidertimeoutput').innerHTML = sliderTimeOfDisplay
}

function updateSliderBadShots() {
    sliderBadShots = parseInt(document.getElementById("sliderbadshot").value);
    document.getElementById('sliderbadshotoutput').innerHTML = sliderBadShots
}