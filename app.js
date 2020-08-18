const { db, Friends } = require('./db')
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

// main Q - what is handld in router vs client? how does webpack factor?

app.use(bodyParser.json())
app.use(express.urlencoded( {extended: false} ))


// GET / returns index.html page - user always here
router.get('/', async (req,res,next) => {
    try{
        const friendData = await Friends.findAll({
            order: [
                ['rating','DESC']
            ]
        })
        res.json(friendData)
    } catch(error) { next(error) }
})

//below all res.json - /api ususally user does not navigate to
// GET /api/friends - refreshed index.html page
//res.json back
router.get('/api/friends', async(req,res,next) => {
    try {
        const friendData = await Friends.findAll({
            order: [
                ['rating','DESC']
            ]
        })
        res.json(friendData)
    } catch(error) { next(error) }
})

router.put('/api/friends/:id',async(req,res,next) => {
    try{
        // const newFriend = req.params.id
        const newFriend = req.body.newFriend
        const newFriendData = await Friends.create({ name: newFriend })
        // res.json(newFriendData)
        res.redirect('/')
    } catch(error){ next(error) }
})

router.post('/api/friends',async(req,res,next) => {
    try{
        const updatedName = req.body.updated
        const updatedRating = req.body.updatedRating
        const updatedData = await Friends.findOne({
            where: {
                name: updatedName
            }
        })
        
        await updatedData.update({
            rating: updatedRating
        })
        // res.json(updatedData)
        res.redirect('/')
    } catch(error) { next(error) }
}
)

router.delete('/api/friends/:id',async (req,res,next) => {
    try{
        // const deleted = req.params.id
        const deleted = req.body.deleted
        await Friends.destroy({
            where: {
                name: deleted
            }
        })
        res.redirect('/')
    } catch(error) { next(error) }
})

module.exports = router