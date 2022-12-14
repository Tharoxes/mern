const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: mongoose, mongo } = require('mongoose');
const PORT = 4000;

const todoRoutes = express.Router();

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established succesfully");
})

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos){
        if(err){
            console.log(err);
        }else {
            res.json(todos);
        }
    })
});

todoRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        res.json(todo);
    });
});

todoRoutes.route('/update/:id').post(function(req, res){
    Todo.findById(req.params.id, function(err, todo){
        if(!todo){
            res.status(404).send('data is not found')
        }else{
            todo.description = res.body.description;
            todo.responsible = res.body.responsible;
            todo.priority = res.body.priority;
            todo.completed = res.body.completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send('Update not possible');
            });
        };
    });
});

todoRoutes.route('/add').post(function(req, res){
    let todo = new Todo(req.body);
    todo.save().then(todo => {
        res.status(200).json({'todo': 'todo added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding new todo failed');
    });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log('Server is running on Port ' + PORT);
});
