const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      description: "API endpoints for a blog services documented on swagger",
      contact: {
        name: "Mohit kadwe",
        email: "mohitdkadwe19@gmail.com",
        url: "https://github.com/DesmondSanctity/node-js-swagger"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3001/",
        description: "Local server"
      },
      // {
      //   url: "<your live url here>",
      //   description: "Live server"
      // },
    ]
  },
  apis: ['./src/routes/*.js'],
}

function swaggerDocs(app, port) {
  options.definition.servers[0].url = `http://localhost:${port}/`;
  const swaggerSpec = swaggerJsdoc(options);
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
module.exports = swaggerDocs