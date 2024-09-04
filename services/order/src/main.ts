import { NestFactory } from "@nestjs/core";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const RMQ_URL = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_URL],
      queue: process.env.RMQ_ORDER_QUEUE,
      queueOptions: {
        durable: true // Specifies whether the queue should be durable, meaning it will persist after server restarts.
      },
      noAck: false
    }
  } as RmqOptions);

  await app.listen();
}

bootstrap();
