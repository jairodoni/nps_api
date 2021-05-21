import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { resolve } from "path";
import SendMailService from "../services/SendMailService";

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userFound = await usersRepository.findOne({ email });

    if (!userFound) {
      return res.status(400).json({
        error: "Users does not exists.",
      });
    }

    const surveyFound = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!surveyFound) {
      return res.status(400).json({
        error: "Survey does not exists.",
      });
    }

    const variables = {
      name: userFound.name,
      title: surveyFound.title,
      description: surveyFound.description,
      user_id: userFound.id,
      link: process.env.URL_MAIL,
    };

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{ user_id: userFound.id }, { value: null }],
      relations: ["user", "survey"],
    });

    if (surveyUserAlreadyExists) {
      await SendMailService.execute(
        email,
        surveyFound.title,
        variables,
        npsPath
      );
      return res.json(surveyUserAlreadyExists);
    }

    // Salvar as informações na tabela surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: userFound.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    //Enviar e-mail para o usuario
    await SendMailService.execute(email, surveyFound.title, variables, npsPath);
    return res.json(surveyUser);
  }
}

export { SendMailController };
