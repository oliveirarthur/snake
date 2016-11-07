function loop() {
	var pixelSize = 10,	// width and height for each square
		canvas = $('div.canvas'),	// where the game is rendered
		container = $('div.container'),	// where the canvas is rendered
		totalRows = Math.floor(canvas.innerHeight()/pixelSize),	// number of rows to be rendered
		totalColumns = Math.floor(canvas.innerWidth()/pixelSize),	// number of columns each row contains
		snake = []
		;

	canvas.html('');	// clear canvas content
	for (var row = 0; row < totalRows; row++) {
		var newRow = $('<div class="row">'+row+'</div>');	// create a new row
		canvas.append(newRow);	// appends the new row to the canvas

		for (var column = 0; column < totalColumns; column++) {
			var newDiv = $('<div class="col"></div>'); // create a new 'pixel'
			newRow.append(newDiv);	// appends the pixel to the new row
		}
		
	}

}