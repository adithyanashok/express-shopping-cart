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
router.get('/add-product', (req, res) => {
  res.render('admin/add-product', { admin: true})
})

// Add Product ///

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
// Ending Of Add product ///

module.exports = router;
