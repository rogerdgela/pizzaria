# 🔧 Documentação Técnica - Sistema de Pizzaria

## 📋 Índice

1. [Estrutura do Projeto](#estrutura-do-projeto)
2. [JavaScript Core](#javascript-core)
3. [Sistema CSS](#sistema-css)
4. [Dados das Pizzas](#dados-das-pizzas)
5. [Funcionalidades](#funcionalidades)

---

## 🏗️ Estrutura do Projeto

```
pizzas/
├── assets/
│   ├── css/
│   │   └── style.css     # Arquivo CSS com todos os estilos
│   ├── images/
│   │   ├── pizza.png     # Imagem da pizza Mussarela
│   │   ├── pizza2.png    # Imagem da pizza Calabresa
│   │   ├── pizza3.png    # Imagem da pizza Quatro Queijos
│   │   ├── pizza4.png    # Imagem da pizza Americana
│   │   ├── pizza5.png    # Imagem da pizza Sorvete
│   │   ├── pizza6.png    # Imagem da pizza Moda da Casa
│   │   └── pizza7.png    # Imagem da pizza Chocolate
│   └── js/
│       └── script.js     # Lógica JavaScript principal
├── data/
│   └── pizzas.js        # Base de dados das pizzas em JSON
├── DOCUMENTACAO.md      # Documentação geral do projeto
├── DOCUMENTACAO_TECNICA.md  # Documentação técnica detalhada
└── index.html          # Página principal HTML
```

## Sistema JavaScript

### Estrutura Principal

O projeto utiliza um sistema de templates ocultos para clonagem dinâmica:

```html
<div class="models">
    <!-- Template para card de pizza -->
    <div class="pizza-item">
        <a href="">
            <div class="pizza-item--img"><img src="" /></div>
            <div class="pizza-item--add">+</div>
        </a>
        <div class="pizza-item--price">R$ --</div>
        <div class="pizza-item--name">--</div>
        <div class="pizza-item--desc">--</div>
    </div>

    <!-- Template para item do carrinho -->
    <div class="cart--item">
        <img src="" />
        <div class="cart--item-nome">--</div>
        <div class="cart--item--qtarea">
            <button class="cart--item-qtmenos">-</button>
            <div class="cart--item--qt">1</div>
            <button class="cart--item-qtmais">+</button>
        </div>
    </div>
</div>
```

### Estrutura Principal

```html
<body>
    <!-- Cabeçalho mobile -->
    <header>
        <div class="menu-openner"><span>0</span>🛒</div>
    </header>

    <!-- Área principal com grid de pizzas -->
    <main>
        <h1>Nossas Pizzas</h1>
        <div class="pizza-area"></div>
    </main>

    <!-- Carrinho lateral -->
    <aside>
        <div class="cart--area">
            <div class="menu-closer">❌</div>
            <h1>Suas Pizzas</h1>
            <div class="cart"></div>
            <div class="cart--details">
                <div class="cart--totalitem subtotal">
                    <span>Subtotal</span>
                    <span>R$ --</span>
                </div>
                <div class="cart--totalitem desconto">
                    <span>Desconto</span>
                    <span>R$ --</span>
                </div>
                <div class="cart--totalitem total big">
                    <span>Total</span>
                    <span>R$ --</span>
                </div>
                <div class="cart--finalizar">Finalizar a compra</div>
            </div>
        </div>
    </aside>

    <!-- Modal de detalhes -->
    <div class="pizzaWindowArea">
        <div class="pizzaWindowBody">
            <div class="pizzaInfo--cancelMobileButton">Voltar</div>
            <div class="pizzaBig">
                <img src="" />
            </div>
            <div class="pizzaInfo">
                <!-- Detalhes da pizza -->
            </div>
        </div>
    </div>
</body>
```

---

## 🎨 Estilos CSS

### Organização dos Estilos

O projeto utiliza um único arquivo CSS (`assets/css/style.css`) que contém todos os estilos necessários, organizados nas seguintes seções:

1. **Reset e Configurações Globais**

    - Reset CSS básico
    - Configurações de fonte (Hepta Slab e Lato)
    - Variáveis CSS para cores e medidas

2. **Componentes Principais**

    - Estilos dos cards de pizza
    - Modal de detalhes
    - Carrinho lateral
    - Botões e controles

3. **Layout e Responsividade**
    - Grid principal
    - Header mobile
    - Aside do carrinho
    - Media queries para diferentes dispositivos

````

#### Sistema de Grid

```css
/* Grid Principal (Desktop) */
.pizza-area {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
````

#### Responsividade

```css
/* Tablet */
@media (max-width: 1000px) {
    .pizza-area {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile */
@media (max-width: 840px) {
    body {
        flex-direction: column;
    }
    .pizza-area {
        display: block;
    }
}
```

### Componentes Principais

#### Card de Pizza

```css
.pizza-item {
    text-align: center;
    max-width: 250px;
    font-family: "Hepta Slab", Helvetica, Arial;
    margin: 0 auto 50px auto;
    padding: 10px;
}

.pizza-item:hover {
    transition: all ease 0.2s;
    background-color: #ffffff12;
    border-radius: 10px;
}
```

#### Modal de Detalhes

```css
.pizzaWindowArea {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    transition: all ease 0.5s;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}

.pizzaWindowBody {
    width: 900px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 15px #999;
    display: flex;
    margin: 20px 0px;
}
```

#### Carrinho Lateral

```css
aside {
    background-color: #9ccbe6;
    width: 0vw;
    font-family: "Hepta Slab", Helvetica, Arial;
    transition: all ease 0.2s;
    overflow-x: hidden;
}

aside.show {
    width: 30vw;
}
```

---

## 🧠 JavaScript

### Funções Auxiliares

```javascript
// Seletor único - wrapper para querySelector
const c = (el) => {
    return document.querySelector(el);
};

// Seletor múltiplo - wrapper para querySelectorAll
const cAll = (el) => {
    return document.querySelectorAll(el);
};
```

### Variáveis Globais

```javascript
let modalQt = 1; // Quantidade de pizzas no modal
```

### Geração Dinâmica do Catálogo

#### Estrutura Principal

```javascript
pizzaJson.map((item, index) => {
    // 1. Clonagem do template
    let pizzaItem = c(".models .pizza-item").cloneNode(true);

    // 2. Configuração dos dados
    pizzaItem.setAttribute("data-key", index);
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
    pizzaItem.querySelector(
        ".pizza-item--price"
    ).innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;

    // 3. Event listener para abertura do modal
    pizzaItem.querySelector("a").addEventListener("click", (e) => {
        // Lógica do modal
    });

    // 4. Inserção no DOM
    c(".pizza-area").append(pizzaItem);
});
```

#### Event Handler do Modal

```javascript
pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    modalQt = 1;
    let key = e.target.closest(".pizza-item").getAttribute("data-key");

    // Preenchimento das informações do modal
    c(".pizzaBig img").src = pizzaJson[key].img;
    c(".pizzaWindowArea .pizzaInfo h1").innerHTML = pizzaJson[key].name;
    c(".pizzaWindowArea .pizzaInfo--desc").innerHTML =
        pizzaJson[key].description;
    c(".pizzaWindowArea .pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
        key
    ].price.toFixed(2)}`;

    // Reset da seleção de tamanhos
    c(".pizzaInfo--size.selected").classList.remove("selected");

    // Configuração dos tamanhos
    cAll(".pizzaInfo--size").forEach((size, sizeIndex, array) => {
        if (sizeIndex === array.length - 1) {
            size.classList.add("selected"); // Seleciona o maior tamanho
        }
        size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    // Atualização da quantidade
    c(".pizzaInfo--qt").innerHTML = modalQt;

    // Animação de abertura
    c(".pizzaWindowArea").style.opacity = 0;
    c(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
        c(".pizzaWindowArea").style.opacity = 1;
    }, 200);
});
```

### Core Features

#### Funcionalidades Implementadas

-   Sistema de templates dinâmicos para cards de pizza
-   Carrinho de compras com gerenciamento de estado
-   Modal de detalhes da pizza com seleção de tamanho
-   Layout responsivo para diferentes dispositivos
-   Sistema de preços com diferentes tamanhos

#### Principais Componentes

-   Cards de pizza com imagem e descrição
-   Modal interativo para detalhes do produto
-   Carrinho lateral com lista de itens
-   Controles de quantidade com botões + e -
-   Sistema de navegação mobile-friendly

---

## 📊 Base de Dados

### Estrutura do Objeto Pizza

```javascript
{
    id: number,           // Identificador único (1-7)
    name: string,         // Nome da pizza
    img: string,          // Caminho relativo da imagem
    price: number,        // Preço em reais (formato decimal)
    sizes: array<string>, // Array com 3 tamanhos
    description: string   // Descrição detalhada
}
```

### Exemplo de Registro

```javascript
{
    id: 1,
    name: "Mussarela",
    img: "assets/images/pizza.png",
    price: 20.19,
    sizes: ["100g", "530g", "860g"],
    description: "Clássica pizza de mussarela, sabor marcante e textura cremosa irresistível."
}
```

### Padrões de Dados

-   **IDs:** Sequenciais de 1 a 7
-   **Preços:** Formato decimal com 2 casas (exceto alguns com valores inteiros)
-   **Tamanhos:** Primeira pizza tem "100g", demais começam com "320g"
-   **Imagens:** Nomenclatura sequencial (pizza.png, pizza2.png, etc.)
-   **Descrições:** Textos marketing de aproximadamente 70-80 caracteres

---

## 🔄 Fluxo de Dados

### 1. Inicialização

```
index.html carrega
    ↓
data/pizzas.js define pizzaJson[]
    ↓
assets/js/script.js executa
    ↓
pizzaJson.map() itera sobre dados
    ↓
DOM é populado dinamicamente
```

### 2. Interação do Usuário

```
Usuário clica em pizza
    ↓
Event listener captura evento
    ↓
data-key identifica pizza
    ↓
Modal é preenchido com dados
    ↓
Animação de abertura
```

### 3. Estados da Aplicação

```javascript
// Estados possíveis
const AppStates = {
    LOADING: "loading", // Carregando dados
    CATALOG: "catalog", // Visualizando catálogo
    MODAL_OPEN: "modal_open", // Modal de detalhes aberto
    CART_OPEN: "cart_open", // Carrinho aberto (mobile)
};
```

### 4. Ciclo de Vida dos Componentes

#### Pizza Card

```
Template Clone → Data Binding → Event Binding → DOM Append → Ready
```

#### Modal

```
Hidden → Data Load → Fade In → Interactive → Fade Out → Hidden
```

---

## 🧪 Estruturas de Teste

### Casos de Teste Sugeridos

#### Teste de Renderização

```javascript
// Verificar se todas as pizzas são renderizadas
test("should render all pizzas", () => {
    expect(document.querySelectorAll(".pizza-item").length).toBe(7);
});
```

#### Teste de Modal

```javascript
// Verificar abertura do modal
test("should open modal when pizza clicked", () => {
    const pizzaCard = document.querySelector(".pizza-item");
    pizzaCard.querySelector("a").click();
    expect(document.querySelector(".pizzaWindowArea").style.display).toBe(
        "flex"
    );
});
```

#### Teste de Dados

```javascript
// Verificar integridade dos dados
test("should have valid pizza data", () => {
    pizzaJson.forEach((pizza) => {
        expect(pizza.id).toBeGreaterThan(0);
        expect(pizza.name).toBeTruthy();
        expect(pizza.price).toBeGreaterThan(0);
        expect(pizza.sizes).toHaveLength(3);
    });
});
```

---

## 📐 Padrões de Código

### Convenções de Nomenclatura

-   **Classes CSS:** BEM-like (`.pizza-item--name`)
-   **Variáveis JS:** camelCase (`modalQt`)
-   **Funções:** camelCase descritivo
-   **Constantes:** UPPER_CASE

### Estrutura de Arquivos

```
Separação por tipo:
- HTML: Estrutura
- CSS: Apresentação
- JS: Comportamento
- Data: Informações
```

### Comentários

```javascript
// Comentários explicativos em português
// Descrevem o "porquê", não apenas o "o que"
```

---

**📝 Nota:** Esta documentação técnica serve como referência para desenvolvedores que trabalharão na manutenção e evolução do projeto.
