const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categories = await Category.findAll(
      {
        include: {
          model: Product

        }
      }
    )
    if (!categories) res.status(404).json({message: "nah thats on you"})
    else res.status(200).json(categories)
  }
  catch(error){
    res.status(500).json({message: "server error"})
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categories = await Category.findByPk(req.params.id,
      {
        include: {
          model: Product

        }
      }
    )
    if (!categories) res.status(404).json({message: "nah thats on you"})
    else res.status(200).json(categories)
  }
  catch(error){
    res.status(500).json({message: "server error"})
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)
  }
  catch(error){
    res.status(500).json({message: "it dont work"})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(updatedCategory)
  }
  catch(error){
    res.status(500).json({message: "it dont work"})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    await Product.destroy({
      where: {
        category_id: req.params.id
      }
    })
    const noCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }})
    res.status(200).json(noCategory)
  }
  catch(error){
    console.error(error)
    res.status(500).json({message: "it dont work"})
  }
});

module.exports = router;
