export function getRabbitmqUrl(host: string, username: string, password: string, port: string) {
    return `amqp://${username}:${password}@${host}:${port}`;
}