// Função para converter a moeda
function convertCurrency() {
    // Seleciona os elementos HTML
    const baseCurrency = document.getElementById('baseCurrency').value;
    const amount = document.getElementById('amount').value;
    const resultDiv = document.getElementById('result');

    // Verifica se o valor inserido é válido
    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = 'Por favor, insira um valor válido.';
        resultDiv.dataset.content = '';
        return;
    }

    // Faz a requisição à API para obter as taxas de câmbio
    const apiKey = '155996c306c3c14ea7b4b4e5';
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extrai as taxas de câmbio
            const rates = data.rates;
            const convertedAmount = amount * rates['BRL']; // Moeda de conversão (no caso, BRL)

            // Exibe o resultado da conversão
            resultDiv.innerHTML = `${amount} ${baseCurrency} = ${convertedAmount.toFixed(2)} BRL`; // Moeda de conversão (no caso, BRL)
            resultDiv.dataset.content = '';
        })
        .catch(error => {
            console.log('Erro ao converter moeda:', error);
            resultDiv.innerHTML = 'Ocorreu um erro ao converter a moeda. Por favor, tente novamente mais tarde.';
        });
}

// Event listener para o botão de conversão
document.getElementById('convertBtn').addEventListener('click', convertCurrency);

// Inicia o pulsar do texto AGUARDANDO DADOS ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result');
    resultDiv.dataset.content = 'AGUARDANDO DADOS'; // Define o conteúdo do elemento pseudo ::before
});

// Função para limpar os dados
function limparDados() {
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');

    // Limpa o valor do campo de entrada
    amountInput.value = '';

    // Define o conteúdo da div de resultado como "AGUARDANDO DADOS"
    resultDiv.textContent = '';
    resultDiv.dataset.content = 'AGUARDANDO DADOS';
}

// Adiciona o evento de clique ao botão "Limpar Dados"
document.getElementById('limparDados').addEventListener('click', limparDados);

