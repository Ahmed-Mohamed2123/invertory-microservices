import { NestFactory } from "@nestjs/core";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
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
