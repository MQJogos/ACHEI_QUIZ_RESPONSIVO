var question_bank = [
  {
    question: "How many street lights are there in bristol?",
    answers: ["10,638","26,500","35,139","43,195"],
    correct: 2
  },
  {
    question: "What is the current estimate of the population of Bristol?",
    answers: ["200,167", "455,966", "335,940", "155,846"],
    correct: 1
  },
  {
    question: "What age has the most population?",
    answers: ["25", "18","36","59"],
    correct: 0
  },
  {
    question: "How many christians are there in Bristol?",
    answers: ["15,745", "62,984", "180,653", "200,254"],
    correct: 3
  },
  {
    question: "How many Muslims are there in Bristol?",
    answers: ["11,631", "22,016", "200,653", "130,180"],
    correct: 1
  },
  {
    question: "What is the second most spoken language?",
    answers: ["Polish", "French", "Spanish", "Japanese"],
    correct: 0
  },
  {
    question: "How much of the population speak French?",
    answers: ["22,000", "503", "1403", "2304"],
    correct: 2
  },
  {
    question: "Which sex has more population in Bristol?",
    answers: ["Male", "Female"],
    correct: 0
  },
  {
    question: "What percentage of people are concerned about climate change?",
    answers: ["52%", "81%", "44%", "93%"],
    correct: 1
  },
  {
    question: "How many food banks are there?",
    answers: ["12", "88", "31", "16"],
    correct: 3
  },
  {
    question: "Which party has the most councillors?",
    answers: ["Green Party", "Lib Dems", "Labour", "Conservative"],
    correct: 2
  },
  {
    question: "How many people were killed or seriously injured in road traffic accidents last year",
    answers: ["230", "107", "11", "56"],
    correct: 1
  },
  {
    question: "How many people cycle to work?",
    answers: ["57,000", "2,500", "48,000", "92,000"],
    correct: 0
  },
  {
    question: "How many jobs in creative and digital industries?",
    answers: ["17,000", "1,000", "32,000", "6,000"],
    correct: 0
  },
  {
    question: "What is the employment rate?",
    answers: ["43%", "82%", " 77%", "68%"],
    correct: 2
  },
  {
    question: "What life expectancy of men in Bristol?",
    answers: ["82", "78", "68", "75"],
    correct: 1
  },
  {
    question: "What is the life expectancy of women in Bristol?",
    answers: ["82", "78", "52", "85"],
    correct: 0
  },
  {
    question: "What is the average speed on Bristol roads?",
    answers: ["5 mph", "20 mph", "15 mph", "10 mph"],
    correct: 2
  },
  {
    question: "How many cars are in Bristol?",
    answers: ["190,000", "105,038", "95,000", "48,000"],
    correct: 0
  },
  {
    question: "What is the Average earnings?",
    answers: ["£17,400 ", "£24,000 ", "£14,300 ", "£27,100 "],
    correct: 3
  }
].sort( function() { return 0.5 - Math.random() } );

var questions = [question_bank[0], question_bank[1], question_bank[2], question_bank[3], question_bank[4]];
//var questions = [question_bank[0], question_bank[1]];


var tags;
var tagsClass = "";
var liTagsid = [];
var correctAns = 0;
var quizPage = 1;

var currentIndex = 0;
var currentQuestion = questions[currentIndex];

var prevousQuestion;
var previousIndex = 0;

var ulTag = document.getElementsByTagName("ul")[0];
var button = document.getElementById("submit");
var questionTitle = document.getElementById("question");

//save class name so it can be reused easily
//if I want to change it, I have to change it one place
var classHighlight = "selected";
$('.total-questions').html('/' + questions.length)

// Display Answers and hightlight selected item
//------------------------------------------------------------------
function showQuestions() {
  if (currentIndex != 0) {
    // create again submit button only for next pages
    ulTag.innerHTML = "";
    button.innerHTML = "Submit";
    button.className = "submit";
    button.id = "submit";

    //update the number of questions displayed
    $("#current-question-number").html(quizPage);
  }

  //Display Results in the final page
  if (currentIndex == questions.length) {
    ulTag.innerHTML = "";
    document.getElementById("question").innerHTML = "";

    showResults();

    return;
  }

  questionTitle.innerHTML = currentQuestion.question;
  console.log(currentQuestion.question);

  // create a for loop to generate the answers and display them in the page
  for (var i = 0; i < currentQuestion.answers.length; i++) {
    // creating answers
    var newAns = document.createElement("li");
    newAns.id = "ans" + (i + 1);
    newAns.className = "notSelected";
    var textAns = document.createTextNode(currentQuestion.answers[i]);
    newAns.appendChild(textAns);
    var addNewAnsHere = document.getElementById("answer");
    addNewAnsHere.appendChild(newAns);

    console.log(currentQuestion.answers[i]);
  }

  //.click() will return the result of $('.notSelected')
  var $liTags = $(".notSelected").click(function(list) {
    list.preventDefault();
    //run removeClass on every element
    //if the elements are not static, you might want to rerun $('.notSelected')
    //instead of the saved $litTags
    $liTags.removeClass(classHighlight);
    //add the class to the currently clicked element (this)
    $(this).addClass(classHighlight);

    //get id name of clicked answer
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      // console.log(liTagsid[i]);
      if ($liTags[i].className == "notSelected selected") {
        //store information to check answer
        tags = $liTags[i].id;
        // tagsClass = $LiTags.className;
        console.log(tags);
        tagsClassName = $liTags[i];
      }
    }
  });

  //check answer once it has been submitted
  button.onclick = function() {
    checkAnswer();
  };
}

//self calling function
showQuestions();

// Show Correct Answer
//------------------------------------------------------------------
function checkAnswer() {
  // get selected list
  var selectedItem = document.getElementById(tags);

  // check that an answer has been selected
  if (selectedItem == undefined) {
    alert("Please selected an answer!");
    return;
  } else {
    // get user answer if form of text
    var userAns = selectedItem.innerHTML;
  }

  // change the background of the answer according to the Results
  if (userAns == currentQuestion.answers[currentQuestion.correct]) {
    console.log("Correct! The answer is: " + userAns);
    // change color of selected item by changing className
    selectedItem.className = "correct";
    // count the number of correct answers
    correctAns++;
    console.log(correctAns);
  } else {
    console.log(
      "Wrong! The corrent answer is: " +
        currentQuestion.answers[currentQuestion.correct]
    );
    //change the background of the wrong answer
    selectedItem.className = "wrong";
    //hightlight the right answer if the user got it wrong
    //change the class name of the correct answer
    ulTag.getElementsByTagName("li")[currentQuestion.correct].className =
      "correct";

    console.log(currentQuestion.answers[currentQuestion.correct]);
  }

  // Create a next Question button once the answer has been submitted
  button.innerHTML = "Next Question";
  button.className = "next";
  button.id = "next";

  prevousQuestion = currentQuestion;
  quizPage++;
  currentIndex++;
  currentQuestion = questions[currentIndex];

  // Start with the next question once the "Next" button has been clicked
  button.onclick = function() {
    showQuestions();
  };
  return;
}

// Final score
//------------------------------------------------------------------
function showResults() {
  //deleting page number
  $("#quiz-progress").html("");

  // Change Title
  questionTitle.innerHTML = "<h1>You Scored "+correctAns+ "/"+ questions.length+"</h1>";

  // Get the area that will be used to display the user's score
  var newInfo = document.getElementById("quiz-results");
  //Change the id and className of the area for the circle
  newInfo.innerHTML = "";
  newInfo.id = "circle";
  newInfo.className = "circle";

  //Create a Div for the fill element
  var newDiv = document.createElement("div");
  newDiv.className = "fill";
  var addHere = document.getElementById("circle");
  addHere.appendChild(newDiv);

  // add the score to the circle
  var newScore = document.createElement("h3");
  newScore.className = "score";
  var textScore = document.createTextNode(
    Math.floor(correctAns / questions.length * 100) + "%"
  );
  newScore.appendChild(textScore);
  addHere.appendChild(newScore);

  //use jquary to grab the text of the score
  var score = $(".score").text();

  //fill the circle in base of the score
  $(".fill").css("height", score);

  if (correctAns >= 5) {
    var newCongrats = document.createElement("p");
    var textCongrats = document.createTextNode(
      "Wow! Good Job! You know Bristol"
    );
    newCongrats.appendChild(textCongrats);
    document.getElementById("display-area").appendChild(newCongrats);
    
    confettiEffect();
  }
}













// Confetti Effect by Gtibo "Confetti Party"
//------------------------------------------------------------------
function confettiEffect (){
  //grabing area to create the effect
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  // creating the tabel
  particle = [];
  particleCount = 0,
  gravity = 0.3,
  colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722', '#795548'
  ];

  for( var i = 0; i < 300; i++){

    particle.push({
    	x : width/2,
    	y : height/2,
    	boxW : randomRange(5,20),
    	boxH : randomRange(5,20),
    	size : randomRange(2,8),

    	spikeran:randomRange(3,5),

    	velX :randomRange(-8,8),
    	velY :randomRange(-50,-10),

    	angle :convertToRadians(randomRange(0,360)),
    	color:colors[Math.floor(Math.random() * colors.length)],
    	anglespin:randomRange(-0.2,0.2),

    	draw : function(){
    		context.save();
        context.translate(this.x,this.y);
        context.rotate(this.angle);
    		context.fillStyle=this.color;
    		context.beginPath();

    	  context.fillRect(this.boxW/2*-1,this.boxH/2*-1,this.boxW,this.boxH);
    		context.fill();
				context.closePath();
    		context.restore();
    	  this.angle += this.anglespin;
        this.velY*= 0.999;
    	  this.velY += 0.3;

        this.x += this.velX;
        this.y += this.velY;

    		if(this.y < 0){
      	   this.velY *= -0.2;
      		 this.velX *= 0.9;
      	};

      	if(this.y > height){
        	this.anglespin = 0;
        	this.y = height;
        	this.velY *= -0.2;
      		this.velX *= 0.9;
    	  };

    		if(this.x > width ||this.x< 0){
        	this.velX *= -0.5;
        };
    	},
  	});
  }

  function drawScreen(){
  			context.globalAlpha = 1;
    		for( var i = 0; i < particle.length; i++){
    			particle[i].draw();
    		}
  }

	function loadImage(url){
		var img = document.createElement("img");
		img.src=url;
		return img;
	}

  function update(){
  context.clearRect(0,0,width,height);
  drawScreen();
  requestAnimationFrame(update);
  }

  update();

  function randomRange(min, max){
  	return min + Math.random() * (max - min );
  }

  function randomInt(min, max){
  	return Math.floor(min + Math.random()* (max - min + 1));
  }

   function convertToRadians(degree) {
        return degree*(Math.PI/180);
    }

		function drawStar(cx, cy, spikes, outerRadius, innerRadius,color) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.strokeSyle = "#000";
    context.beginPath();
    context.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y)
        rot += step
    }

    context.lineTo(cx, cy - outerRadius)
    context.closePath();
    context.fillStyle = color;
    context.fill();

  }
}
