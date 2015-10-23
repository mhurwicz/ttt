'use strict';

var Board = function(grid){
	grid = grid || 3;
	this.grid = grid;
	this.X = 1;
	this.O = -1;
	this.board = [];
	this.winning_combinations = this.populateWinningCombinations();
//  console.log("winning_combinations : "+JSON.stringify(this.winning_combinations));
	this.winning_combination = null;
}

Board.prototype = {
	populateWinningCombinations:function(){
		var winners = [];
		for (var i = 0, c = [], d = []; i < this.grid; i++){
			for (var j = 0, a = [], b = []; j < this.grid; j++){
				a.push(i * this.grid + j);
				b.push(j * this.grid + i);
			}
			winners.push(a, b);
			c.push(i * this.grid + i);
			d.push((this.grid - i - 1) * this.grid + i);
		}
		winners.push(c, d);
		return winners;
	},

	isFull:function(){
		for(var i = 0; i < this.grid * this.grid; i++) {
        	if (!this.board[i]) {
          		return false;
       		}
      	}
      	return true;
	},

	checkWinner:function(){
		var j, x, o, k;
		for (var combo in this.winning_combinations){
			j = x = o = this.grid;
			while(j--){
				k = this.winning_combinations[combo][j];
				if(this.board[k] > 0) x--;
				if(this.board[k] < 0) o--;
			}
			if (!x) {
				this.winning_combination = this.winning_combinations[combo];
				return this.X; // x wins
			}
			if (!o) {
				this.winning_combination = this.winning_combinations[combo];
				return this.O; // o wins
			}
		}
	},

	move:function(index, player){
		if(this.canMove(index)){
			this.board[index] = player.token === 'x' ? this.X : this.O;
		}
	},

	canMove:function(index){
		return typeof this.board[index] === "undefined";
	},

	compute_next_move:function(){
		return this.negamaxSearch(0, 1, -100, 100);
	},

	renderSquare:function(index){
		var square_token = "";
		if(this.board[index]){
			square_token = this.board[index] === this.X ? "x" : "o";
		}
		return square_token;
	},

	// negamax search with alpha-beta pruning
	// http://en.wikipedia.org/wiki/Negamax
	// http://en.wikipedia.org/wiki/Alpha-beta_pruning
	negamaxSearch: function(depth, player, alpha, beta){
		var size = 100;
		var intelligence = 6;
		var undef;
		var i = this.grid * this.grid, min = -size, max, value, next;
		if (value = this.checkWinner(depth)) // either player won
			return value * player;
		if (intelligence > depth){ // recursion cutoff
			while(i--){
				if (!this.board[i]){
					this.board[i] = player;
					value = -this.negamaxSearch(depth + 1, -player, -beta, -alpha);
					this.board[i] = undef;
					if (max === undef || value > max) max = value;
					if (value > alpha) alpha = value;
					if (alpha >= beta) return alpha; // prune branch
					if (max > min){ min = max; next = i; } // best odds for next move
				}
			}		
		} 
		return depth ? max || 0 : next; // 0 is tie game
	}
}