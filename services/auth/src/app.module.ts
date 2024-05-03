import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "./modules/auth/auth.module";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
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
    AuthModule
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
  ]
})
export class AppModule {
}
