const listaProdutos       = document.querySelector("#lista-produtos")
const carrinhoVazio       = document.querySelector(".carrinho-vazio")
const displayItens        = document.querySelector("#display-itens")
const listaCarrinho       = document.querySelector(".carrinho-itens")
const quantidadeProdutos  = document.querySelector("#quantidade-produtos")
const totalProdutos       = document.querySelector("#preco-produtos")
const aside               = document.querySelector("#aside")
const header              = document.querySelector(".header-right")
const inputSearch         = document.querySelector("#input-search")
const buttonSearch        = document.querySelector("#button-search")
const notFound            = document.querySelector(".notfound")
const modal               = document.querySelector(".modal")
const precoAtualizado     = document.querySelector("#preco-att")
const limparItensCarrinho = document.querySelector("#limpar-itens")
const clockHour           = document.querySelector("#hour")
const clockMinute         = document.querySelector("#minute")
const clockSecond         = document.querySelector("#second")
const buttonClockHtml     = document.querySelector("#img-clock")
const ClockHtml           = document.querySelector(".digital-clock")
const toggleContainer     = document.querySelector(".container-toggle")
const toggle              = document.querySelector(".toggle")
const body                = document.querySelector("body")
const textoLimparCarrinho = document.querySelector("#limpar-carrinho-text")
const limparCarrinhoImg   = document.querySelector("#limpar-carrinho-img")
const limparItensImg      = document.querySelector("#limpar-itens")
const textoInvalido       = document.querySelector("#texto-invalido")
const totalCarrinho       = document.querySelector(".total-carrinho")
const imagemNotFound      = document.querySelector("#notfound-img")


// Array de Produtos que estão no carrinho
let arrayCarrinho   = []
// Array armazenando produtos por categoria
let arrayCamisetas  = []
let arrayCalcados   = []
let arrayAcessorios = []
let arrayPesquisa   = []

percorrerProduto(data)



// Função que percorre meu dataBase e envia as informações de cada produto pra próxima função, também faz o filtro dos produtos por categoria
function percorrerProduto(array) {
    for (let i of array) {
        let id          = i.id
        let img         = i.img
        let name        = i.nameItem
        let description = i.description
        let value       = i.value
        let tag         = i.tag
        let tagFilter   = tag.trim().toLowerCase()
        criarProduto(id, img, name, description, value, tag)

        tagFilter == "camisetas"  ? arrayCamisetas.push(i)  :
        tagFilter == "acessórios" ? arrayAcessorios.push(i) :
        tagFilter == "calçados"   ? arrayCalcados.push(i)   : 0

    }
}



// Função que recebe as informações dos produtos percorridos e adiciona o template na tela
function criarProduto(id, img, name, description, value, tag) {
    listaProdutos.innerHTML += `
                    <li class="card" id="${id}">
                        <img src="${img}" alt="">
                        <div class="card-content">
                            <h6>${tag}</h6>
                            <h2>${name}</h2>
                            <p>${description}</p>
                            <span>R$ ${value.toFixed(2)}</span>
                            <button class="button-carrinho" type="submit">Adicionar ao carrinho</button>
                        </div>
                    </li>
    `
}




// Função que faz o evento de click para adicionar os itens ao carrinho
// Verifica se o id do produto já existe no carrinho, se sim ele executa a função de somar no contador
listaProdutos.addEventListener("click", adicionarCarrinho)
function adicionarCarrinho(event) {
    if (event.target.className == "button-carrinho") {
        let idLista = event.target.closest("li").id
        let img     = data[idLista].img
        let nome    = data[idLista].nameItem
        let preco   = data[idLista].value

        let objeto = {
            id: idLista,
            linkImg: img,
            name: nome,
            preco: preco,
            precoAux: preco,
            quantidade: 1
        }

        if (verificarIdCarrinho(arrayCarrinho, idLista) !== true) {
            arrayCarrinho.push(objeto)
            criarProdutoCarrinho(arrayCarrinho)
            if (arrayCarrinho.length >= 1) {
                carrinhoVazio.classList.add("closed")
                displayItens.classList.remove("closed")
            }
        }

    } else if (event.target.tagName == "H6") {
        buttonCategoriaCard(event)
    }
}



// Função que verifica o id do produto inserido no carrinho pra ver se ele já é existente e retorna essa informação e as alterações na função que cria o mesmo.
function verificarIdCarrinho(array, id) {
    for(let i of array) {
        if (i.id == id) {
            i.quantidade++
            i.preco += i.precoAux
            criarProdutoCarrinho(arrayCarrinho)
            return true
        }
    }
}



// Função que abre a seção de categorias quando o usuário clica na categoria dentro do card
function buttonCategoriaCard(event) {
    listaProdutos.innerHTML = ""
    if(event.target.innerHTML == "Camisetas") {
        percorrerCategoria(arrayCamisetas)
        listaProdutos.classList.add("camisetas")
    } else if(event.target.innerHTML == "Calçados") {
        percorrerCategoria(arrayCalcados)
        listaProdutos.classList.add("calcados")
    } else if(event.target.innerHTML == "Acessórios") {
        percorrerCategoria(arrayAcessorios)
        listaProdutos.classList.add("acessorios")
    }
}




// Função que cria o template do produto no carrinho e envia para o mesmo
function criarProdutoCarrinho(arrayCarrinho) {
    listaCarrinho.innerHTML = ""
    somarValores(arrayCarrinho)
    for (i = 0; i < arrayCarrinho.length; i++) {
        listaCarrinho.innerHTML += `
        <li id="${i}">
            <p class="contador">${arrayCarrinho[i].quantidade}</p>
            <div class="carrinho-left">
                <img src="${arrayCarrinho[i].linkImg}" alt="">
            </div>
            <div class="carrinho-right">
                <p>${arrayCarrinho[i].name}</p>
                <span>R$ ${(arrayCarrinho[i].preco).toFixed(2).replace(".",",")}</span>
                <button>Remover produto</button>
            </div>
        </li>
    `   
    }
}


//Função que remove o item do carrinho
listaCarrinho.addEventListener("click", removerCarrinho)
function removerCarrinho(event) {
    let id = event.target.closest("li").id
    let produto = arrayCarrinho[id]

    if (event.target.tagName == "BUTTON") {
        if (produto.quantidade == 1 && arrayCarrinho.length == 1) {
            arrayCarrinho = []
            carrinhoVazio.classList.remove("closed")
            displayItens.classList.add("closed")
        } else if (produto.quantidade == 1) {
            arrayCarrinho.splice(id, 1)
        } else if (produto.quantidade > 1) {
            produto.quantidade -= 1
            produto.preco      -= produto.precoAux
        }

        criarProdutoCarrinho(arrayCarrinho)
    }


}



// Função que soma os valores totais do carrinho e também chama a função pra contar os itens
function somarValores(array) {
    let contadorTotal      = 0
    let contadorQuantidade = 0

    for(let i of array) {
        contadorTotal      += parseInt(i.preco)
        contadorQuantidade += parseInt(i.quantidade)
    }
    
    totalProdutos.innerHTML      = `R$ ${contadorTotal.toFixed(2).replace(".",",")}`
    quantidadeProdutos.innerHTML = contadorQuantidade
}



// Função que renderiza meus produtos por categoria
header.addEventListener("click", selecionarCategorias)
function selecionarCategorias(event) {
    if (event.target.tagName == "BUTTON") {
        notFound.classList.add("closed")
        let idEvent = event.target.id
        listaProdutos.innerHTML = ""
        listaProdutos.classList = ""

        if (idEvent == "button-todos") {
            percorrerCategoria(data)
            listaProdutos.classList.add("todos")
        } else if (idEvent == "button-acessorios") {
            percorrerCategoria(arrayAcessorios)
            listaProdutos.classList.add("acessorios")
        } else if (idEvent == "button-calcados") {
            percorrerCategoria(arrayCalcados)
            listaProdutos.classList.add("calcados")
        } else if (idEvent == "button-camisetas") {
            percorrerCategoria(arrayCamisetas)
            listaProdutos.classList.add("camisetas")
        }
    }
}



// Função que percorrer os itens da categoria selecionada e renderiza 
function percorrerCategoria(array) {
    for (let i of array) {
        let id          = i.id
        let img         = i.img
        let name        = i.nameItem
        let description = i.description
        let value       = i.value
        let tag         = i.tag
        criarProduto(id, img, name, description, value, tag)
    }
}


// Input opcional pra busca dinâmica, por tecla que o usuário digitar (Necessário também tirar o inputSearch.value da função pesquisarProduto)
// inputSearch.addEventListener("keyup",pesquisarProduto)


// Função que pesquisa se o produto tem dentro do array da categoria, se tiver ele pesquisa.
buttonSearch.addEventListener("click", pesquisarProduto)
function pesquisarProduto(event) {
    event.preventDefault()
    listaProdutos.innerHTML = ""
    arrayPesquisa = []

    listaProdutos.className == "acessorios" ? verificarPesquisa(arrayAcessorios) :
    listaProdutos.className == "todos" || listaProdutos.className == "" ? verificarPesquisa(data) :
    listaProdutos.className == "calcados"   ? verificarPesquisa(arrayCalcados)   :
    listaProdutos.className == "camisetas"  ? verificarPesquisa(arrayCamisetas)  : 0

    arrayPesquisa.length == 0 ? notFound.classList.remove("closed") :
    notFound.classList.add("closed")

    percorrerCategoria(arrayPesquisa)
    inputSearch.value = ""
}



// Verifica se o texto do input tem dentro do meu array, se tiver ele renderiza
function verificarPesquisa(array) {
    let texto = inputSearch.value.trim().toLowerCase()
    
    inputSearch.value.trim().toLowerCase() == "" ? modal.style.display = "flex" :
    modal.style.display = "none"


    for(let i of array) {
        textoData = i.nameItem.trim().toLowerCase()
        textoData.includes(texto) ? arrayPesquisa.push(i) : 0
    }

}


//Função pra fechar o modal de alerta "Item inválido"
modal.addEventListener("click", closeModal)
function closeModal(event) {
    event.target.tagName == "IMG" ? modal.style.display = "none" : 0
}



// Função para limpar todos os itens do carrinho
limparItensCarrinho.addEventListener("click",limparItens)
function limparItens() {
    arrayCarrinho = []
    carrinhoVazio.classList.remove("closed")
    displayItens.classList.add("closed")
}


// Função que ativa o script do relógio digital
function setHour() {
    let getDateHour = new Date()

    let hours   = getDateHour.getHours()
    let minutes = getDateHour.getMinutes()
    let seconds = getDateHour.getSeconds()

    hours < 10   ? hours   = '0' + hours : 0
    minutes < 10 ? minutes = '0' + minutes : 0
    seconds < 10 ? seconds = '0' + seconds : 0

    clockHour.innerHTML   = hours
    clockMinute.innerHTML = minutes
    clockSecond.innerHTML = seconds
}

setInterval(setHour)


// Ativar Relógio digital
buttonClockHtml.addEventListener("mouseover",colocarMouse) 
function colocarMouse() {
    ClockHtml.classList.contains("hidden") ? ClockHtml.classList.remove("hidden") : 0
}


// Desativar Relógio digital
buttonClockHtml.addEventListener("mouseout",retirarMouse) 
function retirarMouse() {
    ClockHtml.classList.add("hidden")
}



// Função que ativa e desativa meu toggle night mode 
toggleContainer.addEventListener("click",mudarBolinha) 
function mudarBolinha() {
    let toggleClasses = toggle.classList
    if(toggleClasses.contains("light")){
        toggleClasses.remove("light")
        toggleClasses.add("dark")
        coresDark()
    } else {
        toggleClasses.remove("dark")
        toggleClasses.add("light")
        coresLight()
    }
}

// Cores no dark mode
function coresDark() {
    body.style.background           = "#292929"
    textoInvalido.style.color       = "#fff"
    textoLimparCarrinho.style.color = "#fff"
    limparCarrinhoImg.style.filter  = "invert(100%) sepia(84%) saturate(2%) hue-rotate(119deg) brightness(108%) contrast(101%)"
    limparItensImg.style.filter     = "invert(100%) sepia(84%) saturate(2%) hue-rotate(119deg) brightness(108%) contrast(101%)"
    totalCarrinho.style.background  = "#37268C"
    imagemNotFound.style.filter     = "invert(100%) sepia(84%) saturate(2%) hue-rotate(119deg) brightness(108%) contrast(101%)"
}

// Cores no light mode
function coresLight() {
    body.style.background           = "#fff"
    textoLimparCarrinho.style.color = "black"
    textoInvalido.style.color       = "#000"
    limparCarrinhoImg.style.filter  = "invert(0%) sepia(0%) saturate(7488%) hue-rotate(338deg) brightness(100%) contrast(104%)"
    limparItensImg.style.filter     = "invert(0%) sepia(0%) saturate(7488%) hue-rotate(338deg) brightness(100%) contrast(104%)"
    imagemNotFound.style.filter     = "invert(10%) sepia(83%) saturate(3567%) hue-rotate(248deg) brightness(104%) contrast(92%)"
}



