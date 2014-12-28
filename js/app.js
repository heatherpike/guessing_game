//Problem: Guessing game buttons do not respond when user clicks and game does not work as expected
//Solution: Add functionality to buttons to enable users to play game

//When game begins generate a random number bet 1-100
var num = Math.ceil(Math.random()*100);
var $guess = null;
var guesses = [];
var guessesLeft = 5;

function isWinner() {
	return ($guess === num);
}

function hotOrCold() {
	//determine absolute value of diff between guess and number
	var distance = Math.abs(num - $guess);

	//if abs diff < 4, super hot
	if (distance < 4) {
		return "super hot";
	} 			
	//else if <10, hot
	else if (distance < 10) {
		return "hot";
	}
	//else if <20, warm
	else if (distance < 20) {
		return "warm";
	}
	//else if <40, cold
	else if (distance < 40) {
		return "cold";
	}
	//else (>=40), ice cold
	else {
		return "ice cold";
	}
}

function higherOrLower() {
	//tell user whether they need to guess higher or lower
	if (num > $guess) {
		return "higher";
	}
	else {
		return "lower";
	}
}

function gettingWarmer() {
	for (var i=guesses.length-1; i >= 0; i--) {
		 if (Math.abs(num - $guess) > Math.abs(num - guesses[i])) {
			return "getting colder";
		} else if (Math.abs(num - $guess) < Math.abs(num - guesses[i])) {
			return "getting hotter";
		} else {
			return "not getting hotter or colder";
		}
	}
}

//display number of guesses left - starts at 5


//User to input a guess in the game-box input field
$("#submit-guess").on("click", function () {
	
	$guess = +$("#number-guess").val();
	console.log($guess); //log to console to test
	
//User submits guess via submit button or hitting enter

//if input is not a valid number bet 1-100, alert user
	if (isNaN($guess) || ($guess == "") || ($guess%1 != 0)) {
		alert("You need to submit a valid integer between 1 and 100 to play.");
	} else {
		//Determine whether the guess matches number & alert user
		if (isWinner()) {
			$(".game-box").css("background", "#fff"); //change background color or do something else exciting
			alert("You win!");
			guessesLeft = 0;			
		}

		else {
			
			//tell user if they are hot or cold and getting hotterr or colder
			if ($guess == guesses[guesses.length-1]) {
			alert("You're repeating yourself!");
			} else if (guesses.length > 0) {
			alert("You're " + hotOrCold() + " but " + gettingWarmer() + "! Guess " + higherOrLower() + ".");
			}	else {
			alert("You're " + hotOrCold() + "! Guess " + higherOrLower());
			}
			//add current guess to log of previous guesses and lower number of guesses left
			guesses.push($guess);
			guessesLeft--;
			console.log(guesses); //log to console to test
		}
		

		}
	
	});


//when number of guesses reaches 0, disable submit button & alert game over

//Start Over button allows user to start a new game
	//new random num generated
	//guesses reset to 5
$("#newGame").on("click", function() {
	num = Math.ceil(Math.random()*100);
	guessesLeft = 5;
	console.log("num is " + num);
});
//Get a Hint button tells user the answer
$("#hint").on("click", function() {
	alert("The correct number is "+num+"!");
	guessesLeft = 0;
	 
});