import { createTaskModalBox,tasks } from "./task";
import { sidePaneEventListener } from "./home-today-UI";
import { createEditTaskModalBox } from "./edit-modalBox";

function createProjectModalBox(){
    const content = document.getElementById('content');
    const projectModalBoxContainer = document.createElement('div');
    projectModalBoxContainer.id = 'projectModalBoxContainer';
    const projectModalBox = document.createElement('div');
    projectModalBox.id = 'projectModalBox';
    const projectTitle = document.createElement('div');
    projectTitle.textContent = 'Create a new project';
    const projectInput = document.createElement('input');
    projectInput.id = 'projectInput';
    projectInput.setAttribute('type', 'text');
    projectInput.setAttribute('placeholder', 'Project Name');
    const projectButtonContainer = document.createElement('div');
    projectButtonContainer.id = 'buttonContainer';
    const createButton = document.createElement('button');
    createButton.textContent = 'Create';
    createButton.id = 'createProjectButton';
    createButton.addEventListener('click', () => {
        addProjectInDOM(projectInput.value);
        projectTab(projectInput.value);
        projectModalBoxContainer.style.display = 'none';
        projectInput.value = '';
    })
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        projectModalBoxContainer.style.display = 'none';
        projectInput.value = '';
    })
    projectButtonContainer.append(createButton, cancelButton);
    projectModalBox.append(projectTitle, projectInput,projectButtonContainer);
    projectModalBoxContainer.append(projectModalBox);
    content.append(projectModalBoxContainer);
}

function addProjectInDOM(projectName){
  if(document.getElementById('project') == null ){
    createTaskModalBox();
  }
  if(document.getElementById('editProject') == null){
    createEditTaskModalBox();
  }
  const createButton = document.getElementById('createProject');
  const project = document.getElementById('project');
  const editProject = document.getElementById('editProject');
  const projectOption = document.createElement('option');
  projectOption.setAttribute('value', `${projectName}`);
  projectOption.textContent = `${projectName}`;
  const projectConatiner = document.createElement('div');
  projectConatiner.id = `${projectName}`;
  const projectIcon = document.createElement('span');
  projectIcon.classList.add('material-symbols-outlined');
  projectIcon.textContent = 'folder';
  const projectTitle = document.createElement('div');
  projectTitle.textContent = `${projectName}`;
  projectConatiner.append(projectIcon, projectTitle);
  createButton.before(projectConatiner);
  project.append(projectOption);
  editProject.append(projectOption.cloneNode(true));
  sidePaneEventListener();
  projectEventListener();
}

function projectTab(projectName){
  const content = document.querySelector("#content");
  const projectTab = document.createElement("div");
  projectTab.id = `${projectName}Tab`;
  projectTab.style.display = "none";
  const projectTabHeader = document.createElement("div");
  projectTabHeader.id = `${projectName}TabHeader`;
  const projectTabHeading = document.createElement("h1");
  projectTabHeading.textContent = `${projectName.charAt(0).toUpperCase() + projectName.slice(1)}`;
  const profileIcon = document.createElement("span");
  profileIcon.setAttribute("class", "material-symbols-outlined");
  profileIcon.textContent = "account_circle";
  const projectContainer = document.createElement("div");
  projectContainer.id = `${projectName}Container`;
  const projectSection = document.createElement("div");
  projectSection.id = `${projectName}Section`;
  projectContainer.append(projectSection);
  projectTabHeader.append(projectTabHeading, profileIcon);
  const addTaskbtn = document.createElement("button");
  addTaskbtn.id = "addTaskbtn";
  addTaskbtn.textContent = "Add Task";
  projectSection.append(addTaskbtn);
  addTaskbtn.addEventListener("click", () => {
    if(document.getElementById('modalBoxContainer') == null){
      createTaskModalBox();
      document.getElementById("modalBoxContainer").style.display = "block";
    }
    else{
    document.getElementById("modalBoxContainer").style.display = "block";
    }
  });
  window.addEventListener("click", (e) => {
    if (e.target == document.getElementById("modalBoxContainer")) {
      document.getElementById("modalBoxContainer").style.display = "none";
    }
  });
  projectTab.append(projectTabHeader, projectContainer);
  content.append(projectTab);
  projectEventListener();
}

function projectTabTasks(projectName){
  const projectSection = document.getElementById(`${projectName}Section`);
  const tasksInProject = document.getElementsByClassName(`${projectName}`);
  for (let i = 0; i < tasksInProject.length; i++) {
    projectSection.insertBefore(tasksInProject[i], projectSection.firstChild);
  }
}

function projectEventListener(){
  const projectList = document.getElementById('sidePane').childNodes
  const contentChild = document.getElementById('content').childNodes
  for (let index = 4; index < projectList.length-1; index++) {
    projectList[index].addEventListener('click', () => {
      for(let i = 1; i < contentChild.length; i++){
        if(contentChild[i].id == `${projectList[index].id}Tab`){
          contentChild[i].style.display = 'flex';
          projectTabTasks(projectList[index].id);
        }
        else{
          contentChild[i].style.display = 'none';
        }
      }
      let projectTasks = tasks.filter(task => task.project == projectList[index].id)
      projectTasks.forEach(task => {
        projectTabTasks(task.project)
      })
    })
  }
}

export {createProjectModalBox,projectTab,projectTabTasks,projectEventListener}