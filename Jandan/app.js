var superagent = require('superagent');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

superagent.get('http://jandan.net/pic').end(function(err,sres){
	if(err)
		return;
	var $ = cheerio.load(sres.text);
	var imgArr = [];
	$('.commentlist li .text p img').each(function(index,item){
		var $el = $(item);
		imgArr.push('http:'+$el.attr('src'));
	});

	for(var i=0;i<imgArr.length;i++){
		downloadImg(imgArr[i],imgArr[i].split('/')[4]);
	}
});

var dir ='./images';
var downloadImg = function(url,name){
	request.head(url, function(err, res, body){
       request(url).pipe(fs.createWriteStream(dir + "/" + name));
     });
}