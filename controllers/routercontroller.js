const Note = require('../models/notemodel')


const postNote = async (req, res) => {
    const { title, comment } = req.body
    // const comment=req.body.comment

    console.log(title, comment)
    try {
        // Assuming 'notes' is your Mongoose model
        const newNote = await Note.create({
            title: title,
            comment: comment,
        });
        res.status(200).json(newNote);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }



}

const getNote = async (req, res) => {
    try {
        const note = await Note.find()

        res.status(200).json(note)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        res.status(200).json(note)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
const updateNote = async (req, res) => {
    try {

        const note = await Note.findById(req.params.id)

        if (!note) {
            res.status(400)
            throw new Error('book not found')
        }
        const updateaction = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updateaction)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)

        if (!note) {
            res.status(400)
            throw new Error('book not found')
        }
        await note.deleteOne()
        res.status(200).json({ id: req.params.id })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {

    getNote,
    postNote,
    updateNote,
    deleteNote,
    getNoteById

}

