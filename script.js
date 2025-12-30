const express = require("express");
const app = express();
app.use(express.json());

const mgmtRoutes = require('./src/Routes/mgmtRoutes')
app.use('/products', mgmtRoutes);

const port = 7003
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})