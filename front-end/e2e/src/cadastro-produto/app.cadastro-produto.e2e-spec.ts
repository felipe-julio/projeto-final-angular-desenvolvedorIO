import { browser, logging } from "protractor";
import { AppProdutoPage } from "./app.cadastro-produto.po"

describe('Testes do formulario de cadastro', () => {
    let page: AppProdutoPage;

    beforeEach(() => {
        page = new AppProdutoPage();
    });

    it('deve navegar até produtos', () => {
        page.iniciarNavegacao();
        expect(page.obterTituloProdutos()).toContain("Lista de Produtos");
    });

    it('deve preencher formulário de produtos com sucesso', () => {
        page.navegarParaNovoProduto();
        page.selecionarFornecedor();

        page.nome.sendKeys('Produto Teste Automatizado');
        page.descricao.sendKeys('1234,50');
        page.selecionarImagem();
        page.ativo.click;

        page.botaoProduto.click();

        page.esperar(6000);

        expect(page.obterTituloProdutos()).toContain("Lista de Produtos");
    });

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
})