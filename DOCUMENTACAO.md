# 📋 Documentação - Dgela's Pizzaria

## 📖 Visão Geral
Sistema web de uma pizzaria online desenvolvido com HTML5, CSS3 e JavaScript puro. O projeto permite visualizar um catálogo de pizzas, abrir detalhes de cada produto em modal e possui interface responsiva para diferentes dispositivos.

## 🏗️ Estrutura do Projeto

```
pizzas/
├── assets/
│   ├── css/
│   │   └── style.css          # Estilos CSS principais
│   ├── images/
│   │   ├── pizza.png          # Imagem da pizza Mussarela
│   │   ├── pizza2.png         # Imagem da pizza Calabresa
│   │   ├── pizza3.png         # Imagem da pizza Quatro Queijos
│   │   ├── pizza4.png         # Imagem da pizza Americana
│   │   ├── pizza5.png         # Imagem da pizza Sorvete
│   │   ├── pizza6.png         # Imagem da pizza Moda da Casa
│   │   └── pizza7.png         # Imagem da pizza Chocolate
│   └── js/
│       └── script.js          # Lógica JavaScript principal
├── data/
│   └── pizzas.js              # Base de dados das pizzas (JSON)
└── index.html                 # Página principal
```

## 📄 Detalhamento dos Arquivos

### 🏠 index.html
**Função:** Estrutura HTML principal da aplicação

**Principais seções:**
- **Models:** Templates ocultos para clonagem dinâmica
  - `.pizza-item`: Template para cards de pizza
  - `.cart--item`: Template para itens do carrinho
- **Header:** Cabeçalho com botão do carrinho (mobile)
- **Main:** Área principal com grid de pizzas
- **Aside:** Painel lateral do carrinho de compras
- **Modal:** Janela de detalhes da pizza (`.pizzaWindowArea`)

**Recursos implementados:**
- Layout responsivo com viewport meta tag
- Fontes Google Fonts (Hepta Slab e Lato)
- Estrutura semântica HTML5
- Templates para clonagem dinâmica

### 🎨 assets/css/style.css
**Função:** Estilização completa da interface

**Principais características:**
- **Reset CSS:** Box-sizing border-box para todos elementos
- **Layout Flexível:** Sistema baseado em Flexbox
- **Grid de Pizzas:** CSS Grid com 5 colunas (desktop)
- **Design Responsivo:** Breakpoints em 1000px e 840px
- **Tema Escuro:** Fundo preto (#000000) com elementos coloridos

**Componentes estilizados:**
- Cards de pizza com hover effects
- Modal de detalhes com transições suaves
- Carrinho lateral deslizante
- Controles de quantidade interativos
- Botões com estados hover/active

**Responsividade:**
- **Desktop (>1000px):** Grid de 5 colunas
- **Tablet (≤1000px):** Grid de 2 colunas  
- **Mobile (≤840px):** Layout em coluna única, header fixo, carrinho fullscreen

### 🧠 assets/js/script.js
**Função:** Lógica de interação e manipulação do DOM

**Funcionalidades implementadas:**
- **Funções auxiliares:**
  - `c(el)`: Seletor único (`document.querySelector`)
  - `cAll(el)`: Seletor múltiplo (`document.querySelectorAll`)

- **Geração dinâmica do catálogo:**
  - Iteração sobre `pizzaJson` com `.map()`
  - Clonagem de templates com `.cloneNode(true)`
  - Preenchimento dinâmico de dados (nome, preço, imagem, descrição)

- **Modal de detalhes:**
  - Event listener nos cards de pizza
  - Preenchimento automático das informações
  - Seleção automática do maior tamanho
  - Animação de fade-in com opacity
  - Controle de quantidade (`modalQt`)

**Variáveis globais:**
- `modalQt`: Quantidade selecionada no modal (inicializada com 1)

### 📊 data/pizzas.js
**Função:** Base de dados estática das pizzas

**Estrutura do objeto:**
```javascript
{
    id: number,           // Identificador único
    name: string,         // Nome da pizza
    img: string,          // Caminho da imagem
    price: number,        // Preço base
    sizes: array,         // Tamanhos disponíveis
    description: string   // Descrição do produto
}
```

**Pizzas cadastradas:**
1. **Mussarela** - R$ 20,19 (100g, 530g, 860g)
2. **Calabresa** - R$ 18,00 (320g, 530g, 860g)
3. **Quatro Queijos** - R$ 17,45 (320g, 530g, 860g)
4. **Americana** - R$ 19,77 (320g, 530g, 860g)
5. **Sorvete** - R$ 21,43 (320g, 530g, 860g)
6. **Moda da Casa** - R$ 18,55 (320g, 530g, 860g)
7. **Chocolate** - R$ 22,36 (320g, 530g, 860g)

## ⚙️ Funcionalidades Implementadas

### ✅ Funcionalidades Ativas
- [x] **Catálogo de Pizzas:** Exibição em grid responsivo
- [x] **Modal de Detalhes:** Visualização ampliada com informações completas
- [x] **Seleção de Tamanhos:** Interface para escolha de tamanhos
- [x] **Interface Responsiva:** Adaptação para desktop, tablet e mobile
- [x] **Animações CSS:** Transições suaves e efeitos hover
- [x] **Template System:** Clonagem dinâmica de elementos

### ⏳ Funcionalidades Pendentes
- [ ] **Carrinho de Compras:** Adicionar/remover itens
- [ ] **Controle de Quantidade:** Botões +/- funcionais
- [ ] **Cálculo de Totais:** Subtotal, desconto e total
- [ ] **Finalização de Compra:** Processo de checkout
- [ ] **Persistência de Dados:** LocalStorage ou SessionStorage
- [ ] **Validações:** Campos obrigatórios e limites

## 🎯 Fluxo de Navegação

```
1. Usuário acessa index.html
   ↓
2. JavaScript carrega pizzas de pizzas.js
   ↓
3. Cards são gerados dinamicamente na .pizza-area
   ↓
4. Usuário clica em uma pizza
   ↓
5. Modal abre com detalhes (.pizzaWindowArea)
   ↓
6. Usuário pode selecionar tamanho e quantidade
   ↓
7. [PENDENTE] Adicionar ao carrinho
   ↓
8. [PENDENTE] Finalizar compra
```

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e acessível
- **CSS3:** 
  - Flexbox e CSS Grid
  - Media Queries para responsividade
  - Transições e animações
  - Variáveis CSS personalizadas
- **JavaScript ES6+:**
  - Arrow functions
  - Template literals
  - Destructuring
  - DOM Manipulation
- **Google Fonts:** Hepta Slab e Lato

## 📱 Compatibilidade

- **Desktop:** Navegadores modernos (Chrome, Firefox, Safari, Edge)
- **Tablet:** Layout adaptativo com 2 colunas
- **Mobile:** Interface otimizada para touch, carrinho fullscreen

## 🚀 Como Executar

1. Clone ou baixe o projeto
2. Abra `index.html` em um navegador web
3. Navegue pelo catálogo de pizzas
4. Clique nas pizzas para ver detalhes

## 📈 Possíveis Melhorias

### 🔧 Técnicas
- Implementar Service Workers para cache
- Adicionar TypeScript para tipagem
- Usar bundler (Webpack/Vite) para otimização
- Implementar testes unitários

### 🎨 Interface
- Adicionar animações mais elaboradas
- Implementar tema claro/escuro
- Melhorar acessibilidade (ARIA labels)
- Adicionar loading states

### ⚡ Funcionalidades
- Sistema de favoritos
- Filtros por categoria/preço
- Busca por nome
- Avaliações e comentários
- Integração com API de pagamento

## 📝 Observações de Desenvolvimento

- O projeto utiliza uma abordagem vanilla (sem frameworks)
- O código está bem comentado em português
- A estrutura é modular e expansível
- As imagens estão otimizadas para web
- O design segue princípios de UX/UI modernos

---

**Desenvolvido por:** Dgela's Pizzaria  
**Versão:** 1.0.0  
**Data:** 2025
