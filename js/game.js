// The Game object takes an arr parameter which is a 2-dimensional matrix of 0s and 1s
// and a display_id so the Display object knows where to draw the board.
// Upon being instantiated the Game object begins the game immediately.
// The Game object has a Board and a Display and performs the operations
// to update the Board object and the Display objects when it is told to by
// the Page object that contains it.
Game = function(arr, display_id){
	var board = Board(arr);
	var display = Display(display_id, board.get_height(), board.get_width());

	// Updates the live/death statuses of the cells
	// based on the number of neighbors each has.
	var update_board = function(){
		from_to(0, board.get_height()-1, function(row){
			from_to(0, board.get_width()-1, function(col){
				var life_status = board.get(row, col);
				var num_neighbors = board.get_num_neighbors(row, col);
				if(life_status){
					if(num_neighbors < 2 || num_neighbors > 3){
						board.set_dead(row, col);
					}else{
						board.set_alive(row, col);
					}
				}else{
					if(num_neighbors === 3){
						board.set_alive(row, col);
					}else{
						board.set_dead(row, col);
					}
				}
			});
		});
		board.move_to_future();
	};

	// Tells the Display object to update the color of each cell
	var draw = function(){
		from_to(0, board.get_height()-1, function(row){
			from_to(0, board.get_width()-1, function(col){
				display.draw_cell(row, col, board.get(row, col));
			});
		});
	};

	var self = {
		// Updates the cell value in the board data structure
		// and also updates the display on the screen.
		update_cell: function(row, col){

			assert(row >= 0 && row < board.get_height());
			assert(col >= 0 && col < board.get_width());

			board.flip_status(row, col);
			board.move_to_future();
			display.draw_cell(row, col, board.get(row, col));
		},

		// Clears the game board (so that all cells are dead)
		// both in the board data structure and on the screen
		clear_board: function(){
			from_to(0, board.get_height()-1, function(row){
				from_to(0, board.get_width()-1, function(col){
					board.set_dead(row, col);
				});
			});
			board.move_to_future();
			draw();
		},

		// Updates the board data structure based on new cell values
		// and also updates the screen
		make_next_step: function(){
			update_board();
			draw();
		}
	}

	// initializes the display
	display.initialize();
	draw();
	
	return self;

};