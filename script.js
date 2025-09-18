"use strict";

const input = document.querySelector(".input");
const send = document.querySelector(".send");
const tasks = document.querySelector(".tasks");
const output = document.querySelector(".output");
const array = [];

const storedData = JSON.parse(localStorage.getItem("dataset")) || [];
array.push(...storedData);
storedData.forEach(addToDOM);

function updateTasks() {
    tasks.textContent = `${array.length} total task(s) - ${array.filter((item) => item.isDone === true).length} task(s) done 📌`;
}

updateTasks();

function emptyState() {
    if (output.children.length === 0) {
        const p = document.createElement("p");
        const div = document.createElement("div");

        p.textContent = "You have no task(s) left 📪";

        div.style.justifyContent = "center";
        div.classList.add("empty"); 

        div.append(p)

        output.append(div)
    }

    else {
        if(document.querySelector(".empty")) {
            document.querySelector(".empty").remove();
        }
    }
}

emptyState();

function addToDOM(task) {
    const div = document.createElement("div");
    const divBtn = document.createElement("div");
    const p = document.createElement("p");
    const mark = document.createElement("button");
    const del = document.createElement("button");
    const edit = document.createElement("button");

    p.textContent = task.text;
    mark.textContent = task.isDone ? "Unmark" : "Mark";
    del.textContent = "Delete";
    edit.textContent = "Edit";

    if(task.isDone) {
        p.classList.add("marked");
    }

    mark.addEventListener("click", function() {
        p.classList.toggle("marked");
        task.isDone = !task.isDone;

        mark.textContent = task.isDone ? "Unmark" : "Mark";

        localStorage.setItem("dataset", JSON.stringify(array));

        emptyState();

        updateTasks();
    });


    del.addEventListener("click", function() {
        div.remove();

        const index = array.findIndex(function(item) {
            return item.text === task.text;
        });

        if (index !== -1) {
            array.splice(index, 1);
        }

        localStorage.setItem("dataset", JSON.stringify(array));

        emptyState();

        updateTasks();
    });

    edit.addEventListener("click", function() {
        if(p.isContentEditable) {
            p.contentEditable = false;

            edit.textContent = "Edit";

            task.text = p.textContent;

            localStorage.setItem("dataset", JSON.stringify(array));

            emptyState();

            updateTasks();
        }

        else {
            p.contentEditable = true;

            edit.textContent = "Save";
        }
    });

    divBtn.append(mark, edit, del);

    div.append(p, divBtn);

    output.append(div);
};

send.addEventListener("click", function() {
    const newTask = {text: input.value, isDone: false};

    if (input.value !== "") {
        addToDOM(newTask);

        array.push(newTask);

        localStorage.setItem("dataset", JSON.stringify(array));

        input.value = "";

        emptyState();

        updateTasks();
    }
});

input.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        send.click()
    }
});