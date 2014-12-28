//Problem: Guessing game buttons do not respond when user clicks and game does not work as expected
//Solution: Add functionality to buttons to enable users to play game

//When game begins generate a random number bet 1-100
//prompt user to play the game (not necessary)

//display number of guesses left - starts at 5


//User to input a guess in the game-box input field

//User submits guess via submit button or hitting enter

//if input is not a valid number bet 1-100, alert user

	//Determine whether the guess matches the number
		//if they match 
			//alert user they won
			//reset the game 
			//change background color or do something else exciting

		//else 

			//add guess to list of previous guesses
				//if guess is repeat, tell them & let them have an extra guess
				//else decrease guesses left by 1

			//determine absolute value of diff between guess and number
				//if abs diff < 4, super hot
				//else if <10, hot
				//else if <20, warm
				//else if <40, cold
				//else (>=40), ice cold

			//tell user whether they need to guess higher or lower
				//if guess < num, guess higher
				//else, guess lower

			//on next guess let user know if they are getting hotter or colder

//when number of guesses reaches 0, alert game over

//Start Over button allows user to start a new game-box

//Get a Hint button tells user the answer