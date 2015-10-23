'use strict';

function GameController($scope, game, grid_size) {
    $scope.grid = new Array(grid_size);
    $scope.status_message = "";
    $scope.computer_starts = false;
    $scope.game_over = false;

    $scope.startGame = function(){
        $scope.status_message = "";
        $scope.game_over = false;
    	  game.start($scope.grid.length, $scope.computer_starts);
        $scope.status_message = "game in progress";
    }

    $scope.makeMove = function(col, row){
        var boardIndex, token, winner;
        boardIndex = (row * grid_size) + col;
        if(game.board && game.board.canMove(boardIndex) && !game.winner && !game.tie){
            // make move
            game.move(boardIndex);

            // check winner
            if(game.winner) {
                if(game.winner === game.board.X) $scope.status_message = "better luck next time ...";
                if(game.winner === game.board.O) $scope.status_message = "you beat the computer!!!";
                $scope.game_over = true;
            }

            // check tie
            if(game.tie){
                $scope.status_message = "tie, try again ...";
                $scope.game_over = true;
            }
        }
    }

    $scope.getSquaretoken = function(col, row){
        var boardIndex = (row * grid_size) + col;
        return game.board ? game.board.renderSquare(boardIndex) : "";
    }

    $scope.isSquareInWinningCombo = function(col, row){
   //   console.log("col : row : "+col+" : "+row);
        var boardIndex;
        if(game.board && game.winner && game.board.winning_combination){
            boardIndex = (row * grid_size) + col;
            return game.board.winning_combination.indexOf(boardIndex) > -1;
        }
        return false;
    }
}
