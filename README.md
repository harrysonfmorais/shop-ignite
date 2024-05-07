# Desafio 04 - Ignite Shop

Nesse desafio, será implementado um carrinho de compras que utilizará os dados da API do Stripe para buscar os itens existentes, e controlará, através da sua aplicação, o número de itens que a pessoa deseja comprar.

- Utilizar a listagem já criada pela aplicação, mas adicionará a possibilidade de adicionar aquele item ao carrinho na página do produto.
- Salvar todos os itens selecionados em sua aplicação, e exibir o número de itens no carrinho
- Enviar o carrinho que você armazenou na aplicação para a rota de checkout, onde irá gerar a sessão de checkout com os ``line_items`` necessários.