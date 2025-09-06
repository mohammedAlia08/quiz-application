<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Application</title>
    <!-- Link your CSS file here -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div class="quiz">
        <h2 id="quizQuestionCounter">Question 1 of N</h2>
        <p id="questionText">Which language runs in a web browser?</p>

        <ul class="options" id="optionsList">
            <!-- Options will be rendered here by JavaScript -->
        </ul>

        <div class="controls">
            <button id="submitBtn">Submit</button>
            <button id="nextBtn" class="hidden">Next</button>
        </div>
    </div>

    <!-- Your custom message box will be appended here by JS -->

    <!-- Link your JavaScript file here -->
    <script src="js/script.js"></script>
</body>
</html>
