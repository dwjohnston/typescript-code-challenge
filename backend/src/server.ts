import express from "express";

const app = express();
const port = process.env.PORT ?? 3000;



app.get('/customers', (req, res) => {
    res.send('Hello World!')
})

app.get('/orders', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})