const express = require ("express")
const app = express ()

const port = process.env.PORT || 3000 


// app.get( '/' , (req , res)=>{
//     res.send("hello world")
// }
// )

const path = require ("path")
const publicDirectory = path.join(__dirname , '../public')
app.use(express.static(publicDirectory))

// app.get( '/' , (req , res)=>{
//     res.send("hello world")
// }
// )


// app.get('/prices'  , (req , res)=>{
//     res.send("this is prices page")
// })

// app.get( '/page1' , (req,res) => {
//     res.send('<h2>my name is tony </h2>  <button>Confirm</button>  <p> i have 25 years old </p> ')
//  })

// app.get('/page2' , (req,res)=>{
//     res.send({
//         name : "tony" ,
//         city : "cairo" ,
//         age : 25
//     })
// })

///////////////////////////////////////////////////////////////////////////////////////////////

app.set('view engine' , 'hbs') ; // to clarify & configure the type of templet engine 

const viewsDirectory = path.join(__dirname , "../Temp1/views")
app.set("views" , viewsDirectory )


 // to read partials : 
 const hbs = require ("hbs") ;
 const partialspath = path.join (__dirname , "../Temp1/partials")
 hbs.registerPartials(partialspath)

 
app.get ('/' , (req , res)=>{
    res.render('index' , {
        title : "home" , 
        desc : "this is home page "
    })
})

app.get ('/service' , (req,res)=>{
    res.render('service' , {
        title : "service" , 
        name: "Mohamed",
        city:"Cairo",
        age: 40,
        
    })
})

app.get ('/team' , (req,res) => {
    res.render('team' , {
        title : "TEAM",
        name: "reem",
        city:"mansoura",
        age: 25,
        
    })
})

app.get('/products' , (req,res)=>{
    console.log(req.query)
    console.log(req.query.model)

    res.send({
        product : "bmw x6"
    })
})

const geocode = require("./data1/geocode")
const forcast = require ("./data1/forecast")


app.get('/weather' , (req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "you must provide an address"
        })
    }
    geocode(req.query.address , (error,data)=>{
        if(error){
            return res.send({ error })
        }
        forcast(data.latitude , data.longtitude , (error , forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast : forcastData ,
                location : req.query.address
            })
        })
    })
    
})

app.get ('*' , (req , res )=>{
    res.send("404 page not founded ")
})


app.listen(port , ()=>{
    console.log(`app listening on port ${port}`)
})