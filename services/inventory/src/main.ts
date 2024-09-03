import { NestFactory } from "@nestjs/core";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const RMQ_URL = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@localhost:${process.env.RMQ_PORT}`;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_URL],
      queue: process.env.RMQ_INVENTORY_QUEUE,
      queueOptions: {
        durable: true // Specifies whether the queue should be durable, meaning it will persist after server restarts.
      },
      noAck: false
      // prefetchCount: 1 // This allows the application to receive messages smoothly and improve performance, before it confirms the first message.
    }
  } as RmqOptions);

  await app.listen();
}

bootstrap();
