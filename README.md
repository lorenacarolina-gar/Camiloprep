# CamiloPrep
Simulador de redação para o vestibular da São Camilo — Farmácia.

## Abrir o aplicativo
Depois que o GitHub Pages estiver ativado e a publicação terminar, o site ficará em:
https://lorenacarolina-gar.github.io/Camiloprep/

Para ativar a publicação uma única vez: abra **Settings → Pages** neste repositório e escolha **GitHub Actions** como fonte. O fluxo em **Actions → Deploy to GitHub Pages** compila e publica o site automaticamente a cada atualização.

## O que funciona no navegador
O cronômetro, o editor, a contagem de palavras, a verificação local de trechos copiados, o plano de estudos e o histórico ficam no seu próprio navegador. Não é necessário abrir o Gemini para acessar o aplicativo.

As funções que pedem texto novo ou correção por IA ainda chamam a API Gemini. O código recebido está sem chave de API, então essas funções de IA não estarão disponíveis na publicação até que se configure um serviço de servidor com a chave guardada com segurança. Não coloque uma chave secreta diretamente no código do navegador.

## Executar no computador
É necessário ter Node.js instalado. No terminal, dentro desta pasta:

```sh
npm install
npm run dev
```

O terminal mostra o endereço local para abrir no navegador. Para gerar os arquivos do site:

```sh
npm run build
```
