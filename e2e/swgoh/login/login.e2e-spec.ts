import { Usuario } from '../../shared/dados/usuario';
import { Navegacao } from '../../shared/navegacao';
import { HomePage } from '../home/home.po';
import { utils } from '../../shared/utils';
import { LoginPage } from './login.po';


describe('login', async() => {
    const loginPage: LoginPage      = new LoginPage();
    const navegacao: Navegacao      = new Navegacao();

    beforeAll(async () => {
        await loginPage.disableAngular();
        await loginPage.getURLRequest('https://swgoh.gg/');  
    });

    beforeEach(async() => {
        await navegacao.acessarLogin();
    });

    it('Autenticacao com senha errada', async () => {
        const usuario: Usuario = new Usuario('gundamjr', 'error');
        await loginPage.realizarLogin(usuario);

        await utils.assertTrue(loginPage.validarCredenciaisInvalidas());
        await navegacao.acessarHomeDaPaginaDeLogin()
    });

    it('Autenticacao com login errado', async () => {
        const usuario: Usuario = new Usuario('teste', 'error');
        await loginPage.realizarLogin(usuario);

        await utils.assertTrue(loginPage.validarCredenciaisInvalidas());
        await navegacao.acessarHomeDaPaginaDeLogin()
    });

    it('Autenticacao sem login ou senha', async () => {
        const usuario: Usuario = new Usuario('', '');
        await loginPage.realizarLogin(usuario);

        await utils.assertTrue(loginPage.validarCamposVisiveis());
    });
});
