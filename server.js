const express = require('express')
const app = express()
const morgan = require('morgan')
const { db, Friends } = require('./db')
const routes = require('./app')
const path = require('path')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded( {extended: false} ))
app.use(require('method-override')('_method'))
app.use(express.static(path.join(__dirname,'./public')))

// connect to routes
app.use('/',routes)
app.use('/api',routes)

// app.use(function(req,res,next){
//     const err = new Error('Not found')
//     err.status = 404
//     next(err)
// })

// app.use(function(err,req,res,next){
//     console.error(err,err.stack)
//     res.status(err.status || 500)
//     res.send("something wrong: " + err.message)
// })

async function init() {
    try {
        await db.sync()

        const PORT = process.env.PORT || 3000
        await app.listen(PORT, function(){
            console.log(`Listening at http://localhost:${PORT}`);
        })
     } catch(error) {
            console.error(error)
        }
    }

    init()
