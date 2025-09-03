// Função auxiliar que retorna um único elemento do DOM
// Recebe um seletor CSS como parâmetro e retorna o primeiro elemento que corresponde a este seletor
const c = (el) => {
    return document.querySelector(el);
};

// Função auxiliar que retorna múltiplos elementos do DOM
// Recebe um seletor CSS como parâmetro e retorna uma NodeList com todos os elementos que correspondem a este seletor
const cAll = (el) => {
    return document.querySelectorAll(el);
};

// Itera sobre o array pizzaJson usando map
// Para cada pizza no array, cria um clone do template e adiciona na área de pizzas
pizzaJson.map((item, index) => {
    // Clona o template .pizza-item que está dentro de .models
    // O parâmetro true indica que será um deep clone (clona também os elementos filhos)
    let pizzaItem = c(".models .pizza-item").cloneNode(true);

    // Adiciona o clone criado à área de pizzas no DOM
    c(".pizza-area").append(pizzaItem);
});
