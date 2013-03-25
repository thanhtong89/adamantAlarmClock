'use strict';

/* Controllers */


////////////////////////// DRAWING OF THE CLOCK FACE /////////////////////
// SOURCE: www.script-tutorials.com/html5-clocks/
// Thank you for the wonderful sample code! :D
// draw functions :
function clear(ctx) { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawClockFace(canvas, ctx, clockImage, clockRadius) { // main drawClockFace function
    clear(ctx); // clear canvas

    // get current time
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hours = hours > 12 ? hours - 12 : hours;
    var hour = hours + minutes / 60;
    var minute = minutes + seconds / 60;

    // save current context
    ctx.save();

    // draw clock image (as background)
    ctx.drawImage(clockImage, 0, 0, 500, 500);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();

    // draw numbers
    ctx.font = '36px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var n = 1; n <= 12; n++) {
        var theta = (n - 3) * (Math.PI * 2) / 12;
        var x = clockRadius * 0.7 * Math.cos(theta);
        var y = clockRadius * 0.7 * Math.sin(theta);
        ctx.fillText(n, x, y);
    }

    // draw hour
    ctx.save();
    var theta = (hour - 3) * 2 * Math.PI / 12;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -25);
    ctx.lineTo(-15, 25);
    ctx.lineTo(clockRadius * 0.5, 10);
    ctx.lineTo(clockRadius * 0.5, -10);
    ctx.fill();
    ctx.restore();

    // draw minute
    ctx.save();
    var theta = (minute - 15) * 2 * Math.PI / 60;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -4);
    ctx.lineTo(-15, 4);
    ctx.lineTo(clockRadius * 0.8, -10);
    ctx.lineTo(clockRadius * 0.8, 10);
    ctx.fill();
    ctx.restore();

    // draw second
    ctx.save();
    var theta = (seconds - 15) * 2 * Math.PI / 60;
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.moveTo(-15, -3);
    ctx.lineTo(-15, 3);
    ctx.lineTo(clockRadius * 0.9, 1);
    ctx.lineTo(clockRadius * 0.9, -1);
    ctx.fillStyle = '#0f0';
    ctx.fill();
    ctx.restore();

    ctx.restore();
}

////////////////////////////////////////////////////////////////////////
function ClockController($scope, $timeout) {
	$scope.expiredAlarms = [10, 20, 30, 40];
	$scope.alarms = ["hello", "giuys"];
	$scope.clockRadius = 250;

	var myTimeout = $timeout($scope.onTimeout, 1000);
	
	$scope.canvas = document.getElementById('canvas');
    $scope.ctx = canvas.getContext('2d');

    // var width = canvas.width;
    // var height = canvas.height;

	$scope.clockImage = new Image();
	$scope.clockImage.src = 'images/cface.png';

	$scope.onTimeout = function(){
		drawClockFace($scope.canvas, $scope.ctx, $scope.clockImage, 
				$scope.clockRadius);
		myTimeout = $timeout($scope.onTimeout, 1000);		
	};

	var myTimeout = $timeout($scope.onTimeout, 1000);
}
//MyCtrl1.$inject = [];


function SettingsController() {
}
//MyCtrl2.$inject = [];