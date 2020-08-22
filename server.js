const express = require("express")
const app = express()
const morgan = require("morgan")
//[PK] Why import Friends if you don't use it?
const { db, Friends } = require("./db")
const routes = require("./app")
const path = require("path")

app.use(morgan("dev"))
app.use(express.json())
//[PK] Maybe subjective but { key: value } >> {key: value}
app.use(express.urlencoded({ extended: false }))
app.use(require("method-override")("_method"))
app.use(express.static(path.join(__dirname, "./public")))

// connect to routes
//[PK] More formatting: func(arg, arg) >> func(arg,arg)
app.use("/", routes)
//[PK] Why have two ways to get to the same routes?
app.use("/api", routes)

//[PK] Delete these comments!!
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
		//[PK] app.listen does not return a promise, so `await` doesn't do anything!
		await app.listen(PORT, function () {
			console.log(`Listening at http://localhost:${PORT}`)
		})
	} catch (error) {
		console.error(error)
	}
}

init()
