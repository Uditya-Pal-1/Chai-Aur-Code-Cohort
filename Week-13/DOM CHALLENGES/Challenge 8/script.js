const addBtns = document.querySelectorAll('.addBtn');
const cartContainer = document.querySelector('.cartContainer')
const totalAmountDisplay = document.querySelector('.totalAmount')

let cart = [];

addBtns.forEach(button => {
    button.addEventListener('click', function (event) {
        const productCard = event.target.parentElement;
        const name = productCard.querySelector('.productName').innerText;
        const priceText = productCard.querySelector('.productPrice').innerText;
        const price = parseFloat(priceText.replace('$', ''))
        addToCart(name, price)
    })
})

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const oldItems = document.querySelectorAll('.cartProduct');
    oldItems.forEach(item => item.remove());
    let totalCost = 0;
    cart.forEach((item, index) => {
        const itemSubtotal = item.price * item.quantity;
        totalCost += itemSubtotal;
        const cartElement = document.createElement('div')
        cartElement.classList.add('cartProduct')
        cartElement.style.display = 'flex'
        cartElement.style.margin = '20px'
        cartElement.style.justifyContent = 'space-between'
        cartElement.style.alignItems = 'center'
        cartElement.style.width = '100%';
        cartElement.style.borderBottom = '2px solid red'
        cartElement.style.paddingBottom = '10px'

        cartElement.innerHTML = `
        <p class="cartProductName" style="font-weight: bold; width: 40%;">${item.name}</p>
        <p class="cartProductPrice" style="width: 20%;">$${itemSubtotal.toFixed(2)}</p>
        
        <div style="display: flex; gap: 10px; align-items: center;">
        <button class="minusBtn" data-index="${index}" style="padding: 5px 10px; cursor: pointer; background: black; color: white;">-</button>
        <span style="font-weight: bold; font-size: 18px;">${item.quantity}</span>
        <button class="plusBtn" data-index="${index}" style="padding: 5px 10px; cursor: pointer; background: black; color: white;">+</button>
        <button class="removeBtn" data-index="${index}" style="padding: 5px 10px; background: red; color: white; border: none; cursor: pointer; border-radius: 5px;">Remove</button>
        </div>
        `
        cartContainer.insertBefore(cartElement, totalAmountDisplay);
    });

    if (cart.length === 0) {
        totalAmountDisplay.innerHTML = `<h3> Your Cart is Empty.</h3>`
    } else {
        totalAmountDisplay.innerHTML = `<h2> Total: $${totalCost.toFixed(2)}</h2>`
    }
    cartBtnListeners()

}
function cartBtnListeners() {
    document.querySelectorAll('.plusBtn').forEach(btn => {
        btn.addEventListener('click', function (e) {

            const index = e.target.getAttribute('data-index');
            cart[index].quantity++;
            updateCartUI();
        });
    });

    document.querySelectorAll('.minusBtn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const index = e.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {

                cart.splice(index, 1);
            }
            updateCartUI();
        });
    });


    document.querySelectorAll('.removeBtn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartUI();
        });
    });
}


updateCartUI();
