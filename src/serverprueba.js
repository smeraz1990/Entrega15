import express from 'express'
const app = express()
const puerto = 8081



app.listen(puerto,()=>{
    console.log("escuchando puerto 8081")
})

app.get("/datos",(req,res)=>{
    console.log(`Estamos en el puerto ${puerto}`)
    res.send(`Aqui andamos parienton ${puerto}`)
})