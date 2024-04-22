const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const addBtn = document.querySelector("#btn");
const taskForm = document.querySelector("#task-form");
const searchbtn = document.querySelector("#searchbtn");
const searchinput = document.querySelector("#search-input");

// Function to create a new task item
function createTaskElement(taskTitle) {
    const taskID = Date.now();
    const listItem = document.createElement("li");
    listItem.innerText = taskTitle;

     const editbtn = createEditButton(taskTitle,taskID);
     const deleteBtn = createDeleteButton(listItem);

    listItem.appendChild(editbtn);
    listItem.appendChild(deleteBtn);
   
    savedata();
    return listItem;

    function createEditButton(taskTitle,taskID){
        const editBtn = document.createElement("span");
        editBtn.innerHTML = "&nbsp;&#9998;";
        editBtn.className = "edit-btn";
        editBtn.addEventListener('click',function(){
            const newTaskTitle = prompt("Edit Task:",taskTitle);
            if(newTaskTitle !== "" && newTaskTitle !== null){
                taskTitle = newTaskTitle; // Update task title
                listItem.innerText = newTaskTitle;
                listItem.setAttribute("data-task-id", taskID);
                listItem.appendChild(editBtn);
                listItem.appendChild(deleteBtn);
                savedata();
            }
        });
        
        return editBtn;
    }

    function createDeleteButton(listItem){
        const deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = '&times';
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener('click',function(){
            listItem.remove();
            savedata();
        });
        return deleteBtn;
    }
}

// Add task event listener
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") {
        alert("Please add the task.");
    } else {
        const listItem = createTaskElement(taskTitle);
        taskList.appendChild(listItem);
        taskInput.value = "";
        savedata();
    }
});

searchbtn.addEventListener('click',(f)=>{
    f.preventDefault();
    const searchvalue = searchinput.value.trim().toLowerCase();
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach(task => {
        const taskTitle = task.textContent.trim().toLowerCase();
        if(taskTitle.includes(searchvalue)){
             task.style.display = 'block';
        }else{
            task.style.display = 'none';
            return;
        }
    })
    savedata();
})

function getdata() {
    taskList.innerHTML = localStorage.getItem("taskList") || "";
}

function savedata() {
    localStorage.setItem("taskList", taskList.innerHTML);
}

// Event delegation for marking tasks as done and deleting tasks
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata();
    } else if (e.target.classList.contains("delete-btn")) {
        const li = e.target.parentElement;
        li.remove();
        savedata();
    }
});

// Initial loading of tasks from localStorage
getdata();


