
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Carrito de Compras',
    description: 'API para gestionar un carrito de compras con PostgreSQL y PayPal',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Product: {
      id: 1,
      name: 'Producto Ejemplo',
      price: 100,
      description: 'Descripción del producto',
    },
    User: {
      id: 1,
      username: 'usuario',
      password: 'contraseña',
    },
    Cart: {
      id: 1,
      products: [{ productId: 1, quantity: 2 }],
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
