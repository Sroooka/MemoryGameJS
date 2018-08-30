var game = (function () {
    const
        maxNumberOfPieces = 70;
    var
        initialNumberOfPieces = 4,
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
                pieces = [],
                piece = {id:-1, highlight:false, toGuess:false};

            for(i=0; i < currentNumberOfPieces; i++) {
                piece = {id:i, highlight:false, toGuess:false};
                pieces.push(piece);
            }
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