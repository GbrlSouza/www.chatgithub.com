new Vue({
    el: '#app',
    data: {
        messages: [],
        inputText: '',
        apiUrl: 'https://api-inference.huggingface.co/models/gpt2', // Substitua com o URL da API Hugging Face desejada
        apiKey: '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' // Substitua com sua chave da API Hugging Face
    },
    methods: {
        async sendMessage() {
            if (this.inputText.trim() === '') return;

            // Adiciona a mensagem do usuário
            this.messages.push({ text: this.inputText, user: true });
            const userMessage = this.inputText;
            this.inputText = '';

            // Envia a mensagem para a IA
            try {
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ inputs: userMessage })
                });

                const data = await response.json();
                const aiMessage = data[0]?.generated_text || 'Desculpe, não entendi a mensagem.';

                // Adiciona a resposta da IA
                this.messages.push({ text: aiMessage, user: false });
                this.$nextTick(() => {
                    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
                });
            } catch (error) {
                console.error('Erro ao comunicar com a API:', error);
            }
        }
    }
});
