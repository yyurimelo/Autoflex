# Autoflex

📖 ## Sobre o Projeto

O Autoflex é um sistema de gerenciamento de produção desenvolvido com uma arquitetura monorepo, projetado para otimizar o controle de matérias-primas, produtos e sugestões de produção. A aplicação oferece uma interface moderna e eficiente para gerenciar recursos de produção em ambiente industrial.

🏗️ ## Arquitetura do Sistema

O projeto segue uma arquitetura cliente-servidor clássica com três camadas principais:

💻 ### Frontend (Cliente)
- **Tecnologia**: React + TypeScript + Vite
- **Responsabilidade**: Interface de usuário moderna e responsiva
- **Estado da aplicação**: Gerenciado localmente com hooks do React
- **Comunicação**: Realizada via HTTP com a API REST do backend

⚙️ ### Backend (Servidor)
- **Tecnologia**: Spring Boot 3.3.5 com Java 21
- **Responsabilidade**: Lógica de negócio, endpoints REST e validação
- **Camadas**: 
  - Controllers: Endpoints REST
  - Services: Lógica de negócio
  - Repositories: Acesso a dados
  - Models: Entidades JPA

🗄️ ### Banco de Dados
- **Tecnologia**: PostgreSQL
- **ORM**: Hibernate/JPA
- **Responsabilidade**: Armazenamento persistente de dados

🧰 ## Tecnologias e Dependências

🎨 ### Frontend
- **React 19.2.0**: Biblioteca para construção de interfaces
- **TypeScript 5.9.3**: Tipagem estática para JavaScript
- **Vite 7.3.1**: Build tool rápido e moderno
- **ESLint**: Análise estática de código

🔧 ### Backend
- **Spring Boot 3.3.5**: Framework principal
- **Spring Data JPA**: Persistência de dados
- **PostgreSQL Driver**: Conector com banco de dados
- **Lombok**: Redução de código boilerplate
- **ModelMapper**: Mapeamento de objetos
- **SpringDoc OpenAPI**: Documentação de API

📦 ## Gestor de Pacotes e Monorepo

Este projeto utiliza **Bun** como gestor principal de pacotes, oferecendo instalação de dependências rápida e eficiente. A estrutura do monorepo é organizada da seguinte forma:

```
autoflex/
├── package.json       # Configuração do workspace
├── bun.lock         # Lock file do Bun
├── front/           # Aplicação React
│   ├── package.json
│   └── src/
└── back/            # Aplicação Spring Boot
    ├── pom.xml
    └── src/
```

🚀 ## Instalação e Configuração

✅ ### Pré-requisitos
- [Bun](https://bun.sh/) (versão mais recente)
- [Java 21](https://openjdk.org/)
- [Maven](https://maven.apache.org/) (para build do backend)
- [PostgreSQL](https://www.postgresql.org/) (rodando localmente na porta 5432)

🪜 ### Passos para instalação

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/yyurimelo/Autoflex.git
   cd autoflex
   ```

2. **Configurar o banco de dados**
   - Crie um banco de dados PostgreSQL chamado `autoflex`
   - Configure o acesso com usuário `postgres` e senha `useradmin`
   - (ou ajuste as credenciais em `back/src/main/resources/application.properties`)

3. **Instalar dependências**
   ```bash
   bun install
   ```

4. **Iniciar as aplicações em modo desenvolvimento**
   ```bash
   
   bun run dev:front  # Frontend na porta padrão do Vite
   bun run dev:back   # Backend na porta 8080
   ```

📁 ## Estrutura do Projeto

⚙️ ### Backend
- `src/main/java/dev/java/Autoflex/`:
  - `controller/`: Endpoints REST
  - `service/`: Lógica de negócio
  - `model/`: Entidades JPA (Product, RawMaterial, ProductRawMaterial)
  - `dto/`: Objetos de transferência de dados
  - `repository/`: Interfaces Spring Data JPA
  - `exception/`: Classes de exceção customizadas
  - `config/`: Configurações (ModelMapper, Swagger)

🧪 ### Testes
- `src/test/java/dev/java/Autoflex/`:
  - `service/`: Testes unitários das camadas de serviço

🎨 ### Frontend
- `src/`:
  - Componentes React (atualmente apenas componente App inicial)
  - Arquivos de configuração (Vite, TypeScript, ESLint)

🔌 ## Endpoints da API

O backend expõe endpoints REST para gerenciar:
- **Produtos**: CRUD completo para produtos
- **Matérias-primas**: Controle de estoque e informações
- **Relacionamentos**: Associação entre produtos e matérias-primas
- **Sugestões de produção**: Análise e recomendações

A documentação completa da API está disponível através do Swagger UI em `http://localhost:8080/swagger-ui.html` quando o backend está em execução.

🧾 ## Scripts Úteis

No package.json raiz:
- `bun run dev:front` - Inicia apenas o frontend
- `bun run dev:back` - Inicia apenas o backend

📝 ## Observações

- O frontend atualmente está em estado inicial com o template React padrão
- O backend já possui estrutura completa para gerenciamento de produtos e matérias-primas
- A configuração do banco de dados utiliza PostgreSQL com schema update automático
- O projeto está configurado para desenvolvimento com hot-reload em ambas as aplicações
