document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const monthYear = document.getElementById("monthYear");
    const daysContainer = document.getElementById("days");
    const title = document.getElementById('todoTitle')
    const content = document.getElementById('todoContent')
    const list = document.getElementById('todoList')

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar(month, year) {
        //정보 초기화
        daysContainer.innerHTML = ""; 

        // 해더의 날자 내용을 반영
        monthYear.textContent = `${getMonthName(month)} ${year}`;

        // Get the first day of the month and the total days in the month
        let firstDay = new Date(year, month, 1);
        let lastDay = new Date(year, month + 1, 0);
        let startingDay = firstDay.getDay();

        // Create placeholders for days before the start day
        console.log(firstDay)
        for (let i = 0; i < startingDay; i++) {
            let emptyDay = document.createElement("div");
            emptyDay.classList.add("day", "empty");
            daysContainer.appendChild(emptyDay);
        }

        // Create days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            let day = document.createElement("div");
            day.textContent = i;
            day.classList.add("day");
            if (currentDate.getDate() === i && currentDate.getMonth() === month && currentDate.getFullYear() === year) {
                day.classList.add("today");
                localStorage.setItem('selected-date', `${currentYear}/${currentMonth}/${i}`)   
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

        localStorage.setItem('selected-date', `${currentYear}/${currentMonth}/${dayElement.textContent}`)   
    }

    function addTodo() {
        const date = localStorage.getItem('selected-date')
        
        let idx = 0;
        while(true) {
            if(localStorage.getItem(`${date}/${idx}`) !== null) {
                idx++;
            } else {
                break;
            }
        }
    
        localStorage.setItem(`${date}/${idx}`, `title:[${title.value}] content:[${content.value}]`)
    }
    document.getElementById('addTodoBtn').addEventListener("click", () => {
        addTodo()
    })    

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

function findKeyIdx(str, count) { // 위치
    let idx = -1;
    let isZero = count === 1;

    for(let i = 0; i < str.length; i++) {
        count -= str[i] === '/' ? 1 : 0;
        idx = count === 1 ? i : idx;

        if(isZero && count === 0) {
            return str.slice(0, i);
        }
        if(count === 0) {
            return str.slice(idx, i);
        } 
    }
    

    if(idx === -1) {
        alert('범위 초가')
        return '';
    }
    return str.slice(idx);
}

function loadTodo() {
    const list = document.getElementById('todoList')
    const date = localStorage.getItem('selected-date');
    let arr = []
    let idx = 0;
    while(true) {
        if(localStorage.getItem(`${date}/${idx}`) !== null) {
            arr.push(localStorage.getItem(`${date}/${idx}`))
            idx++;
        } else {
            break;
        }
    }

    list.innerHTML = "";

    console.log(arr);
    for(i = 0; i < arr.length; i++) {
        const item = document.createElement('div')
        item.classList.add('todo-item')
        
        let title = document.createElement('div')
        let content = document.createElement('div')
        title.classList.add('todo-title')
        title.innerText = findIdx(arr[i], 1);

        content.classList.add('todo-content')
        content.innerText = findIdx(arr[i], 2);
        item.appendChild(title)
        item.appendChild(content)           
        list.appendChild(item)
    }

}

function findIdx(str, count) { // 위치
    let counts = [count, count]
    let idx = [-1, -1]

    for(let i = 0; i < str.length; i++) {
        counts[0] -= str[i] === '[' ? 1 : 0;
        counts[1] -= str[i] === ']' ? 1 : 0;

        if(counts[0] === 0) {
            idx[0] = i;
            counts[0] = -1
        }
        if (counts[1] == 0) {
            idx[1] = i;
            break;
        }
    }

    return str.slice(idx[0] + 1, idx[1]);
}
