const amqp = require('amqplib');

async function sendMessage(msg) {
    const queue = 'task_queue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, {
        durable: true
    });

    channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
    });

    console.log(" [x] Sent %s", msg);
    
    setTimeout(() => {
        connection.close();
    }, 500);
}

sendMessage('Hello, World!'); // Exemplo de mensagem
