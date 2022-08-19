import {isAfter,isEqual,parseISO} from 'date-fns'
import { createEditTaskModalBox, editInputFill } from './edit-modalBox';

let tasks = [];
let taskNode;

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
    console.log(tasks);
  })
  taskEditIcon.addEventListener("click", (e) => {
    taskNode = e.target.parentNode.parentNode.id;
    if(document.getElementById('editModalBoxContainer') == null){
      createEditTaskModalBox(taskNode);
      editInputFill(taskNode);
      document.getElementById("editModalBoxContainer").style.display = "block";
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
  if(isAfter(parseISO(taskDate,1),parseISO(todayDate,1)) === false && isEqual(parseISO(taskDate,1),parseISO(todayDate)) === false){
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
    if (dateChecker(tasks[index].date, todayDate, taskTile) == 'overdue') {
      overDueSection.insertBefore(taskTile, overDueSection.childNodes[0]);
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

function deleteCompletedTasksInDOM(completedTasks){
  completedTasks.forEach(task => {
    task.remove();
  })
}

function deleteTaskInArray(index){
  tasks.splice(index,1);
}

function updateIdInDOM(){
  for (let index = 0; index < tasks.length; index++) {
    if(document.getElementById(`${index}`) == null){
      document.getElementById(`${index+1}`).id = `${index}`;
    }
    else{
      continue;
    }
  }
}

setInterval(()=>{
  const completedTasks = document.querySelectorAll('.completed')
  if(completedTasks.length > 0){
    [...completedTasks].forEach(task => {
      deleteTaskInArray(task.id);
    })
    deleteCompletedTasksInDOM(completedTasks);
    updateIdInDOM();
  }
  else{
    return;
  }
},3000);

export { createTask, createTaskModalBox, addTask, displayTask,tabChecker ,tasks ,indexReturn,updateIdInDOM};