import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerModelValidator from 'swagger-model-validator';

export const router = express.Router();

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST API - Math Expression',
      version: '1.0.0',
      description: 'REST API for Testing ME',
      contact: {
        email: 'hasanuddin.it-consultant@prudential.com',
      },
    },
    schemes: ['http'],
    host: 'localhost:3001',
    basePath: '/',
  },
  apis: ['./api/illustration.js'],
};

const swaggerSpec = swaggerJSDoc(options);
swaggerModelValidator(swaggerSpec);

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export function validateModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    console.error(responseValidation.errors);
    throw new Error(`Model doesn't match Swagger contract`);
  }
}