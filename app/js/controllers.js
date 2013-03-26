'use strict';

/* Controllers */


////////////////////////// DRAWING OF THE CLOCK FACE /////////////////////
// SOURCE: www.script-tutorials.com/html5-clocks/
// Thank you for the wonderful sample code! :D
// draw functions :
function clear(ctx) { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawClockFace(canvas, ctx, clockImage, clockRadius, soundFx) { // main drawClockFace function
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
    
    
    //------------------ Uses the same timestamp for checking alarms -----------
    // Note: currently referring to the beginning of the same day.
    var offsetDate = new Date (date.getFullYear(), date.getMonth(), date.getDate(),  0, 0, 0);
	
    checkAlarmEvents(60, date, offsetDate, soundFx);
}

/**
	@param announceIntervalSecs : in seconds
	@param currentTime     : Date object
	@param offset          : from when to calculate elapsed time? 
	@param soundFx         : reference to the sound handle
*/
function checkAlarmEvents (announceIntervalSecs, currentTime, offset, soundFx){
	
	/**var adjustedTime = currentTime - offset;
	var hours = adjustedTime.getHours();
	var minutes = adjustedTime.getMinutes();
	var seconds = adjustedTime.getSeconds();
	*/
	
	var currentTotalSecs = Math.floor ((currentTime - offset) / 1000);//hours*3600 + minutes*60 + seconds;

	if ( currentTotalSecs  % announceIntervalSecs == 0){
		soundFx.playSnd("sounds/time_is_now.wav");
		announceTimeOnly(currentTime, soundFx);
	}
}

/**
*	Announces the current time (no date.)
	@param time		a Date object 
*/
function announceTimeOnly(time, soundFx){
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	// default: AM
	// Rules: 0 hour -->  12  
	//        >= 12 hour ->  PM
	//        >=13 hour -> hour = hour - 12
	
	var AM_PM_Sound = (hours > 11 ? "sounds/pm.wav" : "sounds/am.wav");
	if (hours == 0){
		hours = 12;
	}
	else if (hours > 12){
		hours = hours - 12;
	}
	
	speakNumber(hours, soundFx);
	speakNumber(minutes, soundFx);
	soundFx.playSnd(AM_PM_Sound);
	
}

// currently only supports n up to 999
function speakNumber(n, soundFx){
	n = parseInt(n);
	if (n > 999){
		return;
	}
	console.log("less than ten?");
	if ( n < 10){
		switch (n){
			case 0:
				soundFx.playSnd("sounds/zero.wav");
				break;
			case 1:
				soundFx.playSnd("sounds/one.wav");
				break;
			case 2:
				soundFx.playSnd("sounds/two.wav");
				break;
			case 3:
				soundFx.playSnd("sounds/three.wav");
				break;
			case 4:
				soundFx.playSnd("sounds/four.wav");
				break;
			case 5:
				soundFx.playSnd("sounds/five.wav");
				break;
			case 6:
				soundFx.playSnd("sounds/six.wav");
				break;
			case 7:
				soundFx.playSnd("sounds/seven.wav");
				break;
			case 8:
				soundFx.playSnd("sounds/eight.wav");
				break;
			case 9:
				soundFx.playSnd("sounds/nine.wav");
				break;
		};
		
		return;
	}
	console.log("ten?");
	if (n == 10){
		soundFx.playSnd("sounds/ten.wav");
		return;
	}
	console.log("maybe 11-19? " + n);
	if (10 < n && n < 20){
		switch (n){
			case 11:
				soundFx.playSnd("sounds/eleven.wav");
				break;
			case 12:
				soundFx.playSnd("sounds/twelve.wav");
				break;
			case 13:
				soundFx.playSnd("sounds/thirteen.wav");
				break;
			case 14:
				console.log("fourteen!");
				soundFx.playSnd("sounds/fourteen.wav");
				break;
			case 15:
				soundFx.playSnd("sounds/fifteen.wav");
				break;
			case 16:
				soundFx.playSnd("sounds/sixteen.wav");
				break;
			case 17:
				soundFx.playSnd("sounds/seventeen.wav");
				break;
			case 18:
				soundFx.playSnd("sounds/eighteen.wav");
				break;
			case 19:
				soundFx.playSnd("sounds/nineteen.wav");
				break;	
		};
		return;
	}
	console.log("About to go deepest");
	// this breaks down a number like so: 356 ==> 300, 50, 6
	var hundreds = Math.floor (n / 100) * 100;
	var tens     = Math.floor ( n / 10) * 10 - hundreds ;
	var units    = n - hundreds - tens;
	
	console.log("hundred = " + hundreds + " tens " + tens + " units = " + units);  
	if (hundreds > 0) {
		speakNumber(hundreds / 100, soundFx);
		soundFx.playSnd("sounds/hundred.wav");
	}
	if (tens > 0) {
		if ( tens < 20) { // so 10, 11,... 19
			speakNumber ( tens + units, soundFx);
			return ; // ignore units!
		}
		else {
			switch (tens){
				case 20:
					soundFx.playSnd("sounds/twenty.wav");
					break;
				case 30:
					soundFx.playSnd("sounds/thirty.wav");
					break;
				case 40:
					console.log("Indeed forty");
					soundFx.playSnd("sounds/forty.wav");
					break;
				case 50:
					soundFx.playSnd("sounds/fifty.wav");
					break;
				case 60:
					soundFx.playSnd("sounds/sixty.wav");
					break;
				case 70:
					soundFx.playSnd("sounds/seventy.wav");
					break;
				case 80:
					soundFx.playSnd("sounds/eighty.wav");
					break;	
				case 90:
					soundFx.playSnd("sounds/ninety.wav");
					break;
			}
		}
	}
	
	if (units > 0){
		speakNumber(units, soundFx);
	}	
}
////////////////////////////////////////////////////////////////////////
function ClockController($scope, $timeout) {
	// for populating the datalists regarding time announcement interval
	$scope.hourIntervalOps = [];
	$scope.minuteIntervalOps = [];
	$scope.secondIntervalOps = [];
	
	for (var h = 0; h < 24; h++){
		$scope.hourIntervalOps.push(h);
	}
	for (var m = 0; m < 60; m++){
		$scope.minuteIntervalOps.push(m);
	}
	for (var s = 0; s < 60; s++){
		$scope.secondIntervalOps.push(s);
	}
	
	/////
	var curTime = new Date();
	$scope.expiredAlarms = [];
	for (var i = 0; i < 3; i++){
		var expAlarm = new Object();
		expAlarm.time = curTime;
		expAlarm.text = "expAlarm " + i.toString();
		$scope.expiredAlarms.push(expAlarm);
	};
	
	$scope.alarms = [];
	for (var i = 0; i < 3; i++){
		var alarm = new Object();
		alarm.timeRemaining = curTime;
		alarm.text = "alarm " + i.toString();
		$scope.alarms.push(alarm);
	};
	
	// Initializes sound element handler
	$scope.soundFx = document.getElementById('soundFx');
	
	// Needs to support automatic callback so we can call without explicit queue
	// of sounds to play
	$scope.soundFx.playing = false; // flag indicating whether playing or not
	$scope.soundFx.queue  = [];
	$scope.soundFx.playSnd = function (sourceStr) {
		this.queue.push(sourceStr);
		if (!this.playing){
			console.log("playing started");
			this.playSndRecurse("");
		}
		console.log("Now queue is " + this.queue);
	};
	$scope.soundFx.playSndRecurse = function (source){
		this.playing = true;
		this.src = source;
		if (source){
			this.play();
		}
		else {
			this.src =this.queue.shift() ;
			this.play();
		}
		
	};
	$scope.soundFx.addEventListener("ended", function (e){
			console.log("queue is now " + this.queue);
			var nextSource = this.queue.shift();
			if (nextSource){
				this.playSndRecurse(nextSource);
			}
			else {
				this.playing = false;
			}
		} );

	//TESTING
	
	$scope.speakNum = function (){
		speakNumber($scope.numToSpeech, $scope.soundFx);
	}
	///////// END TESTING
	
	$scope.clockRadius = 250;

	var myTimeout = function () {};
	$scope.canvas = document.getElementById('canvas');
    $scope.ctx = canvas.getContext('2d');

	$scope.clockImage = new Image();
	$scope.clockImage.src = 'images/cface.png';

	$scope.onTimeout = function(){
		drawClockFace($scope.canvas, $scope.ctx, $scope.clockImage, 
				$scope.clockRadius, $scope.soundFx);
		
		myTimeout = $timeout($scope.onTimeout, 1000);		
	};

	myTimeout = $timeout($scope.onTimeout, 1000);
	
	// stops the loop when leaving this clock view.
	$scope.$on('$destroy', function() {
		$timeout.cancel(myTimeout);
	});
	/////////// VARIOUS METHODS FOR HANDLING LISTS OF ALARMS////
	
	$scope.clearExpiredAlarms = function() {
		$scope.expiredAlarms.length = 0;
	};
	$scope.removeExpiredAlarm = function() {
	
	};
	
	$scope.clearUpcomingAlarms = function() {
		$scope.alarms.length = 0 ;
	};
	$scope.editUpcomingAlarm = function() {
	
	};
	
	
}
//MyCtrl1.$inject = [];


function SettingsController() {
}
//MyCtrl2.$inject = [];
