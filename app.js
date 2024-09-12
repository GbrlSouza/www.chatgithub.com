new Vue({
    el: '#app',
    data: {
        newMessage: '',
        messages: [
            { id: 1, text: 'Olá! Como você está?', sentByUser: false },
            { id: 2, text: 'Tudo ótimo, e você?', sentByUser: true }
        ]
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({ id: Date.now(), text: this.newMessage, sentByUser: true });
                this.newMessage = '';

                // Simulação de resposta automática
                setTimeout(() => {
                    this.messages.push({ id: Date.now(), text: 'Resposta automática!', sentByUser: false });
                }, 1000);
            }
        }
    }
});
