const express = require('express')
const router = new express.Router()

const User = require("../models/user");
// User
// by promise method
// app.post('/users', (req, res) => {
//     const user = new User(req.body)
//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((error) => {
//         res.status(400).send(error)
//     })
// })

// async method
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

// by find one
// router.get('/users/:id', (req, res) => {
//     const id = req.params.id
//     User.findOne({__id: id}).then((user) => {
//         res.status(201).send(user)
//     }).catch((error) => {
//         res.status(404).send(error)
//     })
// })

// by find by id
router.get('/users/:id', async (req, res) => {
    const __id = req.params.id
    try {
        const user = await User.findById(__id)
        if (!user) {
            return res.status(404).send({"msg": "No Result found"})
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const __id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid Updates!'
        })
    }
    try {
        const user = await User.findByIdAndUpdate(__id, req.body, {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send({"msg": "No Result found"})
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({"msg": "No Result found"})
        }
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router