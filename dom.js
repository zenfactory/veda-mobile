function bindSectionClickHandlers()
{
	// Attach tap and click handler to each of the section dividors	
	$(".section-header-active,.section-header-inactive").each(function()
	{
		$(this).click(function()
		{
			toggleSection(this);
		});
	});
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

/*
function buildQuizQuestion(questionObj)
{
	<div id="chw-overview-quiz" class="section-quiz">
        <ol>
            <li>
                <span class="section-quiz-question"></span>
                <ul style="width: 100%">

					// Loop over answer choices
                    <li><input type="radio" class="section-quiz-question-response-input" /><label class="section-quiz-question-response-label">Sample Answer</label></li>

                </ul>
            </li>
        </ol>
    </div>

}

function buildQuiz(quizObj)
{
}

*/
