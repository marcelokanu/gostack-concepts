/**
 * Para criar um usuario: Nome, email e password
 * 
 * Para declarar o tipo, varias formas
 * 1 - Setar valor padrao, Ex name = ''
 * 2 - Setar o tipo da variavel, Ex email: string
 */

// Formato padrão sem desestruturação para variaveis
export function createUserStructured(name= '', email: string, password: string){
  const user = {
    name,
    email,
    password,
  }

  return user;
}

//Para definir formato do objeto precisa criar uma nova interface. Ex tech recebendo string e number
interface TechObject {
  title: string;
  experience: number;
}


//Utilizando desestruturação para passar informações da variavel
interface CreateUserData {
  name?: string; // o ponto de interrogação ? significa que o campo é opcional
  email: string;
  password: string;
  techs: Array<string | TechObject>, // Informando que pode receber apenas texto ou formato interface TechObject
  // para utilizar array de string, pode-se utilizar string [] ou array <string>;
}

export default function createUser({name, email, password}: CreateUserData){
  const user = {
    name,
    email,
    password,
  }

  return user;
}