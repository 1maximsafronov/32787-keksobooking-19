import DataModel from "./data-model.js";
import PageController from "./controllers/page-controller.js";

const newModel = new DataModel();
const page = new PageController(newModel);
page.deactivate();
