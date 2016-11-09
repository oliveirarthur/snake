function loop(snake, canvas) {
	snake.updateCanvas(canvas);
	snake.move();
	snake.draw(canvas);
}