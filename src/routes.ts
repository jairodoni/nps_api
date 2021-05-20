import { Router } from "express";
import { SurveysCrontroller } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveysCrontroller = new SurveysCrontroller();

//Users
router.post("/users", userController.create);

//Surveys
router.post("/surveys", surveysCrontroller.create);

router.get("/surveys", surveysCrontroller.show);

export { router };
