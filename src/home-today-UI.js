/* eslint-disable no-plusplus */
/* eslint-disable import/no-cycle */
/* eslint-disable quotes */
import { createTaskModalBox } from './task';
import { sideTabChecker } from "./project";

function mainCreation() {
  const body = document.querySelector("body");
  const main = document.createElement("main");
  main.setAttribute("id", "content");
  body.appendChild(main);
}

function sidePaneCreation() {
  const content = document.querySelector("#content");
  const sidePane = document.createElement("nav");
  sidePane.id = "sidePane";
  sidePane.style.display = "flex";
  const dashboardContainer = document.createElement("div");
  dashboardContainer.id = "dashboard";
  const dashboard = document.createElement("div");
  dashboard.textContent = "Dashboard";
  const dashboardIcon = document.createElement("span");
  dashboardIcon.setAttribute("class", "material-symbols-outlined");
  dashboardIcon.textContent = "dashboard";
  dashboardContainer.append(dashboardIcon, dashboard);
  const todayContainer = document.createElement("div");
  todayContainer.id = "today";
  todayContainer.style.backgroundColor = '#D9D9D9';
  const today = document.createElement("div");
  today.textContent = "Today";
  const todayIcon = document.createElement("span");
  todayIcon.setAttribute("class", "material-symbols-outlined");
  todayIcon.textContent = "today";
  todayContainer.style.backgroundColor = "#95ED8D";
  todayContainer.append(todayIcon, today);
  const upcomingContainer = document.createElement("div");
  upcomingContainer.id = "upcoming";
  upcomingContainer.style.backgroundColor = '#D9D9D9';
  const upcoming = document.createElement("div");
  upcoming.textContent = "Upcoming";
  const upcomingIcon = document.createElement("span");
  upcomingIcon.setAttribute("class", "material-symbols-outlined");
  upcomingIcon.textContent = "event_upcoming";
  upcomingContainer.append(upcomingIcon, upcoming);
  const projectsContainer = document.createElement("div");
  projectsContainer.id = "projects";
  const projects = document.createElement("div");
  projects.textContent = "Projects";
  const projectsIcon = document.createElement("span");
  projectsIcon.setAttribute("class", "material-symbols-outlined");
  projectsIcon.textContent = "folder";
  projectsContainer.append(projectsIcon, projects);
  const inboxContainer = document.createElement("div");
  inboxContainer.id = "inbox";
  inboxContainer.style.backgroundColor = '#D9D9D9';
  const inbox = document.createElement("div");
  inbox.textContent = "Inbox";
  const inboxIcon = document.createElement("span");
  inboxIcon.setAttribute("class", "material-symbols-outlined");
  inboxIcon.textContent = "inbox";
  inboxContainer.append(inboxIcon, inbox);
  const createProjectContainer = document.createElement("div");
  createProjectContainer.id = "createProject";
  const createProject = document.createElement("div");
  createProject.textContent = "Create new project";
  const createProjectIcon = document.createElement("span");
  createProjectIcon.setAttribute("class", "material-symbols-outlined");
  createProjectIcon.textContent = "add_circle";
  createProjectContainer.append(createProjectIcon, createProject);
  sidePane.append(
    dashboardContainer,
    todayContainer,
    upcomingContainer,
    projectsContainer,
    inboxContainer,
    createProjectContainer,
  );
  content.append(sidePane);
}

function todayTabCreation() {
  const content = document.querySelector("#content");
  const todayTab = document.createElement("div");
  todayTab.id = "todayTab";
  todayTab.classList.add("active");
  const todayTabHeader = document.createElement("div");
  todayTabHeader.id = "todayTabHeader";
  const todayTabHeading = document.createElement("h1");
  todayTabHeading.textContent = "Today";
  const dateDisplay = document.createElement("div");
  const date = Intl.DateTimeFormat(navigator.language, {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());
  dateDisplay.textContent = `${date}`;
  dateDisplay.style.fontSize = "18px";
  todayTabHeading.appendChild(dateDisplay);
  const overDueContainer = document.createElement("div");
  overDueContainer.id = "overDueContainer";
  const overDue = document.createElement("div");
  overDue.textContent = "Overdue";
  const overDueSection = document.createElement("div");
  overDueSection.id = "overDueSection";
  overDueContainer.append(overDue, overDueSection);
  todayTabHeader.append(todayTabHeading);
  const todaySectionTab = document.createElement("div");
  todaySectionTab.id = "todaySectionTab";
  const todaySectionTabHeader = document.createElement("div");
  todaySectionTabHeader.textContent = `Today (${date})`;
  const todaySection = document.createElement("div");
  todaySection.id = "todaySection";
  const addTaskbtn = document.createElement("button");
  addTaskbtn.id = "addTaskbtn";
  addTaskbtn.textContent = "Add Task";
  todaySection.append(addTaskbtn);
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
    } else if (
      e.target === document.getElementById("projectModalBoxContainer")
    ) {
      document.getElementById("projectModalBoxContainer").style.display = "none";
    } else if (e.target === document.getElementById("editModalBoxContainer")) {
      document.getElementById("editModalBoxContainer").style.display = "none";
    }
  });
  todaySectionTab.append(todaySectionTabHeader, todaySection);
  todayTab.append(todayTabHeader, overDueContainer, todaySectionTab);
  content.append(todayTab);
}

function dayFilter(pending) {
  const todaySection = document.getElementById("todaySection");
  const overDueSection = document.getElementById("overDueSection");
  const upcomingSection = document.getElementById("upcomingSection");
  const todayTasks = document.querySelectorAll(".today");
  const overDueTasks = document.querySelectorAll(".overDue");
  const upcomingTasks = document.querySelectorAll(".upcoming");
  if (pending === "today") {
    for (let index = 0; index < todayTasks.length; index++) {
      todaySection.insertBefore(todayTasks[index], todaySection.childNodes[0]);
    }
    for (let index = 0; index < overDueTasks.length; index++) {
      overDueSection.insertBefore(
        overDueTasks[index],
        overDueSection.childNodes[0],
      );
    }
  } else if (pending === "upcoming") {
    for (let index = 0; index < upcomingTasks.length; index++) {
      upcomingSection.insertBefore(
        upcomingTasks[index],
        upcomingSection.childNodes[0],
      );
    }
  }
}

function sidePaneEventListener() {
  const sidePaneTabs = document.getElementById("sidePane").childNodes;
  const contentTabs = document.getElementById("content").childNodes;
  for (let index = 1; index < sidePaneTabs.length; index++) {
    if (
      sidePaneTabs[index].id !== "createProject"
      && sidePaneTabs[index].id !== "dashboard"
      && sidePaneTabs[index].id !== "projects"
    ) {
      sidePaneTabs[index].addEventListener("click", (e) => {
        sideTabChecker(e.target);
        for (let i = 1; i < contentTabs.length; i++) {
          if (contentTabs[i].id === `${sidePaneTabs[index].id}Tab`) {
            contentTabs[i].style.display = "flex";
            contentTabs[i].classList.add("active");
            if (contentTabs[i].id === "todayTab") {
              dayFilter("today");
            } else if (contentTabs[i].id === "upcomingTab") {
              dayFilter("upcoming");
            }
          } else if (contentTabs[i].localName === "footer") {
            contentTabs[i].style.display = "flex";
          } else {
            contentTabs[i].style.display = "none";
            contentTabs[i].classList.remove("active");
          }
        }
      });
    }
  }
}

export {
  mainCreation,
  sidePaneCreation,
  todayTabCreation,
  sidePaneEventListener,
};
