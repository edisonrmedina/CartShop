//declaraciones de variable del DOM que usaremos 
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let darkMode = document.querySelector('.dark-mode');
let item = document.querySelectorAll('.item');
let imgDark = document.querySelector('.img-dark-activation');
let imgShop = document.querySelector('.img-shop');
let h1Dark = document.querySelectorAll('.h1-dark');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');

//Listeners
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})

closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

darkMode.addEventListener('click',() => {
    //TODO:
    debugger;
    if (body.className.includes('body-dark-mode')) {
        body.classList.remove('body-dark-mode')
        imgDark.src = "image/darkMode.svg";
        imgShop.src = "image/shopping.svg"
        h1Dark.forEach((h1) => {
            h1.style.color = 'black';
        });
        initApp();
        // Haz algo cuando el modo oscuro se active
      } else {
        body.classList.add('body-dark-mode');
        imgDark.src = "image/darkModeDark.svg";
        imgShop.src = "image/shoppingDark.svg"
        h1Dark.forEach((h1) => {
            h1.style.color = '#858788';
        });
        initAppDark();
        // Haz algo cuando el modo oscuro se desactive
      }
}

)

total.addEventListener('click',()=>{
    payCart();
})

// Agregar evento keydown a document para cerrar modal con Esc
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";
      }
});


let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 7,
        quantity:10
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 6,
        quantity:10
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 5,
        quantity:10
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 4,
        quantity:10
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 3,
        quantity:10
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 12,
        quantity:10
    }
];

let listCards  = [];

//Iniciamos la App en modo Normal
function initApp(){
    debugger;
    if (localStorage.getItem('listaCards')) {
        listCards = JSON.parse(localStorage.getItem('listaCards'));
        reloadCard();
    }
    list.innerHTML = "";
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="title">Cant: ${value.quantity}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        let img = newDiv.querySelector('img');
        img.onclick = function() {
            // Aquí puedes agregar la funcionalidad que desees
            modal.style.display = "block";
            modal.querySelector('.modal-content').innerHTML =  `
            <span class="close">&times;</span>
            <div class = "modal-content-inside">
              <img src="image/${value.image}">
              <div class="title">${value.name}</div>
              <div class="price">${value.price.toLocaleString()}</div>
            </div>
            <div class = "modal-content-info">
                <p class ="modal-content-inside-paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    <button onclick="addToCard(${key})">Add To Card</button>
            </div>`;
            ;
            let closeModal = modal.querySelector('.modal-content').querySelector('.close');
            closeModal.onclick = function (){
                modal.style.display = "none";
            }
            
        };
         
        list.appendChild(newDiv);
    })
    
}

//Iniciamos la App en modo Oscuro
function initAppDark(){
    list.innerHTML = "";
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.classList.add('item-dark-mode');
        
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="title">Cant: ${value.quantity}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        let img = newDiv.querySelector('img');
        img.onclick = function() {
            // Aquí puedes agregar la funcionalidad que desees
            modal.style.display = "block";
            modal.querySelector('.modal-content').innerHTML =  `
            <span class="close">&times;</span>
            <div class = "modal-content-inside">
              <img src="image/${value.image}">
              <div class="title">${value.name}</div>
              <div class="price">${value.price.toLocaleString()}</div>
            </div>
            <div class = "modal-content-info">
                <p class ="modal-content-inside-paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    <button onclick="addToCard(${key})">Add To Card</button>
            </div>`;
            ;
            let closeModal = modal.querySelector('.modal-content').querySelector('.close');
            closeModal.onclick = function (){
                modal.style.display = "none";
            }
            
        };
         
        list.appendChild(newDiv);
    })
}

//Por default sera Normal
initApp();

//Funcion para agregar al carrito
function addToCard(key){
    debugger;
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

//Funcion para recargar el carrito de compras
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = "$"+totalPrice.toLocaleString();
    quantity.innerText = count;
    localStorage.setItem('listaCards', JSON.stringify(listCards.filter(card => card !== null)));
}

//Funcion para cambiar la cantidad del carrito por producto
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

//Funcion que me permite pagar lo que se halle en el carrito
function payCart(){
    listCards.map((cartProduct)=>{
        products.map((product) => {
            if(product.id === cartProduct.id){
                /**Validaciones necesarias para aprobar la compra*/
                if(cartProduct.quantity <= product.quantity){
                    product.quantity = product.quantity - cartProduct.quantity;
                    changeQuantity(cartProduct.id -1 , 0);
                }else{
                    alert(`No existe cantidad dispoble para: ${cartProduct.name}` )
                }
            }
        });
    });
    initApp();
}