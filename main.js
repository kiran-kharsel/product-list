// product array
const products = [
  {
    id: 1,
    title: "Chocolate Lava Cake",
    price: 5.99,
    img: "https://images.getrecipekit.com/20250325120225-how-20to-20make-20chocolate-20molten-20lava-20cake-20in-20the-20microwave.png?width=650&quality=90&",
  },
  {
    id: 2,
    title: "Strawberry Cheesecake",
    price: 6.49,
    img: "https://www.elmundoeats.com/wp-content/uploads/2024/06/A-portion-of-no-bake-strawberry-cheesecake.jpg",
  },
  {
    id: 3,
    title: "Tiramisu",
    price: 7.25,
    img: "https://www.kingarthurbaking.com/sites/default/files/2023-03/Tiramisu_1426.jpg",
  },
  {
    id: 4,
    title: "Macarons",
    price: 8.5,
    img: "https://media.istockphoto.com/id/874054904/photo/macrons-in-various-colors-on-table.jpg?s=612x612&w=0&k=20&c=f7MCqnldkBfwapEkQZXGHhOOlC4D1E0JCbRP8skn03Y=",
  },
  {
    id: 5,
    title: "Ice Cream Sundae",
    price: 4.75,
    img: "https://ticktocktea.com/cdn/shop/articles/Ice-Cream-Sundae-800x800px-min.jpg?v=1657010846",
  },
  {
    id: 6,
    title: "Apple Pie Slice",
    price: 3.99,
    img: "https://www.recipetineats.com/tachyon/2022/11/Apple-Pie_8.jpg?resize=500%2C500",
  },
  {
    id: 7,
    title: "Brownie with Walnuts",
    price: 4.25,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnfZQyOlBQDCVUi5KFUiVxqH2MlT0iEPQK1Q&s",
  },
  {
    id: 8,
    title: "Panna Cotta",
    price: 6.0,
    img: "https://static01.nyt.com/images/2023/08/10/multimedia/LH-Panna-Cotta-wczm/LH-Panna-Cotta-wczm-mediumSquareAt3X.jpg",
  },
  {
    id: 9,
    title: "Cupcake (Vanilla)",
    price: 2.5,
    img: "https://tideandthyme.com/wp-content/uploads/2013/05/vanillacupcakes1.jpg",
  },
  {
    id: 10,
    title: "Baklava",
    price: 5.5,
    img: "https://cleobuttera.com/wp-content/uploads/2018/03/lifted-baklava-720x540.jpg",
  },
];

// dom elem
const itemList = document.querySelector(".item-list");
const cartList = document.querySelector(".cart-list");
const quantity = document.querySelector(".cart-heading span");
const totalPriceElem = document.querySelector(".total-price span");
const cart = document.querySelector(".cart");
const confirmOrderBtn = cart.querySelector(".confirm-order-btn");
const cartContainer = document.querySelector(".cart-container");
const emptyCartElem = cartContainer.querySelector(".empty-cart");

//modal
const confirmOrderModal = document.querySelector(".confirm-order-modal");
const confirmOrderList = document.querySelector(".ordered-list");
const newOrderBtn = confirmOrderModal.querySelector("#new-order-button");

// global vaariable
let cartItems = [];

// loop through array to create dynamic list html
products.forEach((item, index) => {
  let li = document.createElement("li");
  li.classList.add("item");
  li.innerHTML = `
  <div class="item-img">
    <img src=${item.img} alt="item-img">
    <div class="btn-container">
      <button onclick="addToCart(${item.id}, ${index})" class="add"><i class='bx  bx-cart'></i>  add to cart</button>
      <div class="hidden">
        <i onclick="decreaseQuantity(this, ${item.id})" role="button" class='bx  bx-minus-circle'></i> 
        <span></span>
        <i onclick="increaseQuantity(this, ${item.id})" role="button" class='bx  bx-plus-circle'></i> 
      </div>
    </div>
  </div>
  <div class="details">
    <p class="item-title">${item.title}</p>
    <p class="price">$${item.price}</p>
    </div>`;

  itemList.appendChild(li);
});

function addToCart(itemId, index) {
  // quantity variable
  let itemQuantity = 1;

  // select all btn container
  btnContainer = document.querySelectorAll(".btn-container");

  // hide btn elem
  btnContainer[index].querySelector(".add").classList.add("hidden");
  btnContainer[index].querySelector("div").classList.remove("hidden");

  //set initial quantity
  btnContainer[index].querySelector("div span").innerText = itemQuantity;

  //select same item as id
  let selectedItem = products.filter((item) => item.id === itemId);
  selectedItem[0].quantity = itemQuantity;
  cartItems.push(...selectedItem);

  // update cart
  showCart();
}

// function increase item quantity
function increaseQuantity(elem, id) {
  // update quantity in object
  cartItems = cartItems.map((item) => {
    return item.id === id ? { ...item, quantity: item.quantity + 1 } : item;
  });

  // find object
  const item = cartItems.find((item) => item.id === id);
  // update in span
  elem.previousElementSibling.innerText = item.quantity;

  // also update in cart item quantty
  showCart();
}

// function decrease item quantity
function decreaseQuantity(elem, id) {
  // update quantity in object
  cartItems = cartItems.map((item) => {
    return item.id === id ? { ...item, quantity: item.quantity - 1 } : item;
  });

  // find object
  const item = cartItems.find((item) => item.id === id);
  if (item.quantity > 0) {
    // update in span
    elem.nextElementSibling.innerText = item.quantity;
  }

  // filter out if quantity is zero
  cartItems = cartItems.filter((item) => item.quantity !== 0);

  showCart();
}








// function to show cart ui
function showCart() {
    
  // show cart ui when cartitems is not empty
  if (cartItems.length === 0) {
    emptyCartElem.classList.remove("hidden");
    cart.classList.add("hidden");

    // loop through btn and clear class list
    btnContainer = document.querySelectorAll(".btn-container");
    //console.log(btnContainer)
    btnContainer.forEach((btn) => {
      let [button, div] = btn.children;
      button.classList.remove('hidden')
      div.classList.add('hidden')
    });

    
  }else{
    emptyCartElem.classList.add("hidden");
    cart.classList.remove("hidden");
  }

  cartList.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  cartItems.forEach((item) => {
    count = count + item.quantity;
    totalPrice = totalPrice + item.price * item.quantity;

    if (item != null) {
      let li = document.createElement("li");
      li.classList.add("cart-item");
      li.innerHTML = `
      <div class="item-detail">
        <p class="title">${item.title}</p>
        <div>
          <span class="quantity">${item.quantity}x</span>
          <span class="price">@${item.price}</span>
          <span class="total">${item.price * item.quantity} </span>
        </div>
      </div>
      <button onclick="cancelItem(${item.id})" class="item-cancel">
          <i class='bx  bx-x-circle'></i> 
      </button>`;

      cartList.appendChild(li);
    }
  });

  quantity.innerText = `(${count})`;
  totalPriceElem.innerText = `$${totalPrice.toLocaleString()}`;
}

// cancel item function
function cancelItem(id) {
  // remove from array
  cartItems = cartItems.filter((item) => item.id !== id);

  // update ui
  showCart();

  // change button
  products.forEach((item, index) => {
    if (item.id === id) {
      // select all btn container
      btnContainer = document.querySelectorAll(".btn-container");

      // hide btn elem
      btnContainer[index].querySelector(".add").classList.remove("hidden");
      btnContainer[index].querySelector("div").classList.add("hidden");
    }
  });
}

// confirm order
confirmOrderBtn.addEventListener("click", function () {
  // if cart is empty the do not open modal
  if (cartItems.length > 0) {
    // show modal
    confirmOrderModal.showModal();
    showOrderDetails();
  } else {
    return;
  }
});

function showOrderDetails() {
  confirmOrderList.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice = totalPrice + item.price * item.quantity;

    const li = document.createElement("li");
    li.classList.add("ordered-item");
    li.innerHTML = `
      <img src=${item.img} alt="">
      <div>
        <p class="title">${item.title}</p>
        <p class="price">${item.quantity}x <span>@${item.price}</span></p>
      </div>
      <p class="price">${item.quantity * item.price}</p>`;

    confirmOrderList.appendChild(li);
  });

  // order total amount
  confirmOrderModal.querySelector(
    ".order-total-price span"
  ).innerHTML = `$${totalPrice}`;
}

//close modal
newOrderBtn.addEventListener("click", function () {
  // empty cart arrays and update ui
  cartItems = [];
  showCart();
  confirmOrderModal.close();
});
