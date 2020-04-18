import { Request , Response} from 'express';
import createUser, {createUserStructured} from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  // Chamada utilizando parametros sem desestruturação
  const userStructured = createUserStructured('Marcelo', 'marcelokanu@gmail.com', '123456 ');

  // Chamada utilizando parametros desestruturados
  const user = createUser({
    email: 'marcelokanu@gmail.com',
    password: '123456',
    techs: [
      'Node.js', 
      'ReactJS', 
      'React Native',
      {title: 'Javascript', experience: 100},
    ],
  });
 
  return response.json({message: 'Hello World...'});
}