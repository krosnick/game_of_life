// The each function as shown in Daniel Jackson's
// 6.170 javascript-live.
from_to = function(from, to, f){
	if(from > to) return;
	f(from); from_to(from+1, to, f);
}

// The each function as shown in Daniel Jackson's
// 6.170 javascript-live.
each = function(a, f){
	from_to(0, a.length-1, function(i){
		f(a[i]);
	});
}

// The map list functional as shown in Daniel Jackson's
// 6.170 javascript-live. 
map = function(a, f){
	var result = [];
	each(a, function(e){
		result.push(f(e));
	});
	return result;
}

// Accepts a 2-dimensional matrix (an array of arrays)
// and returns a clone of that matrix
two_dim_clone = function(arr){
	return map(arr, function(row){
		return map(row, function(cell){
			return cell;
		});
	});
}

// Taken from http://stackoverflow.com/questions/15313418/javascript-assert
// Created by T.J. Crowder
assert = function(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}