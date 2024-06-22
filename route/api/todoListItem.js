const { Router } = require("express");
const TodoListItem = require("../../models/TodolistItems");

const router = Router();

router.get("/", async (req, res) => {
    console.log("GET / API called");
    try {
        const todoListItems = await TodoListItem.find();
        if (!todoListItems) throw new Error("List tidak ada Data");
        const sorted = todoListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(sorted);
    } catch (error) {
        console.error("Error fetching items:", error.message);
        res.status(500).json({
            message: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    console.log("POST / API called with data:", req.body);
    const newTodoListItem = new TodoListItem(req.body);

    try {
        const todoListItem = await newTodoListItem.save();
        if (!todoListItem) throw new Error("Data tidak bisa disimpan!");
        res.status(200).json(todoListItem);
    } catch (error) {
        console.error("Error adding item:", error.message);
        res.status(500).json({
            message: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    console.log(`PUT / API called for ID: ${id} with data:`, updateData);
    
    try {
        if (!id) {
            throw new Error('ID tidak diberikan');
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            throw new Error('Data pembaruan tidak diberikan atau kosong');
        }

        const response = await TodoListItem.findByIdAndUpdate(id, updateData, { new: true });
        if (!response) {
            throw new Error('Update failed, item tidak ditemukan');
        }

        console.log('Update successful:', response);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error updating item:', error.message);
        res.status(500).json({
            message: error.message,
        });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`DELETE / API called for ID: ${id}`);
    try {
        const removed = await TodoListItem.findByIdAndDelete(id);
        if (!removed) throw new Error("gagal dihapus!");
        res.status(200).json(removed);
    } catch (error) {
        console.error("Error deleting item:", error.message);
        res.status(500).json({
            message: error.message,
        });
    };
});

module.exports = router;
