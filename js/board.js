// The Board object takes a 2-dimensional matrix of 0s and 1s.
// The Board object represents the gameboard with its
// matrix board object and allows for getting and
// setting cell statuses and moving the board along
// to the next time interval. Live cells have a value
// of 1 on the board and dead cells have a value of 0.

Board = function(arr){
	

	var ALIVE = 1;
	var DEAD = 0;

	var board = two_dim_clone(arr);
	var board_width = board[0].length;
	var board_height = board.length;

	// future_board is populated with the
	// cell statuses for the next time interval
	var future_board = map(board, function(row){
		return map(row, function(){
			return DEAD;
		});
	});

	var update = function(y, x, status){
		assert(status == 0 || status == 1);
		future_board[y][x] = status;
	}

	var self = {

		get: function(y, x){
			return board[y][x]
		},

		get_height: function(){
			return board_height;
		},

		get_width: function(){
			return board_width;
		},	

		set_dead: function(y, x){
			update(y, x, DEAD);
		},

		set_alive: function(y, x){
			update(y, x, ALIVE);
		},

		// Given just the cell's location
		// toggle its alive/dead status
		flip_status: function(y, x){
			if(self.get(y, x)){
				self.set_dead(y, x);
			}else{
				self.set_alive(y, x);
			}
		},

		// Calculates number of live neighbors a cell has
		// a cell's neighbors are the 8 cells directly above,
		// below, to the left, to the right, or diagonally
		// adjacent to the cell
		get_num_neighbors: function(y, x){
			
			assert(y >= 0 && y < board_height);
			assert(x >= 0 && x < board_width);

			var num = 0;
			from_to(y-1, y+1, function(ycoord){
				from_to(x-1, x+1, function(xcoord){
					// check to make sure the neighboring cell is actually on the gameboard
					if(xcoord >= 0 && xcoord < board_width && ycoord >= 0 && ycoord < board_height){
						num += board[ycoord][xcoord];
					}
				});
			});
			// The nested from_to's above check 9 cells, the 8 cells plus the given
			// cell at position (x,y). The status of cell at (x,y) shouldn't be
			// figured into the number of neighbors it has.
			num -= board[y][x];
			assert(num >=0 && num <= 8);
			return num;
		},

		// Moves the game to the next time interval
		// by updating the board to the new cell statuses
		move_to_future: function(){
			board = two_dim_clone(future_board);
		}

	}

	return self;
}