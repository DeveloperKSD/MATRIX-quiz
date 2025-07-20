// ===== python.js =====
// Sample questions array (5 Python questions)
const questions = [
    {
        code: `def greet():\n    print("Hello, Matrix!")`,
        question: "What is the output of this code?",
        answer: "Hello, Matrix!"
    },
    {
        code: `x = 5\ny = 3\nprint(x + y)`,
        question: "What is the output?",
        answer: "8"
    },
    {
        code: `for i in range(2):\n    print(i * "*")`,
        question: "What does this loop print?",
        answer: "\n*"  // \n represents new line
    },
    {
        code: `def double(n):\n    return n * 2\n\nprint(double(4))`,
        question: "What is printed?",
        answer: "8"
    },
    {
        code: `nums = [1, 2, 3]\nprint(nums[1])`,
        question: "What is the output?",
        answer: "2"
    }
];

let currentQuestion = 0;

// Load current question into the page
function loadQuestion() {
    const q = questions[currentQuestion];
    document.querySelector(".code-snippet pre").textContent = q.code;
    document.querySelector(".problem-text").textContent = q.question;
    document.querySelector(".question-number").textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    document.getElementById("user-answer").value = "";
}

// Check answer and handle next question
function checkAnswer() {
    const userAnswer = document.getElementById('user-answer').value.trim();
    const correctAnswer = questions[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        Swal.fire({
            title: '✅ Correct!',
            text: 'Loading next question...',
            icon: 'success',
            confirmButtonColor: '#800080',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false
        }).then(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                Swal.fire({
                    title: '🏆 Challenge Complete!',
                    text: 'You answered all Python questions!',
                    icon: 'success',
                    confirmButtonColor: '#800080'
                }).then(() => {
                    window.location.href = "index.html"; // Return to home
                });
            }
        });
    } else {
        Swal.fire({
            title: '❌ Try Again!',
            text: 'Check your answer carefully.',
            icon: 'error',
            confirmButtonColor: '#800080',
        });
    }
}

// Keyboard support (Enter key to submit)
document.getElementById('user-answer').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Back button logic
document.getElementById('back-button').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    } else {
        window.location.href = "index.html";
    }
});

// Initialize first question when page loads
window.onload = loadQuestion;

// Submit button event listener
document.getElementById('submit-button').addEventListener('click', checkAnswer);