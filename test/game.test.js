describe('Game', function () {

    it('ad1: should return 4 pieces after game start', function () {
        var pieces;
        game.startGame();
        pieces = game.getPieces();
        expect(pieces.length).toBe(4);
    });

    it('ad2: should return 1 piece to guess after game start', function () {
        var piecesToGuess;

        game.startGame();
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();

        expect(piecesToGuess.length).toBe(1);
    });

    it('ad2: should return 2 pieces to guess on level 2', function () {
        var piecesToGuess,
            piece;

        game.startGame();


        //go to level 2
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        piece = piecesToGuess[0];
        game.gameButtonClicked(piece.id);

        piecesToGuess = game.getPiecesToGuess();

        expect(piecesToGuess.length).toBe(2);
    });

    it('ad2: should start game with configured number of pieces', function () {
        var pieces,
            config = {
                numberOfPieces: 20,
                badShots: 10
            };

        game.startGame(config);
        pieces = game.getPieces();

        expect(pieces.length).toBe(20);
    });

    it('ad3: should win when clicked all pieces', function () {
        var piecesToGuess,
            piece,
            gameInfo;

        game.startGame();
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        piece = piecesToGuess[0];
        gameInfo = game.gameButtonClicked(piece.id);

        expect(gameInfo.gameStatus).toBe("win");
    });


    it('ad4: should blink color to red when shot wrong piece', function () {
        var piecesToGuess,
            allPieces,
            goodPiece,
            badPiece,
            gameInfo;

        game.startGame();
        allPieces = game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        goodPiece = piecesToGuess[0];

        //at start we have 4 pieces and 1 piece to guess
        //if first piece is correct select next one (wrong)
        badPiece = allPieces[0];
        if (badPiece.id == goodPiece.id) {
            badPiece = allPieces[1];
        }

        gameInfo = game.gameButtonClicked(badPiece.id);

        expect(gameInfo.highlight).toBe("red");
    });

    it('ad4: should highlight new pieces after wrong choose when there is enough bad shots left', function () {
        var piecesToGuess,
            allPieces,
            goodPiece,
            badPiece,
            gameInfo,
            config = {
                numberOfPieces: 20,
                badShots: 10
            };

        game.startGame(config);
        allPieces = game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        goodPiece = piecesToGuess[0];

        //at start we have 4 pieces and 1 piece to guess
        //if first piece is correct select next one (wrong)
        badPiece = allPieces[0];
        if (badPiece.id == goodPiece.id) {
            badPiece = allPieces[1];
        }

        gameInfo = game.gameButtonClicked(badPiece.id);

        expect(gameInfo.gameStatus).toBe("continue");
    });

    it('ad5: should blink color to green when shot good piece', function () {
        var piecesToGuess,
            piece,
            gameInfo;

        game.startGame();
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        piece = piecesToGuess[0];
        gameInfo = game.gameButtonClicked(piece.id);

        expect(gameInfo.highlight).toBe("green");
    });

    it('ad6: should blink green and then blink all pieces after game win', function () {
        var piecesToGuess,
            piece,
            allPiecesBefore,
            allPiecesAfter,
            gameInfo;

        game.startGame();
        allPiecesBefore = game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        piece = piecesToGuess[0];
        gameInfo = game.gameButtonClicked(piece.id);

        allPiecesAfter = game.getPieces();

        expect(gameInfo.highlight).toBe("green");
        expect(gameInfo.gameStatus).toBe("win");
        expect(allPiecesAfter.length - allPiecesBefore.length).toBe(1); //incremented pieces
        expect(gameInfo.level).toBe(2);
    });

    it('ad7: after each win there will be more pieces and pieces to guess', function () {
        var piecesToGuess,
            iterationPieces,
            gameInfo,
            allPieces,
            piece,
            i;

        game.startGame();

        //go to level 2
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        iterationPieces = piecesToGuess.slice();
        for (i = 0; i < iterationPieces.length; i++) {
            piece = iterationPieces[i];
            gameInfo = game.gameButtonClicked(piece.id);
        }

        //go to level 3
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        iterationPieces = piecesToGuess.slice();
        for (i = 0; i < iterationPieces.length; i++) {
            piece = iterationPieces[i];
            gameInfo = game.gameButtonClicked(piece.id);
        }

        //go to level 4
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        iterationPieces = piecesToGuess.slice();
        for (i = 0; i < iterationPieces.length; i++) {
            piece = iterationPieces[i];
            gameInfo = game.gameButtonClicked(piece.id);
        }


        allPieces = game.getPieces();
        piecesToGuess = game.getPiecesToGuess();

        expect(gameInfo.gameStatus).toBe("win");
        expect(gameInfo.level).toBe(4);
        expect(piecesToGuess.length).toBe(3);
        expect(allPieces.length).toBe(7);
    });

    it('ad8: shot 2 times the same tile generate error', function () {
        var piecesToGuess,
            iterationPieces,
            gameInfo,
            idOfPieceToShot,
            piece,
            i;

        game.startGame();

        //go to level 2
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        iterationPieces = piecesToGuess.slice();
        for (i = 0; i < iterationPieces.length; i++) {
            piece = iterationPieces[i];
            game.gameButtonClicked(piece.id);
        }

        //shot 2 times the same tile
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        idOfPieceToShot = piecesToGuess[0].id;
        game.gameButtonClicked(idOfPieceToShot);
        gameInfo = game.gameButtonClicked(idOfPieceToShot);

        expect(gameInfo.gameStatus).toBe("end");
    });

    it('ad12: number of pieces left to guess', function () {
        var piecesToGuess,
            iterationPieces,
            gameInfo,
            idOfPieceToShot,
            piece,
            i;

        game.startGame();

        //go to level 2
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        iterationPieces = piecesToGuess.slice();
        piece = iterationPieces[0];
        game.gameButtonClicked(piece.id);

        //shot 2 times the same tile
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        idOfPieceToShot = piecesToGuess[0].id;
        gameInfo = game.gameButtonClicked(idOfPieceToShot);

        expect(gameInfo.amountToGuess).toBe(1);
    });

    it('ad14a: should show accuracy after good and bad shot', function () {
        var piecesToGuess,
            iterationPieces,
            gameInfo,
            idOfPieceToShot,
            piece,
            firstShotAccuracy,
            secondShotAccuracy,
            thirdShotAccuracy,
            i;

        game.startGame();

        //go to level 2
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();

        piece = piecesToGuess[0];
        gameInfo = game.gameButtonClicked(piece.id);
        firstShotAccuracy = gameInfo.shotAccuracy;


        //shot 2 times the same tile
        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        idOfPieceToShot = piecesToGuess[0].id;

        gameInfo = game.gameButtonClicked(idOfPieceToShot);
        secondShotAccuracy = gameInfo.shotAccuracy;

        gameInfo = game.gameButtonClicked(idOfPieceToShot);
        thirdShotAccuracy = gameInfo.shotAccuracy;

        expect(firstShotAccuracy).toBe(parseFloat(100).toFixed(2));
        expect(secondShotAccuracy).toBe(parseFloat(100).toFixed(2));
        expect(thirdShotAccuracy).toBe(parseFloat((2 / 3) * 100).toFixed(2));
    });

    it('ad14b: should start game with configured number of bad shots', function () {
        var piecesToGuess,
            config = {
                numberOfPieces: 20,
                badShots: 10
            };

        game.startGame(config);


        game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        piece = piecesToGuess[0];
        gameInfo = game.gameButtonClicked(piece.id);


        expect(gameInfo.shotsLeft).toBe(10);
    });

    it('+: should do nothing when choose wrong piece in cheat mode', function () {
        var piecesToGuess,
            allPieces,
            goodPiece,
            badPiece,
            checkbox = {
                checked: true
            };

        game.startGame();

        game.setCheatMode(checkbox);

        allPieces = game.getPieces();
        piecesToGuess = game.getPiecesToGuess();
        goodPiece = piecesToGuess[0];

        //at start we have 4 pieces and 1 piece to guess
        //if first piece is correct select next one (wrong)
        badPiece = allPieces[0];
        if (badPiece.id == goodPiece.id) {
            badPiece = allPieces[1];
        }

        gameInfo = game.gameButtonClicked(badPiece.id);

        expect(gameInfo.highlight).toBe("red");
        expect(gameInfo.gameStatus).toBe("nothing");
    });
});