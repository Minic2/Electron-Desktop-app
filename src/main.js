const { BrowserWindow,Notification, ipcMain} = require("electron");
const { getConnection } = require("./database");
const {app}  = require('electron')
const path = require('path')
const ipc = ipcMain

app.on('ready',function() {
  windowClient = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hidden',
    
    show:false,
    // icon: path.join(__dirname, './ui/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  });
  windowClient.loadFile('src/ui/clientes.html');
  windowClient.removeMenu()
  windowProduct = new BrowserWindow({
    width: 1200,
    height: 600,
    titleBarStyle: 'hidden',
    
    show:false,
    // icon: path.join(__dirname, './ui/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  });
  windowProduct.loadFile('src/ui/producto.html');
  windowProduct.removeMenu()
  windowProduct.on('close', function (event) {
    windowProduct.hide();
    event.preventDefault();
  })
  windowClient.on('close', function (event) {
    windowClient.hide();
    event.preventDefault();
  })

  ipc.on('showProduct',function() {
    windowProduct.show()
    
    })
   
  });
  ipc.on('showClient',function() {
    
    windowClient.show()
  })

 

app.setAppUserModelId(process.execPath)
async function getProducts(){
    const conn = await getConnection();
    const results= await conn.query('SELECT * FROM product ORDER BY id DESC')
    // console.log(results);
    return results


}
async function createProduct(product) {
  try {
    const conn = await getConnection();
    product.price = parseFloat(product.price);
    const result = await conn.query("INSERT INTO product set ?", product);
    console.log(result);
    new Notification({
        title:'ElectrotecPlus - Punto de Venta',
        body:'Los datos se han guardado correctamente',
        icon: path.join(__dirname, './ui/icon.ico'),
        silent: true
    }).show();
    product.id = result.insertId
    return product
  } catch (error) {
    console.log(error);
    new Notification({
        title:'ElectrotecPlus - Punto de Venta',
        body:'Error no se ha podido guardar',
        icon: path.join(__dirname, './ui/icon.ico'),
        silent: true
    }).show();
  }
}
async function deleteProduct(id) {
    const conn = await getConnection();
    const result = await conn.query("DELETE FROM product WHERE id = ?",id);
    new Notification({
        title:'ElectrotecPlus - Punto de Venta',
        body:'Los datos se han borrado correctamente',
        icon: path.join(__dirname, './ui/icon.ico')
    }).show();
    return result
    
}
async function getProductById(id){
    const conn = await getConnection();
    const result = await conn.query("SELECT * FROM product WHERE id = ?",id);
    console.log(result[0])
    return result[0];
    



}
async function updateProduct(id,product) {
    const conn = await getConnection();
    const result = await conn.query("UPDATE product SET ? WHERE id = ?",[product,id]);
    console.log(result[0])
    return result[0];
}
/////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////
//////////       Clientes CRUD      /////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////

async function getClients(){
  const conn = await getConnection();
  const results= await conn.query('SELECT * FROM client ORDER BY id DESC')
  // console.log(results);
  return results


}
async function createClient(client) {
try {
  const conn = await getConnection();
  // product.price = parseFloat(product.price);
  const result = await conn.query("INSERT INTO client set ?", client);
  console.log(result);
  new Notification({
      title:'ElectrotecPlus - Punto de Venta',
      body:'Los datos se han guardado correctamente',
      icon: path.join(__dirname, './ui/icon.ico'),
      silent: true
  }).show();
  product.id = result.insertId
  return product
} catch (error) {
  console.log(error);
  new Notification({
      title:'ElectrotecPlus - Punto de Venta',
      body:'Error no se ha podido guardar',
      icon: path.join(__dirname, './ui/icon.ico'),
      silent: true
  }).show();
}
}
async function deleteProduct(id) {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM product WHERE id = ?",id);
  new Notification({
      title:'ElectrotecPlus - Punto de Venta',
      body:'Los datos se han borrado correctamente',
      icon: path.join(__dirname, './ui/icon.ico')
  }).show();
  return result
  
}
async function getProductById(id){
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM product WHERE id = ?",id);
  console.log(result[0])
  return result[0];
  



}
async function updateProduct(id,product) {
  const conn = await getConnection();
  const result = await conn.query("UPDATE product SET ? WHERE id = ?",[product,id]);
  console.log(result[0])
  return result[0];
}
























let window;
let windowClient

function createWindow() {
   window = new BrowserWindow({
      width: 1300,
      height: 600,
    
      titleBarStyle: 'hidden',
      // icon: path.join(__dirname, './ui/icon.ico'),
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
        

      },
    });
    window.loadFile('src/ui/home.html');
    window.removeMenu()
  
  
  }

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct
  
};
