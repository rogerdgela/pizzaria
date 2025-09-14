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

// Variável que armazena o carrinho de compras
let cart = [];

// Variável que armazena a chave da pizza selecionada no modal
let modalKey = 0;

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
    pizzaItem.querySelector(
        ".pizza-item--price"
    ).innerHTML = `R$ ${item.price.toFixed(2)}`;

    // Define o caminho da imagem da pizza no elemento clonado
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;

    // Adiciona um evento de clique ao link do item de pizza
    pizzaItem.querySelector("a").addEventListener("click", (e) => {
        // Previne o comportamento padrão do link (navegação)
        e.preventDefault();

        // Reseta a quantidade do modal para 1 sempre que abrir
        modalQt = 1;

        // Atualiza a variável modalKey com o índice da pizza clicada
        modalKey = index;

        // Obtém o índice da pizza clicada através do atributo data-key
        let key = e.target.closest(".pizza-item").getAttribute("data-key");

        // Preenche a imagem grande do modal com a imagem da pizza selecionada
        c(".pizzaBig img").src = pizzaJson[key].img;

        // Preenche o nome da pizza no modal
        c(".pizzaWindowArea .pizzaInfo h1").innerHTML = pizzaJson[key].name;

        // Preenche a descrição da pizza no modal
        c(".pizzaWindowArea .pizzaInfo--desc").innerHTML =
            pizzaJson[key].description;

        // Preenche o preço da pizza no modal, formatando para duas casas decimais
        c(
            ".pizzaWindowArea .pizzaInfo--actualPrice"
        ).innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        // Remove a classe 'selected' do tamanho anteriormente selecionado
        c(".pizzaInfo--size.selected").classList.remove("selected");

        // Percorre todos os botões de tamanho disponíveis no modal
        cAll(".pizzaInfo--size").forEach((size, sizeIndex, array) => {
            // Se for o último botão (maior tamanho), adiciona a classe 'selected'
            if (sizeIndex === array.length - 1) {
                size.classList.add("selected");
            }

            // Atualiza o texto do tamanho com o valor correspondente do array de tamanhos da pizza
            size.querySelector("span").innerHTML =
                pizzaJson[key].sizes[sizeIndex];
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
cAll(".pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton").forEach(
    (item) => {
        item.addEventListener("click", closeModal);
    }
);

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

// Adiciona um event listener ao botão de adicionar ao carrinho
c(".pizzaInfo--addButton").addEventListener("click", () => {
    // Obtém o tamanho selecionado da pizza através do atributo data-key
    let size = c(".pizzaInfo--size.selected").getAttribute("data-key");

    // Adiciona um novo item ao array do carrinho com todas as informações da pizza
    cart.push({
        id: pizzaJson[modalKey].id, // ID da pizza
        size: parseInt(size), // Tamanho da pizza (convertido para número)
        qt: modalQt, // Quantidade selecionada
        name: pizzaJson[modalKey].name, // Nome da pizza
        price: pizzaJson[modalKey].price, // Preço da pizza
        img: pizzaJson[modalKey].img, // Caminho da imagem da pizza
    });

    // Atualiza a exibição do carrinho
    updateCart();

    // Fecha o modal após adicionar ao carrinho
    closeModal();
});

// Função principal que atualiza a visualização do carrinho de compras
function updateCart() {
    // Verifica se o carrinho tem pelo menos um item
    if (cart.length > 0) {
        // Torna o carrinho visível adicionando a classe 'show' ao elemento aside
        c("aside").classList.add("show");
        // Limpa todo o conteúdo atual do carrinho para nova renderização
        c(".cart").innerHTML = "";

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        // Array para armazenar itens do carrinho após agrupamento
        let groupedCart = [];
        // Percorre cada item do carrinho atual
        cart.forEach((item) => {
            // Procura se já existe um item idêntico (mesma pizza e tamanho) no carrinho agrupado
            let existing = groupedCart.find(
                (x) => x.id === item.id && x.size === item.size
            );
            // Se encontrar um item idêntico, apenas soma a quantidade
            if (existing) {
                existing.qt += item.qt;
            } else {
                // Se não encontrar, adiciona como novo item no carrinho agrupado
                groupedCart.push({ ...item });
            }
        });

        // Percorre cada item do carrinho agrupado para renderizar na interface
        groupedCart.forEach((cartItem) => {
            // Encontra os detalhes completos da pizza no array pizzaJson usando o ID
            let pizzaItem = pizzaJson.find((item) => item.id === cartItem.id);
            subTotal += pizzaItem.price * cartItem.qt;

            // Clona o template do item do carrinho para criar um novo elemento
            let cartItemElement = c(".models .cart--item").cloneNode(true);

            // Variável para armazenar o nome do tamanho da pizza
            let pizzaSizeName;
            // Define o nome do tamanho baseado no código (0=P, 1=M, 2=G)
            switch (cartItem.size) {
                case 0:
                    pizzaSizeName = "P";
                    break;
                case 1:
                    pizzaSizeName = "M";
                    break;
                case 2:
                    pizzaSizeName = "G";
                    break;
            }
            // Cria o nome completo da pizza incluindo o tamanho
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            // Define a imagem do item no carrinho
            cartItemElement.querySelector("img").src = pizzaItem.img;
            // Define o nome da pizza com o tamanho no item do carrinho
            cartItemElement.querySelector(".cart--item-nome").innerHTML = pizzaName;
            // Define a quantidade do item no carrinho
            cartItemElement.querySelector(".cart--item--qt").innerHTML = cartItem.qt;
            // Adiciona um event listener ao botão de diminuir quantidade no carrinho
            cartItemElement
                .querySelector(".cart--item-qtmenos")
                .addEventListener("click", () => {
                    // Verifica se a quantidade do item é maior que 1
                    if (cartItem.qt > 1) {
                        // Se for maior que 1, diminui a quantidade em 1
                        cartItem.qt--;
                    } else {
                        // Se for 1, remove o item do carrinho
                        cart = cart.filter(
                            (item) =>
                                !(
                                    item.id === cartItem.id &&
                                    item.size === cartItem.size
                                )
                        );
                    }
                    // Atualiza a visualização do carrinho
                    updateCart();
                });

            // Adiciona um event listener ao botão de aumentar quantidade no carrinho
            cartItemElement
                .querySelector(".cart--item-qtmais")
                .addEventListener("click", () => {
                    // Incrementa a quantidade do item no carrinho
                    cartItem.qt++;
                    // Atualiza a visualização do carrinho
                    updateCart();
                });

            // Adiciona o elemento do item criado ao carrinho
            c(".cart").append(cartItemElement);
        });

        // Atualiza o array original do carrinho com os itens agrupados
        cart = groupedCart;
        desconto = subTotal * 0.1;
        total = subTotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        // Se o carrinho estiver vazio, esconde o elemento aside removendo a classe 'show'
        c("aside").classList.remove("show");
    }
}
