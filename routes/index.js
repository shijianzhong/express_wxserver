var express = require('express');
var router = express.Router();
var fs =require('fs');
var xml2js =require('xml2js');
var builder =new xml2js.Builder();//Jon->xml
var parser1 =new xml2js.Parser();//xml->json

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/',function(req,res,next){	
	var signature =req.query.signature;
	var timestamp =req.query.timestamp;
	var nonce =req.query.nonce;
	var echostr = req.query.echostr;
	res.send(echostr);
});
router.post('/',function(req,res,next){

	req.rawbody='';
	req.setEncoding('utf8');
	req.on('data',function (trunk)
	{
		req.rawbody+=trunk;
	});
	req.on('end',function(){
		
		var myjson =parser1.parseString(req.rawbody,function(err,result){
			
			
			var rescontent={xml:{ToUserName:'',FromUserName:'',CreateTime:'',MsgType:'',Content:''}};
			rescontent.ToUserName=result.xml.FromUserName;
			rescontent.FromUserName =result.xml.ToUserName;
			rescontent.CreateTime = new Date().getTime();
			rescontent.MsgType=result.xml.MsgType;
			rescontent.Content ="中国万岁";
			var contens = builder.buildObject(rescontent);
      if(result.xml.Content=="人寻车"){
      	
      				fs.readFile('./msg.txt', function(err, contents) {
				rescontent.Content =contents;
				
				var wws =`<xml>
   			<ToUserName><![CDATA[${rescontent.ToUserName}]]></ToUserName>
   			<FromUserName><![CDATA[${rescontent.FromUserName}]]></FromUserName> 
   			<CreateTime>${rescontent.CreateTime}</CreateTime>
   			<MsgType><![CDATA[text]]></MsgType>
   			<Content><![CDATA[${rescontent.Content}]]></Content>
				</xml>`;
				res.send(wws);
   });	
      }else{
      	res.send('');
      }
					
		});
	
	
	});

});
module.exports = router;
