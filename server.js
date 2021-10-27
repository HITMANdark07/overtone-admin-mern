const path = require("path");
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
//Admin Route
const admin     = require('./routes/api/admin');
const user     = require('./routes/api/user');
const author     = require('./routes/api/author');
const category     = require('./routes/api/category');
const orderstatus     = require('./routes/api/orderstatus');
const subcategory     = require('./routes/api/subcategory');
const subcategorychild     = require('./routes/api/subcategorychild');
const order     = require('./routes/api/order');
const review     = require('./routes/api/review');
const product     = require('./routes/api/product');
const setting     = require('./routes/api/setting');
const slider     = require('./routes/api/slider');
const shipping     = require('./routes/api/shipping');
const coupon     = require('./routes/api/coupon');
const team     = require('./routes/api/team');
const blog     = require('./routes/api/blog');
const role     = require('./routes/api/role');
const parentattributecategory     = require('./routes/api/parentattributecategory');
const attributecategory     = require('./routes/api/attributecategory');
const attributemapping     = require('./routes/api/attributemapping');
const productsub     = require('./routes/api/productsub');






// const subcategory     = require('./routes/api/subcategory');




const fileUpload = require('express-fileupload');
// default options

require('dotenv').load();
const app = express();
app.use(cors())
app.use(fileUpload());

app.use('/static', express.static(__dirname + '/uploads'));
app.use(express.static('dist'));



//Body Parser Middleware
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//DB Config & connection
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(()=>console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());
//Passport  Config
require('./config/passport')(passport);
//Use Routes
app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/api/orderstatus', orderstatus);
app.use('/api/order', order);
app.use('/api/author', author);
app.use('/api/category', category);
app.use('/api/subcategory', subcategory);
app.use('/api/subcategorychild', subcategorychild);
app.use('/api/product', product);
app.use('/api/setting', setting);
app.use('/api/slider', slider);
app.use('/api/review', review);
app.use('/api/shipping', shipping);
app.use('/api/coupon', coupon);
app.use('/api/team', team);
app.use('/api/blog', blog);
app.use('/api/role', role);
app.use('/api/parentattributecategory', parentattributecategory);
app.use('/api/attributecategory', attributecategory);
app.use('/api/attributemapping', attributemapping);
app.use('/api/productsub', productsub);










let reqPath = path.join(__dirname, '../../');
app.post('/upload',  function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
    let sampleFile = req.files.file;  
    var filename=Math.floor(Date.now() / 1000)+req.body.filename;
    sampleFile.mv(`${__dirname}/uploads/${filename}`, async function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({file:filename});
    });
}) 

app.post('/musicupload',  function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
    let sampleFile = req.files.file;  
    var filename=req.body.filename;
    sampleFile.mv(`${__dirname}/uploads/${filename}`, async function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({file:filename});
    });
}) 


// let reqPath = path.join(__dirname, '../../');
// app.post('/upload',  function(req, res) {

//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
//     let sampleFile = req.files.file;
// 	console.log("path",__dirname);
//  sampleFile.mv(`${reqPath}/dist/uploads/${req.body.filename}`,async  function(err) {
//       if (err) {
//         return res.status(500).send(err);
//       }
    
//     });
// }) 


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//Server port & configuration
const port = process.env.PORT || 5000;
app.listen(port,()=> {
console.log(`Server is Listening on ${port}`);
});
