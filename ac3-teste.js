"use strict";

prepararTestes(funcs => {
    const erroGravissimo = funcs.erroGravissimo;
    window.onerror = (ev, arquivo, linha, coluna, erro) => {
        erroGravissimo(""
                + "<h1>SE VOCÊ ESTÁ VENDO ISSO, É PORQUE O SEU JAVASCRIPT CONTÉM ERROS SINTÁTICOS.</h1>"
                + "<p>Este é um erro gravíssimo. Veja mais detalhes no console do navegador para tentar entender onde ocorreu o erro.</p>"
                + "<p>Quem entregar para o professor algo que faça esta mensagem aparecer, vai ficar com nota zero!</p>"
        );
        document.querySelector("#testefw-botao-executar").disabled = true;
    };
    const divNota = document.querySelector("#testefw-nota");
    if (divNota) divNota.style.display = "none";
},
funcs => {
    const grupo = funcs.grupo;
    const teste = funcs.teste;
    const igual = funcs.igual;
    const naoDeuErro = funcs.naoDeuErro;
    const Utilitarios = funcs.Utilitarios;
    const Xoshiro128ssSeedRandom = funcs.Xoshiro128ssSeedRandom;
    const erroGravissimo = funcs.erroGravissimo;
    const numeroMaximoDeAlunos = 5;
    const random = new Xoshiro128ssSeedRandom(
            Math.sqrt(2) * 2 ** 32,
            Math.sqrt(3) * 2 ** 32,
            Math.sqrt(5) * 2 ** 32,
            Math.sqrt(7) * 2 ** 32
    );
    let jsonOk = false;
    function testOk() { return jsonOk; }
    function setTestOk(ok) { jsonOk = ok; }

    // JSON DOS ALUNOS.

    function validarJsonAlunos() {
        const alunos = dadosDosAlunos(), nomes = [], ras = [];
        if (!(alunos instanceof Array)) throw new Error("Os dados do(a)(s) aluno(a)(s) deveriam estar em um array.");
        if (alunos.length === 0) throw new Error("Você(s) se esqueceu(ram) de preencher os dados com o JSON do(a)(s) aluno(a)(s).");

        alunos.forEach((aluno, idx) => {
            const numero = idx + 1;

            if (!aluno.hasOwnProperty("nome")) throw new Error(`O(a) aluno(a) ${numero} está sem nome no JSON.`);

            if (typeof aluno.nome !== "string") throw new Error(`O nome do(a) aluno(a) ${numero} deveria ser uma string.`);
            if (["João da Silva", "Maria da Silva", ""].indexOf(aluno.nome.trim()) >= 0) {
                throw new Error(`O nome do(a) aluno(a) ${numero} não está correto.`);
            }
            if (aluno.nome !== aluno.nome.trim()) {
                throw new Error(`Não deixe espaços em branco sobrando no começo ou no final do nome de ${aluno.nome} no JSON.`);
            }
            if (nomes.indexOf(aluno.nome) >= 0) throw new Error("Há nomes de alunos(as) repetidos no JSON.");
            nomes.push(aluno.nome);

            if (!aluno.hasOwnProperty("ra")) throw new Error(`O RA de ${aluno.nome} está faltando no JSON.`);
            if (typeof aluno.ra !== "number") throw new Error(`O RA de ${aluno.nome} deveria ser um número.`);
            if (Number.isNaN(aluno.ra) || aluno.ra !== Math.floor(aluno.ra) || aluno.ra <= 0 || aluno.ra === 123456 || aluno.ra === 654321) {
                throw new Error(`O RA de ${aluno.nome} não está correto.`);
            }
            if (ras.indexOf(aluno.ra) >= 0) throw new Error("Há RAs repetidos no JSON.");
            ras.push(aluno.ra);

            if (Object.keys(aluno).length !== 2) {
                throw new Error(`O JSON de ${aluno.nome} tem coisas a mais além do nome e do RA.`);
            }
        });
        if (alunos.length > numeroMaximoDeAlunos) {
            throw new Error(`Vocês só podem fazer grupo de até ${numeroMaximoDeAlunos} alunos(as).`);
        }
        return alunos;
    }

    function mostrarValidacaoJsonAlunos() {
        try {
            const alunos = validarJsonAlunos();
            alunos.forEach(a => {
                const li = document.createElement("li");
                li.append(a.nome);
                document.querySelector("#testefw-alunos").append(li);
            });
        } catch (e) {
            erroGravissimo(""
                    + "<h1>SE VOCÊ ESTÁ VENDO ISSO, É PORQUE VOCÊ NÃO DEFINIU CORRETAMENTE O JSON COM OS INTEGRANTES DO SEU GRUPO.</h1>"
                    + "<p>Arrumar isto é a primeira coisa que você tem que fazer neste AC, e assim que o fizer esta mensagem vai desaparecer.</p>"
                    + "<p>Procure a função dadosDosAlunos() no arquivo ac3.js.</p>"
                    + "<p>Quem entregar para o professor um JavaScript que faça esta mensagem aparecer, vai ficar com nota zero!</p>"
            );
            throw e;
        }
    }

    grupo("JSON com nomes dos alunos", "Verifica o JSON com a identificação do(a)(s) aluno(a)(s) está ok").naoFracionado.minimo(-10).testes([
        teste("Listagem de alunos ok.", () => mostrarValidacaoJsonAlunos(), naoDeuErro(), undefined, setTestOk)
    ]);

    // Exercício exemplo.

    grupo("Exemplos", "Verifica se não bagunçou os exemplos dados").minimo(-1).testes([
        teste("O maior de 1 e 3 é 3.", () => maiorDosDois            (1, 3), igual(3), testOk),
        teste("O maior de 5 e 3 é 5.", () => maiorDosDois            (5, 3), igual(5), testOk),
        teste("O maior de 1 e 3 é 3.", () => maiorDosDoisSimplificado(1, 3), igual(3), testOk),
        teste("O maior de 5 e 3 é 5.", () => maiorDosDoisSimplificado(5, 3), igual(5), testOk)
    ]);

    // Exercício 1.

    grupo("Exercício 1", "Maior dos quatro").maximo(0.3).testes([
        teste("O maior de 1, 3, 5, 7 é 7."     , () => maiorDosQuatro( 1,  3,  5,  7), igual( 7), testOk),
        teste("O maior de 1, 3, 5, 9 é 9."     , () => maiorDosQuatro( 1,  3,  5,  9), igual( 9), testOk),
        teste("O maior de 1, 3, 5, 0 é 5."     , () => maiorDosQuatro( 1,  3,  5,  0), igual( 5), testOk),
        teste("O maior de 10, 3, 5, 7 é 10."   , () => maiorDosQuatro(10,  3,  5,  7), igual(10), testOk),
        teste("O maior de 1, 30, 5, 7 é 30."   , () => maiorDosQuatro( 1, 30,  5,  7), igual(30), testOk),
        teste("O maior de 1, 3, 50, 7 é 50."   , () => maiorDosQuatro( 1,  3, 50,  7), igual(50), testOk),
        teste("O maior de -4, -2, -9, -3 é -2.", () => maiorDosQuatro(-4, -2, -9, -3), igual(-2), testOk)
    ]);

    // Exercício 2.

    grupo("Exercício 2 - parte 1 (caminho feliz)", "Operações aritméticas").maximo(0.3).testes([
        teste("0 + 0 deve voltar 0."              , () => operacoesBasicas("A",  0  ,  0   ), igual(  0    ), testOk),
        teste("3.5 + 4 deve voltar 7.5."          , () => operacoesBasicas("A",  3.5,  4   ), igual(  7.5  ), testOk),
        teste("8 + -4 deve voltar 4."             , () => operacoesBasicas("A",  8  , -4   ), igual(  4    ), testOk),
        teste("-3.5 + 4 deve voltar 0.5."         , () => operacoesBasicas("A", -3.5,  4   ), igual(  0.5  ), testOk),
        teste("9 - 1.75 deve voltar 7.25."        , () => operacoesBasicas("S",  9  ,  1.75), igual(  7.25 ), testOk),
        teste("9.1 - -1.1 deve voltar 10.2."      , () => operacoesBasicas("S",  9.1, -1.1 ), igual( 10.2  ), testOk),
        teste("4 - 4 deve voltar 0."              , () => operacoesBasicas("S",  4  ,  4   ), igual(  0    ), testOk),
        teste("1.8 * 7 deve voltar 12.6."         , () => operacoesBasicas("M",  1.8,  7   ), igual( 12.6  ), testOk),
        teste("4 * -4 deve voltar -16."           , () => operacoesBasicas("M",  4  , -4   ), igual(-16    ), testOk),
        teste("0 * 999 deve voltar 0."            , () => operacoesBasicas("M",  0  ,999   ), igual(  0    ), testOk),
        teste("7 / 2 deve voltar 3.5."            , () => operacoesBasicas("D",  7  ,  2   ), igual(  3.5  ), testOk),
        teste("7 / 0.5 deve voltar 14."           , () => operacoesBasicas("D",  7  ,  0.5 ), igual( 14    ), testOk),
        teste("0 / 5 deve voltar 0."              , () => operacoesBasicas("D",  0  ,  5   ), igual(  0    ), testOk),
        teste("0.2 / 0.1 deve voltar 2."          , () => operacoesBasicas("D",  0.2,  0.1 ), igual(  2    ), testOk),
        teste("8 elevado a 3 deve voltar 512."    , () => operacoesBasicas("P",  8  ,  3   ), igual(512    ), testOk),
        teste("-3 elevado a 4 deve voltar 81."    , () => operacoesBasicas("P", -3  ,  4   ), igual( 81    ), testOk),
        teste("0.5 elevado a 3 deve voltar 0.125.", () => operacoesBasicas("P",  0.5,  3   ), igual(  0.125), testOk),
        teste("-2 elevado a 5 deve voltar -32."   , () => operacoesBasicas("P", -2  ,  5   ), igual(-32    ), testOk),
        teste("50 elevado a 0 deve voltar 1."     , () => operacoesBasicas("P", 50  ,  0   ), igual(  1    ), testOk),
        teste("0 elevado a 33 deve voltar 0."     , () => operacoesBasicas("P",  0  , 33   ), igual(  0    ), testOk)
    ]);

    grupo("Exercício 2 - parte 2 (caminho infeliz)", "Operações aritméticas produzindo NaN ou undefined").maximo(0.2).testes([
        teste("0 elevado a 0 não deve ser possível."   , () => operacoesBasicas("P",  0,  0  ), igual(NaN), testOk),
        teste("0 elevado a -1 não deve ser possível."  , () => operacoesBasicas("P",  0, -1  ), igual(NaN), testOk),
        teste("-1 elevado a 0.5 não deve ser possível.", () => operacoesBasicas("P", -1,  0.5), igual(NaN), testOk),
        teste("-3 elevado a 7.6 não deve ser possível.", () => operacoesBasicas("P", -3,  7.6), igual(NaN), testOk),
        teste("Divisão por zero não deve ser possível.", () => operacoesBasicas("D", 32,  0  ), igual(NaN), testOk),
        teste("0 / 0 não deve ser possível."           , () => operacoesBasicas("D",  0,  0  ), igual(NaN), testOk),
        teste("Operação Z que não existe deve voltar undefined."       , () => operacoesBasicas("Z"      , 1, 2), igual(undefined), testOk),
        teste("Operação d que não existe deve voltar undefined."       , () => operacoesBasicas("d"      , 3, 4), igual(undefined), testOk),
        teste("Operação s que não existe deve voltar undefined."       , () => operacoesBasicas("s"      , 5, 6), igual(undefined), testOk),
        teste("Operação Abacaxi que não existe deve voltar undefined." , () => operacoesBasicas("Abacaxi", 0, 8), igual(undefined), testOk),
        teste("Operação [branco] que não existe deve voltar undefined.", () => operacoesBasicas(""       , 7, 9), igual(undefined), testOk),
        teste("Operação @ que não existe deve voltar undefined."       , () => operacoesBasicas("@"      , 6, 1), igual(undefined), testOk),
        teste("Operação !#& que não existe deve voltar undefined."     , () => operacoesBasicas("!#&"    , 3, 0), igual(undefined), testOk)
    ]);

    // Exercícios 3.

    // Algumas classes bobas apenas para testarmos algo além dos tipos mais simples.
    class Abacaxi    {} // Sem toString aqui.
    class Laranja    {                                         toString() { return "laranja verde"; }}
    class Cliente    { constructor(nome) { this.nome = nome; } toString() { return this.nome;       }}
    class Fornecedor { constructor(nome) { this.nome = nome; } toString() { return this.nome;       }}
    class Uva        {                                         toString() { return "1";             }}

    // Criamos algumas instâncias dessas classes.
    const abcx1 = new Abacaxi(); // Temos um abacaxi aqui.
    const abcx2 = new Abacaxi(); // E um outro abacaxi aqui.
    const larnj = new Laranja();
    const uva   = new Uva();
    const rafa  = new Cliente("Rafaela");
    const pedro = new Cliente("Pedro");
    const xara  = new Cliente("Pedro");   // Homônimo do cara acima. Temos dois clientes chamados Pedro.
    const paula = new Fornecedor("Paula");
    const droga = "[E esse é um dos motivos pelo qual o == e o != são uma droga, prefira sempre o === e o !==]";

    grupo("Exercício 3", "Comparador básico").maximo(0.5).testes([
        teste("3 e 3 são estritamente iguais."                  , () => comparadorBasico(3    , 3    ), igual("Elemento 3 (number) é estritamente igual ao elemento 3 (number)."                      ), testOk),
        teste("undefined e undefined são estritamente iguais."  , () => comparadorBasico(            ), igual("Elemento undefined (undefined) é estritamente igual ao elemento undefined (undefined)."), testOk),
        teste('"ABC" e "ABC" são estritamente iguais.'          , () => comparadorBasico("ABC", "ABC"), igual("Elemento ABC (string) é estritamente igual ao elemento ABC (string)."                  ), testOk),
        teste('3 e "3" são equivalentes.'                       , () => comparadorBasico(3    , "3"  ), igual("Elemento 3 (number) é equivalente ao elemento 3 (string)."                             ), testOk),
        teste("null e undefined são equivalentes."              , () => comparadorBasico(null        ), igual("Elemento null (null) é equivalente ao elemento undefined (undefined)."                 ), testOk),
        teste("1 e 2 são diferentes."                           , () => comparadorBasico(1    , 2    ), igual("Elemento 1 (number) é diferente do elemento 2 (number)."                               ), testOk),
        teste('"1" e 2 são diferentes.'                         , () => comparadorBasico(  "1", 2    ), igual("Elemento 1 (string) é diferente do elemento 2 (number)."                               ), testOk),
        teste("Array e objeto são diferentes."                  , () => comparadorBasico([]   , {}   ), igual("Elemento  (Array) é diferente do elemento [object Object] (Object)."                   ), testOk),
        teste("Abacaxi e laranja são diferentes."               , () => comparadorBasico(abcx1, larnj), igual("Elemento [object Object] (Abacaxi) é diferente do elemento laranja verde (Laranja)."   ), testOk),
        teste("Cliente e fornecedor são diferentes."            , () => comparadorBasico(pedro, paula), igual("Elemento Pedro (Cliente) é diferente do elemento Paula (Fornecedor)."                  ), testOk),
        teste("Dois clientes diferentes são diferentes."        , () => comparadorBasico(pedro, rafa ), igual("Elemento Pedro (Cliente) é diferente do elemento Rafaela (Cliente)."                   ), testOk),
        teste("Um cliente é igual a si mesmo."                  , () => comparadorBasico(pedro, pedro), igual("Elemento Pedro (Cliente) é estritamente igual ao elemento Pedro (Cliente)."            ), testOk),
        teste("Dois clientes homônimos são diferentes."         , () => comparadorBasico(pedro, xara ), igual("Elemento Pedro (Cliente) é diferente do elemento Pedro (Cliente)."                     ), testOk),
        teste("Dois abacaxis são diferentes."                   , () => comparadorBasico(abcx1, abcx2), igual("Elemento [object Object] (Abacaxi) é diferente do elemento [object Object] (Abacaxi)." ), testOk),
        teste("true e false são diferentes."                    , () => comparadorBasico(true , false), igual("Elemento true (boolean) é diferente do elemento false (boolean)."                      ), testOk),
        teste("true e 1 são equivalentes."                      , () => comparadorBasico(true , 1    ), igual("Elemento true (boolean) é equivalente ao elemento 1 (number)."                         ), testOk),
        teste("true e 1 são equivalentes."                      , () => comparadorBasico(true , "1"  ), igual("Elemento true (boolean) é equivalente ao elemento 1 (string)."                         ), testOk),
        teste("false e 0 são equivalentes."                     , () => comparadorBasico(false, 0    ), igual("Elemento false (boolean) é equivalente ao elemento 0 (number)."                        ), testOk),
        teste("true e 2 são diferentes."                        , () => comparadorBasico(true , 2    ), igual("Elemento true (boolean) é diferente do elemento 2 (number)."                           ), testOk),

        // E eis aqui um forte motivo para nunca se usar == e != e sempre usar === e !==.
        teste(`Fornecedora Paula e nome Paula são equivalentes. ${droga}`, () => comparadorBasico(paula, "Paula"), igual("Elemento Paula (Fornecedor) é equivalente ao elemento Paula (string)."), testOk),
        teste(`Uva e true são equivalentes. ${droga}`                    , () => comparadorBasico(uva  ,   true ), igual("Elemento 1 (Uva) é equivalente ao elemento true (boolean)."           ), testOk)
    ]);

    // Exercícios 4 e 5.

    grupo("Exercício 4", "Primeiro nome").maximo(0.3).testes([
        teste("Yuri Dirickson deve retornar Yuri.", () => primeiroNome("Yuri Dirickson"), igual("Yuri"  ), testOk),
        teste("Marina Silva deve retornar Marina.", () => primeiroNome("Marina Silva"  ), igual("Marina"), testOk),
        teste("Tatá Wernerck deve retornar Tatá." , () => primeiroNome("Tatá"          ), igual("Tatá"  ), testOk),
        teste("Robson deve retornar Robson."      , () => primeiroNome("Robson"        ), igual("Robson"), testOk),
        teste("Victor deve retornar Victor."      , () => primeiroNome("Victor"        ), igual("Victor"), testOk),
        teste("Ana Júlia deve retornar Ana."      , () => primeiroNome("Ana Júlia"     ), igual("Ana"   ), testOk)
    ]);

    grupo("Exercício 5", "Nome abreviado").maximo(0.3).testes([
        teste("Yuri Dirickson deve retornar Yuri D.", () => abreviadorNomes("Yuri Dirickson"), igual("Yuri D."  ), testOk),
        teste("Marina Silva deve retornar Marina S.", () => abreviadorNomes("Marina Silva"  ), igual("Marina S."), testOk),
        teste("Tatá Wernerck deve retornar Tatá W." , () => abreviadorNomes("Tatá Wernerck" ), igual("Tatá W."  ), testOk),
        teste("Robson deve retornar Robson."        , () => abreviadorNomes("Robson"        ), igual("Robson"   ), testOk),
        teste("Victor deve retornar Victor."        , () => abreviadorNomes("Victor"        ), igual("Victor"   ), testOk),
        teste("Ana Júlia deve retornar Ana J."      , () => abreviadorNomes("Ana Júlia"     ), igual("Ana J."   ), testOk)
    ]);

    // Exercícios 6 e 7.

    const datasBoas = {
        "31/01/1975": "31 de Janeiro de 1975",
        "10/02/2219": "10 de Fevereiro de 2219",
        "28/03/1677": "28 de Março de 1677",
        "07/04/1944": "07 de Abril de 1944",
        "14/05/2001": "14 de Maio de 2001",
        "22/06/1789": "22 de Junho de 1789",
        "31/07/1821": "31 de Julho de 1821",
        "25/08/1982": "25 de Agosto de 1982",
        "12/09/2044": "12 de Setembro de 2044",
        "01/10/3566": "01 de Outubro de 3566",
        "04/11/1210": "04 de Novembro de 1210",
        "03/12/1777": "03 de Dezembro de 1777",
        "09/01/1500": "09 de Janeiro de 1500",
        "12/02/1989": "12 de Fevereiro de 1989",
        "24/03/2022": "24 de Março de 2022",
        "30/04/2020": "30 de Abril de 2020",
        "16/05/2090": "16 de Maio de 2090",
        "19/06/2051": "19 de Junho de 2051",
        "13/07/2030": "13 de Julho de 2030",
        "13/08/1967": "13 de Agosto de 1967",
        "13/09/1923": "13 de Setembro de 1923",
        "29/10/1848": "29 de Outubro de 1848",
        "30/11/1625": "30 de Novembro de 1625",
        "31/12/9999": "31 de Dezembro de 9999",
        "01/01/0001": "01 de Janeiro de 0001",
        "31/01/0001": "31 de Janeiro de 0001",
        "29/02/2024": "29 de Fevereiro de 2024",
        "29/02/1600": "29 de Fevereiro de 1600",
        "31/03/0001": "31 de Março de 0001",
        "31/05/2029": "31 de Maio de 2029",
        "31/07/2023": "31 de Julho de 2023",
        "31/08/1997": "31 de Agosto de 1997",
        "31/10/1453": "31 de Outubro de 1453"
    };

    const datasRuins = [
        "30/00/1756",
        "32/01/2023",
        "10/-1/1984",
        "10/13/1984",
        "00/04/1984",
        "99/99/9999",
        "-5/04/1928",
        "29/02/2023",
        "29/02/1900",
        "29/02/2100",
        "30/02/2023",
        "30/02/2024",
        "31/04/2023",
        "31/06/2023",
        "31/09/2023",
        "31/11/2023",
        "14-10-2023",
        "14.10.2023",
        "3/7/2023",
        "12/08/0000",
        "31/04/-001",
        "  /  /    ",
        " 1/ 1/  24",
        "10/10/2010 xxx",
        "abacaxi e pêra",
        "zoado",
        "WT/Fw/tfWTF",
        ""
    ];
    
    const testes6p1 = [];
    const testes7p1 = [];
    for (const ddMMyyyy in datasBoas) {
        const porExtenso = datasBoas[ddMMyyyy];
        testes6p1.push(teste(`A data ${ddMMyyyy} é válida.`, eval(`() => dataValida("${ddMMyyyy}")`), igual(true), testOk));
        testes7p1.push(teste(`A data ${ddMMyyyy} deve devolver ${porExtenso}.`, eval(`() => converteDataParaFormaCompleta("${ddMMyyyy}")`), igual(porExtenso), testOk));
    }

    const testes6p2 = [];
    const testes7p2 = [];
    for (const idx in datasRuins) {
        const ddMMyyyy = datasRuins[idx];
        testes6p2.push(teste(`A data ${ddMMyyyy} é inválida.`, eval(`() => dataValida("${ddMMyyyy}")`), igual(false), testOk));
        testes7p2.push(teste(`A data ${ddMMyyyy} é inválida.`, eval(`() => converteDataParaFormaCompleta("${ddMMyyyy}")`), igual("Data inválida"), testOk));
    }

    grupo("Exercício 6 - parte 1 (caminho feliz)"  , "Datas válidas").maximo(0.4).testes(testes6p1);
    grupo("Exercício 6 - parte 2 (caminho infeliz)", "Datas inválidas").maximo(0.3).testes(testes6p2);
    grupo("Exercício 7 - parte 1 (caminho feliz)"  , "Datas válidas por extenso").maximo(0.3).testes(testes7p1);
    grupo("Exercício 7 - parte 2 (caminho infeliz)", "Datas inválidas por extenso").maximo(0.1).testes(testes7p2);

    // Exercícios 8 ao 11.

    grupo("Exercício 8", "Somar pares").maximo(0.4).testes([
        teste("1 e 4 deve devolver 6."    , () => somadorPares(  1,  4), igual(  6), testOk),
        teste("2 e 9 deve devolver 20."   , () => somadorPares(  2,  9), igual( 20), testOk),
        teste("2 e 10 deve devolver 30."  , () => somadorPares(  2, 10), igual( 30), testOk),
        teste("1 e 10 deve devolver 30."  , () => somadorPares(  1, 10), igual( 30), testOk),
        teste("2 e 11 deve devolver 30."  , () => somadorPares(  2, 11), igual( 30), testOk),
        teste("1 e 11 deve devolver 30."  , () => somadorPares(  1, 11), igual( 30), testOk),
        teste("2 e 12 deve devolver 42."  , () => somadorPares(  2, 12), igual( 42), testOk),
        teste("1 e 3 deve devolver 2."    , () => somadorPares(  1,  3), igual(  2), testOk),
        teste("8 e 8 deve devolver 8."    , () => somadorPares(  8,  8), igual(  8), testOk),
        teste("3 e 3 deve devolver 0."    , () => somadorPares(  3,  3), igual(  0), testOk),
        teste("-20 e 20 deve devolver 0." , () => somadorPares(-20, 20), igual(  0), testOk),
        teste("-20 e 10 deve devolver 80.", () => somadorPares(-20, 10), igual(-80), testOk)
    ]);

    grupo("Exercício 9", "Achar o menor").maximo(0.3).testes([
        teste("Se o vetor estiver vazio, devolve undefined."  , () => acharMenor([                            ]), igual(undefined), testOk),
        teste("Para [42] retorna 42."                         , () => acharMenor([                          42]), igual(       42), testOk),
        teste("Para [1, 2, 3, 4, 5] retorna 1."               , () => acharMenor([         1,   2,  3,   4,  5]), igual(        1), testOk),
        teste("Para [1, 2, 3, 4, 0] retorna 0."               , () => acharMenor([         1,   2,  3,   4,  0]), igual(        0), testOk),
        teste("Para [1, 2, -3, 4, 0] retorna -3."             , () => acharMenor([         1,   2, -3,   4,  0]), igual(       -3), testOk),
        teste("Para [42, 12, 21] retorna 12."                 , () => acharMenor([                 42,  12, 21]), igual(       12), testOk),
        teste("Para [42, 12, 21, -27, 8, -22, 9] retorna -27.", () => acharMenor([42, 12, 21, -27,  8, -22,  9]), igual(      -27), testOk)
    ]);

    grupo("Exercício 10", "Achar os pares").maximo(0.4).testes([
        teste("Se o vetor estiver vazio, devolve um vetor vazio.", () => acharPares([               ]), igual([           ]), testOk),
        teste("Para [1, 3, 5, 7, 9] retorna vazio."              , () => acharPares([1, 3,  5,  7, 9]), igual([           ]), testOk),
        teste("Para [1, 2, 3, 4, 5] retorna [2, 4]."             , () => acharPares([1, 2,  3,  4, 5]), igual([   2,  4   ]), testOk),
        teste("Para [1, 2, 3, 4, 0] retorna [2, 4, 0]."          , () => acharPares([1, 2,  3,  4, 0]), igual([   2,  4, 0]), testOk),
        teste("Para [1, 2, 3, -4, 0] retorna [2, -4, 0]."        , () => acharPares([1, 2,  3, -4, 0]), igual([   2, -4, 0]), testOk),
        teste("Para [6, 2, -3, -4, 0] retorna [6, 2, -4, 0]."    , () => acharPares([6, 2, -3, -4, 0]), igual([6, 2, -4, 0]), testOk),
        teste("Para [6, 2, 6, 2, 3] retorna [6, 2, 6, 2]."       , () => acharPares([6, 2,  6,  2, 3]), igual([6, 2,  6, 2]), testOk)
    ]);

    grupo("Exercício 11", "IMC").maximo(0.6).testes([
        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc({ peso:  50    , altura: 1.7  }), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc({ peso:  60    , altura: 1.7  }), igual("Normal"                      ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc({ peso:  72.25 , altura: 1.7  }), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc({ peso:  86.7  , altura: 1.7  }), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc({ peso: 101.15 , altura: 1.7  }), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc({ peso: 160    , altura: 1.7  }), igual("Obesidade mórbida (Grau III)"), testOk),

        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc({ peso:   0    , altura: 2.0  }), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc({ peso:  73.999, altura: 2.0  }), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc({ peso:  74    , altura: 2.0  }), igual("Normal"                      ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc({ peso:  99.999, altura: 2.0  }), igual("Normal"                      ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc({ peso: 100    , altura: 2.0  }), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc({ peso: 119.999, altura: 2.0  }), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc({ peso: 120    , altura: 2.0  }), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc({ peso: 139.999, altura: 2.0  }), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc({ peso: 140    , altura: 2.0  }), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc({ peso: 159.999, altura: 2.0  }), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc({ peso: 160    , altura: 2.0  }), igual("Obesidade mórbida (Grau III)"), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc({ peso: 9999999, altura: 2.0  }), igual("Obesidade mórbida (Grau III)"), testOk),

        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc({ peso:   0    , altura: 0.5  }), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc({ peso:   4.624, altura: 0.5  }), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc({ peso:   4.625, altura: 0.5  }), igual("Normal"                      ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc({ peso:   6.249, altura: 0.5  }), igual("Normal"                      ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc({ peso:   6.25 , altura: 0.5  }), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc({ peso:   7.499, altura: 0.5  }), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc({ peso:   7.5  , altura: 0.5  }), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc({ peso:   8.749, altura: 0.5  }), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc({ peso:   8.75 , altura: 0.5  }), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc({ peso:   9.999, altura: 0.5  }), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc({ peso:  10    , altura: 0.5  }), igual("Obesidade mórbida (Grau III)"), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc({ peso: 9999999, altura: 0.5  }), igual("Obesidade mórbida (Grau III)"), testOk),

        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc({ peso: 100    , altura: 9999 }), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Abaixo do peso" para IMC abaixo de 18,5.'                           , () => calcularImc({ peso: 100    , altura: 2.33 }), igual("Abaixo do peso"              ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc({ peso: 100    , altura: 2.32 }), igual("Normal"                      ), testOk),
        teste('Deve devolver "Normal" para IMC a partir de 18,5 e abaixo de 25.'                  , () => calcularImc({ peso: 100    , altura: 2.01 }), igual("Normal"                      ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc({ peso: 100    , altura: 2.0  }), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Excesso de peso" para IMC a partir de 25 e abaixo de 30.'           , () => calcularImc({ peso: 100    , altura: 1.83 }), igual("Excesso de peso"             ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc({ peso: 100    , altura: 1.82 }), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade leve (Grau I)" para IMC a partir de 30 e abaixo de 35.'   , () => calcularImc({ peso: 100    , altura: 1.7  }), igual("Obesidade leve (Grau I)"     ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc({ peso: 100    , altura: 1.69 }), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade severa (Grau II)" para IMC a partir de 35 e abaixo de 40.', () => calcularImc({ peso: 100    , altura: 1.59 }), igual("Obesidade severa (Grau II)"  ), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc({ peso: 100    , altura: 1.58 }), igual("Obesidade mórbida (Grau III)"), testOk),
        teste('Deve devolver "Obesidade mórbida (Grau III)" para IMC a parte de 40.'              , () => calcularImc({ peso: 100    , altura: 0.01 }), igual("Obesidade mórbida (Grau III)"), testOk)
    ]);

    // Exercícios 12 e 13.

    function testeTrianguloFeliz(func) {
        return [
            teste('Deve devolver "Equilátero" para 5, 5 e 5.'      , eval(`() => ${func}( 5  ,   5,  5  )`), igual("Equilátero"), testOk),
            teste('Deve devolver "Equilátero" para 8, 8 e 8.'      , eval(`() => ${func}( 8  ,   8,  8  )`), igual("Equilátero"), testOk),
            teste('Deve devolver "Equilátero" para 3.3, 3.3 e 3.3.', eval(`() => ${func}( 3.3, 3.3,  3.3)`), igual("Equilátero"), testOk),
            teste('Deve devolver "Isósceles" para 12, 8 e 12.'     , eval(`() => ${func}(12  ,   8, 12  )`), igual("Isósceles" ), testOk),
            teste('Deve devolver "Isósceles" para 12, 12 e 8.8.'   , eval(`() => ${func}(12  ,  12,  8.8)`), igual("Isósceles" ), testOk),
            teste('Deve devolver "Isósceles" para 5, 13 e 13.'     , eval(`() => ${func}( 5  ,  13, 13  )`), igual("Isósceles" ), testOk),
            teste('Deve devolver "Escaleno" para 4, 2 e 3.'        , eval(`() => ${func}( 4  ,   2,  3  )`), igual("Escaleno"  ), testOk),
            teste('Deve devolver "Escaleno" para 3, 2.5 e 1.'      , eval(`() => ${func}( 3  , 2.5,  1  )`), igual("Escaleno"  ), testOk),
            teste('Deve devolver "Escaleno" para 7.2, 2.5 e 5.1.'  , eval(`() => ${func}( 7.2, 2.5,  5.1)`), igual("Escaleno"  ), testOk)
        ];
    }

    function testeTrianguloInfeliz(func) {
        return [
            teste('Deve devolver "Não é um triângulo" para 7.2, 1.5 e 3.', eval(`() => ${func}( 7.2, 2.5,  3  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 1, 2 e 3.'    , eval(`() => ${func}( 1  , 2  ,  3  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, 2 e 4.'    , eval(`() => ${func}( 2  , 2  ,  4  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, 5 e 1.'    , eval(`() => ${func}( 2  , 5  ,  1  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, 2 e 0.'    , eval(`() => ${func}( 2  , 2  ,  0  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 0, 2 e 1.'    , eval(`() => ${func}( 0  , 2  ,  1  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 0, 2 e 0.'    , eval(`() => ${func}( 0  , 2  ,  0  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 0, 0 e 0.'    , eval(`() => ${func}( 0  , 0  ,  0  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para -1, -1 e -1.' , eval(`() => ${func}(-1  ,-1  , -1  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, 2 e -1.'   , eval(`() => ${func}( 2  , 2  , -1  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para 2, -2 e 5.'   , eval(`() => ${func}( 2  ,-2  ,  5  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para -7, 8 e 2.'   , eval(`() => ${func}(-7  , 8  ,  2  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para -5, -5 e -5.' , eval(`() => ${func}(-5  ,-5  , -5  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para -5, -5 e 4.'  , eval(`() => ${func}(-5  ,-5  ,  4  )`), igual("Não é um triângulo"), testOk),
            teste('Deve devolver "Não é um triângulo" para -3, -4 e 5.'  , eval(`() => ${func}(-3  ,-4  , -5  )`), igual("Não é um triângulo"), testOk)
        ];
    }

    function testeTrianguloMuitoInfeliz() {
        return [
            teste('Deve devolver "Informe o número A corretamente." para entrada com letras no A.', () => informarLados("a",   5,   5), igual("Informe o número A corretamente."), testOk),
            teste('Deve devolver "Informe o número B corretamente." para entrada com letras no B.', () => informarLados(  5, "b",   5), igual("Informe o número B corretamente."), testOk),
            teste('Deve devolver "Informe o número C corretamente." para entrada com letras no C.', () => informarLados(  5,   5, "c"), igual("Informe o número C corretamente."), testOk),
            teste('Deve devolver "Informe o número A corretamente." para entrada vazia no A.'     , () => informarLados( "",   5,   5), igual("Informe o número A corretamente."), testOk),
            teste('Deve devolver "Informe o número B corretamente." para entrada vazia no B.'     , () => informarLados(  5,  "",   5), igual("Informe o número B corretamente."), testOk),
            teste('Deve devolver "Informe o número C corretamente." para entrada vazia no C.'     , () => informarLados(  5,   5,  ""), igual("Informe o número C corretamente."), testOk),
            teste(
                'Deve devolver "Informe o número A corretamente." para entrada com palavras.',
                () => informarLados("Willy Wonka - Rachadinha de chocolate com laranja", "Tonho da Lua - Senhor dos exércitos de robôs", "Dudu Bananinha - Sheik chapeiro"),
                igual("Informe o número A corretamente."),
                testOk
            )
        ];
    }

    function informarLados(a, b, c) {
        document.querySelector("#ladoA").value = "" + a;
        document.querySelector("#ladoB").value = "" + b;
        document.querySelector("#ladoC").value = "" + c;
        let resultado = "", crash = null;
        const bt = document.querySelector("#botaoTriangulo"), oldClick = bt.onclick;
        bt.onclick = function() {
            try {
                oldClick();
                resultado = document.querySelector("#tipoTriangulo").value;
            } catch (e) {
                crash = e;
            }
        };
        bt.click();
        bt.onclick = oldClick;
        limparForm13();
        if (crash) throw crash;
        return resultado;
    }

    grupo("Exercício 12 - parte 1 (caso feliz - é um triângulo)"   , "Tipo de triângulo - equilátero, isósceles e escaleno")
            .maximo(0.4).testes(testeTrianguloFeliz  ("tipoTriangulo"));
    grupo("Exercício 12 - parte 2 (caso infeliz - não é triângulo)", "Tipo de triângulo - não é um triângulo")
            .maximo(0.4).testes(testeTrianguloInfeliz("tipoTriangulo"));

    grupo("Exercício 13 - parte 1 (caso feliz - é um triângulo)"          , "Tipo de triângulo no formulário - equilátero, isósceles e escaleno")
            .maximo(0.3).testes(testeTrianguloFeliz  ("informarLados"));
    grupo("Exercício 13 - parte 2 (caso infeliz - não é triângulo)"       , "Tipo de triângulo no formulário - não é um triângulo")
            .maximo(0.3).testes(testeTrianguloInfeliz("informarLados"));
    grupo("Exercício 13 - parte 3 (caso muito infeliz - entrada inválida)", "Tipo de triângulo no formulário - usuário preencheu o formulário com porcaria")
            .maximo(0.3).testes(testeTrianguloMuitoInfeliz()        );

    // Usado em todos os exercícios do 14 ao 20.
    const alunosMatriculasValidos = [
        {
            criar: () => new AlunoMatricula("Maria Luiza", "F", "Desenvolvimento Web", Object.freeze([8, 7, 9, 4.5, 8]), 9, 0, 84),
            json: {
                nome: "Maria Luiza", genero: "F", disciplina: "Desenvolvimento Web", acs: [8, 7, 9, 4.5, 8], prova: 9, sub: 0, presenca: 84,
                media: 8.5, situacao: "AP", situacaoPorExtenso: "aprovada",
                status: "Maria Luiza tem média 8.5 na disciplina de Desenvolvimento Web e foi aprovada com 84% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Anderson", "M", "LP 2", Object.freeze([3.4, 5.0, 2.0, 4.8, 0]), 1.8, 2.9, 80),
            json: {
                nome: "Anderson", genero: "M", disciplina: "LP 2", acs: [3.4, 5, 2, 4.8, 0], prova: 1.8, sub: 2.9, presenca: 80,
                media: 3.5, situacao: "RM", situacaoPorExtenso: "reprovado por média",
                status: "Anderson tem média 3.5 na disciplina de LP 2 e foi reprovado por média com 80% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Chiquinha", "F", "Química Orgânica III", Object.freeze([9, 8, 7, 6, 5]), 4, 3, 21),
            json: {
                nome: "Chiquinha", genero: "F", disciplina: "Química Orgânica III", acs: [9, 8, 7, 6, 5], prova: 4, sub: 3, presenca: 21,
                media: 6, situacao: "RF", situacaoPorExtenso: "reprovada por falta",
                status: "Chiquinha tem média 6 na disciplina de Química Orgânica III e foi reprovada por falta com 21% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Bozoliro", "M", "presidência, governo e chefe de estado", Object.freeze([1, 2.5, 0, 1, 1.5]), 2.2, 0, 17),
            json: {
                nome: "Bozoliro", genero: "M", disciplina: "presidência, governo e chefe de estado", acs: [1, 2.5, 0, 1, 1.5], prova: 2.2, sub: 0, presenca: 17,
                media: 2, situacao: "RMF", situacaoPorExtenso: "reprovado por média e falta",
                status: "Bozoliro tem média 2 na disciplina de presidência, governo e chefe de estado e foi reprovado por média e falta com 17% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Molusco da Silva", "M", "presidência, governo e chefe de estado", Object.freeze([8.5, 9, 7, 8.5, 10]), 10, 0, 88),
            json: {
                nome: "Molusco da Silva", genero: "M", disciplina: "presidência, governo e chefe de estado", acs: [8.5, 9, 7, 8.5, 10], prova: 10, sub: 0, presenca: 88,
                media: 9.5, situacao: "AP", situacaoPorExtenso: "aprovado",
                status: "Molusco da Silva tem média 9.5 na disciplina de presidência, governo e chefe de estado e foi aprovado com 88% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Bruxa do 71", "F", "atriz de novela mexicana", Object.freeze([0.71, 0.71, 0.71, 0.71, 0.71]), 0, 0.71, 71),
            json: {
                nome: "Bruxa do 71", genero: "F", disciplina: "atriz de novela mexicana", acs: [0.71, 0.71, 0.71, 0.71, 0.71], prova: 0, sub: 0.71, presenca: 71,
                media: 0.5, situacao: "RMF", situacaoPorExtenso: "reprovada por média e falta",
                status: "Bruxa do 71 tem média 0.5 na disciplina de atriz de novela mexicana e foi reprovada por média e falta com 71% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Chuck Norris", "M", "Ator", Object.freeze([10, 10, 10, 10, 10]), 10, 10, 100),
            json: {
                nome: "Chuck Norris", genero: "M", disciplina: "Ator", acs: [10, 10, 10, 10, 10], prova: 10, sub: 10, presenca: 100,
                media: 10, situacao: "AP", situacaoPorExtenso: "aprovado",
                status: "Chuck Norris tem média 10 na disciplina de Ator e foi aprovado com 100% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Dollynho", "M", "Seu amiguinho", Object.freeze([10, 10, 10, 10, 10]), 10, 10, 0),
            json: {
                nome: "Dollynho", genero: "M", disciplina: "Seu amiguinho", acs: [10, 10, 10, 10, 10], prova: 10, sub: 10, presenca: 0,
                media: 10, situacao: "RF", situacaoPorExtenso: "reprovado por falta",
                status: "Dollynho tem média 10 na disciplina de Seu amiguinho e foi reprovado por falta com 0% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Dollynha", "F", "Sua amiguinha", Object.freeze([0, 0, 0, 0, 0]), 0, 0, 100),
            json: {
                nome: "Dollynha", genero: "F", disciplina: "Sua amiguinha", acs: [0, 0, 0, 0, 0], prova: 0, sub: 0, presenca: 100,
                media: 0, situacao: "RM", situacaoPorExtenso: "reprovada por média",
                status: "Dollynha tem média 0 na disciplina de Sua amiguinha e foi reprovada por média com 100% de presença."
            },
            instanciavel: false
        },
        {
            criar: () => new AlunoMatricula("Zerinho", "M", "fazer algo útil", Object.freeze([0, 0, 0, 0, 0]), 0, 0, 0),
            json: {
                nome: "Zerinho", genero: "M", disciplina: "fazer algo útil", acs: [0, 0, 0, 0, 0], prova: 0, sub: 0, presenca: 0,
                media: 0, situacao: "RMF", situacaoPorExtenso: "reprovado por média e falta",
                status: "Zerinho tem média 0 na disciplina de fazer algo útil e foi reprovado por média e falta com 0% de presença."
            },
            instanciavel: false
        }
    ];

    // Exercício 14.

    const testes14 = alunosMatriculasValidos.map(aluno =>
        teste(
            `Deve conseguir instanciar um aluno corretamente [${aluno.json.nome}].`,
            eval(aluno.criar.toString()),
            naoDeuErro(),
            testOk,
            ok => aluno.instanciavel = ok
        )
    );
    grupo("Exercício 14", "Construtor da classe AlunoMatricula").maximo(0.4).testes(testes14);

    // Exercício 15.

    const testes15 = [];
    const artigos = {nome: "o", genero: "o", disciplina: "a", acs: "as", prova: "a", sub: "a", presenca: "a"};
    ["nome", "genero", "disciplina", "acs", "prova", "sub", "presenca"].forEach(getter => {
        alunosMatriculasValidos.forEach(aluno =>
            testes15.push(
                teste(
                    `Deve conseguir obter ${artigos[getter]} ${getter} de uma instância de AlunoMatricula corretamente [${aluno.json.nome}].`,
                    eval(aluno.criar.toString() + "." + getter),
                    igual(aluno.json[getter]),
                    () => jsonOk && aluno.instanciavel,
                    ok => aluno["funciona" + getter] = ok
                )
            )
        );
    });
    grupo("Exercício 15", "Getters simples da classe AlunoMatricula").maximo(0.3).testes(testes15);

    // Exercícos 16 a 19.

    const ex16_19 = [
        ["media", 16, "média", "a"],
        ["situacao", 17, "situação", "a"],
        ["situacaoPorExtenso", 18, "situação por extenso", "a"],
        ["status", 19, "status", "o"]
    ];

    ex16_19.forEach(exercicio => {
        const [getter, numero, nome, artigo] = exercicio;
        const testes16_19 = [];
        alunosMatriculasValidos.forEach(aluno =>
            testes16_19.push(
                teste(
                    `Deve conseguir obter ${artigo} ${nome} de uma instância de AlunoMatricula corretamente [${aluno.json.nome}].`,
                    eval(aluno.criar.toString() + "." + getter),
                    igual(aluno.json[getter]),
                    () => jsonOk && aluno.instanciavel,
                    ok => aluno["funciona" + getter] = ok
                )
            )
        );
        grupo(`Exercício ${numero}`, `Getter d${artigo} ${nome} na classe AlunoMatricula`).maximo(0.4).testes(testes16_19);
    });

    // Exercício 20.

    function informarDados(nome, genero, disciplina, acs, prova, sub, presenca) {
        document.querySelector("#nome").value = nome;
        document.querySelector("#ele").checked = genero === "M";
        document.querySelector("#ela").checked = genero === "F";
        document.querySelector("#disciplina").value = disciplina;
        acs.forEach((e, i) => document.querySelector("#ac" + (i + 1)).value = "" + e);
        document.querySelector("#prova").value = "" + prova;
        document.querySelector("#sub").value = "" + sub;
        document.querySelector("#presenca").value = "" + presenca;
        let resultado = "", crash = null;
        const bt = document.querySelector("#botaoCadastrar"), oldClick = bt.onclick;
        bt.onclick = function() {
            try {
                oldClick();
                resultado = document.querySelector("#notas :last-child").innerHTML;
            } catch (e) {
                crash = e;
            }
        };
        bt.click();
        bt.onclick = oldClick;
        limparForm20();
        limparListasForm20();
        if (crash) throw crash;
        return resultado;
    }

    const alunosMatriculasInvalidos = [
        {
            criar: '() => informarDados("Teste", "X", "Desenvolvimento Web", [8, 7, 9, 4.5, 8], 9, 0, 84)',
            erro: "Escolha o gênero do(a) aluno(a) corretamente.",
            causa: "nenhum gênero escolhido",
        }
    ];

    ["", "   "].forEach(lixo => {
        alunosMatriculasInvalidos.push({
            criar: `() => informarDados("${lixo}", "M", "Desenvolvimento Web", Object.freeze([8, 7, 9, 4.5, 8]), 9, 0, 84)`,
            erro: "Informe os dados corretamente.",
            causa: `o nome inválido "${lixo}"`,
        });
        alunosMatriculasInvalidos.push({
            criar: `() => informarDados("Teste", "F", "${lixo}", Object.freeze([8, 7, 9, 4.5, 8]), 9, 0, 84)`,
            erro: "Informe os dados corretamente.",
            causa: `a disciplina inválida "${lixo}"`,
        });
    });
    ["", "   ", "-1", "-", "abc", "5.678", "11", "10.01", "5.", ".4", ".", "3.4.5"].forEach(lixo => {
        [0, 1, 2, 3, 4].forEach(j => {
            const arr = [8, 7, 9, 4.5, 8];
            arr[j] = lixo;
            alunosMatriculasInvalidos.push({
                criar: `() => informarDados("Teste", "F", "Teste", Object.freeze(${JSON.stringify(arr).replaceAll(",", ", ")}), 9, 0, 84)`,
                erro: "Informe a nota corretamente.",
                causa: `o valor inválido "${lixo}" para o AC ${j + 1}`,
            });
        });
        alunosMatriculasInvalidos.push({
            criar: `() => informarDados("Teste", "F", "Teste", Object.freeze([8, 7, 9, 4.5, 8]), "${lixo}", 0, 84)`,
            erro: "Informe a nota corretamente.",
            causa: `o valor inválido "${lixo}" para a prova`,
        });
        alunosMatriculasInvalidos.push({
            criar: `() => informarDados("Teste", "F", "Teste", Object.freeze([8, 7, 9, 4.5, 8]), 9, "${lixo}", 84)`,
            erro: "Informe a nota corretamente.",
            causa: `o valor inválido "${lixo}" para a sub`,
        });
    });
    ["", "   ", "-1", "-", "abc", "5.6", "101", "5.", ".4", "."].forEach(lixo => {
        alunosMatriculasInvalidos.push({
            criar: `() => informarDados("Teste", "F", "Desenvolvimento Web", Object.freeze([8, 7, 9, 4.5, 8]), 9, 0, "${lixo}")`,
            erro: "Informe o valor corretamente.",
            causa: `o valor inválido "${lixo}" para a presença`,
        });
    });

    const alunosMatriculasValidos2 = [];

    ["10.00", "10.0", "0.0", "0.00"].forEach(nota => {
        [0, 1, 2, 3, 4].forEach(j => {
            const arr = ["10", "10", "10", "10", "10"];
            arr[j] = nota;
            alunosMatriculasValidos2.push({
                criar: `() => informarDados("Teste", "F", "Teste", ${JSON.stringify(arr).replaceAll(",", ", ")}, "10", "10", 84)`,
                campo: "AC " + (j + 1),
                valor: nota,
            });
        });
        alunosMatriculasValidos2.push({
            criar: `() => informarDados("Teste", "F", "Teste", ["10", "10", "10", "10", "10"], ${nota}, "10", 84)`,
            campo: "prova",
            valor: nota,
        });
        alunosMatriculasValidos2.push({
            criar: `() => informarDados("Teste", "F", "Teste", ["10", "10", "10", "10", "10"], "10", ${nota}, 84)`,
            campo: "sub",
            valor: nota,
        });
    });

    const testes20p1 = alunosMatriculasValidos.map(aluno =>
        teste(
            `Deve conseguir preencher uma instância de AlunoMatricula corretamente no formulário [${aluno.json.nome}].`,
            eval(aluno.criar.toString().replace("new AlunoMatricula", "informarDados")),
            igual(aluno.json.status),
            () => jsonOk && aluno.funcionastatus
        )
    );

    const testes20p2 = alunosMatriculasInvalidos.map((aluno, i) =>
        teste(
            `Não deve conseguir preencher uma instância de AlunoMatricula com ${aluno.causa} [${i + 1}].`,
            eval(aluno.criar),
            igual(aluno.erro),
            testOk
        )
    );

    const testes20p3 = alunosMatriculasValidos2.map((aluno, i) =>
        teste(
            `Deve aceitar o valor ${aluno.valor} no campo ${aluno.campo}.`,
            eval(aluno.criar),
            igual("Teste tem média 10 na disciplina de Teste e foi aprovada com 84% de presença."),
            () => jsonOk
        )
    );

    grupo("Exercício 20 - parte 1 (caminho feliz - entrada válida)"    , "Formulário com AlunoMatricula - preenchido corretamente").maximo(0.4).testes(testes20p1);
    grupo("Exercício 20 - parte 2 (caminho infeliz - entrada inválida)", "Formulário com AlunoMatricula - preenchimento incorreto").maximo(0.4).testes(testes20p2);
    grupo("Exercício 20 - parte 3 (caminho feliz - casos especiais)"   , "Formulário com AlunoMatricula - preenchido com 10"      ).maximo(0.1).testes(testes20p3);

    // Teste de efeitos colaterais dos exercícios 14 ao 20.

    function jsonBonito(dados, keys) {
        if (!keys) keys = Object.keys(dados).sort();
        return JSON.stringify(dados, keys).replaceAll(",", ", ").replaceAll(":", ": ").replaceAll(",  g", ", g");
    }

    function testarEfeitosColaterais(coisa, jsonBase) {
        const doido = a => random.embaralhar(a);
        const keys = Object.keys(jsonBase).sort();
        console.log(keys);
        const json1 = jsonBonito(jsonBase, keys);
        const json2 = jsonBonito(Utilitarios.extractGetters(coisa), keys);
        const json3 = jsonBonito(Utilitarios.extractGetters(coisa, a => a.sort()), keys);
        const json4 = jsonBonito(Utilitarios.extractGetters(coisa, a => a.sort().reverse()), keys);
        const json5 = jsonBonito(Utilitarios.extractGetters(coisa, doido), keys);
        const json6 = jsonBonito(Utilitarios.extractGetters(coisa, doido), keys);
        const json7 = jsonBonito(Utilitarios.extractGetters(coisa, doido), keys);

        igual(json1).testar(json2);
        igual(json1).testar(json3);
        igual(json1).testar(json4);
        igual(json2).testar(json3);
        igual(json2).testar(json4);
        igual(json3).testar(json4);
        igual(json1).testar(json5);
        igual(json1).testar(json6);
        igual(json1).testar(json7);
    }

    const testesColaterais = alunosMatriculasValidos.map(aluno =>
        teste(
            `Deve se certificar que chamar os getters de AlunoMatricula não causa efeitos colaterais estranhos [${aluno.json.nome}].`,
            eval(`() => testarEfeitosColaterais(${aluno.criar.toString().replace("() => ", "")}, ${jsonBonito(aluno.json)})`),
            naoDeuErro(),
            () => jsonOk && aluno.funcionastatus
        )
    );

    grupo("Exercícios 14 a 20 - testar efeitos colaterais indesejados", "Getters não devem causar efeitos colaterais").maximo(0.1).testes(testesColaterais);

    // Exercício 21.

    const formas = [
        "Eu vou entregar por meio do Google Forms.",
        "Eu vou entregar por meio do One Drive.",
        "Eu vou entregar por meio do Google Drive.",
        "Eu vou entregar por e-mail.",
        "Eu vou entregar um CD com o código para o professor.",
        "Eu vou entregar um pen-drive com o código para o professor.",
        "Eu vou entregar pelo WhatsApp.",
        "Eu vou entregar pelo Telegram.",
        "Eu vou entregar pelo MediaFire.",
        "Eu vou entregar no Classroom.",
        "Eu vou imprimir o código e entregar em papel pro professor.",
        "Eu vou tirar uma foto do código e entregar essa foto.",
        "Eu vou entregar o código em PDF.",
        "Eu vou entregar pelos correios.",
        "Eu não vou entregar nada.",
        "Eu vou entregar o arquivo ac3.js que eu alterei e nada mais.",
        "Eu vou entregar o arquivo ac3.js junto com outros arquivos.",
        "Eu vou entregar o arquivo ac3-teste.js que eu alterei.",
        "Eu vou entregar o arquivo ac3-teste.js junto com outros arquivos.",
        "Eu vou entregar o arquivo testefw.js que eu alterei.",
        "Eu vou entregar o arquivo testefw.js junto com outros arquivos.",
        "Eu vou entregar o arquivo ac3.html que eu alterei e nada mais.",
        "Eu vou entregar o arquivo ac3.html junto com outros arquivos.",
        "Eu vou entregar o arquivo ac3.css que eu alterei e nada mais.",
        "Eu vou entregar o arquivo ac3.css junto com outros arquivos.",
        "Eu vou entregar o arquivo hot-xxx-video.mp4 que eu baixei e nada mais.",
        "Eu vou entregar um arquivo RAR.",
        "Eu vou pegar uma arma, sequestrar o professor e assim ele vai ter que me dar nota.",
        "Eu vou arrumar uns quinhentos reais, mostrar a grana para o professor e perguntar se ele está a fim de negociar a nota.",
        "Eu vou xingar o professor, ameaçar processar ele e reclamar na imprensa até ele me dar a nota que eu quero.",
        "Oi, eu sou o Dollynho, seu amiguinho.",
        "Vai querer o combo ou só o lanche? Acompanha McFritas para a viagem?",
        ""
                + "We don't need no validation. / "
                + "We don't need no version control. / "
                + "No dark sarcasm in the comments. / "
                + "Bugs leave my code alone. / "
                + "HEY, BUGS, LEAVE MY CODE ALONE. / "
                + "All in all, it's just another gambi in the code. / "
                + "All in all, you're just a huge gambi in the code.",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ];

    const correto = [
        "Eu vou entregar o arquivo ac3.js que eu alterei e nada mais.",
        "Eu vou entregar por meio do Google Forms.",
    ];

    const testes21 = [];
    for (let i = 1; i <= 10; i++) {
        const copia = [...formas];
        const bagunca = random.embaralhar(copia);
        const resposta = [];
        for (let i = 0; i < bagunca.length; i++) {
            if (bagunca[i] === correto[0] || bagunca[i] === correto[1]) resposta.push(i);
        }
        testes21.push(
            teste(
                `Deve achar a melhor forma de entregar [${i}].`,
                eval(`() => comoFazerEntrega(${JSON.stringify(bagunca).replaceAll(',"', ', "')})`),
                igual(resposta),
                testOk
            )
        );
    }

    grupo("Exercício 21", "Entrega").naoFracionado.maximo(0.3).testes(testes21);
});