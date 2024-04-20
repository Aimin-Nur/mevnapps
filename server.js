const express = require('express');
const app = express();

const PORT = 3000;

app.get('/',(req,res)=> res.send("Hello Word MEVN"));
app.listen(PORT, ()=>console.log(`Aplikasi Berjalan Pada Port ${PORT}`));
