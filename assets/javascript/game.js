var hangmanObject = {
	 randomWords: ['nebula','kepler space telescope','quasar', 'supernova'],
	 chosenWord: "",
	 numWins: 0,
	 numLives: 10,
	 play: true,

	 empty: [], //You can have empty array and no size declartaions in javascript because everything can be added during runtime.
	 incorrect: [],
	 splitArray: []
}
function startFunction() 
{
		document.getElementById("video").style.visibility = "hidden";
		document.getElementById("PlayAgainContainer").style.visibility = "hidden"; //Only works with ID
		document.getElementById("nebula").style.visibility = "hidden";
		document.getElementById("kepler").style.visibility = "hidden";
		document.getElementById("quasar").style.visibility = "hidden";
		document.getElementById("spot").style.visibility = "hidden";
		document.getElementById("numLives").innerHTML = hangmanObject.numLives;
		// document.getElementById("myAudio").play();
		// play();
		displayChosenWord();
}
function displayChosenWord()
{
	hangmanObject.chosenWord = hangmanObject.randomWords[Math.floor(Math.random()*hangmanObject.randomWords.length)]

	hangmanObject.splitArray = hangmanObject.chosenWord.split("");
	for (x = 0; x < hangmanObject.chosenWord.length; x++)
	{
		if (hangmanObject.chosenWord.charAt(x) === " ")
			hangmanObject.empty.push(" ");
		else
			hangmanObject.empty.push(" _ ");
			// hangmanObject.empty[x] = " _ " //Didnt even need to use push. Can also do it like this.
	}

			document.getElementById("blanks").innerHTML = hangmanObject.empty.join("");
}
function wrong(userGuess)
{
			   	hangmanObject.numLives--;
			   	document.getElementById("numLives").innerHTML = hangmanObject.numLives;
			   	hangmanObject.incorrect.push(userGuess);
			   	document.getElementById("LettersGuessed").innerHTML = hangmanObject.incorrect;
}
function win()
{
			   	hangmanObject.numWins++;
			   	document.getElementById("wins").innerHTML = hangmanObject.numWins;
			   	if (hangmanObject.chosenWord === hangmanObject.randomWords[0])
			   	{
			   		document.getElementById("nebula").style.visibility = "visible";
			   	}
			   	else if (hangmanObject.chosenWord === hangmanObject.randomWords[1])
			   	{
			   		document.getElementById("kepler").style.visibility = "visible";
			   	}
			   	else if (hangmanObject.chosenWord === hangmanObject.randomWords[2])
			   	{
			   		document.getElementById("quasar").style.visibility = "visible";
			   	}
			    else if (hangmanObject.chosenWord === hangmanObject.randomWords[3])
			    {
			   		document.getElementById("spot").style.visibility = "visible";
			    }
			   	hangmanObject.play = false;
}
function lose()
{
				// document.getElementById("lose").innerHTML = "YOU LOSE!!";
				//Can increment a losses variable here and update it on html
				hangmanObject.play = false;
}


/* Captures Key Clicks. Whenever the key is pressed and is back up, everything inside happens. That is why I had 
move the random generator outside of this function, so that everytime I press a letter on the keyboard, the 
computer will not choose another random word before the current round of hangman finishes. In the rock, paper
scissors exercise, when the random generator was put outside the onkeyup function, it would just choose either 
rock, paper or scissors permanently*/
document.onkeyup = function(event) 
{
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	if (hangmanObject.play === true)
	{

		for (x = 0; x < hangmanObject.chosenWord.length; x++)
			{
				if (hangmanObject.chosenWord.charAt(x) === userGuess)
			   		{
			   			hangmanObject.empty[x] = userGuess;
			   				
			   			document.getElementById("blanks").innerHTML = hangmanObject.empty.join("");
			   		}
			}
		
		if (hangmanObject.splitArray.indexOf(userGuess) === -1) //checking to see if wrong letter chosen
			{
				// if (hangmanObject.incorrect.indexOf(userGuess) === 0) //checking to see if wrong letter chosen
				// {
				// 	alert("Letter Already Guessed!");
				// }
				// else
					wrong(userGuess);
			}
		if (hangmanObject.empty.indexOf(" _ ") === -1) //This part was not working becaue I was checking the split array, which already holds all the letters of the randomly chosen word. I had to check and see if the empty array had all the " _ " replaced with a character.
			{
				win();
			}
		if (hangmanObject.numLives <= 0)
			{
				lose();
			}
		if (hangmanObject.play === false)
			{
				document.getElementById("PlayAgainContainer").style.visibility = "visible";
			   	document.getElementById("Play").innerHTML = '<img src = "assets/images/again.png">';
			    //document.onkeyup = function(event) // Did not need this second on keyup function inside this onleyup function. Since this question already comes up inside the onkeyup function, when the user presses y, it alrady calls the exisiting onkeyup function you are inside of
				// {	   
					// var Choice = String.fromCharCode(event.keyCode).toLowerCase();//Also did not need this line of code since I already have a variable that stores the key the user pressed (userGuess)
					// if (userGuess === 'y')
					//  {
					//  	hangmanObject.play = true;
					// 	document.getElementById("LettersGuessed").innerHTML = "";
					// 	document.getElementById("Play").innerHTML = "";
					// 	hangmanObject.numLives = 10;
					// 	document.getElementById("numLives").innerHTML = hangmanObject.numLives;
					// 	hangmanObject.empty = []; //This line of code and one below is to reset these arrays back to empty ones. Without these, the new chosen word will just show up next to the previous selected word.
					// 	hangmanObject.incorrect = [];
					// 	displayChosenWord();
					//  }
					//  else if (userGuess === 'n')
					//  {
					//  	document.getElementById("gameOver").innerHTML = "GAME OVER";
					//  	document.onkeyup = null;
					//  }
			}
	}
	else 
	{
		if (userGuess === 'y')
					{
					 	hangmanObject.play = true;
					 	document.getElementById("PlayAgainContainer").style.visibility = "hidden";
					 	document.getElementById("nebula").style.visibility = "hidden";
					 	document.getElementById("kepler").style.visibility = "hidden";
					 	document.getElementById("quasar").style.visibility = "hidden";
					 	document.getElementById("spot").style.visibility = "hidden";
					 	// document.getElementById("lose").innerHTML = "";
						document.getElementById("LettersGuessed").innerHTML = "";
						// document.getElementById("Play").innerHTML = "";
						hangmanObject.numLives = 10;
						document.getElementById("numLives").innerHTML = hangmanObject.numLives;
						hangmanObject.empty = []; //This line of code and one below is to reset these arrays back to empty ones. Without these, the new chosen word will just show up next to the previous selected word.
						hangmanObject.incorrect = [];
						displayChosenWord();
					 }
		else if (userGuess === 'n')
					 {
					 	// document.getElementById("gameover").width = "1000";
					 	document.getElementById("gameover").innerHTML = '<img src="assets/images/Game_over.jpg">';
					 	document.getElementById("PlayAgainContainer").style.visibility = "hidden"; //Only works with ID
						document.getElementById("nebula").style.visibility = "hidden";
						document.getElementById("kepler").style.visibility = "hidden";
						document.getElementById("quasar").style.visibility = "hidden";
						document.getElementById("spot").style.visibility = "hidden";
					 	document.onkeyup = null;
					 }
	}
}
	 





