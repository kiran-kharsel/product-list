

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
const itemList = document.querySelector('.item-list');
// const btnContainer = document.querySelector('.btn-container')


// global vaariable
let cartItems = [];

// loop through array to create dynamic list html
products.forEach((item, index) => {
  let li = document.createElement('li');
  li.classList.add('item');
  li.innerHTML = `
  <div class="item-img">
    <img src=${item.img} alt="item-img">
    <div class="btn-container">
      <button onclick="addToCart(${item.id}, ${index})" class="add"><i class='bx  bx-cart'></i>  add to cart</button>
      <div class="hidden">
        <i onclick="decreaseQuantity()" role="button" class='bx  bx-minus-circle'></i> 
        <span>2</span>
        <i onclick="increaseQuantity(this, ${index})" role="button" class='bx  bx-plus-circle'></i> 
      </div>
    </div>
  </div>
  <div class="details">
    <p class="item-title">${item.title}</p>
    <p class="price">$${item.price}</p>
    </div>`;

    itemList.appendChild(li);

})


function addToCart(itemId, index){
  
  // quantity variable
  let itemQuantity = 1;

  // select all btn container
  btnContainer = document.querySelectorAll('.btn-container')


  // hide btn elem
  btnContainer[index].querySelector('.add').classList.add('hidden')
  btnContainer[index].querySelector('div').classList.remove('hidden')

  //set initial quantity
  btnContainer[index].querySelector('div span').innerText = itemQuantity


  //select same item as id
  let selectedItem = products.filter((item) => item.id === itemId)
  selectedItem[0].quantity = itemQuantity;
  cartItems.push(...selectedItem)
  console.log(cartItems)

  // // add to cartitems
  // if(cartItems.some(item => item.id === itemId)){
  //   console.log('already present')
  //   selectedItem[0].quantity += 1;
  //   //updateCart();
  // }else{
  //   console.log('new entry to cart item')
  //   selectedItem[0].quantity = 1;
  //   cartItems.push(...selectedItem)
  //   console.log(cartItems)
  //   //updateCart()
  // }


}


// function increase or decrease item quantity
function increaseQuantity(elem, id){
  // update quantity in object
  cartItems[id].quantity += 1

  // update in span
  elem.previousElementSibling.innerText = cartItems[id].quantity

  // also update in cart item quantty
  console.log('increase quantity')
  
}