var
    sliderNumberOfElements = 4,
    sliderTimeOfDisplay = 5.0,
    sliderBadShots = 0;

function updateSliderPiece() {
    sliderNumberOfElements = parseInt(document.getElementById("slidernumberofpieces").value ,10);

    document.getElementById('slidernumberofpiecesoutput').innerHTML = sliderNumberOfElements
    console.log(sliderNumberOfElements)
}
function updateSliderTime() {
    sliderTimeOfDisplay = parseFloat(document.getElementById("slidertime").value);

    document.getElementById('slidertimeoutput').innerHTML = sliderTimeOfDisplay
    console.log(sliderTimeOfDisplay)
}

function updateSliderBadShots() {
    sliderBadShots = parseInt(document.getElementById("sliderbadshot").value);

    document.getElementById('sliderbadshotoutput').innerHTML = sliderBadShots
    console.log(sliderBadShots)
}

var view = (function () {
    var
    getInitialNumberOfPieces = function () {
        return sliderNumberOfElements;
    },
        getInitialBadShots = function () {
        return sliderBadShots;
    },

    getDisplayTime = function () {
        return parseInt(sliderTimeOfDisplay * 1000);
        console.log("Showing time: " + sliderTimeOfDisplay);
    },
    showPieces = function (receivedPieces) {
        console.log("Pieces to show: " + receivedPieces.length);
        var i,
            buttonId,
            pieceButton,
            elementContainer = document.getElementById("gamebuttons");
        while (elementContainer.hasChildNodes()) {
            elementContainer.removeChild(elementContainer.lastChild);
        }
        for(i=0; i<receivedPieces.length; i++){
            pieceButton = document.createElement("button");
            pieceButton.className = "game-button";
            buttonId = "btn" + receivedPieces[i].id;
            pieceButton.id = buttonId;
            pieceButton.setAttribute("onclick", "controller.pieceClicked(this.id)");
            elementContainer.appendChild(pieceButton);
        }
    },



    highlightPieces = function (receivedPieces) {
        console.log("Pieces to show: " + receivedPieces.length);
        var i,
            buttonIdToFind,
            receivedPiece,
            pieceButton;
        for(i=0; i<receivedPieces.length; i++){
            receivedPiece = receivedPieces[i];
            buttonIdToFind = "btn" + receivedPiece.id;
            pieceButton = document.getElementById(buttonIdToFind).style.background='#1B20FF';
        }
    },

    highlightGreenPiece = function (id) {
        console.log("received id to light up green: " + id);
        var buttonIdToFind;

        buttonIdToFind = "btn" + id;
        document.getElementById(buttonIdToFind).style.background='#77ff4d';

    },

    highlightRedPiece = function (id) {
        console.log("received id to light up red: " + id);
        var buttonIdToFind;
        buttonIdToFind = "btn" + id;
        document.getElementById(buttonIdToFind).style.background='#ff412c';

    },

    gameWonNextLevel = function (receivedPieces, level) {
        console.log("Next level: " + level);
        var i,
            foundButton,
            buttonIdToFind;
        document.getElementById('playerlevel').innerHTML = level;
        for(i=0; i<receivedPieces.length; i++){
            foundButton = receivedPieces[i];
            buttonIdToFind = "btn" + foundButton.id;
            document.getElementById(buttonIdToFind).style.background='#ecff00';
            //document.getElementById(buttonIdToFind).innerText = "WIN";
            document.getElementById(buttonIdToFind).className = "game-button";
        }

    },
    gameContinue = function (receivedPieces, level) {
        console.log("Next level: " + level);
        var i,
            foundButton,
            buttonIdToFind;
        document.getElementById('playerlevel').innerHTML = level;
        for(i=0; i<receivedPieces.length; i++){
            foundButton = receivedPieces[i];
            buttonIdToFind = "btn" + foundButton.id;
            document.getElementById(buttonIdToFind).style.background='#ce3b25';
            //document.getElementById(buttonIdToFind).innerText = "WIN";
            document.getElementById(buttonIdToFind).className = "game-button";
        }

    },
    setShotsLeft = function (shotsLeft) {
            document.getElementById("shotsleft").innerText = shotsLeft;

    },
    flow = function (message) {
        document.getElementById("userinfoflow").innerText = message;

    };

    testFunction = function() {
        var btn = document.createElement("BUTTON");
        return sliderNumberOfElements;
    };

    return {
        'getInitialNumberOfPieces': getInitialNumberOfPieces,
        'showPieces': showPieces,
        'testFunction': testFunction,
        'highlightPieces': highlightPieces,
        'getDisplayTime': getDisplayTime,
        'getInitialBadShots': getInitialBadShots,
        'highlightGreenPiece': highlightGreenPiece,
        'gameWonNextLevel': gameWonNextLevel,
        'flow': flow,
        'highlightRedPiece': highlightRedPiece,
        'setShotsLeft': setShotsLeft,
        'gameContinue': gameContinue
    }
})();