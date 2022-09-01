/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
/* eslint-disable import/extensions */
import { createTaskModalBox } from './task.js';

function upcomingTabCreation() {
  const content = document.querySelector("#content");
  const upcomingTab = document.createElement("div");
  upcomingTab.id = "upcomingTab";
  const upcomingTabHeader = document.createElement("div");
  upcomingTabHeader.id = "upcomingTabHeader";
  const upcomingTabHeading = document.createElement("h1");
  upcomingTabHeading.textContent = "Upcoming";
  const profileIcon = document.createElement("span");
  profileIcon.setAttribute("class", "material-symbols-outlined");
  profileIcon.textContent = "account_circle";
  const upcomingContainer = document.createElement("div");
  upcomingContainer.id = "upcomingContainer";
  const upcoming = document.createElement("div");
  upcoming.textContent = "Upcoming";
  const upcomingSection = document.createElement("div");
  upcomingSection.id = "upcomingSection";
  upcomingContainer.append(upcoming, upcomingSection);
  upcomingTabHeader.append(upcomingTabHeading, profileIcon);
  const addTaskbtn = document.createElement("button");
  addTaskbtn.id = "addTaskbtn";
  addTaskbtn.textContent = "Add Task";
  upcomingSection.append(addTaskbtn);
  addTaskbtn.addEventListener("click", () => {
    if (document.getElementById("modalBoxContainer") == null) {
      createTaskModalBox();
      document.getElementById("modalBoxContainer").style.display = "block";
    } else {
      document.getElementById("modalBoxContainer").style.display = "block";
    }
  });
  window.addEventListener("click", (e) => {
    if (e.target == document.getElementById("modalBoxContainer")) {
      document.getElementById("modalBoxContainer").style.display = "none";
    }
  });
  upcomingTab.append(upcomingTabHeader, upcomingContainer);
  content.append(upcomingTab);
}

export { upcomingTabCreation };
