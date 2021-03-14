const { remote, ipcRenderer } = require("electron");
const main = remote.require("./main");
const ipc = ipcRenderer;
const productForm = document.getElementById("productForm");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productCod = document.getElementById("codProducto");
const productDescription = document.getElementById("description");
const productFileSrc = document.getElementById("fileSrc");
const productsList = document.getElementById("products");
let btnHome = document.getElementById("btnhome");
let d = "";
let imagenProduct = "";
let products = [];
let editingStatus = false;
let editProductId = "";

const getProducts = async () => {
  products = await main.getProducts();
  renderProducts(products);
};

function gotoClient() {
  ipc.send("showClient");
}
function gotoProduct() {
  ipc.send("showProduct");
}
function closewin() {
  ipc.send("closedWindows");
}
//  function gotoPedido(){
//     const window = main.createWindow()
//     window[0].close()
//     window[3].show()
//  }

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log(productName.value);
  // console.log(productPrice.value);
  // console.log(productDescription.value);

  productFile = productFileSrc.value.substring(12, productFileSrc.value.length);
  if (productFile == "") {
    productFile = imagenProduct;
  }

  const newProduct = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
    codProducto: productCod.value,
    filesrc: productFile,
  };
  if (!editingStatus) {
    // alert('no se como llegue aqui')
    const resul = await main.createProduct(newProduct);
  } else {
    await main.updateProduct(editProductId, newProduct);
    editingStatus = false;
    editProductId = "";
  }

  // console.log(resul);
  productForm.reset();
  productName.focus();
  getProducts();
});
async function editProduct(id) {
  try {
    const product = await main.getProductById(id);
    editingStatus = true;
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;
    productCod.value = product.codProducto;
    editProductId = product.id;
    imagenProduct = product.filesrc;
  } catch (e) {
    alert(e);
  }
}

async function deleteProduct(id) {
  const response = confirm("Estas seguro de eliminar el siguiente producto");
  if (response) {
    await main.deleteProduct(id);
    getProducts();
  }

  return;
}

function renderProducts(products) {
  productsList.innerHTML = "";
  products.forEach((product) => {
    productsList.innerHTML += `
        <div class="card card-body my-4 animate__backInRight">
            <h4><strong>${product.name}</strong></h4>
            <h5>${"Código:" + " #" + product.codProducto}</h5>
           <p><img class="d-block user-select-none" width="50%" height="200" aria-label="Marcador de posición: Tapa de imagen" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle" _mstaria-label="941941" src="../img/Productos/${
             product.filesrc
           }"></p>
            <p>${product.description}<p>
          
            <h3><p class="text-success"><strong>${
              "GS " + product.price.toLocaleString("es-ES")
            }</strong><p></h3>
       
            <p>
                <button class="btn btn-danger" onclick="deleteProduct('${
                  product.id
                }')">
                BORRAR
                </button>
                <button class="btn btn-secondary"  onclick="editProduct('${
                  product.id
                }')">
                EDITAR
                </button>
            </p>
        </div>
        
        `;
  });
}
async function init() {
  await getProducts();
}

init();
////
/*



//////////////////////////////////////////////////////////////////////////////////////////

  Clientes

/////////////////////////////////////////////////////////////////////////////////////////




*/
///
const clientForm = document.getElementById("clientForm");
const clientName = document.getElementById("nameClient");
const clientContact = document.getElementById("contactClient");
const clientAdress = document.getElementById("adressClient");
const clientDescription = document.getElementById("descriptionClient");
const clientFileSrc = document.getElementById("clientFileSrc");
const clientsList = document.getElementById("clients");
let imagenClient = "";
let clients = [];
let editingStatusClient = false;
let editClientId = "";
const getClients = async () => {
  clients = await main.getClients();
  renderClients(clients);
};

clientForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log(productName.value);
  // console.log(productPrice.value);
  // console.log(productDescription.value);

  clientFile = clientFileSrc.value.substring(12, clientFileSrc.value.length);
  if (clientFile == "") {
    clientFile = imagenClient;
  }

  const newClient = {
    nameClient: clientName.value,
    numberClient: clientContact.value,
    adressClient: clientAdress.value,
    descriptionClient: clientDescription.value,

    filesrc: ClientFile,
  };
  if (!editingStatus) {
    // alert('no se como llegue aqui')
    const resul = await main.createClient(newClient);
  } else {
    await main.updateClient(editClientId, newClient);
    editingStatusClient = false;
    editClientId = "";
  }

  // console.log(resul);
  clientForm.reset();
  clientName.focus();
  getClients();
});
async function editClient(id) {
  try {
    const client = await main.getClientById(id);
    editingStatusClient = true;

    
    clientName.value = client.nameClient;
    clientContact.value = client.numberClient;
    clientAdress.value = client.adressClient;
    clientDescription.value = client.descriptionClient;

    editClientId = client.id;
    imagenClient = client.clientfilesrc;
  } catch (e) {
    alert(e);
  }
}

async function deleteClient(id) {
  const response = confirm("Estas seguro de eliminar el siguiente producto");
  if (response) {
    await main.deleteClient(id);
    getClients();
  }

  return;
}

function renderClients(clients) {
  clientsList.innerHTML = "";
  clients.forEach((client) => {
    clientsList.innerHTML += `
        <div class="card card-body my-4 animate__backInRight">
            <h4><strong>${client.nameClient}</strong></h4>
            <h5>${"Contacto:" + " #" + client.numberClient}</h5>
           <p><img class="d-block user-select-none" width="50%" height="200" aria-label="Marcador de posición: Tapa de imagen" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle" _mstaria-label="941941" src="../img/Productos/${
             product.filesrc
           }"></p>
            <p>${client.descriptionClient}<p>
          
            
            <p>
                <button class="btn btn-danger" onclick="deleteProduct('${
                  client.id
                }')">
                BORRAR
                </button>
                <button class="btn btn-secondary"  onclick="editProduct('${
                  client.id
                }')">
                EDITAR
                </button>
            </p>
        </div>
        
        `;
  });
}
