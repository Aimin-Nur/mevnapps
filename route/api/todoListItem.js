const {Router} = require("express");
const TodoListItem = require("../../models/TodolistItems");

const router = Router();


router.get("/", async (req, res) => {
    try{
        const todoListItems = await TodoListItem.find();
        if(!todoListItems) throw new Error("List tidak ada Data");
        const sorted = todoListItems.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(sorted);
    }catch(error){
        res.status(500).json({
            pesan: error.pesan,
        });
    }
});

router.post('/', async (req, res)=>{
    const newTodoListItem =  new TodoListItem(req.body);

    try{
        const todoListItem = await newTodoListItem.save();
        if(!todoListItem) throw new Error("Data tidak bisa disimpan!");
        res.status(200).json(todoListItem);
    }catch (error){
        res.status(500).json({
            pesan:error.message,
        });
    }
});

router.put('/:id', async (req,res)=>{
    const { id } = req.params;
    try{
         const response = await TodoListItem.findByIdUpdate(id, req.body);
         if(!response) throw new Error("terjadi kesalahan");
         const update = {...response._doc,...req.body};
        res.status(200).json(update); 
    }catch(error){
        res.status(500).json({
            pesan:error.message,
        });
    };
});

router.delete("/:id", async (req,res)=>{
    const { id } = req.params;
    try{
         const removed = await TodoListItem.findByIdAndDelete(id);
         if(!removed) throw new Error("gagal dihapus!");
        res.status(200).json(removed); 
    }catch(error){
        res.status(500).json({
            pesan: error.message,
        });
    };
});

module.exports = router;