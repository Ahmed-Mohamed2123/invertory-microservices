import { RmqContext } from "@nestjs/microservices";

export function confirmMessageProcessing(context: RmqContext): void {
  const channel = context.getChannelRef();
  const originalMessage = context.getMessage();

  channel.ack(originalMessage);
}