'use strict';

var Game = function(params){
	// defaults
	this.computer_starts = false;
	this.grid = 3;
	this.board = null;

	// players
	this.human_player = new Player('o', false);
	this.computer_player = new Player('x', true);
	this.current_player = this.human_player;

	// results
	this.winner = null;
	this.tie = false;
	this.winning_combination = [];
}

Game.prototype = {
	start: function(grid, computer_starts){
		this.grid = grid;
		this.computer_starts = computer_starts;
		this.board = new Board(this.grid);
		this.current_player = this.human_player;
		this.winner = null;
		this.tie = false;
		this.winning_combination = [];

		if(this.computer_starts){
			this.current_player = this.computer_player;
			this.computer_move();
		}
	},
	move: function(index){
		if(this.board.canMove(index)){
			this.board.move(index, this.current_player);
			this.current_player = this.current_player.is_computer ? this.human_player : this.computer_player;
			this.checkWinner();
			if(!this.winner){
				if(this.current_player.is_computer){
					this.computer_move();
				}
				this.checkWinner(); 
 //       console.log("this.board.isFull() : "+this.board.isFull());
				if((!this.winner)&&(this.board.isFull())){
					this.tie = true;
//          console.log("found tie in move"); 
				} 
			} 
		}
	},
	checkWinner:function(){
		var winner = this.board.checkWinner();
		if(typeof winner !== "undefined"){
			this.winner = winner;
		}
	},
	computer_move:function(){
		var next_move = this.board.compute_next_move();
		if(typeof next_move === "undefined") {
			this.tie = true;
		} else {
			this.board.move(next_move, this.current_player);
			this.current_player = this.current_player.is_computer ? this.human_player : this.computer_player;
		}
	}
};