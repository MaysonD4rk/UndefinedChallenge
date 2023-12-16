
//quantidade de produtos
let qProdutos = 0;
let food = [{
    title: "Arroz e feijão",
    description: "Uma explosão de sabores gourme em cada mordida haha, compra pfv compre",
    image: "comida.jfif",
    price: 15.99,
    amount: 3,
    amountSelected: 0,
},
{
    title: "Arroz, feijão, bife e batata frita",
    description: "Uma explosão de sabores gourme em cada mordida haha, compra pfv compre",
    image: "comida2.jfif",
    price: 15.99,
    amount: 1,
    amountSelected: 0,
},
{
    title: "Hot dog",
    description: "Uma explosão de sabores gourme em cada mordida haha, compra pfv compre",
    image: "comida3.jfif",
    price: 15.99,
    amount: 1,
    amountSelected: 0,
},
{
    title: "Prato comum",
    description: "Uma explosão de sabores gourme em cada mordida haha, compra pfv compre",
    image: "comida4.jfif",
    price: 15.99,
    amount: 4,
    amountSelected: 0,
}];

(function listProds() {


    for (let index = 0; index < food.length; index++) {

        var foodCard = document.createElement("div");
        var foodChoises = document.getElementById("food-choises");
        var formattedPrice = food[index].price.toFixed(2).replace(".", ",");
        var redTag = food[index].amount > 1 ? true : false;
        foodCard.innerHTML = `
            <div class="foodCard">
                    <span style="display: none;" class="selected-item"><i class="fa-solid fa-check"></i></span>
                    <div class="foodImg" style="background-image: url('imgs/${food[index].image}');">
                    </div>
                    <div class="card-content">
                        ${redTag ? "" : "<div class='redTag' >1 unidade</div>"}
                        <p class="card-content-title">${food[index].title}</p>
                        <p class="card-content-description">${food[index].description}</p>
                    </div>
                    <div class="bottom-card">
                        <div class="price">
                            <b>R$<span class="priceNum">${formattedPrice}</span></b>
                        </div>
                        <div class="right-side">
                            <div style="display: none;" class="counter">
                                <button onclick="removeOne(${index})">-</button>
                                <span class="count">01</span>
                                <button onclick="addOne(${index})">+</button>
                            </div>
                            <button class="removeAll" onclick="removeAll(${index})" style="font-size: 18px; display: none;"><i class="fa-solid fa-trash"></i></button>
                            <button  onclick="addToCart(${index})" class="addButton">+</button>
                        </div>
                    </div>
                </div>
            `;

        foodChoises.appendChild(foodCard);

    }


})();


function addToCart(index) {
    food[index].amountSelected++;

    document.getElementsByClassName("addButton")[index].style.display = "none";
    var span = document.getElementsByClassName('selected-item')[index];
    document.getElementsByClassName("foodCard")[index].classList.add("food-selected");
    span.style.display = "flex";

    var counter = document.getElementsByClassName("counter")[index];
    //essa parte pode estar meio confusa, mas é que eu mudei o código quase no fim, antes eu n estava usando um objeto para criar os itens e tava criando um por um no seco... aí eu mudei isso agora haha
    counter.innerHTML = `<button onclick="removeOne(${index})">-</button>
                                <span class="count">${!!food[index].amountSelected ? food[index].amountSelected : 0}</span>
                                <button onclick="addOne(${index})">+</button>`;
    counter.style.display = "flex";
    var deleteButton = document.getElementsByClassName('removeAll')[index];
    deleteButton.style.fontSize = "18px";
    deleteButton.style.display = "initial";
    deleteButton.onclick = function () { removeAll(index) };
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    document.getElementsByClassName("foodCard")[index].classList.add("food-selected");



    qProdutos++
    document.getElementById("nProduto").innerHTML = qProdutos;

}

function addOne(index) {
    if (food[index].amountSelected < food[index].amount) {
        ++food[index].amountSelected;
        document.getElementsByClassName("count")[index].innerHTML = food[index].amountSelected;
        var currentPrice = food[index].amountSelected != 0 ? food[index].price * food[index].amountSelected : food[index].price
        formatedPrice = currentPrice.toString().replace(".", ",")
        document.getElementsByClassName("priceNum")[index].innerHTML = formatedPrice;
    }

}
function removeOne(index) {
    --food[index].amountSelected;
    if (food[index].amountSelected == 0) {
        removeAll(index);
    }
    document.getElementsByClassName("count")[index].innerHTML = food[index].amountSelected;
    var currentPrice = food[index].amountSelected != 0 ? food[index].price * food[index].amountSelected : food[index].price
    formatedPrice = currentPrice.toString().replace(".", ",")
    document.getElementsByClassName("priceNum")[index].innerHTML = formatedPrice;
}
function removeAll(index) {
    food[index].amountSelected = 0;
    --qProdutos;
    document.getElementById("nProduto").innerHTML = qProdutos;
    document.getElementsByClassName("counter")[index].style.display = "none";
    document.getElementsByClassName("fa-trash")[index].style.display = "none";
    document.getElementsByClassName("count")[index].innerHTML = food[index].amountSelected;
    document.getElementsByClassName("addButton")[index].style.display = "flex";
    document.getElementsByClassName("selected-item")[index].style.display = "none";
    document.getElementsByClassName("foodCard")[index].classList.remove("food-selected");

    var currentPrice = food[index].amountSelected != 0 ? food[index].price * food[index].amountSelected : food[index].price
    formatedPrice = currentPrice.toString().replace(".", ",")

    document.getElementsByClassName("priceNum")[index].innerHTML = formatedPrice;
}


/* eu tinha me esquecido de adicionar essa funcionalidade, mas juro que consumiu menos de 20min pra fazer*/
function openSideBar(){
    document.getElementById("sideBar").style.display = "flex";
    document.getElementById("invisible-modal").style.display = "initial";

    setTimeout(() => {
        document.getElementById("sideBar").style.transform = "translateX(330px)";
    }, 1);
    
}

document.getElementById("invisible-modal").addEventListener("click", ()=>{
    closeSideBar();
})

function closeSideBar(){
    document.getElementById("sideBar").style.transform = "translateX(-375px)";
    document.getElementById("invisible-modal").style.display = "none";
    setTimeout(() => {
        document.getElementById("sideBar").style.display = "none";
    }, 500);
}