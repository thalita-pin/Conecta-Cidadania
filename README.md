# Conecta Cidadania — Tecnologia para Todos

**Site educativo do Projeto de Extensão Universitária**  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS)  
**Instituição:** Cruzeiro do Sul Virtual  
**Comunidade de referência:** Colégio Estadual Professora Dirce Celestino do Amaral — Curitiba/PR  
**ODS principal:** ODS 10 — Redução das Desigualdades  
**ODS relacionado:** ODS 4 — Educação de Qualidade

## 1. Sobre o projeto

O **Conecta Cidadania** é um site educativo desenvolvido para apoiar a inclusão digital e facilitar o acesso a informações sobre serviços públicos disponíveis na internet. A proposta surgiu da investigação de dificuldades que podem ocorrer mesmo entre pessoas habituadas a usar celulares, como localizar serviços governamentais, compreender orientações de portais públicos e preencher formulários on-line.

O projeto busca fortalecer a autonomia dos estudantes no uso de recursos digitais relacionados ao exercício da cidadania. Seu foco é **acesso aos serviços públicos digitais**.

## 2. Objetivo e público-alvo

**Objetivo geral:** oferecer tutoriais gratuitos, acessíveis e ilustrados que ajudem os estudantes a conhecer e utilizar serviços públicos digitais de forma mais independente.

**Público-alvo:** estudantes do Ensino Fundamental II e do Ensino Médio, com possibilidade de participação de professores, funcionários e familiares da comunidade escolar.

**Resultados esperados:** ampliar o conhecimento sobre os serviços apresentados, facilitar a localização de informações oficiais e contribuir para reduzir barreiras de letramento digital. Esses resultados devem ser avaliados após a aplicação da intervenção, e não presumidos como já alcançados.

## 3. O que o site oferece

- **Seis tutoriais ilustrados e passo a passo**, sobre:
  1. Encontrar serviços públicos no portal Gov.br;
  2. Entender a finalidade da conta Gov.br;
  3. Consultar informações oficiais sobre o Enem;
  4. Conhecer a Carteira de Trabalho Digital;
  5. Conhecer o Meu SUS Digital;
  6. Preencher formulários on-line.
- **Busca por tutoriais:** filtra os conteúdos disponíveis no próprio site.
- **Atividade de busca de serviços:** apresenta resultados demonstrativos de um catálogo limitado, com links oficiais. **Não é uma busca em tempo real** no Gov.br.
- **Formulário de treinamento:** simula uma inscrição escolar com dados fictícios, sem enviar ou armazenar as informações digitadas.
- **Questionário interativo:** contém 10 perguntas, mostra explicações das respostas e atribui uma pontuação de 0 a 10. Permite baixar o resultado em arquivo `.txt`.
- **Fontes e links:** reúne páginas governamentais e referências de pesquisa para consulta e aprofundamento.
- **Recursos de acessibilidade:** layout adaptável a celulares, controles de tamanho da fonte e opção de alto contraste.

As ilustrações são **desenhos esquemáticos**: não devem ser interpretadas como capturas atuais de telas de serviços governamentais.

## 4. Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| **HTML5** | Estrutura das páginas, tutoriais e formulários |
| **CSS3** | Aparência, responsividade, paleta de cores e contraste |
| **JavaScript** | Busca local, interações, formulário de treino e questionário |
| **SVG** | Ilustrações e ícone do site |

**Paleta de cores atual:** Shadow Grey `#231F20`, Pearl Aqua `#75DDDD`, Pacific Cyan `#508991` e Lime Cream `#DAFF7D`, com tons auxiliares para contraste e leitura.

O site é estático: **não exige banco de dados nem servidor de aplicação** para executar as atividades internas.

## 5. Estrutura dos arquivos

```text
conecta-cidadania/
├── index.html       # Conteúdo e estrutura do site
├── styles.css       # Aparência e estilos responsivos
├── script.js        # Interações e perguntas do questionário
├── assets/          # Ilustrações SVG e favicon
└── README.md        # Documentação do projeto (este arquivo)
```

## 6. Como executar no computador

1. Mantenha `index.html`, `styles.css`, `script.js` e a pasta `assets/` juntos na mesma pasta do projeto.
2. Abra `index.html` com um navegador atualizado, como Chrome, Edge ou Firefox.
3. Use o menu para visitar os tutoriais, as atividades práticas, o questionário e as fontes.
4. Para abrir **links externos dos serviços públicos**, é necessário estar conectado à internet.

As atividades internas foram desenvolvidas para funcionar localmente no navegador. Ao abrir arquivos diretamente, alguns recursos de navegadores podem variar conforme as configurações de segurança.

## 7. Como personalizar

- **Editar textos, tutoriais e links:** arquivo `index.html`.
- **Alterar cores, fontes e layout:** arquivo `styles.css`, principalmente as variáveis em `:root`.
- **Modificar perguntas e respostas do questionário:** arquivo `script.js`, no array `questions`.
- **Substituir ilustrações:** arquivos da pasta `assets/`.

Após editar, salve os arquivos e atualize a página no navegador. Verifique o resultado no celular e no computador.

## 8. Como publicar e divulgar com QR Code

1. Publique todos os arquivos em uma hospedagem de páginas estáticas com HTTPS, como **GitHub Pages** ou **Netlify**.
2. Abra o endereço público e confira tutoriais, imagens, links, questionário e visualização no celular.
3. Gere um QR Code usando **o endereço público já publicado** — não o caminho local do computador.
4. Insira o código em um cartaz educativo e teste a leitura com outro aparelho.
5. Combine previamente com a escola a autorização e os locais de divulgação e de eventual demonstração prática.

## 9. Avaliação da intervenção

A proposta prevê uma apresentação do site e a aplicação do questionário para verificar a compreensão dos conteúdos. Podem ser registrados, de forma autorizada e sem identificação pessoal: número de participantes, número de questionários concluídos e distribuição das pontuações.

**Atenção:** o contador de questionários do site usa armazenamento local (`localStorage`) do próprio navegador. Ele **não representa** o total de pessoas atendidas, visitantes de outros aparelhos ou acessos gerais ao site. O projeto não possui um sistema integrado de estatísticas de visitação.

## 10. Privacidade e cuidados durante as atividades

- O site **não solicita CPF, senha nem login** aos estudantes.
- O formulário de treinamento deve ser preenchido com **informações inventadas**.
- O questionário não envia respostas a um servidor; ele permite salvar um resultado em texto no próprio dispositivo.
- O contador opcional de questionários guarda apenas dados agregados no navegador, não nomes de participantes.
- Durante uma demonstração na escola, não utilize contas reais, documentos pessoais nem informações de saúde dos estudantes.
- Regras, prazos, interfaces e exigências dos serviços públicos podem mudar. Confirme sempre as informações nos respectivos portais oficiais.

**Este é um material educativo independente.** Não é um site oficial do Governo Federal e não substitui o atendimento nem os procedimentos realizados nas plataformas governamentais.

## 11. Fontes e onde encontrar mais informações

### Serviços públicos

- [Portal Gov.br — serviços](https://www.gov.br/pt-br/servicos)
- [Conta Gov.br](https://www.gov.br/pt-br/servicos/criar-sua-conta-gov.br)
- [Enem — Inep](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem)
- [Carteira de Trabalho Digital](https://www.gov.br/pt-br/servicos/obter-a-carteira-de-trabalho)
- [Meu SUS Digital — Ministério da Saúde](https://www.gov.br/saude/pt-br/composicao/seidigi/meususdigital/perguntas-e-respostas/cidadao/1-o-que-e-o)
- [Cadastro Único — perguntas frequentes](https://www.gov.br/mds/pt-br/acoes-e-programas/cadastro-unico/perguntas-frequentes-cadastro-unico)

### Contexto social e educacional

- [ONU Brasil — ODS 10: Redução das Desigualdades](https://brasil.un.org/pt-br/sdgs/10)
- [IBGE — Agência de Notícias](https://agenciadenoticias.ibge.gov.br/)
- [Cetic.br — TIC Educação](https://cetic.br/pt/pesquisa/educacao/)

A seção **“Fontes e onde saber mais”**, localizada ao final do site, contém outras referências acadêmicas e institucionais usadas na elaboração dos conteúdos.

---

**Projeto 4 de Extensão Universitária — Inclusão Digital e Cidadania: Tecnologia para Todos**  
**Conecta Cidadania | Novembro de 2026**
