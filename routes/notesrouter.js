const express = require('express')

const router = express.Router()

const { getNote, postNote, updateNote, deleteNote ,getNoteById} = require('../controllers/routercontroller')

router.get('/getnote', getNote)
router.post('/postnote', postNote)
router.post('/updatenote/:id', updateNote)
router.post('/deletenote/:id', deleteNote)
router.get('/getnote/:id',getNoteById)

module.exports = router