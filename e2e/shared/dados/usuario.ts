export class Usuario {
    login: string;

    senha: string;

    email: string;


    constructor(login: string, senha: string, email?: string) {
        this.login = login;
        this.senha = senha;
        this.email = email;
    }
}