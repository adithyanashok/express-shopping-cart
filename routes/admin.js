var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    console.log(products);
    res.render('admin/view-products', { admin: true, products });
  })
});

// Get Method of Add Product //
router.get('/add-product', (req, res) => {
  res.render('admin/add-product', { admin: true})
})

// Post Method of Add Product ///

router.post('/add-product', (req, res) => {
  productHelpers.addProduct(req.body, (id) => {
    var image = req.files.Image
    image.mv('./public/images/' +id+ '.jpg', (err, done) => {
      if(!err){
        res.render('admin/add-product');
      }
    })
  })
})

// Delete-product Method //
router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id
  productHelpers.deleteProduct(proId).then((response) => {
    res.redirect('/admin/')
  })
})

// Edit-Product Method //

router.get('/edit-product/:id', async (req,res) => {
  let product = await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product', { product })
})

// Update Product Details Method //
router.post('/edit-product/:id', (req, res) => {
  productHelpers.updateProduct(req.params.id, req.body).then(() => {
    res.redirect('/admin/')
    if(req.files.Image) {
      let id = req.params.id
      let image = req.files.Image
      image.mv('./public/images/' +id+ '.jpg')
    }
  })
})
module.exports = router;
