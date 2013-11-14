function bindSectionClickHandlers()
{
	// Attach tap and click handler to each of the section dividors	
	$(".section-header-active,.section-header-inactive").each(function()
	{
		$(this).bind("click", function()
		{
			toggleSection(this);
		});
	});

}

function bindButtonClickHandlers()
{
	// Attach tap and click handler to each of the section dividors	
	$(".question-show-response").each(function()
	{
		$(this).live("tap", function()
		{
			toggleResponse(this);
		});
	});
}

function toggleResponse(obj)
{
	// Pull lesson id
	var lessonId = $(obj).attr("data-lessonId");

	// Pull question id
	var questionNumber = $(obj).attr("data-questionNumber");

	dbo(lessonId);
	dbo(questionNumber);
	dbo($(".question-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display"));

	// Check the current state of the response container
	if ($(".question-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display") == "none")
	{
		dbo("state = none")
		// Set the response container to be visable
		$(".question-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display", "block")
	}
	else
	{
		dbo("state = block")
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

	// Pull correct answer value
	var correctAnswer = questionObj.correctAnswer;

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
		answerChoices += '<li><input type="radio" class="section-quiz-question-response-input" value="'+correctAnswer+'" name="lesson-'+lessonId+'-question-'+questionNumber+'" id="lesson-'+lessonId+'-question-'+questionNumber+'-answer-'+answerNumber+'"/><label for="'+correctAnswer+'" class="section-quiz-question-response-label">'+questionObj.answerChoices[x]+'</label></li>'
	}

	// Build question closing container string
	var closeContainer = '</ul></li></ul></div>';

	// Build response container
	var responseContainer = '<div data-lessonId='+lessonId+' data-questionNumber='+questionNumber+' class="question-response">'+responseContent+'</div>';

	// Build Show Answer Button
	var showAnswerButton = '<div data-lessonId='+lessonId+' data-questionNumber='+questionNumber+' class="question-show-response">Show Response</div>';

	// Append question to content container
	$('[class="section-content"][data-lessonId="'+lessonId+'"]').append(openContainer+answerChoices+closeContainer+responseContainer+showAnswerButton);

}

function buildQuiz(quizObj)
{
	// Instantiate a new quiz object to contain ordered questions
	var quiz = new Object();

	// Loop through questions
	for (var x in quizObj)
	{
		// Put questions in order
		quiz[quizObj[x].questionOrder] = quizObj[x];		
	}

	// Loop through the ordered questions
	for (var x in quiz)
	{
		// Build quiz question
		buildQuizQuestion(quiz[x]);
	}
}

