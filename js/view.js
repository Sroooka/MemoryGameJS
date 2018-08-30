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
    showPieces = function (receivedPieces) {
        console.log("Pieces to show: " + receivedPieces.length);
        var i,
            pieceToDraw,
            pieceButton,
            elementContainer = document.getElementById("gamebuttons");
        while (elementContainer.hasChildNodes()) {
            elementContainer.removeChild(elementContainer.lastChild);
        }
        for(i=0; i<receivedPieces.length; i++){
            pieceButton = document.createElement("button");
            pieceButton.className = "game-button";
            elementContainer = document.getElementById("gamebuttons");
            elementContainer.appendChild(pieceButton);
        }
    },

    testFunction = function() {
        var btn = document.createElement("BUTTON");
        return sliderNumberOfElements;
    };

    return {
        'getInitialNumberOfPieces': getInitialNumberOfPieces,
        'showPieces': showPieces,
        'testFunction': testFunction
    }

})();




