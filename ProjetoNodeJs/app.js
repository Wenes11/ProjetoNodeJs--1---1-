const express = require('express');
const app = express();
const { engine } = require('express-handlebars'); // Nova forma de importar
const path = require('path');
const db = require('./db/conection');
const bodyParser = require('body-parser');
const PORT = 3000;
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op        = Sequelize.Op;

// Usando o body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configurando Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ defaultLayout: 'main' })); // Configuração atualizada
app.set('view engine', 'handlebars');


// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Fazendo conexão com o banco de dados
db.authenticate()
  .then(() => {
    console.log('Chamando Banco de Dados');
  })
  .catch((err) => {
    console.log('Erro ao conectar', err);
  });

// Rota inicial
 app.get('/', (req, res) => {
  //res.send('Começo de um projeto');
  let search = req.query.job;
  let query = '%'+search+'%';

  if(!search){
    Job.findAll({order:[
      ['createdAt','DESC']
    ]})
    .then(jobs=>{
      res.render('index',{jobs});
    })
    .catch(err=>console.log(err));
     }else{
    Job.findAll({
      where:{title:{[Op.like]:query}},
      order:[
      ['createdAt','DESC']
    ]})
    .then(jobs=>{
      res.render('index',{jobs,search});
    }).catch(err=>console.log(err));
  }


}); 

// Adicionando as rotas
app.use('/jobs', require('./routes/jobs'));

app.listen(PORT, function () {
  console.log(`O express está na porta ${PORT}`);
});
