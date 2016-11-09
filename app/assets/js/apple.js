function Apple(canvas, pixelSize) {
	var apple = this;
	apple.canvas = canvas;
	apple.pixelSize = pixelSize;
	apple.position = {};
	apple.show = false;

	apple.totalRows = function () {	// number of rows to be rendered
		return Math.floor(apple.canvas.innerHeight()/apple.pixelSize);
	};
	apple.totalCols = function () {	// number of columns each row contains
		return Math.floor(apple.canvas.innerWidth()/apple.pixelSize);
	};
	apple.genNewPosition = function () {
		apple.position = coord(
			(Math.floor(Math.random() * apple.totalRows() - 1) + 1),
			(Math.floor(Math.random() * apple.totalCols() - 1) + 1)
		);
	};
	apple.draw = function () {
		apple.show = !apple.show;
		if (!apple.show) return;

		var newPixel = $('<div></div>');
		newPixel.addClass('apple');
		newPixel.css({
			top: apple.position.x * apple.pixelSize,
			left: apple.position.y * apple.pixelSize
		});
		apple.canvas.append(newPixel);
	};

	if(!apple.position.x || !apple.position.y) {
		apple.genNewPosition();
	};
}