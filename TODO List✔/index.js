let todoTaskElem = document.querySelector('#todoMaker')
let todoListContainer = document.querySelector('#todoListContainer');
let taskValueList = JSON.parse(localStorage.getItem("allTasks"));
let taskItem = "";

function taskValueStorer() {
    todoTaskElem.addEventListener('keypress', (e) => {
        taskValue = e.target.value;
        if (e.key == "Enter" && taskValue.trim() != "") {
            if (!taskValueList)
                taskValueList = [];
            taskValueList.push(taskValue);
            localStorage.setItem("allTasks", JSON.stringify(taskValueList))
            taskItem="";
            e.target.value="";
            taskCreator();
        }

    })
}

function taskCreator() {
    if(taskValueList){
    taskValueList.forEach((taskValue, id) => {
        taskItem += `<div class="todoListItems">
                    <label for="${id}" class="todoListItemsTask" onclick="updateTask(this,${id})" >
                    <input id="${id}" type="checkbox">
                    <h4>${taskValue}</h4>
                    </label>
                    <div class="todoListItemsDelete" onclick="deleteTask(this,${taskValue})">
                        X
                    </div>
                    </div>`
        todoListContainer.innerHTML = taskItem;

    })
}
}

function clearStorage(){
    localStorage.clear();
    taskValueList=[];
    todoListContainer.innerHTML = "";

}

function deleteTask(task,taskValue){
    taskValueList.splice(taskValueList.indexOf(taskValue),1);
    task.parentElement.remove();
    localStorage.setItem("allTasks", JSON.stringify(taskValueList))

    
}

function updateTask(task,id){
    if(document.getElementById(id).checked)
    task.style.textDecoration="line-through";
    else
        task.style.textDecoration="none";

}
taskValueStorer();
taskCreator();