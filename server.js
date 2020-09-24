const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database.db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Insira aqui o código da tarefa proposta!
//Apesar de não ser a melhor forma de manter um projeto, utilize apenas esse arquivo. Estamos testando!

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.get ('/tarefas', (req, resp) => {
    db.all('SELECT * FROM TAREFAS', (err,rows) => {
        resp.send (JSON.stringify({results: rows}));
       })
});

app.get ('/tarefas/:id', (req, resp) => {

    db.get('SELECT * FROM TAREFAS where id=?', [req.params.id], (err,rows) => {
        resp.send (JSON.stringify({results: rows}));
       })
});

app.post('/tarefas', (req, resp) => {

    db.run(`INSERT INTO TAREFAS (titulo, descricao, status) VALUES (?, ?, ?)`, [req.body.titulo,
                                                                                req.body.desc,
                                                                                req.body.status]);
    resp.status(200).send('Item inserido com sucesso!');
});

 app.post('/tarefas', (req, resp) => {

    db.run(`INSERT INTO TAREFAS (titulo, descricao, status) VALUES (?, ?, ?)`, [req.body.titulo,
                                                                                req.body.desc,
                                                                                req.body.status],(err) =>{
                                                                                    resp.send("Erro");
                                                                                });
    resp.json({"Response":"Ok" });

 });




app.delete('/tarefas/:id', (req, resp) => {

    db.run(`DELETE FROM TAREFAS WHERE id=?`, [req.params.id], (err) => {
        if(err) console.log("Deu ruim");

        resp.send ('Deletado com sucesso!')
    })
    
});

app.put('/tarefas/:id', (req, resp) => {

    db.run(`UPDATE TAREFAS SET titulo = ?, descricao = ? , status = ? WHERE id = ?`, [req.body.titulo,
                                                                                        req.body.desc,
                                                                                        req.body.status, 
                                                                                        req.params.id]);
resp.status(200).send('Alterado com sucesso');
});
    


app.listen(8080, ()=> console.log('servidor iniciado!'));


process.on('SIGINT', ()=> {
    db.close((err) => {
        console.log("Banco encerrado com sucesso!");
        process.exit(0);
    })
})