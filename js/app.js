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
	if (distance < 10) {
		$("#hotGuesses").append("<li>"+$guess+"</li>");
	} else {
		$("#coldGuesses").append("<li>"+$guess+"</li>");
	}
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

function repeatingYourself () {
    for(var i=0;i<guesses.length;i++)
    {
        if(guesses[i] === $guess) {
        	return true;
        } else {
        	return false;
        }
    }
}

function startNewGame() {
	num = Math.ceil(Math.random()*100);
	guesses = [];
	guessesLeft = 5;
	$("#updates p").text("Let's try this again with a new number. You have 5 guesses.");
	$(".game-box").removeClass("winner");
	$("#number-guess").val(function(){
	        return this.defaultValue;
	    });
}


$("#number-guess").on("keypress", function (event) {
	if (event.which == 13) {
		$("#submit-guess").click();
	}
});

$("#number-guess").on("click", function() {
	if (guessesLeft === 0) {
		$(this).val("Sorry, you're out of guesses!");
		startNewGame();
	}
});

//User to input a guess in the game-box input field
$("#submit-guess").on("click", function () {
	if (guessesLeft == 0) {
		alert("Game over!");
		startNewGame();
	} else {
	$guess = +$("#number-guess").val();
		//if input is not a valid number bet 1-100, alert user
		if (isNaN($guess) || ($guess == "") || ($guess%1 != 0) || ($guess > 100) || ($guess <1)) {
			alert("You need to submit a valid integer between 1 and 100 to play.");
		} else {
			//Determine whether the guess matches number & alert user
			if (isWinner()) {
				$(".game-box").addClass("winner"); //change background color or do something else exciting
				alert("You win!");
				startNewGame();		
			//if user runs out of guesses, let them know and start a new game		
			} else if (!isWinner() && (guessesLeft === 1)) {
				alert("Sorry, you're out of guesses. Let's start over.");
				startNewGame();
			} else {
				
				//tell user if they repeated any guesses, how hot or cold, and getting hotter or colder
				  if (repeatingYourself()) {		
					alert("You're repeating yourself!");
				} else if (guesses.length > 0) {
				alert("You're " + hotOrCold() + " but " + gettingWarmer() + "! Guess " + higherOrLower() + ".");
				}	else {
				alert("You're " + hotOrCold() + "! Guess " + higherOrLower());
				}
				//add current guess to log of previous guesses and lower number of guesses left
				guesses.push($guess);
				guessesLeft--;
				console.log(guesses, guessesLeft); //log to console to test	
				$("#updates p").text("Your guesses so far were " + guesses.join(", ") + ". Guesses left: " + guessesLeft + ".");

				//keep a list on display of Hot and Cold answers - need to work on this more
				//if ($("#hotGuesses").length > 1 || ("#coldGuesses").length > 1) {
				//	$(".guessList").css("display", "inline");
				//}
			}
			

		}
		
		$("#number-guess").val(function(){
	        return this.defaultValue;
	    });
	}
	});



//Start Over button allows user to start a new game
	//new random num generated
	//guessesLeft reset to 5
$("#newGame").on("click", startNewGame);

//Get a Hint button tells user the answer
$("#hint").on("click", function() {
	alert("The correct number is "+num+"!");
	//guessesLeft--;	 
});