export interface MicroservicesInterface {
  [key: string]: microserviceInterface;
}

export interface microserviceInterface {
  host: string;
  port: number;
}