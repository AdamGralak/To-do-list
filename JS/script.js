{
    const tasks = [
        {
            content: "zadanie 1",
            done: true,
        },
        {
            content: "zadanie 2",
            done: false,
        },
    ];

    const removeTasks = (index) =>{
        tasks.splice(index, 1);
        render();
    };

    const doneTasks = (index) =>{
        tasks[index].done=!tasks[index].done
        render();
    };

    const bindEvents = () =>{
        const removeButtons = document.querySelectorAll(".js-remove");
        const doneButtons = document.querySelectorAll(".js-done");

        removeButtons.forEach((removeButtons, index) =>{
            removeButtons.addEventListener("click", () =>{
                removeTasks(index);
            });
        });

        doneButtons.forEach((doneButtons, index) =>{
            doneButtons.addEventListener("click", () =>{
                doneTasks(index);
            });
        });
    }
    
    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
              <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
              <button class="js-done">Zrobione?</button>  
              <button class="js-remove">Usuń</button>
                ${task.content}
              </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };

    const addNewTask = () => {
        const newTaskContent = document.querySelector(".js-taskContent").value.trim();

        if (newTaskContent === "") {
            return;
        }
        tasks.push({
            content: newTaskContent
        });
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        addNewTask();
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}