import "./style.css";
import * as homeCreation from "./home-today-UI";
import { upcomingTabCreation } from "./upcoming-UI";
import {
  createProjectModalBox,
  projectEventListener,
  projectTab,
} from "./project";

homeCreation.mainCreation();
homeCreation.sidePaneCreation();
homeCreation.todayTabCreation();
homeCreation.sidePaneEventListener();
homeCreation.footerCreation();
upcomingTabCreation();
projectTab("inbox");
document.getElementById("upcomingTab").style.display = "none";

const createProject = document.getElementById("createProject");
createProject.addEventListener("click", () => {
  if (document.getElementById("projectModalBoxContainer") == null) {
    createProjectModalBox();
    document.getElementById("projectModalBoxContainer").style.display = "block";
  } else {
    document.getElementById("projectModalBoxContainer").style.display = "block";
  }
});

projectEventListener();
