var fullWidth = $('body').width(),
	fullHeight = $('body').height(),
	widthCenter = fullWidth / 2,
	heightCenter = fullHeight / 2,
	circleRadius = 25,
	mouseXposition,
	mouseyposition,
	detectRange = 4,
	moveUnit = 1,
	numberOfClicks = 0,

	fullScreenCanvas = document.getElementById("full-screen-canvas"),
	context = fullScreenCanvas.getContext("2d");

//Make canvas full screen
fullScreenCanvas.width = fullWidth;
fullScreenCanvas.height = fullHeight;

//Draw circle
function drawCircle(horizentalCenterPoint, verticalCenterPoint, circleRadius, fillColor, score) {
	//Clear pervious circle
	context.clearRect(0, 0, fullWidth, fullHeight);
	//draw new circle
	context.beginPath();
	context.arc(horizentalCenterPoint, verticalCenterPoint, circleRadius, 0, 2 * Math.PI);
	context.fillStyle = fillColor;
	context.closePath();
	context.fill();

	drawScore(score);
	/*var img = document.createElement('img');

	img.src = 'TeasingFace.png';
	context.arc(horizentalCenterPoint,verticalCenterPoint, circleRadius, 0, Math.PI*2,true);
	context.clip();

	img.addEventListener('load', function(e) {
	    context.fillStyle = context.createPattern(this, 'no-repeat');
	    context.fill();
	}, true);*/
}

//target circle
drawCircle(widthCenter, heightCenter, circleRadius, 'blue', numberOfClicks);

//hidden circle to detect mosue colliding
//drawCircle(widthCenter, heightCenter, circleRadius + 5, 'green');

function drawScore(numberOfClicks) {
	context.fillStyle = '#000000';
	context.font = "150px Verdana";	
	context.beginPath();
	context.fillText(numberOfClicks, 5, 120);
	context.closePath();
	context.fill();
}

$("#full-screen-canvas").mousemove(function(e) {
    mouseXposition = e.pageX;
    mouseYposition = e.pageY;

    if (Math.sqrt((mouseXposition - widthCenter) * (mouseXposition - widthCenter) + (mouseYposition - heightCenter) * (mouseYposition-heightCenter)) < circleRadius * detectRange) {
    	//moveCircle(mouseXposition, mouseYposition, widthCenter, heightCenter);
    	if (widthCenter > circleRadius && heightCenter > circleRadius && widthCenter < fullWidth - circleRadius && heightCenter < fullHeight - circleRadius) {
	    	if (mouseXposition >= widthCenter) {
	    		widthCenter -= moveUnit;
	    	}
			else if (mouseXposition <= widthCenter) {
				widthCenter += moveUnit;
			}
			if (mouseYposition >= heightCenter) {
				heightCenter -= moveUnit;
			}
			else if (mouseYposition <= heightCenter) {
				heightCenter += moveUnit;
			}
    		drawCircle(widthCenter, heightCenter, circleRadius, 'blue', numberOfClicks);
		}
		else {
			drawCircleAtCenter();
		}
    }
	//console.log(context.isPointInPath(mouseXposition, mouseYposition));
});

$("#full-screen-canvas").on('click', function (e){
    mouseXposition = e.pageX;
    mouseYposition = e.pageY;

	if (Math.sqrt((mouseXposition - widthCenter) * (mouseXposition - widthCenter) + (mouseYposition - heightCenter) * (mouseYposition-heightCenter)) < circleRadius) {
		moveUnit += 0.5;
		if (circleRadius > 5 && moveUnit % 1 === 0) {
			circleRadius -= 5;
		}
		numberOfClicks++;

		drawCircleAtCenter();
	}
});

/*function moveCircleX(mouseXposition, mouseYposition, widthCenter, heightCenter) {
	if (mouseXposition >= widthCenter) {
		return widthCenter--;
	}
	else if (mouseXposition <= widthCenter) {
		return widthCenter++;
	}
	else {
		return widthCenter;
	}
}
function moveCircleY(mouseXposition, mouseYposition, widthCenter, heightCenter) {
	if (mouseYposition >= heightCenter) {
		return heightCenter--;
	}
	else if (mouseYposition <= heightCenter) {
		return heightCenter++;
	}
	else {
		return heightCenter;
	}
}*/
function drawCircleAtCenter() {
	widthCenter = fullWidth / 2;
	heightCenter = fullHeight / 2;
	drawCircle(widthCenter, heightCenter, circleRadius, 'blue', numberOfClicks);
}