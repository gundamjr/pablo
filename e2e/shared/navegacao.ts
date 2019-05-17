import { SimplePage } from './simplePage';
import { element, by } from 'protractor';

export class Navegacao extends SimplePage {

    botaoLogin = element(by.xpath(`//*[@id="navbar-collapse-main"]/ul[3]/li/a/span`));

    botaoBackToSite = element(by.xpath(`//a[@class='btn btn-default']`));

    botaoSignUp = element(by.xpath(`//a[@class='btn btn-default pull-left']`));

    async acessarLogin() {
        this.disableAngular();
        await this.cliclarVariosElementos(this.botaoLogin);
    }

    async acessarHomeDaPaginaDeLogin() {
        await this.cliclarVariosElementos(this.botaoBackToSite);
    }

    async acessarPaginaCadastroUsuario() {
        await this.cliclarVariosElementos(this.botaoLogin, this.botaoSignUp);
    }
}