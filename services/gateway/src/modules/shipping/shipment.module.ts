import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientName } from "../../enums/client-name.enum";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ShipmentService } from "./shipment.service";
import { ShipmentResolver } from "./shipment.resolver";
import { ObjectIdScalar } from "../../scallers/object-id.scalar";
import {getRabbitmqUrl} from "../../helpers/rabbitmq-url-getter.helper";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: ClientName.SHIPMENT,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const RMQ_PORT = configService.get<string>("RMQ_PORT");
          const RMQ_PASS = configService.get<string>("RMQ_PASS");
          const RMQ_USER = configService.get<string>("RMQ_USER");
          const RMQ_HOST = configService.get<string>("RMQ_HOST");
          const rmqUrl = getRabbitmqUrl(RMQ_HOST, RMQ_USER, RMQ_PASS, RMQ_PORT);

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rmqUrl],
              queue: configService.get<string>("RMQ_SHIPMENT_QUEUE")
            }
          }
        },
        inject: [ConfigService]
      }
    ])
  ],
  providers: [
    ObjectIdScalar,
    ShipmentService,
    ShipmentResolver
  ]
})
export class ShipmentModule {
}