document.addEventListener("DOMContentLoaded", () => {
    let tasks = JSON.parse(localStorage.getItem("Todo")) || [];
    tasks.forEach((task) => {
        displayTask(task.task, task.description);
    });
});

let submit_responce = document.querySelector("#add-task");

submit_responce.addEventListener("click", (e) => {
    let task = document.querySelector("#task");
    let desc = document.querySelector("#desc");

    let task_input = task.value;
    let desc_input = desc.value;

    if (task.value == "" || desc.value == "") {
        e.preventDefault();
        submit_responce.innerText = "Fields cannot be empty!";
        submit_responce.style.backgroundColor = "grey";
        submit_responce.style.cursor = "not-allowed";

        setTimeout(() => {
            submit_responce.style.backgroundColor = "#218838";
            submit_responce.innerText = "ADD TASK";
            submit_responce.style.cursor = "pointer";
        }, 4000);
    }
    else {
        let tasks = JSON.parse(localStorage.getItem("Todo")) || [];
        tasks.push({ task: task_input, description: desc_input });
        localStorage.setItem("Todo", JSON.stringify(tasks));

        displayTask(task_input, desc_input);

        task.value = "";
        desc.value = "";
    }
});

function displayTask(task_input, desc_input) {
    let output = document.createElement("div");
    output.classList.add("res");
    document.body.appendChild(output);
    output.innerHTML = `
        <h3>TASK : ${task_input}</h3>
        <p>DESCRIPTION : ${desc_input}</p>
        <button class="del-task">Delete</button>
    `;

    output.querySelector(".del-task").addEventListener("click", (e) => {
        let tasks = JSON.parse(localStorage.getItem("Todo")) || [];
        tasks = tasks.filter((task) => task.task !== task_input);
        localStorage.setItem("Todo", JSON.stringify(tasks));
        output.remove();
    });
};