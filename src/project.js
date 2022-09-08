/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable import/no-cycle */
/* eslint-disable quotes */
import {
  createTaskModalBox, tasks, updateIdInDOM, saveStorage,
} from "./task";
import { sidePaneEventListener } from "./home-today-UI";
import { createEditTaskModalBox } from "./edit-modalBox";

let tempProject;

function deleteProjectTasksInArray(tasks, projectName) {
  tasks
    .filter((task) => task.project === projectName)
    .forEach((task) => tasks.splice(tasks.indexOf(task), 1));
}

function deleteProjectModalBox() {
  const deleteProjectModalBoxContainer = document.createElement("div");
  deleteProjectModalBoxContainer.id = "deleteProjectModalBoxContainer";
  const deleteProjectModalBox = document.createElement("div");
  deleteProjectModalBox.id = "deleteProjectModalBox";
  const deleteProjectTitle = document.createElement("div");
  deleteProjectTitle.textContent = `Are you sure you want to Delete ${tempProject} folder which also deletes all the tasks in it?`;
  const deleteProjectYes = document.createElement("button");
  deleteProjectYes.textContent = "Yes";
  deleteProjectYes.addEventListener("click", () => {
    const projectTasks = document.querySelectorAll(`.${tempProject}`);
    deleteProjectTasksInArray(tasks, tempProject);
    saveStorage();
    projectTasks.forEach((task) => {
      task.remove();
      updateIdInDOM();
    });
    const projectTab = document.getElementById(`${tempProject}Tab`);
    projectTab.remove();
    const sidePaneProject = document.getElementById(`${tempProject}`);
    sidePaneProject.remove();
    const optionProject = document.querySelectorAll(
      `option[value=${tempProject}]`,
    );
    optionProject.forEach((option) => {
      option.remove();
    });
    deleteProjectModalBoxContainer.style.display = "none";
  });
  const deleteProjectNo = document.createElement("button");
  deleteProjectNo.textContent = "No";
  deleteProjectNo.addEventListener("click", () => {
    deleteProjectModalBoxContainer.style.display = "none";
  });
  deleteProjectModalBox.append(
    deleteProjectTitle,
    deleteProjectYes,
    deleteProjectNo,
  );
  deleteProjectModalBoxContainer.append(deleteProjectModalBox);
  document.getElementById("content").append(deleteProjectModalBoxContainer);
}

function projectTabTasks(projectName) {
  const projectSection = document.getElementById(`${projectName}Section`);
  const tasksInProject = document.getElementsByClassName(`${projectName}`);
  for (let i = 0; i < tasksInProject.length; i++) {
    projectSection.insertBefore(tasksInProject[i], projectSection.firstChild);
  }
}

function sideTabChecker(tab) {
  const sidePaneTabs = document.getElementById("sidePane").childNodes;
  for (let index = 0; index < sidePaneTabs.length; index++) {
    if (sidePaneTabs[index] === tab || sidePaneTabs[index] === tab.parentElement) {
      sidePaneTabs[index].style.backgroundColor = "#95ED8D";
    } else if (
      sidePaneTabs[index].id === "createProject"
        || sidePaneTabs[index].id === "dashboard"
        || sidePaneTabs[index].id === "projects"
    ) {
      sidePaneTabs[index].style.backgroundColor = "white";
    } else {
      sidePaneTabs[index].style.backgroundColor = "#D9D9D9";
    }
  }
}

function projectEventListener() {
  const projectList = document.getElementById("sidePane").childNodes;
  const contentChild = document.getElementById("content").childNodes;
  for (let index = 4; index < projectList.length - 1; index++) {
    projectList[index].addEventListener("click", (e) => {
      sideTabChecker(e.target);
      for (let i = 1; i < contentChild.length; i++) {
        if (contentChild[i].id === `${projectList[index].id}Tab`) {
          contentChild[i].style.display = "flex";
          projectTabTasks(projectList[index].id);
        } else {
          contentChild[i].style.display = "none";
        }
      }
      const projectTasks = tasks.filter(
        (task) => task.project === projectList[index].id,
      );
      projectTasks.forEach((task) => {
        projectTabTasks(task.project);
      });
    });
  }
}

function addProjectInDOM(projectName) {
  if (document.getElementById("project") == null) {
    createTaskModalBox();
  }
  if (document.getElementById("editProject") == null) {
    createEditTaskModalBox();
  }
  const createButton = document.getElementById("createProject");
  const project = document.getElementById("project");
  const editProject = document.getElementById("editProject");
  const projectOption = document.createElement("option");
  projectOption.setAttribute("value", `${projectName}`);
  projectOption.textContent = `${projectName}`;
  const projectConatiner = document.createElement("div");
  projectConatiner.id = `${projectName}`;
  const projectIcon = document.createElement("span");
  projectIcon.classList.add("material-symbols-outlined");
  projectIcon.textContent = "folder";
  const projectTitle = document.createElement("div");
  projectTitle.textContent = `${projectName}`;
  if (projectName === "inbox") {
    projectConatiner.append(projectIcon, projectTitle);
  } else {
    const projectDelete = document.createElement("span");
    projectDelete.classList.add("material-symbols-outlined");
    projectDelete.textContent = "delete";
    projectDelete.addEventListener("click", (e) => {
      tempProject = e.target.parentElement.id;
      e.stopPropagation();
      if (document.getElementById("deleteProjectModalBoxContainer") == null) {
        deleteProjectModalBox();
        document.getElementById(
          "deleteProjectModalBoxContainer",
        ).style.display = "block";
      } else {
        document.getElementById(
          "deleteProjectModalBoxContainer",
        ).style.display = "block";
      }
    });
    projectConatiner.append(projectIcon, projectTitle, projectDelete);
  }
  createButton.before(projectConatiner);
  project.append(projectOption);
  editProject.append(projectOption.cloneNode(true));
  sidePaneEventListener();
  projectEventListener();
}

function projectTab(projectName) {
  const content = document.querySelector("#content");
  const projectTab = document.createElement("div");
  projectTab.id = `${projectName}Tab`;
  projectTab.style.display = "none";
  projectTab.style.flexDirection = "column";
  projectTab.style.padding = "10px";
  projectTab.style.flexGrow = "1";
  const projectTabHeader = document.createElement("div");
  projectTabHeader.id = `${projectName}TabHeader`;
  projectTabHeader.style.display = "flex";
  projectTabHeader.style.justifyContent = "space-between";
  const projectTabHeading = document.createElement("h1");
  projectTabHeading.style.display = "flex";
  projectTabHeading.style.margin = "0";
  projectTabHeading.style.marginBottom = "15px";
  projectTabHeading.style.alignItems = "baseline";
  projectTabHeading.textContent = `${
    projectName.charAt(0).toUpperCase() + projectName.slice(1)
  }`;
  const projectContainer = document.createElement("div");
  projectContainer.id = `${projectName}Container`;
  const projectSection = document.createElement("div");
  projectSection.id = `${projectName}Section`;
  projectContainer.append(projectSection);
  projectTabHeader.append(projectTabHeading);
  const addTaskbtn = document.createElement("button");
  addTaskbtn.id = "addTaskbtn";
  addTaskbtn.textContent = "Add Task";
  projectSection.append(addTaskbtn);
  addTaskbtn.addEventListener("click", () => {
    if (document.getElementById("modalBoxContainer") == null) {
      createTaskModalBox();
      document.getElementById("modalBoxContainer").style.display = "block";
    } else {
      document.getElementById("modalBoxContainer").style.display = "block";
    }
  });
  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("modalBoxContainer")) {
      document.getElementById("modalBoxContainer").style.display = "none";
    }
  });
  projectTab.append(projectTabHeader, projectContainer);
  content.append(projectTab);
  projectEventListener();
}

function createProjectModalBox() {
  const content = document.getElementById("content");
  const projectModalBoxContainer = document.createElement("div");
  projectModalBoxContainer.id = "projectModalBoxContainer";
  const projectModalBox = document.createElement("div");
  projectModalBox.id = "projectModalBox";
  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.alignItems = 'center';
  const projectTitle = document.createElement("div");
  projectTitle.textContent = "Create a new project";
  const projectInput = document.createElement("input");
  projectInput.id = "projectInput";
  projectInput.setAttribute("type", "text");
  projectInput.setAttribute('required', '');
  projectInput.setAttribute("placeholder", "Project Name");
  const projectButtonContainer = document.createElement("div");
  projectButtonContainer.classList.add("buttonContainer");
  const createButton = document.createElement("button");
  createButton.textContent = "Create";
  createButton.id = "createProjectButton";
  createButton.setAttribute('type', 'button');
  createButton.addEventListener("click", () => {
    if (form.checkValidity() === false) {
      form.reportValidity();
    } else {
      addProjectInDOM(projectInput.value);
      projectTab(projectInput.value);
      projectModalBoxContainer.style.display = "none";
      projectInput.value = "";
    }
  });
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.setAttribute('type', 'button');
  cancelButton.addEventListener("click", () => {
    projectModalBoxContainer.style.display = "none";
    projectInput.value = "";
  });
  projectButtonContainer.append(createButton, cancelButton);
  form.append(projectTitle, projectInput, projectButtonContainer);
  projectModalBox.append(form);
  projectModalBoxContainer.append(projectModalBox);
  content.append(projectModalBoxContainer);
}

export {
  createProjectModalBox,
  addProjectInDOM,
  projectTab,
  projectTabTasks,
  projectEventListener,
  sideTabChecker,
};
