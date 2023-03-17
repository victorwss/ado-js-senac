# Exercício - Introdução ao Javascript

Exercícios de Introdução ao JavaScript, passando pelos tipos, estruturas e funções da disciplina de Tecnologias Web da Faculdade Impacta de Tecnologia.

## O que fazer?

Você deve mexer apenas no arquivo `ac3.js`.
Lá há 21 exercícios com códigos JavaScript a serem desenvolvidos.
Vocês devem desenvolver o código necessário para cada função/método funcionar de acordo com as respectivas documentações.
Além desses 21 exercícios, há um JSON perto do começo do arquivo também que vocês devem alterar (esse é o exercício 0).

Comece pela função que fornece um JSON com o nome e o RA dos alunos (exercício 0).
Se você não conseguir fazer isso corretamente, sua nota será zero independente de todo o resto.

Os nomes das funções não devem ser trocados (se você fizer isso, os testes não vão te perdoar).
No entanto, você pode criar outras funções que/se julgar necessário.
Não é recomendado mudar o nome dos parâmetros, embora você possa fazer isso.

Faça o AC em grupos de 1 até 5 pessoas.

## Como executar os exercícios? Como saber se o que fiz está certo?

O exercício funciona usando um framework de testes em JavaScript desenvolvido para a atividade.

Para executar e testar este AC, basta abrir o arquivo `ac3.html` em um navegador moderno (Chrome, Firefox, Opera, Edge, Konqueror, Safari ou Samsung Internet).
A página vem com dois formulários para testar os exercícios 13 e 20.
Eles estão lá porque esses dois exercícios são acerca de manipulação do DOM. Entrentanto, você também pode interagir com eles diretamente.
Mas antes deles, há um pequeno formulário com um botão de executar os testes.
Clique nesse botão e veja toda a mágica dos testes acontecer!

Este botão dispara a execução de um montão de testes (exatos 600, para ser preciso).
O relatório de testes é colocado logo após ao HTML do exercício 4.
Se houverem problemas, esses testes vão descrever o que foi que deu errado.

Obviamente, o arquivo `ac3.js` dado aqui falhará em todos os testes e vai te dar uma nota zero.
Não só isso, já te dará de cara uma caixa de mensagem de erro amarela com letras grandes vermelhas piscando bem chamativas dizendo que você precisa configurar o JSON com os nome e os RAs dos alunos (esse é o exercício 0).

O seu objetivo é editar esse monte de funções e métodos JavaScript de forma a fazer todos os testes passarem.
Você deverá alterar este arquivo até conseguir a nota 10 (ou até desistir de fazê-lo, mas espero que não seja o caso).
Faça EXATAMENTE o que o enunciado de cada exercício pede, nem mais e nem menos.
Se houver algum erro, os testes te dirão o que há de errado.

Se o seu script tiver algum erro sintático (exemplo: parênteses que abre e não fecha em lugar nenhum, `else` sem `if`, entre outros), uma caixa amarela com letras grandes vermelhas piscando vai aparecer para te avisar disso.

## E os demais arquivos?

Os testes estão no arquivo `ac3-teste.js`.
O código responsável por gerenciar os testes está no `lib/testefw.js` e no `lib/testefw.css`.
Há também os arquivos `ac3.html` (que é o que você deve executar) e `ac3.css` (para estilizar os formulários dos exercícios 13 e 20).
Para implementar alguns dos exercícios, você precisará usar as funções definidas no arquivo `lib/utils.js`.
Por fim, há este arquivo aqui (`README.md`) e o arquivo `LICENSE` com o qual você não precisa se preocupar.

É recomendável você deixar estes arquivos como estão, pois o professsor sempre usará os originais na correção, logo não há porque alterá-los.
Se você tiver coragem, você até pode mexer nesses arquivos para fazer algum experimento, colocar linhas de `console.log` para tentar entender como o código funciona, desmontar ou alterar pedaços para fazer debugging, etc.
No entanto, o funcionamento interno desses arquivos está em um nível bastante avançado e complexo e não é esperado que alunos que estejam recém-começando em JavaScript os entendam.
De toda forma, se quiser fuçar neles, fique a vontade.
Apenas sempre tenha em mãos os arquivos originais para poder se certificar de que não bagunçou nada e poder voltar atrás facilmente caso tenha bagunçado.

## Como fica a nota?

A página `ac3.html` já calculará a nota automaticamente, da seguinte forma:

- Faça o exercício 0 antes de qualquer coisa.
  Ele se chama exercício 0 porque se você não o fizer direito, a sua nota também será 0.

- Cada exercício do 1 ao 21 tem um peso diferente e uma quantidade de testes diferentes.
  Alguns exercícios são distribuídos em mais de um grupo de testes.
  Cada grupo tem a nota proporcional ao peso e ao número de testes realizados com sucesso.
  Se todos os testes num grupo forem executados com sucesso, o peso correspondente àquele grupo é somado à nota.
  Se nenhum for executado com sucesso, nada acontece.
  Se somente alguns forem bem sucedidos, a nota proporcional à quantidade de testes do exercício e ao peso do exercício será aplicada.

- Se você bagunçar com os dois exemplos dados, sofrerá uma penalidade de -1 ponto.
  Eles servem apenas para você ter alguma ideia do que deve ser feito, mas não é para zoar com eles.

No entanto, há algumas observações a serem feitas:

- Se você fizer a entrega incorretamente mesmo tendo feito o exercício 21 corretamente, será penalizado em -1 ponto da mesma forma.

- Você só deve entregar o arquivo `ac3.js`. Vou ignorar quaisquer mudanças realizadas em outros arquivos e sempre fazer a correção com os demais arquivos originais.

- Quem tentar colocar algum tipo de malware ou código malicioso no `ac3.js` fica com nota zero.

- **Fique atento(a) a erros que aparecerem no console do navegador. Scripts que não puderem ser carregados e/ou executados devido a erros sintáticos podem ocasionar uma nota zero.**

- **Scripts que travem ou não terminem de carregar nunca (por exemplo, `while (true) { /* fica preso no laço infinito. */}`) também podem ocasionar uma nota zero.**

- Se o professor encontrar alguma tentativa de burlar os testes, você vai perder pontos!

## Burlar os testes!? Como assim!?

Eis um exemplo de uma implementação sacana para tentar burlar os testes:

```js
// Este é o teste do professor.
teste("4 é menor que 7.", () => retornaMaiorNumero(4, 7), igual(7));
teste("3 é maior que 2.", () => retornaMaiorNumero(3, 2), igual(3));

// Esta é a implementação que visa burlar o teste.
// Ela foi feita apenas para passar nos dois testes acima, mesmo estando
// totalmente errada em qualquer outro caso.
function retornaMaiorNumero(a, b) {
    if (a === 4) return 7;
    return 3;
}
```

Além de executar os testes automáticos, o professor também vai olhar o código procurando por coisas assim.

É claro que enquanto você estiver desenvolvendo, fazendo experimentos e debugging, você até pode fazer coisas assim.
Apenas se certifique de que no final não se esqueceu de limpar isso.

## Como fazer a entrega?

A entrega deve ser feita pelo formulário na AC 3 do classroom.

Coloque nele um arquivo ZIP contendo o seu arquivo `ac3.js` e nada mais além disso.
Os demais arquivos não são necessários e nem devem ser colocados, pois usarei sempre os originais.

Em caso de múltiplas entregas de um mesmo grupo de alunos, ainda que por pessoas diferentes do mesmo grupo, irei considerar apenas a última.

Quem fizer a entrega de uma forma errada (ex: arquivo RAR ao invés de ZIP, ou entregar pelo classroom diretamente ao invés do forms, ou enviar por e-mail ou de qualquer outra forma), vai ser penalizado em -1 ponto.
Isso, é claro, se o professor quiser e puder aceitar a entrega feita assim.
Além disso, pessoas que não realizarem a entrega da forma correta serão os últimos a terem os seus trabalhos corrigidos, isso se forem corrigidos.