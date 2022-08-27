import { tasks, indexReturn, tabChecker, saveStorage } from "./task";

function createEditTaskModalBox() {
  const content = document.querySelector("#content");
  const modalBoxContainer = document.createElement("div");
  modalBoxContainer.id = "editModalBoxContainer";
  const modalBox = document.createElement("div");
  modalBox.id = "editModalBox";
  const taskName = document.createElement("div");
  taskName.textContent = "Task Name";
  const taskNameBox = document.createElement("input");
  taskNameBox.setAttribute("type", "text");
  taskNameBox.setAttribute("id", "editTaskNameBox");
  const description = document.createElement("div");
  description.textContent = "Description";
  const descriptionBox = document.createElement("textarea");
  descriptionBox.setAttribute("id", "editDescriptionBox");
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("optionsContainer");
  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Date";
  const dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  let today = new Date().toISOString().slice(0, 10);
  dateInput.setAttribute("min", `${today}`);
  dateInput.id = "editDateInput";
  const projectLabel = document.createElement("label");
  projectLabel.textContent = "Project";
  const projectInput = document.createElement("select");
  projectInput.setAttribute("id", "editProject");
  const projectOption1 = document.createElement("option");
  projectOption1.setAttribute("value", "inbox");
  projectOption1.textContent = "Inbox";
  projectInput.append(projectOption1);
  const occuranceLabel = document.createElement("label");
  occuranceLabel.textContent = "Occurance";
  const occuranceInput = document.createElement("select");
  occuranceInput.setAttribute("id", "editOccurance");
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
  priorityLabel.textContent = "Priority";
  const priorityInput = document.createElement("select");
  priorityInput.setAttribute("id", "editPriority");
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
  ButtonContainer.classList.add("buttonContainer");
  const createButton = document.createElement("button");
  createButton.textContent = "Edit Task";
  createButton.addEventListener("click", () => {
    const todaySection = document.getElementById("todaySection");
    const overDueSection = document.getElementById("overDueSection");
    const upcomingSection = document.getElementById("upcomingSection");
    const projectTabs = document.getElementById("sidePane").childNodes;
    const taskTile = document.getElementById(`${indexReturn()}`);
    editTaskInDom(indexReturn());
    editTaskInArray(tasks, indexReturn());
    saveStorage();
    let todayDate = new Date().toISOString().slice(0, 10);
    tabChecker(
      overDueSection,
      upcomingSection,
      todaySection,
      taskTile,
      indexReturn(),
      todayDate,
      projectTabs
    );
    modalBoxContainer.style.display = "none";
  });
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
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

function editTaskInArray(array, index) {
  document
    .getElementById(`${index}`)
    .classList.remove(`${array[index].project}`);
  array[index].taskName = document.getElementById("editTaskNameBox").value;
  array[index].description =
    document.getElementById("editDescriptionBox").value;
  array[index].date = document.getElementById("editDateInput").value;
  array[index].project = document.getElementById("editProject").value;
  array[index].priority = document.getElementById("editPriority").value;
  array[index].occurance = document.getElementById("editOccurance").value;
  document.getElementById(`${index}`).classList.add(`${array[index].project}`);
}

function editInputFill(index) {
  document.getElementById("editTaskNameBox").value = tasks[index].taskName;
  document.getElementById("editDescriptionBox").value =
    tasks[index].description;
  document.getElementById("editDateInput").value = tasks[index].date;
  document.getElementById("editProject").value = tasks[index].project;
  document.getElementById("editOccurance").value = tasks[index].occurance;
  document.getElementById("editPriority").value = tasks[index].priority;
}

function editTaskInDom(index) {
  let task = document.getElementById(`${index}`);
  task.childNodes[1].childNodes[0].textContent =
    document.getElementById("editTaskNameBox").value;
  task.childNodes[1].childNodes[1].textContent =
    document.getElementById("editDescriptionBox").value;
  task.childNodes[1].childNodes[2].textContent =
    document.getElementById("editDateInput").value;
  task.childNodes[2].childNodes[2].textContent =
    document.getElementById("editProject").value;
  task.childNodes[2].childNodes[3].textContent =
    document.getElementById("editPriority").value;
}

export { createEditTaskModalBox, editInputFill };
