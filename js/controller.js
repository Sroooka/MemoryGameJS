var controller = function () {
    var startGame = function () {
        document.addEventListener("DOMContentLoaded", function () {
            //TODO download elements from view
        });
        var initialNumberOfPieces = view.getInitialNumberOfPieces();

        game.startGame({
            numberOfPieces: initialNumberOfPieces
        });

        view.showPieces(game.getPieces());

    };

    return {
        'startGame': startGame
    }
}();