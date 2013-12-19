function toggleHover(obj)
{ 
	$(obj).attr("src", "images/show-response-hover.png");
}

function goBackBtnHandler(obj)
{
	// Pull lesson id
	var lessonId = $(obj).attr("data-lessonId");

	// Find the section header object and call the toggle function
	toggleSection(($(".section-header-active[data-lessonId='"+lessonId+"']")));
}

function showQuizBtnHandler(obj)
{
	dbo(obj);
}

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
		// Show check mark / x
		$(".answer-validity-container[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display", "");

		// Change button to "hide response"
		$(".question-show-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").addClass("question-hide-response");

		// Determine if the correct answer was checked by the student
		if($("input[name=lesson-"+lessonId+"-question-"+questionNumber+"]:radio:checked").val() == quizData[lessonId][questionNumber].correctAnswer)
		{
			// Toggle correct answer icon
			$(".answer-validity-container[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").html("<img src='images/check.png' />");
		}
		else
		{
			// TODO: toggle incorrect answer icon
			$(".answer-validity-container[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").html("<img src='images/x.png' />");
		}

		// Set the response container to be visable
		$(".question-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display", "block")
	}
	else
	{
		// TODO: Remove both icons
			
		// Hide the response container 
		$(".question-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display", "none")

		// TODO: toggle answer validity (check / x)
		$(".answer-validity-container[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").css("display", "none");

		// Change button to "hide response"
		$(".question-show-response[data-lessonId="+lessonId+"][data-questionNumber="+questionNumber+"]").removeClass("question-hide-response");
	}
	
}

function toggleSection(obj)
{
	// Get section id
	sectionId = $(obj).attr("id");

	// Get current state
	if ($(obj).attr("class") == "section-header-inactive")
	{
		// Remove arrow so section header looks proper
		$("#"+sectionId+"-arrow").css("display", "none");

		// Expand section content if necessary
		$(obj).next(".section-content").css("display", "block");

		// Replace section header background with active background
		$(obj).attr("class", "section-header-active");

		$(".section-header-inactive").css("display", "none");

	}
	else
	{
		// Remove arrow so section header looks proper
		$("#"+sectionId+"-arrow").css("display", "");

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

		$(".section-header-inactive").css("display", "");
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
		answerChoices += '<li><input type="radio" class="section-quiz-question-response-input" value="'+answerNumber+'" name="lesson-'+lessonId+'-question-'+questionNumber+'" id="lesson-'+lessonId+'-question-'+questionNumber+'-answer-'+answerNumber+'" data-lessonId="'+lessonId+'" data-questionNumber="'+questionNumber+'"/><label for="'+answerNumber+'" class="section-quiz-question-response-label">'+questionObj.answerChoices[x]+'</label></li>'
	}

	// Build question closing container string
	var closeContainer = '</ul></li></ul></div>';

	// Build response container
	var responseContainer = '<div data-lessonId='+lessonId+' data-questionNumber='+questionNumber+' class="question-response">'+responseContent+'</div>';

	// Build Show Answer Button
	var showAnswerButton = '<div data-lessonId='+lessonId+' data-questionNumber='+questionNumber+' class="question-show-response"><img data-lessonId='+lessonId+' data-questionNumber='+questionNumber+' class="answer-validity-container" /></div>';

	// Append question to content container
	//$('[class="section-content"][data-lessonId="'+lessonId+'"]').append(openContainer+answerChoices+closeContainer+responseContainer+showAnswerButton);

	// Consolidate entire quiz html
	var quizHtml = openContainer+answerChoices+closeContainer+responseContainer+showAnswerButton;

	// Return quiz html
	return quizHtml;

}

function buildQuiz(quizObj)
{
	// Instantiate container for quiz html
	var quizHtml = "";

	// Loop through the questions
	for (var x in quizObj)
	{
		// Build quiz question
		quizHtml = buildQuizQuestion(quizObj[x]);

		// Append it to DOM
		$('[class="section-content"][data-lessonId="'+quizObj[x].lessonId+'"]').append(quizHtml);
	}
}

function toggleCheckAnswerButtons(answerObject)
{
		
}

function toggleQuiz(lessonId)
{
	// Check current display status
	if ($("iframe").css("display") != "none")
	{
		// Remove iframes from display (effectively removing video lessons)
		$("iframe").css("display", "none");	

		// Display the quiz elements
		$(".section-question").css("display", "block");	
		$(".question-show-response").css("display", "block");	

		// Change the text of the show quiz button
		$(".show-quiz-btn").html("Show Lesson");
	}
	else
	{
		// Replace video lesson
		$("iframe").css("display", "");	

		// Set the alignment of the video container to center (may not be necessary)
		$(".section-content").css("text-align", "center");

		// Hide the quiz elements
		$(".section-question").css("display", "none");	
		$(".question-response").css("display", "none");	
		$(".question-show-response").css("display", "none");	

		// Change the text of the quiz button to "display quiz" from "show lesson"
		$(".show-quiz-btn").html("Show Quiz");
	}
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


function buildWrongRightBox(quizObj)
{
}

