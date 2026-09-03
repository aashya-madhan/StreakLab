function renderHabits() {

    const habits = loadHabits();

    const habitList = document.getElementById("habitList");
    const emptyState = document.getElementById("emptyState");

    habitList.innerHTML = "";

    if (habits.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    habits.forEach(habit => {

        const today = getToday();

        const completedToday =
            habit.completedDates.includes(today);

        const streak =
            calculateCurrentStreak(habit.completedDates);

        const card = document.createElement("div");

        card.className = "habit-card";

        card.innerHTML = `
            <div class="habit-info">

                <div class="habit-icon">
                    ✓
                </div>

                <div>
                    <div class="habit-name">
                        ${escapeHTML(habit.name)}
                    </div>

                    <div class="habit-streak">
                        🔥
                        <span class="streak-number">
                            ${streak}
                        </span>
                        day${streak === 1 ? "" : "s"} streak
                    </div>
                </div>

            </div>

            <div class="habit-actions">

                <button
                    class="complete-btn ${completedToday ? "completed" : ""}"
                    onclick="completeHabit(${habit.id})"
                >
                    ${completedToday ? "✓ Completed" : "Complete"}
                </button>

                <button
                    class="delete-btn"
                    onclick="removeHabit(${habit.id})"
                    title="Delete habit"
                >
                    ×
                </button>

            </div>
        `;

        habitList.appendChild(card);
    });

    updateStatistics(habits);
}


function updateStatistics(habits) {

    const today = getToday();

    const completedToday = habits.filter(
        habit =>
            habit.completedDates.includes(today)
    ).length;

    let bestStreak = 0;

    habits.forEach(habit => {

        const best =
            calculateBestStreak(habit.completedDates);

        bestStreak = Math.max(bestStreak, best);
    });

    document.getElementById("totalHabits")
        .textContent = habits.length;

    document.getElementById("completedToday")
        .textContent = completedToday;

    document.getElementById("bestStreak")
        .textContent = bestStreak;

    document.getElementById("habitCount")
        .textContent =
        `${habits.length} habit${habits.length === 1 ? "" : "s"}`;
}


function completeHabit(id) {

    toggleHabitCompletion(id);

    renderHabits();
}


function removeHabit(id) {

    const habits = loadHabits();

    const habit = habits.find(
        habit => habit.id === id
    );

    if (!habit) {
        return;
    }

    const confirmed =
        confirm(`Delete "${habit.name}"?`);

    if (!confirmed) {
        return;
    }

    deleteHabit(id);

    renderHabits();
}


function displayCurrentDate() {

    const date = new Date();

    const formatted = date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

    document.getElementById("currentDate")
        .textContent = formatted;
}


function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}