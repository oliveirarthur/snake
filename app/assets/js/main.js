$(document).ready(function () {
	var pixelSize = 10,	// width and height for each square of the snake
		canvas = $('div.canvas'),	// where the game is rendered
		snake = new Snake(canvas, pixelSize),
		direction = '^'
		;

	snake.setDirection(38);	// start upwards
	$(document).on('keydown', function (event) {
		if (snake.isValidDirectionKey(event.which)) {
			snake.setDirection(event.which);
		}
	});

	$(document).on('keyup', function (event) {
		// event.preventDefault();
		// loop();
	});

	setInterval(function () {
//	setTimeout(function () {
		loop(snake, canvas);
	}, 1000);
});

