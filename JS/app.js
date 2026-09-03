document.addEventListener("DOMContentLoaded", () => {

    const input =
        document.getElementById("habitInput");

    const button =
        document.getElementById("addHabitBtn");


    button.addEventListener("click", () => {

        const name = input.value;

        const added = addHabit(name);

        if (added) {
            input.value = "";
            renderHabits();
            input.focus();
        }
    });


    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            button.click();
        }
    });


    displayCurrentDate();

    renderHabits();
});