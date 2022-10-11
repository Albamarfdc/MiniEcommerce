
function productsDom() {
  fetch('/data.json')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        let newCard = document.createElement('div');
        newCard.innerHTML = `<img src= ${product.img} class="card-img-top" alt="...">
          <h5 class="card-title">${product.name}</h5>
            <div class="card-body text-center">
            <p class="card-text">$ ${product.price}</p>
            <button id="${product.id}" class="third add">Add<i class="fa fa-shopping-cart in-card" aria-hidden="true"></i> </button>
  </div>`;
        document.getElementById('cards').append(newCard);
        newCard.classList.add('card', 'col-4', 'm-3');
      });

      const add = document.querySelectorAll('.add');
      add.forEach((btn) => {
        btn.addEventListener('click', addItems);
      });
    });
}

const cartContainer = document.querySelector('#cart');
const counterCart = document.querySelector('#cart-counter');



function addItems(id) {
  Toastify({
    text: "Product added",
    duration: 1500,
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #62d150, #1e9830)",
    },
  }).showToast();
  let cartStorage = JSON.parse(localStorage.getItem('Carrito') || '[]');
  fetch('/data.json')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        if (product.id == id.target.id) {
        let add = cartStorage.find(
            (product) => product.id == id.target.id
          );
          add ? add.qty++ : cartStorage.push({ ...product, qty: 1 });

          localStorage.setItem('Carrito', JSON.stringify(cartStorage));
          updateCart(cartStorage);
          
          counterCart.innerHTML = cartStorage.reduce((acc, product) => acc + product.qty,0);
          }
      });
    });
}


function deleteProduct(id) {
  Toastify({
    text: "Product deleted",
    duration: 1500,
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #df2020, #c70202",
    },
  }).showToast();

  let cartStorage = JSON.parse(localStorage.getItem('Carrito'));
  const index = cartStorage.filter((product) => product.id != id.target.id);
  cartStorage.splice(index, 1);
  localStorage.setItem('Carrito', JSON.stringify(cartStorage));
  counterCart.innerHTML = cartStorage.reduce((acc, product) => acc + product.qty,"");
  updateCart(cartStorage);
}



const addQty = (id) => {
  Toastify({
    text: "Product added",
    duration: 1500,
    newWindow: true,
    close: false,
    gravity: "bottom",
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #62d150, #1e9830)",
    },
  }).showToast();
  let cartStorage = JSON.parse(localStorage.getItem('Carrito'));
  cartStorage.forEach((product) => {
    if (product.id == id.target.id) {
      product.qty++;
    }});
  localStorage.setItem('Carrito', JSON.stringify(cartStorage));
 updateCart(cartStorage);
  counterCart.innerHTML = cartStorage.reduce((acc, product) => acc + product.qty,0);
};


const restQty = (id) => {
    Toastify({
        text: "Product deleted",
        duration: 1500,
        newWindow: true,
        close: false,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #df2020, #c70202",
        },
      }).showToast();
  let cartStorage = JSON.parse(localStorage.getItem('Carrito'));
  cartStorage.forEach((product) => {
    if (id.target.id == product.id) {product.qty > 1 ? product.qty-- : (product.qty = 1)}});
  localStorage.setItem('Carrito', JSON.stringify(cartStorage));
  updateCart(cartStorage);
  counterCart.innerHTML = cartStorage.reduce((acc, product) => acc + product.qty, "");
};



function updateCart(local) {
  cartContainer.innerHTML = '';
  local.forEach((p) => {
    cartContainer.innerHTML += 
    `<div class="d-flex justify-content-evenly align-items-center mt-3 p- items " >
    <img  src=${p.img} width="70">
         <div class="ml-3"><span class="font-weight-bold d-block ml-3">${p.name}</span>
         <span class="d-block ml-5 font-weight-bold">$${p.price}</span></div>
         <span id="${p.id}" class="restar btn-sm mr-1"><i class="fa fa-circle-minus"></i></span>
         <span class="d-block ml-5 font-weight-bold">Item: ${p.qty}</span>
         <span id="${p.id}" class="sumar btn-sm mr-2"><i class="fa fa-circle-plus"></i></span>
         <span class="eliminar-item" id= "#${p.qty}"> <i class="fa fa-trash" aria-hidden="true"></i> </span>
  </div>
  `;

    const sumarqty = document.querySelectorAll('.sumar');
    sumarqty.forEach((btn) => {btn.addEventListener('click',addQty)});

    const restarqty = document.querySelectorAll('.restar');
    restarqty.forEach((btn) => {btn.addEventListener('click', restQty)});

    const eliminar = document.querySelectorAll('.eliminar-item');
    eliminar.forEach((btn) => {btn.addEventListener('click', deleteProduct)});
  });
  counterCart.innerHtml = local.reduce((acc, product) => acc + product.qty,"");
    document.querySelector("#total").innerText = local.reduce((acc, product) => acc + product.qty * product.price, 0);
    
}


function summation(cart) {
  return cart.reduce((acc, product) => acc + product.price * product.qty,"");
}

productsDom();



///Barra de busqueda y agregar productos al carrito

document.querySelector('nav > div > form > button')
  .addEventListener('click', function (e) {
    e.preventDefault();
    let busqueda = document.querySelector('nav > div > form > input').value.toUpperCase();
    if (busqueda.length > 2 && busqueda.length < 11) {
      fetch('data.json')
        .then((response) => response.json())
        .then((data) => {
          let arrayFiltrado = data.filter((item) =>
            item.name.toUpperCase().includes(busqueda)
          );
          document.querySelector('#cards').innerHTML = arrayFiltrado.map((item) => {
              return `<div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card">
          <img src="${item.img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text font-weight-bold">$${item.price}</p>
            <button id="${item.id}" class="third add">Add<i class="fa fa-shopping-cart in-card" aria-hidden="true"></i> </button>
          </div>
        </div>
      </div>`;
          }).join('');

          document.querySelector('nav > div > form > input').value = '';

            const btns = document.querySelectorAll('.add');
            btns.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    let cartStorage = JSON.parse(localStorage.getItem('Carrito'));
                    if (cartStorage == null) {
                        cartStorage = [];
                  }
                    let id = e.target.id;
                    let product = data.find((item) => item.id == id);
                    let productInCart = cartStorage.find((item) => item.id == id);
                    if (productInCart) {
                        productInCart.qty++;
                    } else {
                      cartStorage.push({ ...product, qty: 1 });
                    }
                    localStorage.setItem('Carrito', JSON.stringify(cartStorage));
                    counterCart.innerHTML = cartStorage.reduce((acc, product) => acc + product.qty, 0);
                  updateCart(cartStorage);
                  location.href="index.html";
                }
                )
            });
        });
    } else {
        Toastify({
            text: "Please enter a valid search",
            duration: 1500,
            newWindow: true,
            close: false,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #df2020, #c70202",
            },
        }).showToast();
    }

  });
    


//Boton de vaciar carrito
let localCart = JSON.parse(localStorage.getItem('Carrito'));
if (localCart) {
 updateCart(localCart);
  counterCart.innerHTML = localCart.reduce( (acc, product) => acc + product.qty,0);
} else {
  localStorage.setItem('Carrito', '[]');
}


//Funcion para eliminar productos del carrito
const emptyCart = document.getElementById("clear")
emptyCart.addEventListener('click', () => {
  let cartStorage = JSON.parse(localStorage.getItem('Carrito') || '[]');
  if (cartStorage.length == 0) {
    Swal.fire({
      icon: 'error',
      text: "your cart is empty",
      icon: "error",
      confirmButtonText: "ok",
    })
  } else {
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
      localStorage.setItem('Carrito', '[]');
     updateCart([]);
      counterCart.innerHTML = "";
    Swal.fire(
      'Deleted!',
      'your cart has been deleted.',
      'success'
    )}})}});

/* Buy Button */
const buy = document.getElementById("buy")
buy.addEventListener('click', (e) => {
  e.preventDefault();
  let cartStorage = JSON.parse(localStorage.getItem('Carrito') || '[]');
  if (cartStorage.length == 0) {
    Swal.fire({
      icon: 'error',
      text: "your cart is empty",
      icon: "error",
      confirmButtonText: "ok",
    })
  } else {
    Swal.fire({
      title: 'Complete for your order',
      html: `<form id="form" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter your name">
        </div>
        <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="Enter email">
        </div>
        </form>`,
      showCancelButton: true,
      confirmButtonText: 'Send',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let order = { buyer: { name: name, email: email } ,date: new Date().toLocaleString() };
        Swal.fire({
          html: `<form id="form">
            <div class="col-12">
              <h2>Order Summary</h2>
              <p>${order.date}</p>
            </div>
          </div>  
            <div class="col-12">
              <h3>Buyer</h3>
              <p>Name: ${order.buyer.name}</p>
              <p>Email: ${order.buyer.email}</p>
            </div>
          </div>
            <div class="col-12">
              <h3>Products</h3>
              <ul>
                ${cartStorage.map((product) => {
                  return `<li> T-Shirt:  ${product.name} - Qty: ${product.qty}</li>`
                }).join('')}

              </ul>
            </div>
          </div>

            <div class="col-12">
              <h3>Total</h3>
              <p>$${cartStorage.reduce((acc, product) => acc + product.qty * product.price, 0)}</p>
            </div>
          </div>
        </div>`
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('Carrito', '[]');
            updateCart([]);
            counterCart.innerHTML = "";
            Swal.fire({
              icon: 'success',
              title: 'Your order was sent successfully, we will contact you soon',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }
        })
      }
    })
  }
})
