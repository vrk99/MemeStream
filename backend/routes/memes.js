const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Meme = require('../models/Meme.js');

// GET /memes route: returns latest 100 memes in the system
router.get('/', (req, res) => {
  Meme.find().sort({created_at: -1}).limit(100).select('id name caption url').exec((err, memes) =>{
    res.send(memes);
  })
});

// POST /memes route: adds a new meme to the system, if not already present
router.post('/', (req, res) => {
  Meme.findOne({name: req.body.name, caption: req.body.caption, url: req.body.url}, (err, meme) => {
    if(err){
      return res.status(500).json({ err: "Something Went Wrong" });
    }
    else if(!meme || meme.length === 0){
      var meme = new Meme({
        name: req.body.name,
        caption: req.body.caption,
        url: req.body.url,
      });
      meme.save((err) => {
        if(err){
          return res.status(500).json({ err: "Something Went Wrong" });
        }
        res.json({id: meme.id});
      });
    }
    else{
      return res.status(409).json({ err: "This meme already exists" });
    }
  })
})

//GET /memes/{id} route: returns the meme with given id, provided it is present in the system
router.get('/:id', (req, res) => {
  Meme.findOne({_id: mongoose.Types.ObjectId(req.params.id)}).select('id name caption url').exec((err, meme) => {
    if(err){
      return res.status(500).json({ err: "Something Went Wrong" });
    }
    else if(!meme || meme.length === 0){
      return res.status(404).json({ err: "No Such File" });
    }
    else{
      res.json(meme);
    }
  });
})

// PATCH /memes/{id} route: updates caption and/or url of the meme with given id
router.patch('/:id', (req, res) => {
  var updatedMeme = {};
  if(req.body.caption){
    updatedMeme.caption = req.body.caption;
  }
  if(req.body.url){
    updatedMeme.url = req.body.url;
  }
  Meme.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {$set: updatedMeme}, (err, meme) => {
    if(err){
      return res.status(500).json({ err: "Something Went Wrong" });
    }
    else{
      return res.status(204).json({ msg: "Successfully updated" });
    }
  });
})

// DELETE /memes/{id} route: deletes the meme with given id
router.delete('/:id', (req, res) => {
  Meme.findOneAndDelete({_id: mongoose.Types.ObjectId(req.params.id)}, (err, meme) => {
    if(err){
      return res.status(500).json({ err: "Something Went Wrong" });
    }
    else{
      return res.status(204).json({ msg: "Successfully deleted" });
    }
  });
})

module.exports = router;
