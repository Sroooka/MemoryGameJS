var controller = function () {
    var pieces = [],
        piecesToGuess = [],
        displayTime,
        gameStarted = false,
        initialNumberOfPieces,
        initialBadShots
        canShotPieces = true,

    startGame = function () {
        if(canShotPieces){
            view.flow("");
            gameStarted = true;
            initialNumberOfPieces = view.getInitialNumberOfPieces();
            initialBadShots = view.getInitialBadShots();
            view.setShotsLeft(initialBadShots);
            view.setLevel(1);
            view.setShotsAccuracy(100);
            game.startGame({
                numberOfPieces: initialNumberOfPieces,
                badShots: initialBadShots
            });

            displayTime = view.getDisplayTime();


            showBoard();
        } else{
            alert("Wait until game end!");
        }

    },

    setAmountToGuess = function(amount){
        view.setAmountToGuess(amount);
    },

    highlightPieces = function () {
            if(!gameStarted){
                alert("You must be in game to Highlight pieces!");
            }
            else if(!canShotPieces){
                alert("Wait until game highlight previous pieces!");
            } else
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

    setCheatMode = function (checkbox) {
        game.setCheatMode(checkbox);
    },

    gameWonNextLevel = function (level, shotsAccuracy) {

        setTimeout(function(){  view.gameWonNextLevel(pieces, level); }, 1000);
        view.flow("YOU WON!\nLevel up!");
        view.setShotsAccuracy(shotsAccuracy);
        setTimeout(function(){  showBoard(); }, 2000);
    },

    continueGame = function (level, shotsLeft, shotsAccuracy) {
        canShotPieces = false;
        view.setShotsLeft(shotsLeft);
        view.setShotsAccuracy(shotsAccuracy);
        view.flow("Bad shot!\nContinuing!");
        setTimeout(function(){  view.gameContinueAfterBadShot(pieces, level); }, 1000);
        setTimeout(function(){  showBoard(); }, 3000);
    },
    endGame = function (level) {
        canShotPieces = false;
        gameStarted = false;
        view.setShotsLeft(0);
        view.flow("You lost!\nYour level: " + level);
        setTimeout(function(){  view.endGame1(pieces, level, "#ff1900"); }, 1000);
        setTimeout(function(){  view.endGame1(pieces, level, "#b4b4b4"); }, 2200);
        setTimeout(function(){  view.endGame1(pieces, level, "#a0a0a0"); }, 2400);
        setTimeout(function(){  view.endGame1(pieces, level, "#8c8c8c"); }, 2600);
        setTimeout(function(){  view.endGame1(pieces, level, "#787878"); }, 2800);
        setTimeout(function(){  view.endGame1(pieces, level, "#646464"); }, 3000);
        setTimeout(function(){  view.endGame1(pieces, level, "#505050"); }, 3200);
        setTimeout(function(){  view.endGame1(pieces, level, "#3c3c3c"); }, 3400);
        setTimeout(function(){  view.endGame1(pieces, level, "#282828"); }, 3600);
        setTimeout(function(){  view.endGame1(pieces, level, "#000000"); }, 3800);
        setTimeout(function(){  view.flow("Press [Start]\nto create new game!"); canShotPieces = true; }, 3800);
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
        'continueGame': continueGame,
        'endGame': endGame,
        'setCheatMode': setCheatMode,
        'setAmountToGuess': setAmountToGuess
    }
}();