const { Schema, model } = require("mongoose");

const ToDoListItemSchema = new Schema ({
    description :{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
},
{
    Collection:"todolistitems"
},
);

const ToDoListItem = model("todoListItem", ToDoListItemSchema);

module.exports = ToDoListItem;