var game = (function () {
    const
        maxNumberOfPieces = 70;
    var
        initialNumberOfPieces = 4,
        currentNumberOfPieces,
        allPieces = [],
        piecesToGuess = []
        amountOfPiecesToGuess = 0,
        level = 1,

        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
            }
        },

        getPieces = function () {
            var i,
                piece = {id:-1, highlight:false, toGuess:false};
            allPieces = [];
            piecesToGuess = [];
            for(i=0; i < currentNumberOfPieces; i++) {
                piece = {id:i, highlight:false, toGuess:false};
                allPieces.push(piece);
            }
            return allPieces;
        },

        getPiecesToGuess = function () {
            var i,
                originalPiece,
                piece = {id:-1, highlight:true, toGuess:true};
            allPieces = shuffle(allPieces);
            countAmountOfPiecesToGuess();
            for(i=0; i < amountOfPiecesToGuess; i++) {
                originalPiece = allPieces[i];
                piece = {id:originalPiece.id, highlight:true, toGuess:true};
                piecesToGuess.push(piece);
                console.log(i);
            }
            return piecesToGuess;
        },

        levelUp = function () {
            level++;
            currentNumberOfPieces++;
        },

        countAmountOfPiecesToGuess = function () {
            var amount = 1 + parseInt(level / 2);
            amountOfPiecesToGuess = amount;
        };

    return {
        'startGame': startGame,
        'getPieces': getPieces,
        'getPiecesToGuess': getPiecesToGuess,
        'levelUp': levelUp
    }
})();

function shuffle(a) {
    var j,
        x,
        i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/*
losowanie liczby z zadanego przedzialu
const min = 1;
const max = 8;
const result =  Math.floor(Math.random() * (max-min+1) + min);
 */