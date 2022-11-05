const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbforbooksapp'
})

const app = express()

db.connect(err => {
    if (err) {
        throw err
    }
    console.log('connected to db');
})

    
//create new user
app.post('/createNewUser', (req, res) => {
    if (!req.body.name || !req.body.age) {
        res.sendStatus(400)
        return
    }
    let postObject = {
        id: +(new Date()),
        name: req.body.name,
        age: +req.body.age
    }
    db.query('INSERT INTO users SET ?', postObject, err => {
        if (err) {
            res.sendStatus(302)
            return
        }
        res.status(200).json(postObject)
    })
})


//get user by id
app.get('/getuser/:id', (req, res) => {
    if (!+req.params.id) {
        res.sendStatus(400)
        return
    }
    db.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, user) => {
        if (err) {
            res.sendStatus(404)
            return
        }
        res.status(200).json(user)
    })
})

//get user by name
app.get('/getuser', (req, res) => {
    if (!req.query.name) {
        res.sendStatus(400)
        return
    }
    db.query(`SELECT * FROM users WHERE name = ${req.query.name}`, (err, user) => {
        if (err) {
            res.sendStatus(404)
            return
        }
        res.status(200).json(user)
    })
})
//update user`s name by id
app.put('/updateUser/:id', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(200)
        return
    }

    db.query(`UPDATE users SET name = ${req.body.name} WHERE id = ${req.params.id}`, (err) => {
        if (err) {
            res.sendStatus(404)
            return 
        }
        res.sendStatus(204)
    })

})