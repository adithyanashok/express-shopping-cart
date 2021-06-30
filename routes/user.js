var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')

const verifyLogin = (req, res, next) => {
  if(req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = req.session.user
  var cartCount = null
  if(req.session.user){
   cartCount = await userHelpers.getCartCount(req.session.user._id)
}
  productHelpers.getAllProducts().then((products) => {
    res.render('user/view-products', { products, admin: false, user, cartCount });
  })
});

// Login Get Method //
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {
    res.render('user/login', {"loginErr": req.session.loginErr})
    req.session.loginErr = false
  }
  
})

// Login Post Method //
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if(response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr = true
      res.redirect('/login')
      
    }
  })
})

// Signup Get Method //

router.get('/signup', (req, res) => {
  res.render('user/signup')
})

// Signup Post Method //
router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
    req.session.loggedIn = true
    req.session.user = response
    res.redirect('/')
  })
})

// Logout Method //
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

// Get cart method //
router.get('/cart', verifyLogin, async (req, res) => {
  const products = await userHelpers.getCartProducts(req.session.user._id)
  console.log(products);
  res.render('user/cart', {products, user:req.session.user})
})

router.get('/add-to-cart/:id', (req, res) => {
  console.log("Api Call");
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
   res.json({status: true})
  })
})

router.post('/change-product-quantity', (req, res, next) => {
  console.log(req.body);
  userHelpers.changeProductQuantity(req.body).then(() => {

  })
})
module.exports = router;
