import {isBefore,isAfter,isEqual,parseISO,addDays,addMonths,addYears} from 'date-fns'
import { createEditTaskModalBox, editInputFill } from './edit-modalBox';
import { addProjectInDOM,projectTab } from './project'

let tasks;
let taskNode;

setTimeout(()=> {
  if(localStorage.getItem('taskArray') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('taskArray'))
    for (let index = 0; index < tasks.length; index++) {
      if(tasks[index].project != 'inbox' && document.getElementById(`${tasks[index].project}`) == null){
        addProjectInDOM(tasks[index].project)
        projectTab(tasks[index].project)
      }
      displayTask(index)            
    }
  }
},100)


function saveStorage(){
  localStorage.setItem('taskArray',JSON.stringify(tasks))
}

function createTask(taskName, description, date, project, occurance, priority) {
  return { taskName, description, date, project, occurance, priority };
}

function createTaskModalBox() {
  const content = document.querySelector("#content");
  const modalBoxContainer = document.createElement("div");
  modalBoxContainer.id = "modalBoxContainer";
  const modalBox = document.createElement("div");
  modalBox.id = "modalBox";
  const taskName = document.createElement("div");
  taskName.textContent = "Task Name";
  const taskNameBox = document.createElement("input");
  taskNameBox.setAttribute("type", "text");
  taskNameBox.setAttribute("id", "taskNameBox");
  const description = document.createElement("div");
  description.textContent = "Description";
  const descriptionBox = document.createElement("input");
  descriptionBox.setAttribute("type", "text");
  descriptionBox.setAttribute("id", "descriptionBox");
  const optionsContainer = document.createElement("div");
  optionsContainer.id = "optionsContainer";
  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "date");
  dateLabel.textContent = "Date";
  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  let today = new Date().toISOString().slice(0, 10);
  dateInput.setAttribute("min", `${today}`);
  dateInput.id = "dateInput";
  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "project");
  projectLabel.textContent = "Project";
  const projectInput = document.createElement("select");
  projectInput.setAttribute("id", "project");
  const projectOption1 = document.createElement("option");
  projectOption1.setAttribute("value", "inbox");
  projectOption1.textContent = "Inbox";
  projectInput.append(projectOption1);
  const occuranceLabel = document.createElement("label");
  occuranceLabel.setAttribute("for", "occurance");
  occuranceLabel.textContent = "Occurance";
  const occuranceInput = document.createElement("select");
  occuranceInput.setAttribute("id", "occurance");
  const occuranceOption1 = document.createElement("option");
  occuranceOption1.setAttribute("value", "Only once");
  occuranceOption1.textContent = "Only Once";
  const occuranceOption2 = document.createElement("option");
  occuranceOption2.setAttribute("value", "Daily");
  occuranceOption2.textContent = "Daily";
  const occuranceOption3 = document.createElement("option");
  occuranceOption3.setAttribute("value", "Weekly");
  occuranceOption3.textContent = "Weekly";
  const occuranceOption4 = document.createElement("option");
  occuranceOption4.setAttribute("value", "Monthly");
  occuranceOption4.textContent = "Monthly";
  const occuranceOption5 = document.createElement("option");
  occuranceOption5.setAttribute("value", "Yearly");
  occuranceOption5.textContent = "Yearly";
  occuranceInput.append(
    occuranceOption1,
    occuranceOption2,
    occuranceOption3,
    occuranceOption4,
    occuranceOption5
  );
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.textContent = "Priority";
  const priorityInput = document.createElement("select");
  priorityInput.setAttribute("id", "priority");
  const priorityOption1 = document.createElement("option");
  priorityOption1.setAttribute("value", "Low");
  priorityOption1.textContent = "Low";
  const priorityOption2 = document.createElement("option");
  priorityOption2.setAttribute("value", "Medium");
  priorityOption2.textContent = "Medium";
  const priorityOption3 = document.createElement("option");
  priorityOption3.setAttribute("value", "High");
  priorityOption3.textContent = "High";
  priorityInput.append(priorityOption1, priorityOption2, priorityOption3);
  const ButtonContainer = document.createElement("div");
  ButtonContainer.id = "buttonContainer";
  const createButton = document.createElement("button");
  createButton.textContent = "Create";
  createButton.addEventListener("click", () => {
    addTask();
    displayTask(tasks.length-1);
    saveStorage()
    taskNameBox.value = ''
    descriptionBox.value = ''
    modalBoxContainer.style.display = "none";
  });
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    taskNameBox.value = ''
    descriptionBox.value = ''
    modalBoxContainer.style.display = "none";
  });
  ButtonContainer.append(createButton, cancelButton);
  optionsContainer.append(
    dateLabel,
    dateInput,
    projectLabel,
    projectInput,
    occuranceLabel,
    occuranceInput,
    priorityLabel,
    priorityInput
  );
  modalBox.append(
    taskName,
    taskNameBox,
    description,
    descriptionBox,
    optionsContainer,
    ButtonContainer
  );
  modalBoxContainer.append(modalBox);
  content.append(modalBoxContainer);
}

function addTask() {
  let taskName = document.getElementById("taskNameBox").value;
  let description = document.getElementById("descriptionBox").value;
  let date = document.getElementById("dateInput").value;
  let project = document.getElementById('project').value;
  let occurance = document.getElementById("occurance").value;
  let priority = document.getElementById("priority").value;
  let task = createTask(
    taskName,
    description,
    date,
    project,
    occurance,
    priority
  );
  pushToArray(tasks, task);
}

function pushToArray(taskArray, task) {
  taskArray.push(task);
}

function displayTask(index) {
  const todaySection = document.getElementById("todaySection");
  const overDueSection = document.getElementById("overDueSection");
  const upcomingSection = document.getElementById('upcomingSection');
  const projectTabs = document.getElementById('sidePane').childNodes;
  const taskSection = document.createElement("div");
  taskSection.classList.add("taskSection");
  const taskTile = document.createElement("div");
  taskTile.id = `${index}`;
  taskTile.classList.add(`${tasks[index].project}`);
  const taskCheck = document.createElement("input");
  taskCheck.setAttribute("type", "checkbox");
  taskCheck.addEventListener("change",() => {
    if(completedTaskChangeInDOM(taskCheck) == true){
      taskTile.style.textDecorationLine = "line-through";
      taskTile.classList.add("completed");
    }
    else{
      taskTile.style.textDecorationLine = "none";
      taskTile.classList.remove("completed");
    }
  });
  const taskName = document.createElement("div");
  taskName.textContent = `${tasks[index].taskName}`;
  const description = document.createElement("div");
  description.textContent = `${tasks[index].description}`;
  const taskDate = document.createElement("div");
  taskDate.textContent = `${tasks[index].date}`;
  const taskOptions = document.createElement("div");
  taskOptions.classList.add("taskOptions");
  const project = document.createElement("div");
  project.textContent = `${tasks[index].project}`;
  const priority = document.createElement("div");
  priority.textContent = `${tasks[index].priority}`;
  const taskEditIcon = document.createElement("span");
  taskEditIcon.classList.add("material-symbols-outlined");
  taskEditIcon.textContent = "edit";
  const taskDeleteIcon = document.createElement("span");
  taskDeleteIcon.classList.add("material-symbols-outlined");
  taskDeleteIcon.textContent = "delete";
  taskDeleteIcon.addEventListener("click", () => {
    deleteTaskInArray(index);
    taskTile.remove();
    updateIdInDOM();
    saveStorage()
  })
  taskEditIcon.addEventListener("click", (e) => {
    taskNode = e.target.parentNode.parentNode.id;
    if(document.getElementById('editModalBoxContainer') == null){
      createEditTaskModalBox(taskNode);
      editInputFill(taskNode);
      document.getElementById("editModalBoxContainer").style.display = "block";
      saveStorage()
    }
    else{
      editInputFill(taskNode);
      document.getElementById("editModalBoxContainer").style.display = "block";
    }
  });
  taskOptions.append(taskEditIcon,taskDeleteIcon,project, priority);
  taskSection.append(taskName, description, taskDate);
  taskTile.append(taskCheck,taskSection, taskOptions);
  let todayDate = new Date().toISOString().slice(0, 10);
  tabChecker(overDueSection, upcomingSection, todaySection,taskTile,index,todayDate,projectTabs);
}

function dateChecker(taskDate,todayDate,taskDOM){
  if(isBefore(parseISO(taskDate,1),parseISO(todayDate,1)) === true && isEqual(parseISO(taskDate,1),parseISO(todayDate)) === false){
    taskDOM.classList.add('overDue')
    if(taskDOM.classList.contains('upcoming') == true || taskDOM.classList.contains('today') == true){
      taskDOM.classList.remove('upcoming');
      taskDOM.classList.remove('today');
    }
    return 'overDue'
  }
  else if(isEqual(parseISO(taskDate,1),parseISO(todayDate)) === true){
    taskDOM.classList.add('today')
    if(taskDOM.classList.contains('upcoming') == true || taskDOM.classList.contains('overDue') == true){
      taskDOM.classList.remove('upcoming');
      taskDOM.classList.remove('overDue');
    }
    return "today";
  }
  else if(isAfter(parseISO(taskDate,1),parseISO(todayDate,1)) === true){
    taskDOM.classList.add('upcoming')
    if(taskDOM.classList.contains('overDue') == true || taskDOM.classList.contains('today') == true){
      taskDOM.classList.remove('overDue');
      taskDOM.classList.remove('today');
    }
    return "upcoming";
  }
}

function tabChecker(overDueSection, upcomingSection, todaySection,taskTile,index,todayDate,projectTabs) {
  if (document.querySelector('#todayTab').classList.contains('active') || document.querySelector('#upcomingTab').classList.contains('active')) {
    if (dateChecker(tasks[index].date, todayDate, taskTile) == 'overDue') {
      overDueSection.insertBefore(taskTile, overDueSection.childNodes[0])
    }
    else if (dateChecker(tasks[index].date, todayDate, taskTile) == 'today') {
      todaySection.insertBefore(taskTile, todaySection.childNodes[0]);
    }
    else if (dateChecker(tasks[index].date, todayDate, taskTile) == 'upcoming') {
      upcomingSection.insertBefore(taskTile, upcomingSection.childNodes[0]);
    }
  }
  else {
    for (let i = 4; i < projectTabs.length - 1; i++) {
      if (document.querySelector(`#${projectTabs[i].id}Tab.active`) && tasks[index].project == projectTabs[i].id) {
        document.querySelector(`#${projectTabs[i].id}Section`).insertBefore(taskTile, document.querySelector(`#${projectTabs[i].id}Section`).childNodes[0]);
      }
      else {
        document.querySelector(`#${tasks[index].project}Section`).insertBefore(taskTile, document.querySelector(`#${tasks[index].project}Section`).childNodes[0]);
      }
    }
    dateChecker(tasks[index].date, todayDate, taskTile);
  }
}

function indexReturn(){
  return taskNode
}

function completedTaskChangeInDOM(checkbox){
  if(checkbox.checked){
    return true
  }
  else{
    return false
  }
}

function deleteTaskInArray(index){
  tasks.splice(index,1);
}

function updateIdInDOM(){
  if(tasks.length == 0){
    for (let index = 0; index < tasks.length; index++) {
      if(document.getElementById(`${index}`) == null){
        document.getElementById(`${index+1}`).id = `${index}`;
      }
      else{
        continue;
      }
    }
  }
  else{
    return;
  }
}

function occuranceChecker(index){
  if(tasks[index].occurance == 'Only once'){
    return false;
  }
  else if(tasks[index].occurance == 'Daily' || tasks[index].occurance == 'Weekly' || tasks[index].occurance == 'Monthly' || tasks[index].occurance == 'Yearly'){
    return true;
  }
}

function occuranceChangeInDOM(index){
  if(occuranceChecker(index) == true){
    let taskInDOM = document.getElementById(`${index}`)
    let taskInArray = tasks[index];
    if(taskInArray.occurance == 'Daily'){
      occuranceChangeInArray(index,taskInArray.occurance);
      taskInDOM.childNodes[1].childNodes[2].textContent = `${taskInArray.date}`;
    }
    else if(taskInArray.occurance == 'Weekly'){
      occuranceChangeInArray(index,taskInArray.occurance);
      taskInDOM.childNodes[1].childNodes[2].textContent = `${taskInArray.date}`;
    }
    else if(taskInArray.occurance == 'Monthly'){
      occuranceChangeInArray(index,taskInArray.occurance);
      taskInDOM.childNodes[1].childNodes[2].textContent = `${taskInArray.date}`;
    }
    else if(taskInArray.occurance == 'Yearly'){
      occuranceChangeInArray(index,taskInArray.occurance);
      taskInDOM.childNodes[1].childNodes[2].textContent = `${taskInArray.date}`;
    }
  }
}

function occuranceChangeInArray(index,occurance){
  let taskInArray = tasks[index];
  if(occurance == 'Daily'){
    taskInArray.date = `${addDays(parseISO(taskInArray.date),2).toISOString().slice(0, 10)  }`;
  }
  else if(occurance == 'Weekly'){
    taskInArray.date = `${addDays(parseISO(taskInArray.date),7).toISOString().slice(0, 10) }`;
  }
  else if(occurance == 'Monthly'){
    taskInArray.date = `${addMonths(parseISO(taskInArray.date),1).toISOString().slice(0, 10) }`;
  }
  else if(occurance == 'Yearly'){
    taskInArray.date = `${addYears(parseISO(taskInArray.date),1).toISOString().slice(0, 10) }`;
  }
}

setInterval(()=>{
  const completedTasks = document.querySelectorAll('.completed')
  completedTasks.forEach(task => {
    if(occuranceChecker(task.id) == false){
        deleteTaskInArray(task.id);
        task.remove();
        updateIdInDOM();
        saveStorage()
      }
    else if(occuranceChecker(task.id) == true){
      let todayDate = new Date().toISOString().slice(0, 10)
      document.getElementById(`${task.id}`).childNodes[0].checked = false;
      document.getElementById(`${task.id}`).style.textDecorationLine = 'none'; 
      document.getElementById(`${task.id}`).classList.remove('completed');
      occuranceChangeInArray(task.id);
      occuranceChangeInDOM(task.id);
      dateChecker(tasks[task.id].date, todayDate, document.getElementById(`${task.id}`));
      tabChecker(document.getElementById("overDueSection"), document.getElementById('upcomingSection'), document.getElementById("todaySection"), document.getElementById(`${task.id}`), task.id, todayDate, document.getElementById('sidePane').childNodes);
      updateIdInDOM();
      saveStorage()
    }
    else{
      return;
    }
  })
},3000);

export { createTask, createTaskModalBox, addTask, displayTask,tabChecker ,tasks ,indexReturn,updateIdInDOM,saveStorage};