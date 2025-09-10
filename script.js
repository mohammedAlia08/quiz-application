const questions = [
  { text: "Question 1", options: ["A1","B1","C1","D1"], correct: 2 },
  { text: "Question 2", options: ["A2","B2","C2","D2"], correct: 1 },
  { text: "Question 3", options: ["A3","B3","C3","D3"], correct: 0 }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const answerList = document.getElementById('answer-list');
const submitBtn = document.getElementById('submit');
const nextBtn = document.getElementById('next');

function renderQuestion() {
  answered = false;
  answerList.innerHTML = '';
  const q = questions[currentIndex];
  questionEl.textContent = q.text;

  q.options.forEach((opt, idx) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = idx;
    li.appendChild(input);

    const text = document.createTextNode(opt);
    li.appendChild(text);

    answerList.appendChild(li);
  });

  submitBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none';
}

submitBtn.addEventListener('click', () => {
  if (answered) return;
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert('Please select an answer!');
    return;
  }
  const selIdx = +selected.value;
  if (selIdx === questions[currentIndex].correct) {
    score++;
  }
  highlightCorrect();
  submitBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
  answered = true;
});

function highlightCorrect() {
  const correctIdx = questions[currentIndex].correct;
  const allLis = answerList.querySelectorAll('li');
  allLis.forEach((li, idx) => {
    if (idx === correctIdx) {
      li.style.backgroundColor = 'rgb(144, 238, 144)';
    }
  });
}

nextBtn.addEventListener('click', () => {
  if (!answered) return;
  if (currentIndex === questions.length - 1) {
    alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
    // reset everything
    currentIndex = 0;
    score = 0;
    renderQuestion();
  } else {
    currentIndex++;
    renderQuestion();
  }
});

// Start
renderQuestion();


