export function getRabbitmqUrl(username: string, password: string, port: string) {
    return `amqp://${username}:${password}@localhost:${port}`;
}