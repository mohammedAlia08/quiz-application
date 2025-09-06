// Change 'correctIndex' to 'correct' as per your requirements
const questions = [
  {
      q: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      correct: 3
  },
  {
      q: "What does CSS stand for?",
      options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Control Style Sheets"],
      correct: 1
  },
  {
      q: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language", "Hyper Tool Multi Language"],
      correct: 0
  }
];

let current = 0;
let score = 0;

// Get DOM elements - UPDATED IDs
const questionTextEl = document.getElementById('question'); // Changed from 'questionText'
const optionsList = document.getElementById('answer-list'); // Changed from 'optionsList'
const submitBtn = document.getElementById('submit'); // Changed from 'submitBtn'
const nextBtn = document.getElementById('nextBtn'); // This ID remains the same
const quizQuestionCounter = document.getElementById('quizQuestionCounter'); // This ID remains the same

let messageBox = null;

// Function to show a custom message instead of using alert()
function showMessage(message, callback) {
    if (!messageBox) { // Create messageBox only once
        messageBox = document.createElement('div');
        messageBox.id = 'message-box';
        messageBox.className = 'message-overlay';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messageText = document.createElement('p');
        messageText.id = 'message-text';
        messageContent.appendChild(messageText);

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.className = 'message-ok-btn';
        okButton.addEventListener('click', () => {
            messageBox.style.display = 'none';
            if (callback) {
                callback();
            }
        });
        messageContent.appendChild(okButton);
        messageBox.appendChild(messageContent);
        document.body.appendChild(messageBox);
    }
    document.getElementById('message-text').textContent = message;
    messageBox.style.display = 'flex';
}

function renderQuestion() {
  optionsList.innerHTML = '';
  optionsList.classList.remove('disabled');

  const item = questions[current];
  questionTextEl.textContent = item.q;
  if (quizQuestionCounter) {
      quizQuestionCounter.textContent = `Question ${current + 1} of ${questions.length}`;
  }

  item.options.forEach((optText, i) => {
      const li = document.createElement('li');
      li.setAttribute('data-index', i);

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quizOption';
      radio.value = i;
      radio.id = `opt-${i}`;

      const label = document.createElement('label');
      label.setAttribute('for', `opt-${i}`);
      label.textContent = optText;

      li.appendChild(radio);
      li.appendChild(label);
      optionsList.appendChild(li);
  });

  // Ensure no incorrect highlight from previous questions
  optionsList.querySelectorAll('.incorrect').forEach(el => el.classList.remove('incorrect'));
  optionsList.querySelectorAll('.correct').forEach(el => el.classList.remove('correct'));

  submitBtn.classList.remove('hidden');
  nextBtn.classList.add('hidden');
}

function getSelected() {
  return optionsList.querySelector('input[name="quizOption"]:checked');
}

function showCorrectHighlight() {
  const correctIndex = questions[current].correct;
  const correctLi = optionsList.querySelector(`li[data-index="${correctIndex}"]`);
  if (correctLi) correctLi.classList.add('correct');
}

function disableOptions() {
  optionsList.classList.add('disabled');
  optionsList.querySelectorAll('input').forEach(inp => inp.disabled = true);
}

submitBtn.addEventListener('click', () => {
  const selected = getSelected();
  if (!selected) {
      showMessage("Please select an answer!");
      return;
  }

  const chosenIndex = Number(selected.value);
  const correctIndex = questions[current].correct;

  if (chosenIndex === correctIndex) {
      score++;
  } else {
      const chosenLi = optionsList.querySelector(`li[data-index="${chosenIndex}"]`);
      if (chosenLi) chosenLi.classList.add('incorrect');
  }

  showCorrectHighlight();

  disableOptions();

  submitBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
  if (current < questions.length - 1) {
      current++;
      renderQuestion();
  } else {
      showMessage(`Quiz finished! Your score is: ${score}/${questions.length}`, () => {
          resetQuiz();
      });
  }
});

function resetQuiz() {
  current = 0;
  score = 0;
  renderQuestion();
}

renderQuestion();
