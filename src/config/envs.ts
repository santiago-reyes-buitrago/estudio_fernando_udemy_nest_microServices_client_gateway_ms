import 'dotenv/config';
import * as Joi from 'joi';
import { EnvFileInterface, EnvVars } from './interfaces';



const schema = Joi.object({
  PORT: Joi.number().required().default(3001),
  MICROSERVICES_PRODUCT_HOST: Joi.string().required(),
  MICROSERVICES_PRODUCT_PORT: Joi.number().required(),
}).unknown(true);

const { error, value } = schema.validate(process.env);

if (error) throw new Error(`Config Validation ${error.message}`);

const envVars: EnvVars = value;

export const envs: EnvFileInterface = {
  port: envVars.PORT,
  microservices : {
    product: {
      host: envVars.MICROSERVICES_PRODUCT_HOST,
      port: envVars.MICROSERVICES_PRODUCT_PORT,
    }
  }
};
