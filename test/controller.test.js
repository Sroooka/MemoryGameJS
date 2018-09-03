describe('Controller', function () {

    it('should start game when nothing is highlighted', function () {
        var pieces = [],
            dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        spyOn(view, 'flow');
        spyOn(view, 'setShotsLeft');
        spyOn(view, 'setLevel');
        spyOn(view, 'setShotsAccuracy');
        spyOn(view, 'getCheatMode').and.returnValue(false);
        spyOn(view, 'setAmountToGuess');
        spyOn(view, 'showPieces');
        spyOn(game, 'startGame').and.returnValue(pieces);
        spyOn(game, 'getPieces').and.returnValue(pieces);
        spyOn(game, 'getPiecesToGuess').and.returnValue(pieces);

        controller.setCanShotPieces(true);
        controller.startGame(true);

        expect(view.flow).toHaveBeenCalled();
        expect(view.setShotsLeft).toHaveBeenCalled();
        expect(view.setLevel).toHaveBeenCalled();
        expect(view.setShotsAccuracy).toHaveBeenCalled();
        expect(view.getCheatMode).toHaveBeenCalled();
        expect(view.setAmountToGuess).toHaveBeenCalled();
        expect(view.showPieces).toHaveBeenCalled();
        expect(game.startGame).toHaveBeenCalled();
        expect(game.getPieces).toHaveBeenCalled();
        expect(game.getPiecesToGuess).toHaveBeenCalled();
    });

    it('should highlight pieces', function () {
        var pieces = [],
            dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        spyOn(game, 'getPieces');
        spyOn(game, 'getPiecesToGuess').and.returnValue(pieces);
        spyOn(view, 'setAmountToGuess');
        spyOn(view, 'flow');
        spyOn(view, 'showPieces');
        spyOn(view, 'highlightPieces');

        controller.setGameStarted(true);
        controller.setCanShotPieces(true);
        controller.highlightPieces();

        expect(game.getPieces).toHaveBeenCalled();
        expect(game.getPiecesToGuess).toHaveBeenCalled();
        expect(view.setAmountToGuess).toHaveBeenCalled();
        expect(view.flow).toHaveBeenCalled();
        expect(view.showPieces).toHaveBeenCalled();
    });

    it('should not highlight pieces when game is not started', function () {
        var pieces = [],
            dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        spyOn(game, 'getPieces');
        spyOn(game, 'getPiecesToGuess').and.returnValue(pieces);
        spyOn(view, 'setAmountToGuess');
        spyOn(view, 'flow');
        spyOn(view, 'showPieces');
        spyOn(view, 'highlightPieces');

        controller.setGameStarted(false);
        controller.setCanShotPieces(true);
        controller.highlightPieces();
    });

    it('should not highlight pieces when pieces are highlighted at this moment', function () {
        var pieces = [],
            dummyElement = document.createElement('div');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        spyOn(game, 'getPieces');
        spyOn(game, 'getPiecesToGuess').and.returnValue(pieces);
        spyOn(view, 'setAmountToGuess');
        spyOn(view, 'flow');
        spyOn(view, 'showPieces');
        spyOn(view, 'highlightPieces');

        controller.setGameStarted(true);
        controller.setCanShotPieces(false);
        controller.highlightPieces();
    });

    it('should start game with values from slider', function () {
        var pieces = [],
            dummyElement = document.createElement('div'),
            config = {
                numberOfPieces: 20,
                badShots: 10
            };
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
        spyOn(view, 'flow');
        spyOn(view, 'setShotsLeft');
        spyOn(view, 'setLevel');
        spyOn(view, 'setShotsAccuracy');
        spyOn(view, 'getCheatMode').and.returnValue(false);
        spyOn(view, 'setAmountToGuess');
        spyOn(view, 'showPieces');
        spyOn(game, 'startGame').and.returnValue(pieces);
        spyOn(game, 'getPieces').and.returnValue(pieces);
        spyOn(game, 'getPiecesToGuess').and.returnValue(pieces);
        spyOn(view, 'getInitialNumberOfPieces').and.returnValue(20);
        spyOn(view, 'getInitialBadShots').and.returnValue(10);
        spyOn(view, 'getDisplayTime').and.returnValue(2.0);

        controller.setCanShotPieces(true);
        controller.startGame(true);

        expect(view.flow).toHaveBeenCalled();
        expect(view.setShotsLeft).toHaveBeenCalled();
        expect(view.setLevel).toHaveBeenCalled();
        expect(view.setShotsAccuracy).toHaveBeenCalled();
        expect(view.getCheatMode).toHaveBeenCalled();
        expect(view.setAmountToGuess).toHaveBeenCalled();
        expect(view.showPieces).toHaveBeenCalled();
        expect(game.startGame).toHaveBeenCalledWith(config);
        expect(game.getPieces).toHaveBeenCalled();
        expect(game.getPiecesToGuess).toHaveBeenCalled();
    });

    it('should set cheat mode', function () {
        var checkbox = {
            checked: true
        };
        spyOn(game, 'setCheatMode');
        controller.setCheatMode(checkbox);
        expect(game.setCheatMode).toHaveBeenCalledWith(checkbox);
    });
});