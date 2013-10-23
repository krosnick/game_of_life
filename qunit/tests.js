// utilities.js tests
test("testing two_dim_clone", function(){
	var matrix = [[1,2,3], [4,5,6]];
	var cloned = two_dim_clone(matrix);
	deepEqual(matrix, cloned, "Matrices have same structure and values");
	notEqual(matrix, cloned, "Matrices are not the same object");
	notEqual(matrix[0], cloned[0], "Row 0's are not same object");
	notEqual(matrix[1], cloned[1], "Row 1's are not same object");
});





// board.js tests
test("testing Board get method", function(){
	b = Board([[0,1,0], [0,0,0]]);
	equal(0, b.get(0, 0));
	equal(1, b.get(0, 1));
	equal(0, b.get(0, 2));
	equal(0, b.get(1, 0));
	equal(0, b.get(1, 1));
	equal(0, b.get(1, 2));
});

test("testing Board get_height method", function(){
	b = Board([[0,1,0], [0,0,0]]);
	equal(2, b.get_height());
});

test("testing Board get_width method", function(){
	b = Board([[0,1,0], [0,0,0]]);
	equal(3, b.get_width());
});

test("testing Board get_num_neighbors method", function(){
	b = Board([[0,1,1], [1,0,1]]);
	equal(2, b.get_num_neighbors(0,0));
	equal(3, b.get_num_neighbors(0,1));
	equal(2, b.get_num_neighbors(0,2));
	equal(1, b.get_num_neighbors(1,0));
	equal(4, b.get_num_neighbors(1,1));
	equal(2, b.get_num_neighbors(1,2));
});

test("testing Board update and move_to_future methods", function(){
	b = Board([[0,1,1], [1,0,1]]);
	b.update(0, 0, 0);
	b.update(0, 1, 1);
	b.update(0, 2, 1);
	b.update(1, 0, 0);
	b.update(1, 1, 0);
	b.update(1, 2, 1);
	b.move_to_future();
	equal(0, b.get(0, 0));
	equal(1, b.get(0, 1));
	equal(1, b.get(0, 2));
	equal(0, b.get(1, 0));
	equal(0, b.get(1, 1));
	equal(1, b.get(1, 2));
});