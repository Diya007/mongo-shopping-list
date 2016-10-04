global.DATABASE_URL = 'mongodb://localhost/shopping-list-test'; 
//set global.DATABASE-URL to make the application use the testing database
//rather than the development of production database.

var chai = require('chai');
var chaiHTTP = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();//call the chai.should function
var app =server.app;

chai.use(chaiHTTP);// tell chai to use chaiHTTP

describe('Shopping List',function() {
 before(function(done) {
  server.runServer(function(){
   Item.create({name:'Broad beans'},
               {name:'Tomatoes'},
               {name:'Peppers'},function(){
        done();
   });
  })
 })
 
 it('should list items on GET',function(done){
   chai.request(app)
       .get('/items')
       .end(function(err,res){
        should.equal(err,null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('name');
        res.body[0].name.should.be.a('string');
        res.body[0].name.should.equal('Broad beans');
        res.body[1].name.should.equal('Tomatoes');
        res.body[2].name.should.equal('Peppers');
        
        done();
       })
 })
 
 it('should add an item on POST',function(done){
   chai.request(app)
       .post('/items')
       .send({'name':'Diya'})
       .end(function(err,res){
        should.equal(err,null);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.be.a('string');
        res.body.should.have.property('name');
        res.body.name.should.equal('Diya');
        
        
        
        done();
       })
       
  
 })
 
 
 after(function(done){
  Item.remove(function(){
   done();
  })
 })
})
    