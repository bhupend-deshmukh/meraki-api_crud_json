const express = require('express');
const axios = require("axios");
const fs = require('fs');
const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    console.log("helow soskdflkj");
    fs.readFile("Courses.json", (err, data)=>{
        if (err){
            res.send(err)
        }else{
            res.send(JSON.parse(data));
        }
    })
})


app.get("/courses/:id", (req, res)=>{
    
    fs.readFile("Courses.json", (err, data)=>{
    const c = JSON.parse(data)
    console.log(c);

    for (let k of c){
        if (k['id']==req.params.id){
            res.send(k) 
            return;
        }
    }
    res.send({"status": "error", "message": `ID: ${req.params.id} Not Found...`})
    })
}) 


app.post("/addcours",(req,res) => {
    var bodyData = req.body
    fs.readFile("Courses.json",(err,data)=>{
        // console.log(JSON.parse(data));
        console.log(bodyData);
        var la = JSON.parse(data)
        la.push(bodyData)
        fs.writeFile('Courses.json',JSON.stringify(la, null,4),(err, data)=>{
            if (err) throw err
            // console.log(data);
            console.log("JaY Hind !!!!!!!!!!!!!.....................");
            res.send({'status': 'success','inserted':bodyData})
        })
    })  
})


app.delete("/deleteById/:id",(req , res)=>{
    fs.readFile("Courses.json",(err,data)=>{
        var l = JSON.parse(data)
        var m = 0
        for (let k of l){
            if (k['id'] == req.params.id){
                l.splice(m,1)
                fs.writeFile("Courses.json",JSON.stringify(l,null,4),(err,dat)=>{
                    console.log("id deleted");
                })
                res.send({"status":"id deleted"})
                return ;
            }
            m++
        }
        res.send({"status":"id not faound"})  
    })
})

app.put("/update/:id",(req , res)=>{

    fs.readFile("Courses.json",(err,data)=>{
        var m = JSON.parse(data)
        for (let k of m){
            if (k["id"] == req.params.id){
                req.body['id'] = k['id']
                console.log(req.body);
                k=req.body
                fs.writeFile('Courses.json',JSON.stringify(m, null,4),(err, data)=>{
                        if (err) throw err
                        // console.log(data);
                        res.send({'status': 'success','updated':req.body})
                    })
                return;
            }
        }
        res.send({'status': 'error','idnot foudn':req.body})
        })
})


const port = 2022

app.listen(port,()=>{
    console.log('Server Conected', port);
})