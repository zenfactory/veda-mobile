function toggleResponse(obj)
{
	// Pull lesson id
	var lessonId = $(obj).attr("data-lessonId");

	// Pull question id
	var questionNumber = $(obj).attr("data-questionNumber");

	// Pull question object
	quizData[lessonId][questionNumber]

	

	// Check the current state of the response container
	if ($(".question-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display") == "none")
	{
		// Determine if the correct answer was checked by the student
		if($("input[name=lesson-"+lessonId+"-question-"+questionNumber+"]:radio:checked").val() == quizData[lessonId][questionNumber].correctAnswer)
		{
			// TODO: toggle correct answer icon
			dbo("correct");
		}
		else
		{
			// TODO: toggle incorrect answer icon
			dbo("incorrect");
		}

		// Set the response container to be visable
		$(".question-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display", "block")
	}
	else
	{
		// TODO: Remove both icons
			
		// Hide the response container 
		$(".question-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display", "none")
	}
	
}

function toggleSection(obj)
{
	// Get section id
	sectionId = $(obj).attr("id");

	// Get current state
	if ($(obj).attr("class") == "section-header-inactive")
	{
		// Expand section content if necessary
		$(obj).next(".section-content").css("display", "block");

		// Replace section header background with active background
		$(obj).attr("class", "section-header-active");

		// Replace section header arrow with active arrow
		$(obj).children().each(function()
		{
			// Check to see if this is the active / non active arrow
			if ($(this).hasClass("section-arrow"))
			{
				// Replace with in-active arrow
				$(this).attr("src", "images/active-arrow.png");
			}
		});

		// Bind event handlers to newly created elements
		//bindButtonClickHandlers();
	}
	else
	{
		// Colapse section content if necessary
		$(obj).next(".section-content").css("display", "none");

		// Replace section header background with active background
		$(obj).attr("class", "section-header-inactive");

		// Replace section header arrow with active arrow
		$(obj).children().each(function()
		{
			// Check to see if this is the active / non active arrow
			if ($(this).hasClass("section-arrow"))
			{
				// Replace with in-active arrow
				$(this).attr("src", "images/inactive-arrow.png");
			}
		});
	}
}

function stripHTMLentities(stringContent)
{
	// Sanity Check
	if (typeof(stringContent) != "undefined" && stringContent != null && stringContent != "")
	{
		// Clean up question content
		stringContent = stringContent.replace(/&lt;\/li&gt;&lt;li/g, "");
		stringContent = stringContent.replace(/&lt;\/li&gt;&lt;\/ul/g, "");
		stringContent = stringContent.replace(/&lt;p style=/g, "");
		stringContent = stringContent.replace(/&lt;p/g, "");
		stringContent = stringContent.replace(/&lt;b/g, "");
		stringContent = stringContent.replace(/&lt;p&gt;/g, "");
		stringContent = stringContent.replace(/&lt;\/p/g, "");
		stringContent = stringContent.replace(/&lt;/g, "");
		stringContent = stringContent.replace(/&gt;/g, "");
		stringContent = stringContent.replace(/\/p/g, "");
		stringContent = stringContent.replace(/\/b/g, "");
		stringContent = stringContent.replace(/&quot;/g, "");
		stringContent = stringContent.replace(/=/g, "");
		stringContent = stringContent.replace(/style/g, "");
		stringContent = stringContent.replace(/&amp;nbsp;/g, " ");
		stringContent = stringContent.replace(/style=&quot;&quot;&gt;/g, " ");
		stringContent = stringContent.replace(/\"/g, "");
		stringContent = stringContent.replace(/&lt;ul/g, "");
		stringContent = stringContent.replace(/&lt;li/g, "");
		stringContent = stringContent.replace(/&lt;\/li/g, "");
		stringContent = stringContent.replace(/&lt;\/ul/g, "");
		stringContent = stringContent.replace(/[0-9]+px/g, "");
		stringContent = stringContent.replace(/font-size:/g, "");
		stringContent = stringContent.replace(/;/g, "");
		stringContent = stringContent.replace(/ul li/g, "");
		stringContent = stringContent.replace(/ulli/g, "");
	}

	// Return
	return stringContent;
}

function buildQuizQuestion(questionObj)
{
	// Pull the lesson id from the question object
	var lessonId = questionObj.lessonId;

	// Pull the question number form the question object
	var questionNumber = questionObj.questionOrder;

	// Instantiate answer choice variable
	var answerChoices = "";

	// Clean up question content
	var questionContent = stripHTMLentities(questionObj.content);

	// Clean up response content
	var responseContent = stripHTMLentities(questionObj.response);

	// Build question opening container string
	var openContainer = "<div id='lesson-"+lessonId+"-question-"+questionNumber+"' class='section-question'><ul><li><span class='section-quiz-question'>"+questionContent+"</span><ul style='width: 100%'>";

	// Loop through possible responses
	for (var x in questionObj.answerChoices)
	{
		var answerNumber = parseInt(x, 10) + parseInt(1, 10);	
		answerChoices += '<li><input type="radio" class="section-quiz-question-response-input" value="'+answerNumber+'" name="lesson-'+lessonId+'-question-'+questionNumber+'" id="lesson-'+lessonId+'-question-'+questionNumber+'-answer-'+answerNumber+'"/><label for="'+answerNumber+'" class="section-quiz-question-response-label">'+questionObj.answerChoices[x]+'</label></li>'
	}

	// Build question closing container string
	var closeContainer = '</ul></li></ul></div>';

	// Build response container
	var responseContainer = '<div data-lessonId='+lessonId+' data-questionNumber='+questionNumber+' class="question-response">'+responseContent+'</div>';

	// Build Show Answer Button
	var showAnswerButton = '<div data-lessonId='+lessonId+' data-questionNumber='+questionNumber+' class="question-show-response">Show Response</div>';

	// TODO:
	// Design to slice up correct answer and incorrect answer icon boxes

	// Append question to content container
	$('[class="section-content"][data-lessonId="'+lessonId+'"]').append(openContainer+answerChoices+closeContainer+responseContainer+showAnswerButton);

}

function structureQuizData(quizData)
{
	// Instantiate new object to hold structured quiz data
	var structuredData = new Object();

	// Loop through quizes
    for (var x in quizData)
    {
		// Create container for quiz
		var quiz = new Object();

		// Loop through quiz questions
		for (var y in quizData[x])
		{
			// Order each question in the quiz object
			quiz[quizData[x][y].questionOrder] = quizData[x][y];

			// Extract the lessonId
			var lessonId = quizData[x][y].lessonId;
		}

		// Append the ordered quiz to the structured quiz data using the lesson id as the index
		structuredData[lessonId] = quiz;
	
	}

	// Return
	return structuredData;
}

function buildQuiz(quizObj)
{
	// Instantiate a new quiz object to contain ordered questions
	var quiz = new Object();
	
	// Loop through the questions
	for (var x in quizObj)
	{
		// Build quiz question
		buildQuizQuestion(quizObj[x]);
	}
}

function buildWrongRightBox(quizObj)
{
}

