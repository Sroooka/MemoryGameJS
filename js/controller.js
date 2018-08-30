var controller = function () {
    var pieces = [],
        piecesToGuess = [],
        displayTime,
        gameStarted = false,
        initialNumberOfPieces,
        initialBadShots
        canShotPieces = false,

    startGame = function () {
        view.flow("");
        gameStarted = true;
        initialNumberOfPieces = view.getInitialNumberOfPieces();
        initialBadShots = view.getInitialBadShots();
        view.setShotsLeft(initialBadShots);
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
    highlightRedPiece = function (id) {
        view.highlightRedPiece(id);
    },

    gameWonNextLevel = function (level) {
        view.gameWonNextLevel(pieces, level);
        view.flow("YOU WON! Level up!");
        setTimeout(function(){  showBoard(); }, 2000);
    },

    continueGame = function (level, shotsLeft) {
        view.gameContinue(pieces, level);
        view.setShotsLeft(shotsLeft);
        view.flow("Bad shot! Continuing!");
        //setTimeout(function(){  showBoard(); }, 2000);
    },
    pieceClicked = function (id) {
        console.log("Button clicked! received id: " + id);
        if(!canShotPieces){
            alert("You can't choose pieces when highlighting!");
        }
        else
        {
            var extractedId;
            extractedId = parseInt(id.substring(3));    //remove 'btn' from ID
            console.log("Extracted ID number received: " + extractedId);
            game.gameButtonClicked(extractedId);
        }

    },

    showBoard = function () {
        view.flow("");

        pieces = game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        view.showPieces(pieces);

        canShotPieces = false;
        setTimeout(function(){ view.highlightPieces(piecesToGuess); }, 1000);
        setTimeout(function(){ view.showPieces(pieces); }, displayTime + 1000);
        setTimeout(function(){ canShotPieces = true; }, displayTime + 1000);
        setTimeout(function(){ view.flow("Go!") }, displayTime + 1000);
    };

    return {
        'startGame': startGame,
        'highlightPieces': highlightPieces,
        'pieceClicked': pieceClicked,
        'highlightGreenPiece': highlightGreenPiece,
        'highlightRedPiece': highlightRedPiece,
        'gameWonNextLevel': gameWonNextLevel,
        'continueGame': continueGame
    }
}();