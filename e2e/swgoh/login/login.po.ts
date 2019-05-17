import { Usuario } from '../../shared/dados/usuario';
import { SimplePage } from '../../shared/simplePage';
import { element, by } from 'protractor';

export class LoginPage extends SimplePage {
    campoLogin = element(by.id('id_username'));

    campoSenha = element(by.id('id_password'));

    botaoLogin = element(by.buttonText('Log In'));

    errorLogin = element(by.xpath(`//p[contains(text(),'Please enter a correct username and password')]`));

    async realizarLogin(usuario: Usuario) {
            
        await this.setInput(this.campoLogin, usuario.login);

        await this.setInput(this.campoSenha, usuario.senha);

        await this.clickElement(this.botaoLogin);
    }


    async validarCredenciaisInvalidas() {
        return await this.errorLogin.isDisplayed();
    }

    async validarCamposVisiveis() {
        if (await this.campoLogin.isDisplayed() && await this.campoSenha.isDisplayed()) {
            return true;
        }
        return false
    }
}
