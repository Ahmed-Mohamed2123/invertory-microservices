import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {RmqOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const RMQ_URL = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@localhost:${process.env.RMQ_PORT}`;
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [RMQ_URL],
            queue: process.env.RMQ_USER_QUEUE,
            queueOptions: {
                durable: true // Specifies whether the queue should be durable, meaning it will persist after server restarts.
            },
            noAck: false
        }
    } as RmqOptions);

    await app.listen();
}

bootstrap();
