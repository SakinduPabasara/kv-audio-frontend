// Loads the cart from local storage, or initializes it if it doesn't exist.
//simple explain : This function retrieves the shopping cart data from the browser's local storage. If no cart data is found, it initializes a new cart with default values, including an empty list of ordered items, a rental duration of one day, and the current date as both the starting and ending dates. The cart data is then stored back into local storage in JSON format and returned. If cart data is found, it is parsed from JSON and returned as a JavaScript object.

export function loadCart(){
    let cart = localStorage.getItem("cart");
    if(cart == null){
        cart = {
            orderedItems : [],
            days : 1,
            startingDate : formatDate(new Date()),
            endingDate : formatDate(new Date()),
        }
        const cartString = JSON.stringify(cart);
        localStorage.setItem("cart", cartString);
        return cart;
    }
    cart = JSON.parse(cart);   
    return cart;
}

//add item to cart
export function addToCart(key, qty){
    const cart = loadCart();
    let found = false;

    for (let i=0; i<cart.orderedItems.length; i++){
        if(cart.orderedItems[i].key == key){
            cart.orderedItems[i].qty += qty;
            found = true;
        }   
    }

    if(!found){
        cart.orderedItems.push({key, qty});
    }
    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}

//remove item from cart
export function removeFromCart(key){
    const cart = loadCart();
    const newCart = cart.orderedItems.filter((item) => item.key != key);
    cart.orderedItems = newCart;
    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}

export function formatDate(date){
    const year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2,'0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}