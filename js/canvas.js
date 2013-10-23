/* The Canvas object draws the board in the specified
 * element using graphics.js.
 */
Canvas = function(board, canvas_id){
	var black = Color(0,0,0);
	var white = Color(255,255,255);

	// set constants to be able to scale to any canvas size
	var MAX_X = board.get_width();
	var MAX_Y = board.get_height();
	
	// create the drawing pad object and associate with the canvas
	var pad = Pad(document.getElementById(canvas_id));
	var x_factor = pad.get_width() / MAX_X;
	var y_factor = pad.get_height() / MAX_Y;

	var BOARD_LINE_WIDTH = 1;
	var CELL_LINE_WIDTH = 0;

	var self = {
		draw: function(){

			pad.clear();
			pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), BOARD_LINE_WIDTH, black);

			// draw a rectangle for each cell
			from_to(0, board.get_height()-1, function(row){
				from_to(0, board.get_width()-1, function(col){
					var cell_color;
					if(board.get(row, col)){
						cell_color = black;
					}else{
						cell_color = white;
					}
					pad.draw_rectangle(Coord(row*y_factor, col*x_factor),
						y_factor, x_factor, CELL_LINE_WIDTH, black, cell_color);
				});
			});
		}
	}
	return self;
};