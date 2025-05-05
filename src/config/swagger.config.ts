import swaggerJsdoc from 'swagger-jsdoc';
import {SwaggerOptions} from "swagger-ui-express";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Game Management API',
      version: '1.0.0',
      description: '게임 메타데이터 관리 API 문서',
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Management",
        url: "https://github.com/LudexCS/BE_Management.git",
      }
    },
    servers: [
      {
        url: 'http://3.37.46.45:30353',
        description: '게임 관리 API 서버'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT 액세스 토큰을 입력하세요'
        }
      }
    }
  },
  apis: ['./src/route/*.ts']
};

export const specs = swaggerJsdoc(options);

export const swaggerUiOptions: SwaggerOptions = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "게임 관리 API 문서",
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        defaultModelsExpandDepth: 1,
    }
};