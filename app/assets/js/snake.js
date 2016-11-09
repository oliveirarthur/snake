function Snake(canvas, pixelSize) {
	var snake = this;
	snake.canvas = canvas;
	snake.pixelSize = pixelSize;
	snake.positions = [];
	snake.direction = '';
	snake.validDirectionKeys = {
		'<': [37, 65],
		'^': [38, 87],
		'>': [39, 68],
		'v': [40, 83],
	};

	snake.updateCanvas = function (canvas) {	// allows the window to be resized
		snake.canvas = canvas;
	};
	snake.totalRows = function () {	// number of rows to be rendered
		return Math.floor(snake.canvas.innerHeight()/snake.pixelSize);
	}
	snake.totalColumns = function () {	// number of columns each row contains
		return Math.floor(snake.canvas.innerWidth()/snake.pixelSize);
	}
	snake.push = function (x, y) {	// Adds new elements to the end of an array, and returns the new length
		return snake.positions.push(coord(x, y));
	};
	snake.pop = function () {	// Removes the last element of an array, and returns that element
		return snake.positions.pop();
	};
	snake.unshift = function (x, y) {	// Adds new elements to the beginning of an array, and returns the new length
		return snake.positions.unshift(coord(x, y));
	};
	snake.shift = function () {	// Removes the first element of an array, and returns that element
		return snake.positions.shift();
	};
	snake.isValidDirectionKey = function (key) {
		for (var direction in snake.validDirectionKeys) {
			if(snake.validDirectionKeys[direction].indexOf(key) != -1){
				return true;
			}
		}
		return false;
	};
	snake.setDirection = function (newDirection) {
		for (var direction in snake.validDirectionKeys) {
			if(snake.validDirectionKeys[direction].indexOf(newDirection) != -1){
				snake.direction = direction;
				return;
			}
		}
		console.log('Invalid direction key: ' + newDirection);
	};
	snake.move = function () {
		var head = snake.positions[0];
		var newHead = coord(head.x, head.y);
		switch(snake.direction){
			case '^':
				newHead.x--;
				break;
			case 'v':
				newHead.x++;
				break; 
			case '<':
				newHead.y--;
				break;
			case '>': 
				newHead.y++;
				break;

			default:
				console.log('Where should I go? ' + snake.direction);
				break;
		}

		if(newHead.x > snake.totalRows()) newHead.x = 0;
		if(newHead.y > snake.totalColumns()) newHead.y = 0;
		if(newHead.x < 0) newHead.x = snake.totalRows() - 1;
		if(newHead.y < 0) newHead.y = snake.totalColumns() - 1;

		snake.pop();
		snake.unshift(newHead.x, newHead.y);

	};
	snake.draw = function () {
		snake.canvas.html('');
		for (var i = 0; i < snake.positions.length; i++) {
			var newPixel = $('<div></div>');
			newPixel.addClass('snake');
			newPixel.css({
				top: snake.positions[i].x * snake.pixelSize,
				left: snake.positions[i].y * snake.pixelSize
			});
			snake.canvas.append(newPixel);
		}
	};

	if (!snake.positions.length) {	// initialize the positions
		var initial = coord(Math.ceil(snake.totalRows()/2), Math.ceil(snake.totalColumns()/2));
		for (var i = 0; i < 4; i++) {
			snake.push(initial.x + i, initial.y);
		}
	}

}