const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tags = await Tag.findAll({
      include:{
        all: true
      }
    })
    res.status(200).json(tags)
  }
  catch(error){
    console.log(error)
    res.status(500).json({
      message: "server error"
    })
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    const tags = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include:{
        all: true
      }
    })
    res.status(200).json(tags)
  }
  catch(error){
    console.log(error)
    res.status(500).json({
      message: "server error"
    })
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const tags = await Tag.create(req.body)
    res.status(200).json(tags)
  }
  catch(error){
    console.log(error)
    res.status(500).json({
      message: "server error"
    })
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try{
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedTag)
    }
  catch(error){
    console.log(error)
    res.status(500).json({
      message: "server error"
    })
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletedTag)
  }
  catch(error){
    console.log(error)
    res.status(500).json({
      message: "server error"
    })
  }
  // delete on tag by its `id` value
});

module.exports = router;
