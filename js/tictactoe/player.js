var Player = function(token, is_computer){
	token = token || "x";
	is_computer = is_computer || false;

	this.token = token;
	this.is_computer = is_computer;
}
