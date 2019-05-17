import { SimplePage } from '../../shared/simplePage';
import { element, by, browser } from 'protractor';
import { Usuario } from '../../shared/dados/usuario';

export class CadastroPage extends SimplePage {

    campoUsername = element(by.id('id_username'));

    campoEmailAdress = element(by.id('id_email'));

    campoPassword = element(by.id('id_password1'));

    campoConfirmPassword = element(by.id('id_password2'));

    botaoCreateAccount = element(by.xpath(`//button[@class='btn btn-success']`));

    errorUsuarioExistente = element(by.xpath(`//li[contains(text(),'A user with that username already exists.')]`));

    errorEmailValido = element(by.xpath(`//li[contains(text(),'Enter a valid email address.')]`));

    errorSenhasDiferentes = element(by.xpath(`//li[contains(text(),"The two password fields didn't match.")]`));


    async criarConta(usuario: Usuario, segundaSenhaDiferente?: boolean) {
        this.waitForced(1000);
        await this.setInput(this.campoUsername, usuario.login);

        await this.setInput(this.campoEmailAdress, usuario.email);

        await this.setInput(this.campoPassword, usuario.senha);

        if(segundaSenhaDiferente) {
            await this.setInput(this.campoConfirmPassword, 'testeSenhaDiferente');
        }else {
            await this.setInput(this.campoConfirmPassword, usuario.senha);
        }

        await this.clickElement(this.botaoCreateAccount);
    }

    async validarUsuarioJaExistente() {
        return await this.errorUsuarioExistente.isDisplayed();
    }

    async validarEmail() {
        return await this.errorEmailValido.isDisplayed();
    }

    async validarSenhasDiferentes() {
        return await this.errorSenhasDiferentes.isDisplayed();
    }

}

