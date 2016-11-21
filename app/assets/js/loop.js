function Loop(canvas, snake, apple) {
	var loop = this;
	loop.interval = 200;

	setInterval(function () {
//	setTimeout(function () {
		canvas.html('');
		snake.updateCanvas(canvas);
		snake.move();
		if(snake.verifyCollision(apple)){
			apple.genNewPosition();
			snake.grow(1);
		}
		apple.draw(canvas);
		snake.draw(canvas);
	}, loop.interval);
}