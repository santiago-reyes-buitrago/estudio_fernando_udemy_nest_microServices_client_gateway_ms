import { MicroservicesInterface } from './microservices.interface';

export interface EnvFileInterface {
  port: number;
  microservices: MicroservicesInterface;
}