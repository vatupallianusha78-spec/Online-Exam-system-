let timeLeft = 300;
let timerInterval;

const correctAnswers = {
    q1: "a",
    q2: "b",
    q3: "a",
    q4: "a",
    q5: "a"
};

function startExam() {
    const name = document.getElementById("studentName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    document.getElementById("displayName").textContent = name;
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("exam-screen").classList.remove("hidden");

    startTimer();
}

function startTimer() {
    updateTimerDisplay();

    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time is over!");
            submitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function submitExam() {
    clearInterval(timerInterval);

    let score = 0;

    for (const question in correctAnswers) {
        const selected = document.querySelector(
            'input[name="' + question + '"]:checked'
        );

        if (selected && selected.value === correctAnswers[question]) {
            score++;
        }
    }

    const name = document.getElementById("studentName").value;
    const percentage = (score / 5) * 100;

    document.getElementById("resultName").textContent = name;
    document.getElementById("score").textContent =
        "Score: " + score + " / 5";

    document.getElementById("percentage").textContent =
        "Percentage: " + percentage + "%";

    document.getElementById("resultMessage").textContent =
        percentage >= 40 ? "Result: PASS" : "Result: FAIL";

    document.getElementById("exam-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
}

function restartExam() {
    clearInterval(timerInterval);

    timeLeft = 300;

    document.getElementById("examForm").reset();
    document.getElementById("timer").textContent = "05:00";

    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("studentName").value = "";
}
