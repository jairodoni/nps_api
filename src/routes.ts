import { Router } from "express";
import { SurveysCrontroller } from "./controllers/SurveysController";
import { UserController } from "./controllers/UserController";
import { SendMailController } from "./controllers/SendMailController";

const router = Router();

const userController = new UserController();
const surveysCrontroller = new SurveysCrontroller();
const sendMailController = new SendMailController();

//Users
router.post("/users", userController.create);

//Surveys
router.post("/surveys", surveysCrontroller.create);

router.get("/surveys", surveysCrontroller.show);

//Users and Surveys (Associação de Tabelas)
router.post("/sendMail", sendMailController.execute);

export { router };
