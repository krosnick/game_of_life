// The Display object updates the cell colors by changing
// the classes of the HTML elements.
Display = function(display_id, height, width){
	
	var ALIVE_COLOR = "green";
	var DEAD_COLOR = "black";
	var initialized = false;

	var self = {

		// Builds the HTML elements adds them to the screen.
		// All cells start out as dead.
		initialize: function(){
			from_to(0, height - 1, function(row){
				var row_element = $("<div> </div>");
				from_to(0, width - 1, function(col){
					var square = "<span id = " + row + "_" + col + " class = '" + DEAD_COLOR + " cell' >&nbsp;</span>";
					row_element.append(square);
				});
				$("#" + display_id).append(row_element);
			});
		},

		// Updates the color of a cell
		// If value is 1, update cell to alive color
		// Otherwise (i.e., value === 0), update cell to dead color
		draw_cell: function(row, col, value){
			assert(value === 1 || value === 0);
			assert(row >= 0 && row < height);
			assert(col >= 0 && col < width);
			
			var cell = $("#" + row + "_" + col);
			if(value === 1){
				cell.removeClass(DEAD_COLOR);
				cell.addClass(ALIVE_COLOR);
			}else{
				cell.removeClass(ALIVE_COLOR);
				cell.addClass(DEAD_COLOR);
			}
		},
	}
	return self;
};