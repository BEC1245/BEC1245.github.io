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
        monthYear.textContent = `${year}년 ${getMonthName(month)}`;

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
                loadTodo()
            });
            daysContainer.appendChild(day);
        }
    }

    function getMonthName(month) {
        const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
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
        loadTodo()
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
            
            let header = document.createElement('div')
            let title = document.createElement('div')
            let content = document.createElement('div')
            let remove = document.createElement('div')

            header.classList.add('todo-header')
            title.classList.add('todo-title')
            remove.classList.add('todo-delete')
            remove.id = `${i}`
            content.classList.add('todo-content')
            remove.addEventListener('click', () => {
                deleteTodo(remove)
            })

            title.innerText = findIdx(arr[i], 1);
            content.innerText = findIdx(arr[i], 2);
            remove.innerText = 'X';
            header.appendChild(title)
            header.appendChild(remove)
            item.appendChild(header)  
            item.appendChild(content)         
            list.appendChild(item)
        }
    
    }

    function deleteTodo(target) {
        const date = localStorage.getItem('selected-date')
    
        let idx = 0;
        while(true) {
            if(localStorage.getItem(`${date}/${idx}`) !== null) {
                idx++;
            } else {
                break;
            }
        }
    
        target = parseInt(target.id);
        if(target === idx - 1) {
            localStorage.removeItem(`${date}/${target}`)
        } else {
            localStorage.removeItem(`${date}/${target}`)
            for(i = target; i < idx; i++) {
                localStorage.setItem(`${date}/${idx}`, localStorage.getItem(`${date}/${i + 1}`))
            }
        }
        loadTodo()
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