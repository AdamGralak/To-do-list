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

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
              <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
                ${task.content}
              </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
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