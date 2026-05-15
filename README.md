# 📄 GestãoCurrículo

Sistema web de gestão de currículos desenvolvido com Next.js, permitindo cadastrar, visualizar e gerenciar candidatos de forma simples e eficiente.

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) — Framework React com App Router
- [Tailwind CSS](https://tailwindcss.com/) — Estilização responsiva
- [shadcn/ui](https://ui.shadcn.com/) — Componentes de interface
- [React Hook Form](https://react-hook-form.com/) — Gerenciamento de formulários
- [Yup](https://github.com/jquense/yup) — Validação de esquemas
- [React IMask](https://imask.js.org/) — Máscaras de input
- [Sonner](https://sonner.emilkowal.ski/) — Notificações toast
- [React Icons](https://react-icons.github.io/react-icons/) — Ícones

## 📋 Funcionalidades

- ✅ Landing page com benefícios do sistema
- ✅ Listagem de currículos com busca em tempo real
- ✅ Cadastro completo com formulário dinâmico
- ✅ Visualização detalhada de cada candidato
- ✅ Exclusão de currículos
- ✅ Validação de formulários com mensagens de erro
- ✅ Máscaras em CPF, telefone e datas
- ✅ Persistência de dados no localStorage
- ✅ Upload fake de imagem
- ✅ Design responsivo para mobile e desktop

## 📁 Estrutura do Projetosistema-curriculos/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── sistema/
│       └── paginas/
│           └── curriculos/
│               ├── page.tsx
│               ├── novo/
│               │   └── page.tsx
│               └── [id]/
│                   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ui/
├── lib/
│   └── data.ts
└── public/
└── fotos/## ▶️ Como Rodar o Projeto

**1. Clone o repositório:**
```bash
git clone https://github.com/matheus-hort/sistema-curriculos.git
```

**2. Entre na pasta:**
```bash
cd sistema-curriculos
```

**3. Instale as dependências:**
```bash
npm install
```

**4. Rode o projeto:**
```bash
npm run dev
```

**5. Acesse no navegador:**http://localhost:3000

## 👨‍💻 Autor

Desenvolvido por **Matheus Hort** como projeto acadêmico.