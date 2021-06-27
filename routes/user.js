var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var products = [{
    name: "Redmi 10",
    price: "50,000",
    description: "This is good phone",
    image: "https://www.kibotek.com/wp-content/uploads/2021/03/kiboTEK_redmi_note_10_008.jpeg",

  },
  {
    name: "Oneplus Nord",
    price: "42,000",
    description: "This is good phone",
    image: "https://images.fonearena.com/blog/wp-content/uploads/2020/10/OnePlus-8T_fonearena-10-1024x576.jpg"
  },
  {
    name: "Iphone 12",
    price: "100,000",
    description: "This is good phone",
    image: "https://hniesfp.imgix.net/8/images/detailed/242/iphone12_apple_MGJE3B_01.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress"
  },
  {
    name: "Motorola",
    price: "30,000",
    description: "This is good phone",
    image: "https://www.cnet.com/a/img/dDNNe9Xrvs65q6HExFibOohEXsU=/940x0/2018/11/03/5a439de4-a4c1-4559-a79a-ed1f06e0ad4f/motorola-one-white-pdphero-na.jpg"
  }

]
  res.render('index', { products, admin: false });
});

module.exports = router;
