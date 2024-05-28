//Usuario DB gabrielparisbaquero
//Clave DB hAdb8Hfv9K5ZIGW3



const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://gabrielparisbaquero:hAdb8Hfv9K5ZIGW3@acoupondb.lbsmw2g.mongodb.net/?retryWrites=true&w=majority&appName=aCouponDB";

// Conexión a MongoDB con tiempos de espera aumentados
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // 50 segundos
  socketTimeoutMS: 45000, // 45 segundos
  connectTimeoutMS: 30000, // 30 segundos
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

// Middleware para analizar el cuerpo de las solicitudes usando express.urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Definición del modelo Usuario con Mongoose
const UsuarioSchema = new mongoose.Schema({
  cedula: { type: String, required: true },
  celular: { type: String, required: true },
  direccion: { type: String, required: true },
  ciudad: { type: String, required: true },
  cartData: { type: String, required: true }, // Campo para los datos del carrito
  precioFinal: { type: Number, required: true } // Precio final incluyendo el envío
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Rutas para servir páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});

app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'formulario.html'));
});

app.get('/confirm', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'confirm.html'));
});

app.get('/clavel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos', 'clavel.html'));
});

// Ruta para manejar la solicitud del formulario y guardar datos en MongoDB
app.post('/guardar-palabra', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario({
      cedula: req.body.cedula,
      celular: req.body.celular,
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      cartData: req.body.cartData,
      precioFinal: req.body.precioFinal
    });

    // Guardar con tiempo máximo de espera
    const resultado = await nuevoUsuario.save({ maxTimeMS: 50000 });
    console.log(resultado);
    res.redirect('/confirm');
  } catch (error) {
    console.error('Error al guardar los datos en la base de datos:', error);
    res.status(500).send(`Error al guardar los datos en la base de datos: ${error.message}`);
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
