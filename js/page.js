// The Page object takes an arr parameter which is a 2-dimensional matrix of 0s and 1s
// and a canvas_id so the Display object down the road knows where to draw the board.
// The Page object has a timer which runs and tells the Game object to update the board.
// The Page object also handles mouse events on the page; when one of these events occurs,
// the Page object tells the Game object how to update. Upon being instantiated the Page
// object begins the game immediately.

Page = function(arr, display_id){
	var game = Game(arr, display_id);
	
	// time to wait before updating board
	var DELAY = 1000;
	
	var board_timer;
	
	// Whether or not the game is currently running.
	// The game starts out as running.
	var running = true;
	
	// whether the user is currently dragging their mouse across the game board
	var dragging = false;
	
	var set_running = function(){
		// every second make_next_step() is called on game
		board_timer = setInterval(function(){
			game.make_next_step();
		}, DELAY);
		running = true;
		disable_buttons();
		remove_instructions();
	};

	var set_not_running = function(){
		// stop the timer (i.e., pause the game)
		clearInterval(board_timer);
		running = false;
		enable_buttons();
		add_instructions();
	};

	// Takes an ID name and splits it by an underscore 
	// to extract the row and column numbers, and then
	// tells the game to update the cell at that row
	// and column
	var update_cell_info = function(currentID){
		var id_split = currentID.split("_");
		var row = parseInt(id_split[0]);
		var col = parseInt(id_split[1]);
		game.update_cell(row, col);
	};

	// Disables buttons that should only be used
	// when the game is paused
	var disable_buttons = function(){
		$("#clear_board").attr("disabled", true);
		$("#forward_step").attr("disabled", true);
	};

	// Enables buttons that should only be used
	// when the game is paused
	// 
	var enable_buttons = function(){
		$("#clear_board").attr("disabled", false);
		$("#forward_step").attr("disabled", false);
	};

	// Removes instructions for changing cell values
	var remove_instructions = function(){
		$("#instructions").text("");
	};

	// Adds instructions for changing cell values,
	// only to be done when the game is paused
	var add_instructions = function(){
		$("#instructions").text("Drag your mouse on the screen to invert cell values.");
	};

	set_running();

	$(function(){

		// game starts out with "Clear board" and "Take step forward" buttons disabled
		disable_buttons();

		// "Play/Pause" button event handler
		$("#play_pause").click(function(){
			if($("#play_pause").text() === "Play"){
				assert(running === false);
				$("#play_pause").text("Pause");
				set_running();
			}else{
				assert(running === true);
				$("#play_pause").text("Play");
				set_not_running();
			}
		});

		// "Take step forward" button event handler
		$("#forward_step").click(function(){
			if(!running){
				set_not_running();
				game.make_next_step();
			}
		});

		// "Clear board" button event handler
		$("#clear_board").click(function(){
			if(!running){
				game.clear_board();
			}
		});


		// The three mouse event handlers below handle
		// the mouse dragging. When the mouse drags
		// across the gameboard, cell values are inverted.

		// Beginning of dragging event,
		$(document).mousedown(function(){
			if(!running){
				dragging = true;
			}
		});

		// If mouse is pressed when over a cell,
		// cell value is inverted
		$(".cell").mousedown(function(){
			if(!running){
				dragging = true;
				var currentID = $(this).attr('id');
				update_cell_info(currentID);
			}
		});

		// Inverts cell that is hovered over while dragging
		$(".cell").mouseenter(function(){
			if(dragging){
				var currentID = $(this).attr('id');
				update_cell_info(currentID);
			}
		});

		// Dragging ends when mouse is released
		$(document).mouseup(function(){
			dragging = false;
		});	
	});

}