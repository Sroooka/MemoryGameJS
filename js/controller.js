var controller = function () {
    var pieces,
        displayTime,
        startGame = function () {
        document.addEventListener("DOMContentLoaded", function () {
            //TODO download elements from view
        });
        var initialNumberOfPieces = view.getInitialNumberOfPieces();

        game.startGame({
            numberOfPieces: initialNumberOfPieces
        });

        displayTime = view.getDisplayTime();
        pieces = game.getPieces();

        view.showPieces(pieces);

        setTimeout(function(){ view.highlightPieces(game.getPiecesToGuess()); }, 1000);
        setTimeout(function(){ view.showPieces(pieces); }, displayTime + 1000);


    };

    return {
        'startGame': startGame
    }
}();