# Organização do Projeto 📋
- O arquivo **`todo.md`** (na raiz do repositório) reúne as tarefas atuais e quem está cuidando de cada uma.
- Dê uma olhada por lá antes de começar algo novo — assim conseguimos manter tudo organizado e evitar que duas pessoas trabalhem na mesma coisa sem querer.

## Sumário 📑

- [Configuração do Projeto](#configuração-do-projeto)
- [Fluxo de Contribuição para a Main](#fluxo-de-contribuição-para-a-main)


## Configuração do Projeto

> **⚠️ Atenção:** As informações abaixo referem-se **apenas ao Frontend**. Quando o Backend for iniciado, este documento será atualizado com as novas configurações.

### Tecnologias e Versões (Frontend) 💻
- **Angular**: 20.1.6
- **Typescript**: ~5.8.2
- **Node.js**: 22.18.0  
- **npm**: 10.9.3  
- **Tailwindcss**: ^4.1.12

> **Observação:** Conforme orientação do professor, estamos utilizando essas versões para manter a compatibilidade. Caso queira atualizar o Angular, o material *"Slides do Angular"* explica como fazer isso.

O projeto já está configurado para as versões acima. Para começar a usar:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/CarolGMilano/DWII-Projeto_Final.git

2. **Entre na pasta do projeto**:
   ```bash
   cd manutencao-angular

3. **Instale as dependências**:
   ```bash
   npm install

4. **Rode o projeto**:
   ```bash
   ng serve

5. **Abra no navegador**:
   ```bash
   http://localhost:4200/

Se as versões do Angular, TypeScript, Node.js e npm estiverem corretas, o projeto deve rodar normalmente.

## Fluxo de Contribuição para a Main

> Nosso repositório é protegido, então **não é permitido fazer push diretamente na `main`**.  
> Todas as alterações devem passar por uma branch secundária e depois ser integradas via **Pull Request** no **GitHub**.

### Passo a Passo 📝

1. **Crie uma branch para sua funcionalidade ou correção:**
   ```bash
   git checkout -b nome-da-sua-branch

2. **Commite suas alterações;**
3. **Envie sua branch para o repositório remoto:**
   ```bash
   git push origin nome-da-sua-branch

4. **Abra um Pull Request no GitHub da `sua-branch` para a `main`;**
5. **Confirme o Merge da Pull Request.**

#### Dicas 💡

Sempre atualize sua branch com a **`main`** antes de abrir o **PR**:
  ```bash
  git checkout nome-da-sua-branch
  git pull origin main
