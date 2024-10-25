const amqp = require('amqplib');

async function consumeMessages() {
    const queue = 'task_queue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.prefetch(1); // Processa uma mensagem por vez

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    
    channel.consume(queue, (msg) => {
        const content = msg.content.toString();
        console.log(" [x] Received %s", content);

        setTimeout(() => {
            console.log(" [x] Done");
            channel.ack(msg); // Confirma o processamento
        }, 1000);
    });
}

consumeMessages();

