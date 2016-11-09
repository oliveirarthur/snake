$(document).ready(function () {
	var pixelSize = 10,	// width and height for each square of the snake
		canvas = $('div.canvas'),	// where the game is rendered
		snake = new Snake(canvas, pixelSize),
		apple = new Apple(canvas, pixelSize),
		direction = '^'
		;

	snake.setDirection(38);	// start upwards

	// snake event handler
	function changeSnakeDirection(event) {
		if (snake.isValidDirectionKey(event.which)) {
			snake.setDirection(event.which);
		}
	};
	// touch events
	$(document).on('swipeleft', changeSnakeDirection);
	$(document).on('swiperight', changeSnakeDirection);
	$(document).on('swipedown', changeSnakeDirection);
	$(document).on('swipeup', changeSnakeDirection);

	// keyboard events
	$(document).on('keydown', changeSnakeDirection);

	Loop(canvas, snake, apple);
});

