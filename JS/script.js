{
    let tasks = [];
    let hideTaskDone = false;

    const toggleHideTaskDone = () => {
        hideTaskDone = !hideTaskDone;
        render();
    };

    const switchHideTaskDone = () => {
        const hideTaskDoneButton = document.querySelector(".js-switchHideTaskDone");
        if (hideTaskDoneButton) {
            hideTaskDoneButton.addEventListener("click", () => {
                toggleHideTaskDone();
            });
        }
    };

    const removeTasks = (index) => {
        tasks = tasks.filter((task, i) => i !== index);
        render();
    };

    const doneTasks = (index) => {
        tasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, done: !task.done };
            }
            return task;
        });
        render();
    };

    const renderOptionsButtons = () => {
        if (tasks.length !== 0) {
            let optionsButtons = "";
            optionsButtons += `
            <button class="section__optionButton"> Ukończ wszystkie</button>
            <button class="section__optionButton js-switchHideTaskDone"> ${hideTaskDone ? "Wyświetl ukończone" : "Ukryj ukończone"}</button>
        `;
            document.querySelector(".js-optionTasksButton").innerHTML = optionsButtons;
        }
        else {
            document.querySelector(".js-optionTasksButton").innerHTML = "";
        }
        switchHideTaskDone();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        const doneButtons = document.querySelectorAll(".js-done");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTasks(index);
            });
        });

        doneButtons.forEach((doneButtons, index) => {
            doneButtons.addEventListener("click", () => {
                doneTasks(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
              <li class= "section__task ${task.done && hideTaskDone ? "section__task-hidden" : ""}">
              <button class="js-done task__button"> ${task.done ? "✓" : ""}</button>
              <span class="list__item ${task.done ? "list__item--done" : ""}">
              ${task.content}</span>
                <button class="js-remove task__delete">🗑️</button>
              </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };

    const render = () => {
        renderTasks();
        renderOptionsButtons();
    };

    const addNewTask = (inputContent) => {
        const newTaskContent = inputContent.value.trim();

        if (newTaskContent === "") {
            return;
        }

        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        inputContent.value = "";
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