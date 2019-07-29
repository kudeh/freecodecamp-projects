/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const server = require('../server');
let testID;

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/issues')
        .send({
          issue_title: 'All filled title',
          issue_text: 'all filled text',
          created_by: 'all filled created by',
          assigned_to: 'all filled assigned to',
          status_text: 'all filled status text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          
          //fill me in too!
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('issue_title').to.equal('All filled title');
          expect(res.body).to.have.property('issue_text').to.equal('all filled text');
          expect(res.body).to.have.property('created_by').to.equal('all filled created by');
          expect(res.body).to.have.property('assigned_to').to.equal('all filled assigned to');
          expect(res.body).to.have.property('status_text').to.equal('all filled status text');
          
          testID = res.body._id;
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/issues')
        .send({
          issue_title: 'req filled title',
          issue_text: 'req filled text',
          created_by: 'req filled created by',
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          
          //fill me in too!
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('issue_title').to.equal('req filled title');
          expect(res.body).to.have.property('issue_text').to.equal('req filled text');
          expect(res.body).to.have.property('created_by').to.equal('req filled created by');
          expect(res.body).to.have.property('assigned_to')
          expect(res.body).to.have.property('status_text')
          
          done();
        });
      });
      
      test('Missing required fields', function(done) {
          chai.request(server)
              .post('/api/issues/issues')
              .send({
                 assigned_to: 'all filled assigned to',
                 status_text: 'all filled status text'         
          })
          .end(function(err, res) {
            expect(res.text).to.equal('Please make sure you have filled in the Issue title, text and created by fields');
            done();
          });
      });
      
    });
  
  
   suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
            .put('/api/issues/issues')
            .send({})
            .end(function(err, res){
                 assert.equal(res.status, 200);
                 expect(res.text).to.equal('no field to update');
                 done();
            })
        
      });
      
      test('One field to update', function(done) {
        chai.request(server)
            .put('/api/issues/issues')
            .send({_id: testID, open: false})
            .end(function(err, res){
                 assert.equal(res.status, 200);
                 expect(res.text).to.equal('success');
                 done();
            })
      });
      
//       test('Multiple fields to update', function(done) {
        
//       });
      
    });
  
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/issues')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/issues')
        .query({issue_title: 'All filled title'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/issues')
        .query({issue_title: 'All filled title', open: true})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
            .delete('/api/issues/issues')
            .send({})
            .end(function(err, res){
                assert.equal(res.status, 200);
              assert.equal(res.body.text, 'invalid id');
            done();
        });
        
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
            .delete('/api/issues/issues')
            .send({'_id': testID})
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.equal(res.body.text, 'success');
            done();
        });
      });
      
    });

});
