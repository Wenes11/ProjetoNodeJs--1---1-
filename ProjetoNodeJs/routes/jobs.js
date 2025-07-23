// Criando as rotas
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


// Rota de teste
router.get('/test', (req, res) => {
  res.send('Deu certo');
});
//detalhe da vaga
router.get('/view/:id',(req,res)=>Job.findOne({
  where:{id: req.params.id}
}).then(job=>{
  res.render('view',{job});
}).catch(err=>console.log(err)));

router.get('/add',(req,res)=>{
  res.render('add');
});

// Rota para adicionar um novo emprego
router.post('/add', (req, res) => {
  let { title, salario, empresa, email, novo_emprego, descricao } = req.body;

  // Inserindo dados no banco
  Job.create({  // Correção do método "create"
    title,
    salario,
    empresa,
    email,
    novo_emprego,
    descricao
    
  })
  .then(() => res.redirect('/'))  // Redirecionando após sucesso
  .catch(err => console.log(err));  // Logando erros
});

module.exports = router;
