# Ulbra - Curso Node

### Tecnologias utilizadas:

- [https://nodejs.org/](https://nodejs.org/)
- [http://expressjs.com/](http://expressjs.com/)
- [http://mongoosejs.com/](http://mongoosejs.com/)
- [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)
- [https://www.mongodb.com/](https://www.mongodb.com/)


### A final, o que é Node JS?

Node.js é uma plataforma construída sobre o motor JavaScript do Google Chrome para facilmente construir aplicações de rede rápidas e escaláveis. Node.js usa um modelo de I/O direcionada a evento não bloqueante que o torna leve e eficiente, ideal para aplicações em tempo real com troca intensa de dados através de dispositivos distribuídos. ([http://nodebr.com/o-que-e-node-js/](http://nodebr.com/o-que-e-node-js/))


### NOSQL

NoSQL é um termo usado para descrever bancos de dados não relacionais de alto desempenho. Os bancos de dados NoSQL usam diversos modelos de dados, incluindo documentos, gráficos, chave-valor e colunares. Bancos de dados NoSQL são amplamente reconhecidos pela facilidade de desenvolvimento, desempenho escalável, alta disponibilidade e resiliência. ([https://aws.amazon.com/pt/nosql/](https://aws.amazon.com/pt/nosql/))


### E MongoDB?

MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need. ([https://www.mongodb.com/what-is-mongodb](https://www.mongodb.com/what-is-mongodb))
(Não encontrei nenhuma boa fonte em português)


### API

An application programming interface (API) is a particular set of rules ('code') and specifications that software programs can follow to communicate with each other. It serves as an interface between different software programs and facilitates their interaction, similar to the way the user interface facilitates interaction between humans and computers. ([https://stackoverflow.com/questions/7440379/what-exactly-is-the-meaning-of-an-api](https://stackoverflow.com/questions/7440379/what-exactly-is-the-meaning-of-an-api))
(Não encontrei nenhuma boa fonte em português)

> Diferença de api, biblioteca e framework: [https://pt.stackoverflow.com/questions/17501/qual-%C3%A9-a-diferen%C3%A7a-de-api-biblioteca-e-framework](https://pt.stackoverflow.com/questions/17501/qual-%C3%A9-a-diferen%C3%A7a-de-api-biblioteca-e-framework)


### REST

REST é um conjunto de princípios que definem como Web Standards como HTTP e URIs devem ser usados (o que freqüentemente difere um pouco do que muitas pessoas atualmente fazem). A promessa é que se você aderir a princípios REST enquanto estiver desenhando sua aplicação, você terá um sistema que explora a arquitetura da Web em seu benefício. Em resumo, os cinco princípios fundamentais são os seguintes:

- Dê a todas as coisas um Identificador
- Vincule as coisas
- Utilize métodos padronizados
- Recursos com múltiplas representações
- Comunique sem estado
([https://www.infoq.com/br/articles/rest-introduction](https://www.infoq.com/br/articles/rest-introduction))

> Ótima explicação sobre o assunto: [https://pt.stackoverflow.com/questions/45783/o-que-%C3%A9-rest-e-restful](https://pt.stackoverflow.com/questions/45783/o-que-%C3%A9-rest-e-restful)


![Talk is cheap, show me the code](img/tic.jpg)


### Hello World!

Comece criando uma pasta para o seu projeto e dentro dela crie
o arquivo index.js com o seguinte conteúdo:

```js
  console.log('Hello World!');
```

Executando no terminal ```node index.js``` temos como saída ``` Hello World```.


### Web

Agora vamos criar nossa primeira aplicação web usando node. Utilizaremos o mesmo arquivo index.js. É tão difícil como o Hello World:

```js
var http = require('http');

http.createServer((req, res) => {
    res.end('Hello World!');
}).listen(8000);
```

Agora, acessando o endereço [http://localhost:8000](http://localhost:8000) no navegador, temos o seguinte resultado:

![Navegador](img/print_web_hello_world.png)


### Criando nossa API com Express JS

Vamos começar criando nosso projeto usando o npm e, logo em seguida, instalamos os pacotes que serão utilizados durante o projeto:

```sh
# Criando projeto:
# digite esse comando dentro
# da pasta criada para o projeto,
# a mesma que tem o seu index.js
npm init
# Digite as informações sobre seu projeto solicitadas no terminal

# instalando pacotes
npm install express body-parser mongoose --save
```

Agora vamos criar nossa API usando o express. Todo o código a seguir será escrito no nosso arquivo index.js.

Começamos importando o pacote express  e subindo nossa API:

```js
const express = require('express')
const app = express()

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
```

Salve o arquivo e execute node index.js no terminal. Deve ser printado ``` listening on 8000 ```.

Agora vamos adicionar nossas rotas na nossa API. A ideia é que nossa API seja capaz de fazer a manutenção completa de produtos, que são compostos por nome e valor. De começo, vamos apenas retornar um json mockado nas rotas para fazermos um teste. Para isso vamos adicionar o seguinte código após a atribuição da variável ``` port ```:

```js
app.get('/product', (req, res) => {
  res.json({ method: 'get' });
})

app.post('/product', (req, res) => {
  res.json({ method: 'post' });
})

app.get('/product/:id', (req, res) => {
  res.json({ method: 'get' });
})

app.put('/product/:id', (req, res) => {
  res.json({ method: 'put' });
})

app.delete('/product/:id', (req, res) => {
  res.json({ method: 'delete' });
})
```

Execute ``` node index.js ``` no terminal novamente.

Para testar nossas requisições daqui para frente, usaremos o [https://www.getpostman.com/](https://www.getpostman.com/), segue exemplo do post:

![postman](img/print_postman_post_test.png)


### Integrando nosso MongoDB

Vamos começar importando o mongoose, que facilitará nossa integração:

```js
const mongoose = require('mongoose');
```

Agora vamos conectar com nosso banco adicionando o seguinte código logo após a atribuição da variável ``` port ```:

```js
mongoose.connect('mongodb://ulbra_curso_node:ulbra_curso_node@ds157571.mlab.com:57571/ulbra_curso_node');
```

> Nesse exemplo, estamos usando um mongo no mongolab. Todos usaremos o mesmo banco. Caso queira subir um banco próprio, fique a vontade.

Execute ``` node index.js ``` no terminal novamente e, caso não tenhamos nenhum erro no terminal, a conexão foi bem sucedida.

### Criando nosso Schema

Agora vamos criar o schema para representar nosso documento produto no banco de dados. Para isso criamos o arquivo product.js e incluímos o seguinte código:

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    value: Number,
    name: String
});

module.exports = mongoose.model('Product', ProductSchema);
```

No arquivo index.js vamos importar nosso schema:

```js
const Product = require('./product');
```

Execute ``` node index.js ``` no terminal novamente e verifique se ocorre algum problema.


### Obtendo no nossos produtos do mongo

Para obtermos nossos produtos, vamos alterar o código do nosso ``` GET /product ``` no index.js para o seguinte código:

```js
app.get('/product', (req, res) => {
  Product.find((error, products) => {
    if (error) res.status(500).json({ error: error });
    else res.json(products);
  });
})
```

Requisite [http://localhost:8000/product](http://localhost:8000/product) e veja os produtos cadastrados


### Criando produtos

Para criarmos nossos produtos, vamos alterar o código do nosso ``` POST /product ``` no index.js para o seguinte código:

```js
app.post('/product', (req, res) => {
  let product = new Product();

  product.name = req.body.name;
  product.value = req.body.value;

  product.save(error => {
    if (error) res.status(500).json({ error: error });
    else res.json();
  });
})
```

Tentamos dar um post para salvar um produto e o que acontece? ERRO:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Error</title>
    </head>
    <body>
        <pre>TypeError: Cannot read property &#39;name&#39; of undefined
            <br> &nbsp; &nbsp;at app.post ([...]/index.js:21:26)
            <br> &nbsp; &nbsp;at Layer.handle [as handle_request] ([...]/node_modules/express/lib/router/layer.js:95:5)
            <br> &nbsp; &nbsp;at next ([...]/node_modules/express/lib/router/route.js:137:13)
            <br> &nbsp; &nbsp;at Route.dispatch ([...]/node_modules/express/lib/router/route.js:112:3)
            <br> &nbsp; &nbsp;at Layer.handle [as handle_request] ([...]/node_modules/express/lib/router/layer.js:95:5)
            <br> &nbsp; &nbsp;at [...]/node_modules/express/lib/router/index.js:281:22
            <br> &nbsp; &nbsp;at Function.process_params ([...]/node_modules/express/lib/router/index.js:335:12)
            <br> &nbsp; &nbsp;at next ([...]/node_modules/express/lib/router/index.js:275:10)
            <br> &nbsp; &nbsp;at expressInit ([...]/node_modules/express/lib/middleware/init.js:40:5)
            <br> &nbsp; &nbsp;at Layer.handle [as handle_request] ([...]/node_modules/express/lib/router/layer.js:95:5)
            <br> &nbsp; &nbsp;at trim_prefix ([...]/node_modules/express/lib/router/index.js:317:13)
            <br> &nbsp; &nbsp;at [...]/node_modules/express/lib/router/index.js:284:7
            <br> &nbsp; &nbsp;at Function.process_params ([...]/node_modules/express/lib/router/index.js:335:12)
            <br> &nbsp; &nbsp;at next ([...]/node_modules/express/lib/router/index.js:275:10)
            <br> &nbsp; &nbsp;at query ([...]/node_modules/express/lib/middleware/query.js:44:5)
            <br> &nbsp; &nbsp;at Layer.handle [as handle_request] ([...]/node_modules/express/lib/router/layer.js:95:5)
        </pre>
    </body>
</html>
```

Esse problema acontece por que nossa API não está preparada para interpretar o corpo no protocolo http e disponibilizar isso no formato json para nossa app. Para resolver esse problema precisamos do nosso primeiro middleware. Adicione o seguinte required:

```js
const bodyParser= require('body-parser')
```

Agora vamos usar o middleware para fazer o parser do json e entregar para nossa app. Adicione a seguinte linha de código após a conexão com o mongo:

```js
app.use(bodyParser.json());
```

Agora experimente salvar novos produtos e depois obtenha os mesmos com ``` GET /product ``` para testar.


### Middlewares

Funções de Middleware são funções que tem acesso ao objeto de solicitação (req), o objeto de resposta (res), e a próxima função de middleware no ciclo solicitação-resposta do aplicativo. A próxima função middleware é comumente denotada por uma variável chamada next.

Funções de middleware podem executar as seguintes tarefas:

- Executar qualquer código.
- Fazer mudanças nos objetos de solicitação e resposta.
- Encerrar o ciclo de solicitação-resposta.
- Chamar a próxima função de middleware na pilha.
- Se a atual função de middleware não terminar o ciclo de solicitação-resposta, ela precisa chamar next() para passar o controle para a próxima função de middleware. Caso contrário, a solicitação ficará suspensa. ([http://expressjs.com/pt-br/guide/using-middleware.html](http://expressjs.com/pt-br/guide/using-middleware.html))


### Alterando produtos

Para alterarmos nossos produtos, vamos alterar o código do nosso ``` PUT /product/:id ``` no index.js para o seguinte código:

```js
app.put('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) res.status(500).json({ error: error });
    else if (!product) res.status(404).json({ error: 'Product not found' })
    else {
      product.name = req.body.name;
      product.value = req.body.value;

      product.save(error => {
        if (error) res.json({ error: error });
        else res.json();
      });
    }
  })
})
```

Experimente alterar produtos passando seu id na url e depois obtenha os mesmos com ``` GET /product ``` para testar.


### Deletando produtos

Para deletarmos nossos produtos, vamos alterar o código do nosso ``` DELETE /product/:id ``` no index.js para o seguinte código:

```js
app.delete('/product/:id', (req, res) => {
  Product.remove({ _id: req.params.id }, error => {
    if (error) res.json({ error: error });
    else res.json();
  });
})
```

Experimente deletar produtos passando seu id na url e depois obtenha os mesmos com ``` GET /product ``` para testar.


### Obter produto pelo id

Para obtermos um produto pelo is, vamos alterar o código do nosso ``` GET /product/:id ``` no index.js para o seguinte código:

```js
app.get('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) res.status(500).json({ error: error });
    else res.json(product);
  });
})
```

Experimente obter um produto passando seu id na url para testar.


### Criando nossos proprios Middlewares

Com express essa tarefa é muito simples. Basta criar uma função que receba o request, o response e a próxima função da cadeia de execuções. Vamos adicionar o seguinte código após o ``` app.use(bodyParser.json()); ```:

```js
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  console.log('Middleware working!');
  console.log('Request URL:', req.originalUrl);
  console.log('Request Type:', req.method);
  next();
});
```

Agora se você rodar seu app e executar qualquer request nele, verá em seu terminal o seguinte log:

```
Middleware working!
Request URL: /product
Request Type: GET
```

### Código final:

index.js:

```js
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

const Product = require('./product');

const port = process.env.PORT || 8000;

mongoose.connect('mongodb://ulbra_curso_node:ulbra_curso_node@ds157571.mlab.com:57571/ulbra_curso_node');

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Middleware working!');
  console.log('Request URL:', req.originalUrl);
  console.log('Request Type:', req.method);
  next();
});

app.get('/product', (req, res) => {
  Product.find((error, products) => {
    if (error) res.status(500).json({ error: error });
    else res.json(products);
  });
})

app.post('/product', (req, res) => {
  let product = new Product();

  product.name = req.body.name;
  product.value = req.body.value;

  product.save(error => {
    if (error) res.status(500).json({ error: error });
    else res.json();
  });
})

app.get('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) res.status(500).json({ error: error });
    else res.json(product);
  });
})

app.put('/product/:id', (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    if (error) res.status(500).json({ error: error });
    else if (!product) res.status(404).json({ error: 'Product not found' })
    else {
      product.name = req.body.name;
      product.value = req.body.value;

      product.save(error => {
        if (error) res.json({ error: error });
        else res.json();
      });
    }
  })
})

app.delete('/product/:id', (req, res) => {
  Product.remove({ _id: req.params.id }, error => {
    if (error) res.json({ error: error });
    else res.json();
  });
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
```

product.js:

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    value: Number,
    name: String
});

module.exports = mongoose.model('Product', ProductSchema);
```

![thats all](img/thats-all-folks.jpg)
