const express=require('express');

const app=express();

app.get("/hello", (req, res) => {
    res.send("This is the hello response");
})

app.listen(3000,()=>{
    console.log(`server is listening at port http:\\localhost:3000 `);
    
})
