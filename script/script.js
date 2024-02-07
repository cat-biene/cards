const addProductNode = document.querySelector('#add_product');
let products = [];

addProductNode.addEventListener('submit', event => {
    event.preventDefault();
    const title = event.target.title.value;
    const price = +event.target.price.value;
    const count = +event.target.count.value;

    const product = {
        title: title,
        price: price,
        count: count
    };

    products.push(product);
    rerender();
    console.log(products);
    event.target.reset();
})

const product = {
    title: 'bike',
    price: 2300,
    count: 12
};

function createProductCart(title, price, count){
    const container = document.createElement('div');
    const titleNode = document.createElement('p'); 
    const priceNode = document.createElement('p');
    const countNode = document.createElement('p');
    const deleteNode = document.createElement('button');
    const plusNode = document.createElement('button');
    const minusNode = document.createElement('button');

    container.classList.add('product_cart');
    container.style.borderColor = count === 0 ? 'red' : 'green'; 

    titleNode.innerText = title;
    priceNode.innerText = price;
    countNode.innerText = count;
    plusNode.innerText = '+';
    minusNode.innerText = '-';
    deleteNode.innerText = 'delete';

    plusNode.addEventListener('click', () => {
        countNode.innerText = ++count;
        container.style.borderColor = count === 0 ? 'red' : 'green';
    });

    minusNode.addEventListener('click', () => {
        if(count > 0){
            countNode.innerText = --count;
            container.style.borderColor = count === 0 ? 'red' : 'green';
        }
    });
    
    deleteNode.addEventListener('click', () => {
        container.remove();
        remove(title);
    });

    container.append(titleNode, priceNode, countNode, plusNode, minusNode, deleteNode);
    return container;
}

function rerender(){
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = "";
    if(products.length === 0) {
        const noProductsContainer = document.createElement('p');
        noProductsContainer.innerText = 'the product is out of stock';
        productsContainer.append(noProductsContainer);
    } else {
        products.forEach(({title, price, count}) => productsContainer.append(createProductCart(title, price, count)));
    }
}

function remove(title) {
    const newProductArray = products.filter(product => product.title !== title);
    products = newProductArray;
    rerender();
}

rerender();

