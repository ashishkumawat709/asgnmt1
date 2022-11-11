const express = require("express")
const app = express()
const mongoose = require('./db/conn')

const ejs = require('ejs')
const path = require('path')
const personModel = require('./models/schema')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const viewpath = path.join(__dirname, './templates/views')
const partialpath = path.join(__dirname, './templates/partials')

app.set('view engine', 'ejs')
app.set('views', viewpath)

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
    res.render('login')
})


app.post('/register', async (req, res) => {

    // try {
    //     const createDoc = new personModel({
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName,
    //         mobile: req.body.mobile,
    //         email: req.body.email,
    //         city: req.body.city,
    //         street: req.body.street,
    //         state: req.body.state,
    //         country: req.body.country,
    //         loginID: req.body.loginID,
    //         password: req.body.password,
    //         creationTime: req.body.creationTime,
    //         lastUpdated: req.body.lastUpdated,
    //     })

    //     const result = await createDoc.save()
    //     console.log(result);
    //     res.redirect('/login')
    //     // res.status(200).json({message:"doc created" , data:result})
    // } catch (error) {
    //     console.log(error);
    // }

    //better way to do
    try {
        const createDoc =  new personModel(req.body)
        await createDoc.save()
        // res.status(200).json({message:'created', data:createDoc})
        res.redirect('/login')
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await personModel.findOne({ email: email })
        if (result != null) {
            if (result.email == email && result.password == password) {
                res.send(`<h1>dashboard....${result}</h1>`)
            } else {
                res.send('<h1>invalid user login</h1>')
            }
        } else {
            res.send('<h1>user not registerd</h1>')
        }
    } catch (error) {
        console.log(error);
    }
})

app.get('/getAll', async (req, res) => {
    try {
        const getAll = await personModel.find({})
        res.status(200).json({ message: "all doc sent", data: getAll })
    } catch (error) {
        console.log(error);
    }
})

app.get('/getSingle/:id', async (req, res) => {
    try {
        const id = req.params.id
        const getSingle = await personModel.findById(id, req.body)
        res.status(200).json({ message: "doc sent", data: getSingle })
    } catch (error) {
        console.log(error);
    }
})

app.put('/updateSingle/:id', async (req, res) => {
    try {
        const id = req.params.id
        const getSingle = await personModel.findByIdAndUpdate(id, req.body)
        res.status(200).json({ message: "doc updated", data: getSingle })
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log('listening 4000');
})