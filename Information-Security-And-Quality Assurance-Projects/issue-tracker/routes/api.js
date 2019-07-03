'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; 

module.exports = function (app) { 
  
  app.route('/api/issues/:project')
  
    .get((req, res) => {

      const project = req.params.project;
      const query   = req.query;

      if(query){

        if(query._id){
          query._id = new ObjectId(query._id);
        }
        if(query.open === '' || query.open === 'true'){
          query.open = true;
        }
        if(query.close === '' || query.close === 'true'){
          query.close = true;
        }

      }

      MongoClient.connect(CONNECTION_STRING)
                .then(db => {
                  const collection = db.collection(project);
                  collection.find(query)
                            .sort({updated_on: -1})
                            .toArray((error, doc) => {
                              if(!error){
                                res.json(doc);
                              }else {
                                res.send(error);
                              }
                            });                                      
                }).catch(error => {
                    res.send(error);
                });  
    })
    
    .post((req, res) => {

      const project = req.params.project;

      const newIssue = {
        issue_title   : req.body.issue_title,
        issue_text    : req.body.issue_text,
        assigned_to   : req.body.assigned_to || '',
        status_text   : req.body.status_text || '',
        created_by    : req.body.created_by,
        open          : true,
        created_on    : Date.now(),
        updated_on    : Date.now()
      };

      if ( newIssue.issue_title && newIssue.issue_text && newIssue.created_by ) {

        MongoClient.connect(CONNECTION_STRING)
                   .then(db => {
                     const collection = db.collection(project);
                     collection.insertOne(newIssue)
                               .then(doc => {
                                 newIssue._id = doc.insertedId;
                                 res.json(newIssue);
                               })
                               .catch(err => res.send(err));
                   })
                   .catch(err => res.send(err));
                   

      }else {
        res.send('Please make sure you have filled in the Issue title, text and created by fields');
      }

    })
    
    .put((req, res) => {
      const project = req.params.project;
      const issueID   = new ObjectId(req.body._id);

      if(req.body.open === '' || req.body.open === 'false'){
        req.body.open = false;
      }

      MongoClient.connect(CONNECTION_STRING)
                 .then(db => {
                   const collection = db.collection(project);
                   collection.update({_id: issueID}, {$set: {open: req.body.open, updated_on: Date.now()}})
                             .then(doc => {
                              res.send('success')
                             })
                             .catch(error => res.send(error));
                 })
                 .catch(err => res.send(err));
      
    })
    
    .delete((req, res) => {
      const project = req.params.project;
      const issueID   = new ObjectId(req.body._id);

      MongoClient.connect(CONNECTION_STRING)
                 .then(db => {
                   const collection = db.collection(project);
                   collection.deleteOne({_id: issueID})
                             .then(doc => {
                                res.send('success')
                             })
                              .catch(error => res.send(error));
                 })
                 .catch(err => res.send(err));
      
    });
    
};
