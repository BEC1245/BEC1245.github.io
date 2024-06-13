document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const monthYear = document.getElementById("monthYear");
    const daysContainer = document.getElementById("days");

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar(month, year) {
        // Clear previous month's days
        daysContainer.innerHTML = "";

        // Set the month and year in the header
        monthYear.textContent = `${getMonthName(month)} ${year}`;

        // Get the first day of the month and the total days in the month
        let firstDay = new Date(year, month, 1);
        let lastDay = new Date(year, month + 1, 0);
        let startingDay = firstDay.getDay();

        // Create placeholders for days before the start day
        for (let i = 0; i < startingDay; i++) {
            let day = document.createElement("div");
            day.classList.add("day", "empty");
            daysContainer.appendChild(day);
        }

        // Create days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            let day = document.createElement("div");
            day.textContent = i;
            day.classList.add("day");
            if (currentDate.getDate() === i && currentDate.getMonth() === month && currentDate.getFullYear() === year) {
                day.classList.add("today");
            }
            day.addEventListener("click", () => {
                selectDate(day);
            });
            daysContainer.appendChild(day);
        }
    }

    function getMonthName(month) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
    }

    function selectDate(dayElement) {
        // Remove existing selected class
        let selectedDay = document.querySelector(".selected");
        if (selectedDay) {
            selectedDay.classList.remove("selected");
        }
        // Add selected class to the clicked day
        dayElement.classList.add("selected");
    }

    renderCalendar(currentMonth, currentYear);

    prevBtn.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextBtn.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
});
