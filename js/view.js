var
    sliderNumberOfElements = 4,
    sliderTimeOfDisplay = 5.0;

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

var view = (function () {
    var
    getInitialNumberOfPieces = function () {
        return 2;
    },
    showPieces = function (receivedPieces) {
        //TODO show pieces on screen

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




