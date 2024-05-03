import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { InventoryModule } from "./modules/inventory/inventory.module";
import { ServiceKeyGuard } from "./guards/service-key.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV || "local"}.env`
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const host = config.get("MONGO_DB_HOST");
        const dbName = config.get("MONGO_DB_NAME");
        const port = +config.get("MONGO_DB_PORT");

        return {
          uri: `mongodb://${host}:${port}`,
          dbName: dbName
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
    InventoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ServiceKeyGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor
    }
  ],
})
export class AppModule {}
