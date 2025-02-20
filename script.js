// script.js

// Sample data for suggestions
const data = ["Milan Adhikari", "", "Cherry", "Date", "Grapes", "Mango", "Orange", "Papaya", "Pineapple", "Strawberry"];

function showSuggestions(value) {
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = ""; // Clear previous suggestions

    if (!value) {
        suggestionsBox.style.display = "none";
        return;
    }

    let filteredData = data.filter(item => item.toLowerCase().includes(value.toLowerCase()));

    if (filteredData.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    filteredData.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = item;
        listItem.onclick = function () {
            document.getElementById("searchBox").value = item;
            suggestionsBox.style.display = "none";
        };
        suggestionsBox.appendChild(listItem);
    });

    suggestionsBox.style.display = "block";
}







// script.js

const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar(month, year) {
    monthYear.innerText = `${months[month]} ${year}`;
    calendarDays.innerHTML = "";

    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        let emptyDiv = document.createElement("div");
        calendarDays.appendChild(emptyDiv);
    }

    for (let date = 1; date <= lastDate; date++) {
        let dayDiv = document.createElement("div");
        dayDiv.innerText = date;

        if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayDiv.classList.add("today");
        }

        calendarDays.appendChild(dayDiv);
    }
}

prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);








// script.js

document.getElementById("yesBtn").addEventListener("click", function() {
    document.getElementById("response").textContent = "Great! You will receive sports updates.";
});

document.getElementById("noBtn").addEventListener("click", function() {
    document.getElementById("response").textContent = "No worries! You won’t receive sports updates.";
});




function buttonClick() {
    alert("Button Clicked! 🎉");
}











