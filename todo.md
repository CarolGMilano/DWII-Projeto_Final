## Lista de Tarefas

**Legenda:**  
🟦 Carolina | 🟨 Cesar | 🟩 Ingrid | 🟧 Milena 

### Sumário 📑

- [Etapa 01: Front-end](#etapa-01-front-end)
- [Etapa 02: Back-end](#etapa-02-back-end)

### Etapa 01: Front-end 

> 📅 Prazo para finalização da Etapa 01: **16/09**

#### Telas iniciais
- [x] Tela de Login (RF002) 🟦
  - [x] Implementar layout básico 🟦
  - [x] Simular o backend com console 🟦
  - [x] Testar interações básicas 🟦
  - [x] Criar indicações visuais de erro no form 🟦

- [x] Tela de Cadastro (RF001) 🟦
  - [x] Criar o componente de cadastro 🟦
  - [x] Refatorar form de reativo para simples 🟦
  - [x] Adicionar validações básicas (required, email, tamanho de campo) 🟦
  - [x] Simular envio para backend com console 🟦
  - [x] Testar e ajustar layout básico com Tailwind 🟦
  - [x] Criar indicações visuais de erro no form 🟦

#### Telas de cliente
- [] Tela de Dashboard (RF003 e RF009) 🟩
  - [x] Criar lista de solicitações 🟩
  - [x] Implementar filtro de ordenação por mais recentes e mais antigos 🟩
  - [x] Implementar filtro por data/hora 🟩
  - [x] Criar o componente de histórico da solicitação 🟧
  - [x] Integrar o botão de Visualizar Solicitação com o histórico 🟩
  - [x] Implementar os botões de ação conforme estado  🟩
  - [] Testar as validações de ação  🟩
  - [x] Implementar uma barra de pesquisa  🟩
  - [x] Preencher a lista com as informações de um JSON  🟩
  - [x] Testar filtros  🟩

- [] Tela de Criar solicitação (RF004) 🟧
  - [x] Criar componente de nova solicitação 🟧
  - [x] Adicionar services de nova solicitação 🟧
  - [x] Modificar layuot do formulario 🟧
  - [x] Adicionar combo box a categoria de equipamento 🟧

- [] Tela de Visualizar orçamento (RF005, RF006 e RF007) 🟧
  - [x] Criar componente de visulização 🟧
  - [x] Modal de aprovar serviço 🟧
  - [x] Modal de recusar serviço 🟧
  - [x] Formulario de preenchimento com required 🟧
  - [x] Adicionar services 🟧 -- em andamento (falta envio da justificativa de rejeição)

- [] Tela de Visualizar Serviço (RF008) 🟧
  - [x] Criar lista de detalhes da solicitação e serviço🟧
  - [x] Tabela de histórico do serviço 🟧
  - [x] Adicionar services 🟧 -- em andamento (faltando o histórico)

- [] Tela de Pagar serviço (RF010) 🟧
  - [x] Dados da solicitação 🟧
  - [x] Botão com modal de confirmar pagamento 🟧
  - [x] Adicionar services 🟧 -- em andamento

#### Telas de funcionário
- [] Tela de Dashboard (RF011 e RF013) 🟩
  - [] Criar lista de solicitações abertas 🟩
  - [] Criar lista de todas as solicitações 🟩
  - [] Implementar filtro de ordenação por data/hora 🟩
  - [] Implementar filtro por período 🟩
  - [] Implementar uma barra de pesquisa 🟩
  - [] Preencher a lista com as informações de um JSON 🟩
  - [] Testar filtros 🟩
  - [] Implementar solicitações redirecionadas 🟩
  - [] Implementar escala de cores 🟩
  - [] Implementar os botões de ação conforme estado 🟩

- [x] Tela de Visualizar detalhes da solicitação - **Visão funcionário** 🟦
  - [x] Implementar "Efetuar manutenção" (RF014) 🟦
  - [x] Implementar "Redirecionar manutenção" (RF015) 🟦
  - [x] Implementar "Finalizar solicitação" (RF016) 🟦

- [] Tela de Efetuar orçamento (RF012) 🟧

- [x] Tela de CRUD de Categoria de Equipamentos (RF017) 🟧
  - [x] Criar o componente da tela 🟧
  - [x] Implementar layout básico 🟧
  - [x] Criar a tabela/lista de categorias 🟧
  - [x] Adicionar botões de ação: adicionar, editar, deletar 🟧
  - [x] Criar o formulário de categorias (modal) 🟧

- [] Tela de CRUD de Funcionários (RF018) 🟦
  - [x] Criar o componente da tela 🟦
  - [x] Implementar layout básico 🟦
  - [x] Criar a tabela/lista de funcionários 🟦
  - [x] Adicionar botões de ação: adicionar, editar, deletar 🟦
  - [x] Criar o formulário de funcionário (modal) 🟦
  - [x] Adicionar validações nos campos do formulário 🟦
  - [] Criar indicações visuais de erro no form 🟦
  - [x] Implementar filtros e busca na lista de funcionários 🟦
  - [x] Implementar scroll infinito 🟦
  - [x] Ajustes visuais 🟦
  - [x] Testar interações e fluxo de navegação 🟦

- [x] Tela de Gerar relatório 🟨
  - [x] Implementar "Relatório de receita" (RF019) 🟨
  - [x] Implementar "Relatório por categoria" (RF020) 🟨
 
#### Outros 
- [] Menu 
  - [] Criar logo do sistema
  - [] Criar nome comercial
 
- [] Submenu lateral 🟩
  - [] Integrar rotas  🟩
  - [] Implementar opções de acesso de acordo com o perfil (Cliente e Funcionário) 🟩
  - [] Botão de logout
    
- [] Dados de teste
  - [] Arquivo JSON com 20+ solicitações 🟩
  - [] Arquivo JSON com 2 funcionários (Maria e Mário)
  - [] Arquivo JSON com 4 clientes (João, José, Joana, Joaquina)
  - [] Arquivo JSON com 5 categorias (Notebook, Desktop, Impressora, Mouse, Teclado)

### Etapa 02: Back-end 