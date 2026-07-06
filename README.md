# Learning Analytics Dashboard

Bem-vindo ao repositório do **Learning Analytics Dashboard**! 🎓📊

Este é um projeto voltado à visualização de dados educacionais através de um painel analítico e interativo. Ele tem o intuito de apresentar de forma clara e objetiva o desempenho de estudantes, escolas e regiões, além de métricas de engajamento e conclusão de cursos.

## 🚀 Tecnologias Utilizadas

- **[React](https://react.org/)** com **TypeScript** e **[Vite](https://vitejs.dev/)**
- **[Tailwind CSS](https://tailwindcss.com/)** para estilização rápida, responsiva e moderna
- **[Recharts](https://recharts.org/)** para criação de gráficos visuais variados
- **[React Leaflet](https://react-leaflet.js.org/)** para mapas interativos (incluindo o mapa do estado de Mato Grosso utilizando GeoJSON)
- **[Lucide React](https://lucide.dev/)** para iconografia

## 🌟 Funcionalidades

- **Métricas Gerais:** Visualização do número total de estudantes, ferramentas ativas e taxa média de conclusão.
- **Gráficos de Engajamento e Desempenho:** Acompanhamento temporal e distribucional da participação dos alunos por meio de gráficos de linha, radar e barras.
- **Análise Regional (Mapa do Mato Grosso):** Mapa interativo focado no estado de MT, que classifica as cidades (Excelente, Bom, Atenção) pela Nota Média e exibe dados detalhados da cidade ao passar o mouse.
- **Top Cursos e Atividade Recente:** Tabelas detalhando as melhores aplicações e a movimentação recente dos usuários no sistema.
- **Dark Mode:** Tema claro/escuro nativo adaptativo para melhor experiência visual e acessibilidade.

## 🛠️ Como executar localmente

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/lilblanc/learning-analytics.git
   cd learning-analytics
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Acesse no seu navegador o link fornecido no terminal (geralmente `http://localhost:5173/`).

*💡 **Dica:** O dashboard tenta se comunicar com uma API via `http://localhost:8000/api`. Caso o seu backend não esteja rodando, não se preocupe! O projeto fará o uso automático de dados "mockados" (falsos/de exemplo) para que a interface, o mapa e os gráficos continuem sendo renderizados para visualização.*

## 📁 Estrutura de Pastas

- `/src/assets`: Imagens e arquivos estáticos (como o arquivo JSON contendo as marcações do mapa).
- `/src/components`: Componentes visuais do painel (Gráficos, Tabelas, Métricas e componentes da interface).
- `/src/services`: Camada de configuração e comunicação das chamadas para a API (`api.ts`).
- `/src/styles`: Arquivos globais de CSS.

---
Desenvolvido como trabalho de conclusão de curso (TCC) para obtenção do título de Bacharel em Engenharia da Computação pela Universidade Federal de Mato Grosso, Campus Várzea Grande.
