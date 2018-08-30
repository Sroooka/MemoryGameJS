var controller = function () {
    var pieces = [],
        piecesToGuess = [],
        displayTime,
        gameStarted = false,
        initialNumberOfPieces,
        initialBadShots,

    startGame = function () {
        view.flow("");
        gameStarted = true;
        initialNumberOfPieces = view.getInitialNumberOfPieces();
        initialBadShots = view.getInitialBadShots();

        game.startGame({
            numberOfPieces: initialNumberOfPieces,
            badShots: initialBadShots
        });

        displayTime = view.getDisplayTime();


        showBoard();
    },

    highlightPieces = function () {
            if(!gameStarted){
                alert("You must be in game to Highlight pieces!");
            }
            else
            {
                showBoard();
            }
        },

    highlightGreenPiece = function (id) {
        view.highlightGreenPiece(id);

    },

    gameWonNextLevel = function (level) {
        view.gameWonNextLevel(pieces, level);
        view.flow("YOU WON! Level up!");
        setTimeout(function(){  showBoard(); }, 5000);

    },
    pieceClicked = function (id) {
        console.log("Button clicked! received id: " + id);
        var extractedId;
        extractedId = parseInt(id.substring(3));    //remove 'btn' from ID
        console.log("Extracted ID number received: " + extractedId);
        game.gameButtonClicked(extractedId);
    },

    showBoard = function () {
        view.flow("");

        pieces = game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        view.showPieces(pieces);

        setTimeout(function(){ view.highlightPieces(piecesToGuess); }, 1000);
        setTimeout(function(){ view.showPieces(pieces); }, displayTime + 1000);
    };

    return {
        'startGame': startGame,
        'highlightPieces': highlightPieces,
        'pieceClicked': pieceClicked,
        'highlightGreenPiece': highlightGreenPiece,
        'gameWonNextLevel': gameWonNextLevel
    }
}();