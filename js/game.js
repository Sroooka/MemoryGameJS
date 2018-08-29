var game = (function () {

    var initialNumberOfPieces = 5,
        currentNumberOfPieces,
        startGame = function (config) {
            if (config && config.numberOfPieces) {
                currentNumberOfPieces = config.numberOfPieces;
            } else {
                currentNumberOfPieces = initialNumberOfPieces;
            }
        },

        getPieces = function () {
            var i,
                pieces = [];

            for(i=0; i < currentNumberOfPieces; i++) {
                pieces.push({});
            }
            pieces[0].toGuess = true;
            return pieces;
        };

    return {
        'startGame': startGame,
        'getPieces': getPieces
    }
})();

/*
losowanie liczby z zadanego przedzialu
const min = 1;
const max = 8;
const result =  Math.floor(Math.random() * (max-min+1) + min);
 */