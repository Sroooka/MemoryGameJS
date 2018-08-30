var
    sliderNumberOfElements = 4,
    sliderTimeOfDisplay = 5.0,
    sliderBadShots = 5.0;

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

    getDisplayTime = function () {
        return parseInt(sliderTimeOfDisplay * 1000);
        console.log("Showing time: " + sliderTimeOfDisplay);
    },
    showPieces = function (receivedPieces) {
        console.log("Pieces to show: " + receivedPieces.length);
        var i,
            buttonId,
            pieceToDraw,
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
            elementContainer = document.getElementById("gamebuttons");
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
        'getDisplayTime': getDisplayTime
    }
})();