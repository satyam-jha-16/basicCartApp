import { menuArray } from "/data.js";

const cartSection = document.getElementById("order-items")
const cartHolder = document.getElementById("cart-section")
const paymentGateway = document.getElementById("payment-gateway")
const completeOrder = document.getElementById("complete-order")
const payBtn = document.getElementById("pay")
const thanks = document.getElementById("thanks-msg")

const menuItems = menuArray.map(item =>{
    return `
    <div class="menu-item">
    <div class="item-info">
        <p class="menu-item-img">${item.emoji}</p>
        <div class= 'description'>
            <p class="item-name">${item.name}</p>
            <p class="ingredients">${item.ingredients}</p>
            <p class="item-price">$${item.price}</p>
        </div>
        
    </div>
    <div class="add-item" data-add="${item.id}" >+</div>   
</div>
<div class="partition-line"></div>`;
  })
  .join("");
// console.log(menuItems)
document.getElementById("menu-list").innerHTML = menuItems;

//setting up a cart for added item
let cart = [];
document.addEventListener("click", event => {
    if(event.target.dataset.add){
        addToCart(event.target.dataset.add)
    }
    if(event.target.dataset.remove){
        removeElement(event.target.dataset.remove)
    }

})


function addToCart(menuItemId){
    // console.log(menuItemId)
    const targetItemArray = menuArray.filter(function(item){
        return (item.id == menuItemId )
    })[0]
    cart.push(targetItemArray)

    // console.log(cart)
    renderCart(cart);
    if(cart.length === 1){
        cartHolder.classList.toggle("no-display")
    }
}

function removeElement(menuItemId){
    const targetItemObj = cart.filter(item => {
        return (item.id == menuItemId)
    })[0]
    const index = cart.indexOf(targetItemObj)
    cart.splice(index, 1)
    renderCart(cart)
}
cartHolder.classList.toggle("no-display")
function renderCart(cart){
    let total = 0
    cart.map(item => {
        total += item.price
    })
    if(total === 0){
        cartHolder.classList.toggle("no-display")
    }

    cartSection.innerHTML =""
    let cartItems = ''
    cart.map(item => {
        let temp = document.createElement("li")
        temp.innerHTML += `${item.name } <span class ='remove' id='remove' data-remove = ${item.id}>remove</span> <span class ='price-cart'>${item.price}</span>  `
        // console.log(temp)
        cartSection.append(temp)
    }) 
    const totalPrice = document.getElementById("total-price")
// calculating the total of bill
    // console.log(cart)

    totalPrice.textContent = "Total Price: " + total
}
completeOrder.addEventListener("click", function(){
    paymentGateway.classList.toggle("no-display")
})
payBtn.addEventListener("click", function(){
    paymentGateway.classList.toggle("no-display")
    thanks.classList.toggle("no-display")

    cart.splice(0, cart.length)
    renderCart(cart)
})
