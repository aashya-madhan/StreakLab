function createHabit(name) {

    return {
        id: Date.now(),
        name: name.trim(),
        completedDates: []
    };
}


function addHabit(name) {

    const habits = loadHabits();

    const cleanName = name.trim();

    if (!cleanName) {
        return false;
    }

    const duplicate = habits.some(
        habit =>
            habit.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (duplicate) {
        alert("This habit already exists.");
        return false;
    }

    habits.push(createHabit(cleanName));

    saveHabits(habits);

    return true;
}


function deleteHabit(id) {

    const habits = loadHabits();

    const updatedHabits = habits.filter(
        habit => habit.id !== id
    );

    saveHabits(updatedHabits);
}


function toggleHabitCompletion(id) {

    const habits = loadHabits();

    const habit = habits.find(
        habit => habit.id === id
    );

    if (!habit) {
        return;
    }

    const today = getToday();

    const index = habit.completedDates.indexOf(today);

    if (index === -1) {
        habit.completedDates.push(today);
    } else {
        habit.completedDates.splice(index, 1);
    }

    saveHabits(habits);
}