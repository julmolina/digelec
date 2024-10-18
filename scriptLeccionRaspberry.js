const questionContainer = document.getElementById('question-container');
const result = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');

const questions = [
    {
        question: "¿En que año fue el lanzamiento del raspberry PI?",
        answers: {
            A: "2005",
            B: "2010",
            C: "2012"
        },
        correct: "C"
    },
    {
        question: "¿Nombre del sistema operativo que utiliza la raspberry PI?",
        answers: {
            A: "Windows",
            B: "Raspbian",
            C: "Android"
        },
        correct: "B"
    },
    {
        question: "¿Cual es el otro lenguaje por excelencia ademas de Python para programar raspberry Pico?",
        answers: {
            A: "PHP",
            B: "JavaScript",
            C: "C/C++"
        },
        correct: "C"
    },
    {
        question: "¿Como funciona el ciclo While?",
        answers: {
            A: "Ejecuta un bloque de codigo, mietras una condicion sea verdadera",
            B: "Sirve para ingresar datos por teclado",
            C: "Ejecuta una instruccion si se cumple una condicion"
        },
        correct: "A"
    },
    {
        question: "¿Cual es el protocolo de comunicacion de la raspberry Pico?",
        answers: {
            A: "TCP/IP",
            B: "Bluthoot",
            C: "I2C"
        },
        correct: "C"
    },
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.querySelector('#question').textContent = currentQuestion.question;

    const options = questionContainer.querySelectorAll('.option');
    options.forEach(option => {
        const answerKey = option.dataset.answer;
        option.textContent = `${answerKey}. ${currentQuestion.answers[answerKey]}`;
        option.onclick = () => selectAnswer(answerKey);
    });

    result.classList.add('hidden');
    nextBtn.classList.add('hidden');
}

function selectAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
        result.textContent = "¡Correcto!";
    } else {
        result.textContent = `Incorrecto. La respuesta correcta es ${currentQuestion.correct}.`;
    }
    result.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        result.textContent = "¡Fin del juego!";
        questionContainer.classList.add('hidden');
        nextBtn.classList.add('hidden');
    }
};

loadQuestion();
