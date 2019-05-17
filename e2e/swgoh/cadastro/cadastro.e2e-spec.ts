import { Usuario } from '../../shared/dados/usuario';
import { Navegacao } from '../../shared/navegacao';
import { LoginPage } from '../login/login.po';
import { HomePage } from '../home/home.po';
import { utils } from '../../shared/utils';
import { CadastroPage } from './cadastro.po';


describe('Cadastro', async() => {
    const cadastrarPage: CadastroPage = new CadastroPage();
    const navegacao: Navegacao      = new Navegacao();
    
    beforeAll(async () => {
        await cadastrarPage.disableAngular();
        await cadastrarPage.getURLRequest('https://swgoh.gg/');  
    });

    beforeEach(async() => {
        await navegacao.acessarPaginaCadastroUsuario();
    });

    it('Cadastrar usuario com login ja existente', async () => {
        const usuario: Usuario = new Usuario('gundamjr', 'zgmfx6478s', 'gundamSeedDestiny@gmail.com');
        await cadastrarPage.criarConta(usuario);

        await utils.assertTrue(cadastrarPage.validarUsuarioJaExistente());
        await navegacao.acessarHomeDaPaginaDeLogin();
    });

    it('Cadastrar usuario com email invalido', async () => {
        const usuario: Usuario = new Usuario('novoUserName', 'zgmfx1426s', 'teste...teste@gmail.com');
        await cadastrarPage.criarConta(usuario);

        await utils.assertTrue(cadastrarPage.validarEmail());
        await navegacao.acessarHomeDaPaginaDeLogin()
    });

    it('Cadastrar usuario com senha de confirmação diferente', async () => {
        const usuario: Usuario = new Usuario('novoUserName', 'zgmfx1426s', 'gundamSeedDasdasd@gmail.com');
        await cadastrarPage.criarConta(usuario, true);

        await utils.assertTrue(cadastrarPage.validarSenhasDiferentes());
        await navegacao.acessarHomeDaPaginaDeLogin()
    });
});
