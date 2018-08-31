describe('Game', function () {
    it('should have 4 pieces after game start', function () {
        var pieces;

        game.startGame();

        pieces = game.getPieces();

        expect(pieces.length).toBe(4);
    });

    it('after game start there would be 1 piece to guess', function () {
        var piecesToGuess;

        game.startGame();
        game.getPieces();

        piecesToGuess = game.getPiecesToGuess();

        expect(piecesToGuess.length).toBe(1);
    });

    it('should start game with configured number of pieces', function () {
        var pieces,
            config = {
                numberOfPieces: 6,
                badShots: 1
            };

        game.startGame(config);
        pieces = game.getPieces();

        expect(pieces.length).toBe(6);
    });


    function findPiecesToGuess(pieces) {
        return pieces.filter(function (piece) {
            return piece.toGuess;
        });
    }
});