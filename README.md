# 📄 GestãoCurrículo

Sistema web de gestão de currículos desenvolvido como projeto acadêmico da disciplina de Desenvolvimento de Sistema. O objetivo foi construir uma aplicação funcional do zero utilizando tecnologias modernas do ecossistema React/Next.js, aplicando boas práticas de arquitetura de componentes e experiência do usuário.

---

## 🎯 Sobre o Projeto

Este projeto foi um grande desafio pessoal, pois nunca havia trabalhado com Next.js App Router antes. Durante o desenvolvimento, aprendi na prática como organizar rotas, criar componentes reutilizáveis, gerenciar estado local e validar formulários de forma profissional.

A aplicação permite cadastrar, visualizar e gerenciar currículos de candidatos, com busca em tempo real, formulários dinâmicos e feedbacks visuais para o usuário.

---

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) — Framework React com App Router para criação das rotas e páginas
- [Tailwind CSS](https://tailwindcss.com/) — Estilização responsiva com classes utilitárias
- [shadcn/ui](https://ui.shadcn.com/) — Biblioteca de componentes de interface prontos e acessíveis
- [React Hook Form](https://react-hook-form.com/) — Gerenciamento de formulários de forma performática
- [Yup](https://github.com/jquense/yup) — Validação de esquemas dos formulários
- [React IMask](https://imask.js.org/) — Máscaras de input para CPF, telefone e datas (utilizado como alternativa ao react-input-mask-next, que não estava disponível no npm)
- [Sonner](https://sonner.emilkowal.ski/) — Notificações toast para feedback visual
- [React Icons](https://react-icons.github.io/react-icons/) — Ícones para tornar a interface mais intuitiva

---

## 📋 Funcionalidades Implementadas

- ✅ Landing page com apresentação dos benefícios do sistema
- ✅ Listagem de currículos em cards com nome, cargo e resumo
- ✅ Busca em tempo real com debounce (filtra por nome ou cargo)
- ✅ Cadastro completo com formulário dinâmico
- ✅ Campos dinâmicos para adicionar/remover experiências e formações (useFieldArray)
- ✅ Validação de todos os campos com mensagens de erro específicas
- ✅ Máscaras em CPF, telefone e datas
- ✅ Visualização detalhada de cada candidato
- ✅ Exclusão de currículos
- ✅ Notificações de sucesso e erro via Sonner
- ✅ Upload fake de imagem do candidato
- ✅ Persistência de dados no localStorage
- ✅ Link ativo no menu de navegação
- ✅ Botão de envio desabilitado quando formulário está inválido
- ✅ Design responsivo para mobile, tablet e desktop

---

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
└── fotos/---

## 💡 O que aprendi com esse projeto

- Como funciona o **App Router do Next.js** e a diferença entre Server e Client Components
- Como criar **rotas dinâmicas** com `[id]` no Next.js
- Como usar o **React Hook Form** com **Yup** para validar formulários de forma eficiente
- Como implementar **campos dinâmicos** com `useFieldArray` para adicionar e remover itens em um formulário
- Como aplicar **máscaras de input** em campos como CPF, telefone e datas
- Como usar o **localStorage** para persistir dados no navegador sem um banco de dados
- Como trabalhar com **componentes do shadcn/ui** e personalizar com Tailwind CSS
- Como implementar **busca em tempo real** com debounce para melhorar a performance
- Como usar o **Git e GitHub** para versionar e publicar um projeto

---

## ▶️ Como Rodar o Projeto

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

---

## 👨‍💻 Autor

Desenvolvido por **Matheus Hort** como projeto acadêmico da disciplina de Desenvolvimento de Sistemas.