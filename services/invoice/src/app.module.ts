import { Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { InvoiceModule } from "./modules/invoice/invoice.module";
import { APICheckGuard } from "./guards/api-check.guard";

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
    InvoiceModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: APICheckGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor
    }
  ]
})
export class AppModule {
}
