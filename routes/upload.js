
var express = require('express');
var router = express.Router();
var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, path.join(__dirname,"/../uploads"));  
  },  
  filename: function (req, file, cb) {  
    var date = new Date();  
    cb(null, "("+moment().format("YYYY-MM-DD")+")"+file.originalname);  
  }  
});  
  
var upload1 = multer({ storage: storage })  
router.get('/',function(req,res,next){
	
	res.render('upload',{});
	
});
router.post('/', upload1.single('avatar'), function (req, res, next) {  
    res.send('文件上传成功')  
    console.log(req.file);  
    console.log(req.body);  
});  