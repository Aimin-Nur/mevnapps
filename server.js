const express = require("express");
const mongoose = require("mongoose");
const { mongoUri } = require("./config");

const app = express();
const PORT = 3000;

mongoose.connect(mongoUri).then(() => {
    console.log(`Database terhubung di ${mongoUri}`);
    app.listen(PORT, () => {
        console.log(`Aplikasi berjalan pada port ${PORT}`);
    });
    }).catch((err) => {
        console.error(`Kesalahan koneksi ke database: ${err}`);
    });
    
app.get('/', (req, res) => res.send("Hello Word MEVN"));
