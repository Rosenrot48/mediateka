const {Router, json} = require('express');
const config = require('config');
const objectId = require('mongodb').ObjectID;
const Todo = require('../model/todo');

const router = Router();

router.get('/', async (req, res) => {
    await Todo.find((err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

router.post('/create',json(), async (req,res) => {
    const todo = new Todo({title: req.body.title})
    console.log(todo);
    await todo.save();
    await Todo.find((err,result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send(result)
        }
    })
})

router.delete('/:id', async (req, res) => {

    const id = new objectId(req.params.id);
    await Todo.findOneAndDelete({_id: id}, function(err, result){
        if(err) return console.log(err);
    });
    await Todo.find((err,result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).send(result)
        }
    })
})

router.put('/change-status/:id', json(),  async(req, res) => {
    const id = new objectId(req.params.id);
    await Todo.findOneAndUpdate({_id:id}, { $set: {status: req.body.status}},
        {returnOriginal: false, new: true }, (err, result) =>{
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).send(result);
        }
    })
} )

module.exports = router;
