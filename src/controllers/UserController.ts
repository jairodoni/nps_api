import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    //Repository serve para manipular os dados que entram e saem do Banco de Dados
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadExists) {
      return res.status(400).json({
        error: "User already exists!",
      });
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
  }
}

export { UserController };
