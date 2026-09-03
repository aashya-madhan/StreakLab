function getToday() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function getPreviousDate(dateString) {
    const date = new Date(dateString + "T00:00:00");

    date.setDate(date.getDate() - 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function calculateCurrentStreak(completedDates) {

    if (!completedDates || completedDates.length === 0) {
        return 0;
    }

    const dates = [...new Set(completedDates)].sort().reverse();

    const today = getToday();

    let streak = 0;
    let currentDate = today;

    /*
     * If the habit wasn't completed today,
     * allow the streak to start from yesterday.
     */
    if (!dates.includes(today)) {
        currentDate = getPreviousDate(today);
    }

    for (const date of dates) {

        if (date === currentDate) {
            streak++;
            currentDate = getPreviousDate(currentDate);
        } else if (date < currentDate) {
            break;
        }
    }

    return streak;
}


function calculateBestStreak(completedDates) {

    if (!completedDates || completedDates.length === 0) {
        return 0;
    }

    const dates = [...new Set(completedDates)].sort();

    let best = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {

        const previous = new Date(
            dates[i - 1] + "T00:00:00"
        );

        const currentDate = new Date(
            dates[i] + "T00:00:00"
        );

        const difference =
            (currentDate - previous) /
            (1000 * 60 * 60 * 24);

        if (difference === 1) {
            current++;
            best = Math.max(best, current);
        } else {
            current = 1;
        }
    }

    return best;
}