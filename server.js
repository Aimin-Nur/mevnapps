const express = require("express");
const mongoose = require("mongoose");
const { mongoUri } = require("./config");

const app = express();
const { PORT } = require("./config");

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ToDoListItem = require("./models/TodolistItems");
const ToDoListItemsRoutes = require("./route/api/todoListItem");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());


mongoose.connect(mongoUri).then(() => {
    console.log(`Database terhubung di ${mongoUri}`);
    app.listen(PORT, () => {
        console.log(`Aplikasi berjalan pada port ${PORT}`);
    });
    }).catch((err) => {
        console.error(`Kesalahan koneksi ke database: ${err}`);
    });

app.use('/api/todolistitems', ToDoListItemsRoutes);
    
app.get('/', (req, res) => res.send("Hello Word MEVN"));
