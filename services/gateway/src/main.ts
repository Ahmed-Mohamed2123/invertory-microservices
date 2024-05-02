import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as fastifyRateLimit from "@fastify/rate-limit";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import helmet from "helmet";
import * as xXssProtection from "x-xss-protection";
import * as hpp from "hpp";

import { AppModule } from "./app.module";

declare const module: any;

async function bootstrap() {
  const fastify = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify
  );
  fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
    whitelist: ["localhost"]
  });
  app.enableCors();
  app.use(helmet());
  app.use(xXssProtection());
  app.use(hpp());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
