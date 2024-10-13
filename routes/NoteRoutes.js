const noteModel = require('../models/NotesModel.js');
const express = require('express');
const router = express.Router()
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note


    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority
    });

    note.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', (req, res) => {
   
 
    //TODO - Write your code here to returns all note

    noteModel.find()
    .then(notes => {
        res.status(200).send(notes);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })

});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    
    //TODO - Write your code here to return onlt one note using noteid

    noteModel.findById(noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: `Note not found with id ${noteId}`
                })
            }
            res.status(200).send(note);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
        

});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', (req, res) => {

    const noteId = req.params.noteId;

    
    const updateData = {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()
    }
    
    noteModel.findByIdAndUpdate(noteId, updateData, { new: true, useFindAndModify: false})
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            })
        }
        res.status(200).send(note);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
    //TODO - Write your code here to update the note using noteid
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;


    noteModel.findByIdAndRemove(noteId)
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            })
        }
        res.status(200).send(note);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
});

module.exports = router;
