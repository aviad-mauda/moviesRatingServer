const express = require('express')
const { body, validationResult } = require('express-validator');

const service = require('../services/service')

const router = new express.Router()

router.post('/addMovie', [
    body('name').isString(),
    body('name').isLength({ min: 1 }),
    body('imdb').isString(),
    body('imdb').isLength({ min: 1 }),
    body('rating').isInt({ min:1, max: 10})
  ],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        req.body.name = req.body.name.trim();
        req.body.imdb = req.body.imdb.trim();
        await service.addMovie(req.body);
        res.status(201).send({ 'msg':'movie was created' })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})   


router.patch('/increaseThumb', [
  body('name').isString(),
  body('name').isLength({ min: 1 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
      await service.increaseThumb(req.body);
      res.status(200).send({ 'msg':'thumb was updated' })
  } catch (e) {
      console.log(e)
      res.status(400).send(e)
  }
}) 

module.exports = router