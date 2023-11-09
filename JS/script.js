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
              <li class= "container__section-task">
              <button class="js-done task__button"> ${task.done ? "✔️" : ""}</button>
              <span class="list__item ${task.done ? "list__item--done" : ""}">
              ${task.content}</span>
                <button class="js-remove task__delete">🗑️</button>
              </li>
            `;

        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };

    const addNewTask = (inputContent) => {
        const newTaskContent = inputContent.value.trim();

        if (newTaskContent === "") {
            return;
        }
        tasks.push({
            content: newTaskContent
        });
        inputContent.value="";
        render();
    };
    
    const onFormSubmit = (event) => {
        event.preventDefault();
        const inputContent = document.querySelector(".js-taskContent");
        inputContent.focus();
        addNewTask(inputContent);
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}