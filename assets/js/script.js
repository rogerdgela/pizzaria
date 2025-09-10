// Função auxiliar para selecionar um único elemento do DOM
// Parâmetro: el (string) - seletor CSS
// Retorna: o primeiro elemento que corresponde ao seletor informado
const c = (el) => {
    return document.querySelector(el);
};

// Função auxiliar para selecionar múltiplos elementos do DOM
// Parâmetro: el (string) - seletor CSS
// Retorna: NodeList com todos os elementos que correspondem ao seletor informado
const cAll = (el) => {
    return document.querySelectorAll(el);
};

// Variável que armazena a quantidade de pizzas selecionadas no modal
let modalQt = 1;

// Percorre o array pizzaJson e para cada pizza executa a função de renderização
pizzaJson.map((item, index) => {
    // Clona o template do item de pizza presente em .models
    // O parâmetro true garante que todos os elementos filhos também sejam clonados (deep clone)
    let pizzaItem = c(".models .pizza-item").cloneNode(true);

    // Adiciona um atributo data-key ao elemento clonado para identificar a pizza pelo índice
    pizzaItem.setAttribute("data-key", index);

    // Preenche o nome da pizza no elemento clonado
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;

    // Preenche a descrição da pizza no elemento clonado
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

    // Preenche o preço da pizza no elemento clonado, formatando para duas casas decimais
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;

    // Define o caminho da imagem da pizza no elemento clonado
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;

    // Adiciona um evento de clique ao link do item de pizza
    pizzaItem.querySelector("a").addEventListener("click", (e) => {
        // Previne o comportamento padrão do link (navegação)
        e.preventDefault();

        // Reseta a quantidade do modal para 1 sempre que abrir
        modalQt = 1;

        // Obtém o índice da pizza clicada através do atributo data-key
        let key = e.target.closest(".pizza-item").getAttribute("data-key");

        // Preenche a imagem grande do modal com a imagem da pizza selecionada
        c(".pizzaBig img").src = pizzaJson[key].img;

        // Preenche o nome da pizza no modal
        c(".pizzaWindowArea .pizzaInfo h1").innerHTML = pizzaJson[key].name;

        // Preenche a descrição da pizza no modal
        c(".pizzaWindowArea .pizzaInfo--desc").innerHTML = pizzaJson[key].description;

        // Preenche o preço da pizza no modal, formatando para duas casas decimais
        c(".pizzaWindowArea .pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        // Remove a classe 'selected' do tamanho anteriormente selecionado
        c(".pizzaInfo--size.selected").classList.remove("selected");

        // Percorre todos os botões de tamanho disponíveis no modal
        cAll(".pizzaInfo--size").forEach((size, sizeIndex, array) => {
            // Se for o último botão (maior tamanho), adiciona a classe 'selected'
            if (sizeIndex === array.length - 1) {
                size.classList.add("selected");
            }

            // Atualiza o texto do tamanho com o valor correspondente do array de tamanhos da pizza
            size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        // Atualiza a quantidade exibida no modal para o valor atual de modalQt
        c(".pizzaInfo--qt").innerHTML = modalQt;

        // Define a opacidade do modal como 0 (transparente) para iniciar a animação de fade-in
        c(".pizzaWindowArea").style.opacity = 0;

        // Exibe o modal de detalhes da pizza, alterando o display para 'flex'
        c(".pizzaWindowArea").style.display = "flex";

        // Após 200ms, define a opacidade do modal como 1 (visível), completando a animação de fade-in
        setTimeout(() => {
            c(".pizzaWindowArea").style.opacity = 1;
        }, 200);
    });

    // Adiciona o elemento clonado (pizzaItem) à área de pizzas na página
    c(".pizza-area").append(pizzaItem);
});

// Função responsável por fechar o modal de detalhes da pizza
function closeModal() {
    // Seleciona o modal de detalhes da pizza
    const modal = c(".pizzaWindowArea");

    // Inicia a transição de opacidade para 0 (fade-out)
    modal.style.opacity = 0;

    // Após 200ms (tempo da transição), oculta o modal definindo display como 'none'
    setTimeout(() => {
        modal.style.display = "none";
    }, 200);
}

// Seleciona todos os botões de cancelar (desktop e mobile) do modal
// Para cada botão, adiciona o evento de clique que chama a função closeModal
cAll(".pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton").forEach((item) => {
    item.addEventListener("click", closeModal)
});

// Adiciona um event listener ao botão de diminuir quantidade
c(".pizzaInfo--qtmenos").addEventListener("click", () => {
    // Verifica se a quantidade atual é maior que 1 para não permitir valores menores que 1
    if (modalQt > 1) {
        // Decrementa a variável que controla a quantidade do modal
        modalQt--;
        // Atualiza o valor exibido na interface para refletir a nova quantidade
        c(".pizzaInfo--qt").innerHTML = modalQt;
    }
});

// Adiciona um event listener ao botão de aumentar quantidade
c(".pizzaInfo--qtmais").addEventListener("click", () => {
    // Incrementa a variável que controla a quantidade do modal
    modalQt++;
    // Atualiza o valor exibido na interface para refletir a nova quantidade
    c(".pizzaInfo--qt").innerHTML = modalQt;
});

// Seleciona todos os elementos que representam os tamanhos de pizza
cAll(".pizzaInfo--size").forEach((size) => {
    // Para cada elemento de tamanho, adiciona um ouvinte de evento de clique
    size.addEventListener("click", () => {
        // Ao clicar, remove a classe 'selected' do tamanho atualmente selecionado
        c(".pizzaInfo--size.selected").classList.remove("selected");
        // Em seguida, adiciona a classe 'selected' ao tamanho que foi clicado
        size.classList.add("selected");
    });
});