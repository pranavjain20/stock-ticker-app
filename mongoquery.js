
var http=require('http');
var url =require('url');
var MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 3000;

const uri = "mongodb+srv://pranavjain20:Z135qet!@cluster0.h00z1.mongodb.net/companies?retryWrites=true&w=majority";
var companyname = "";
var ticker = "";
http.createServer(function(req,res){
 if (req.url === '/favicon.ico') {
    	     res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    	     console.log('favicon requested');
    	     return;
        }

 	res.writeHead(200,{'Content-Type':'text/html'});

	var qobj = url.parse(req.url,true);
	var txt = qobj.query.name; 
	MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true},function(err, db) {
 		 if (err) {
       			console.log(err);
			return;
      		 } 
  	 	var dbo = db.db("companies");

     dbo.collection("companies").findOne({ $or: [{Company: txt}, {Ticker: txt}]} , (err, result) => {
   
  	 if (result == null) {
  		  res.write("Company Name or Stock Ticker was not found.");
  		  return;
  	 }

      companyname = result.Company;
      ticker = result.Ticker;
      res.write("Company Name: " + companyname + "\n" + "Company Ticker: " + ticker);
      db.close();
    })
 	 });
 
  }).listen(port);
