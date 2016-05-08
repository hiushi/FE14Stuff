app.filter('sign', function() {
	return function(input) {
		if (input > 0) return ('+' + input);
		else if (input < 0) return ('\u2212' + input*-1);
		else return input;
	}
})