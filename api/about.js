var mongoose = require('mongoose'); 
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var aboutApi = function (app, base) {
    var dest = path.join(base, 'public/images/wiuImages/');
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {          
        cb(null, dest);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
    });
    var upload = multer({storage: storage}).array('imgs', 10);
    
    app.get('/about', function (req, res) {
        mongoose.model('About').findOne({}, function (err, model) {
            if (err) {
                return console.error(err);
            } else {
                res.json(model);
            }
        });               
    });
    
    app.get('/about/images', function (req, res) {
        mongoose.model('sliderModel').findOne({}, function (err, model) {
            if (err) {
                return console.error(err);
            } else {
                res.json(model);
            }
        });               
    });
    
    app.put('/about/images', isLoggedIn, function (req, res) {
        var removedOnClient = [], old = [], item = null;
        
        mongoose.model('sliderModel').findOne({}, function (err, model) {
            if (err) {
                return console.error(err);
            } else {
                old = model.paths;
                model.paths = req.body.paths;
                model.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        _.each(old, function (el) {                
                            item = _.some(req.body.paths, function (eel) {
                                return eel === el;
                            });
                            
                            !item ? removedOnClient.push(el) : item = null;
                        });
                        _.each(removedOnClient, function (el) {
                            fs.unlink((dest + /[^/]*$/.exec(el)[0]), function (err) {
                              if (err) throw err;
                              res.json(model);
                            });
                        });                        
                    }
                });
            }
        }); 
    });
    
    app.post('/about/images/upload', isLoggedIn, upload, function (req, res, next) {
        var fpaths = [];
        if (req.files) {
            req.files.forEach(function(item) {
                fpaths.push("images/wiuImages/" + item.originalname);
            });
             mongoose.model('sliderModel').findOne({}, function (err, model) {
                if (err) {
                    return console.error(err);
                } else {
                    model.paths = model.paths.concat(fpaths);
                    model.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json(model);
                        }
                    })
                }
            });
        }
       
    });
    
    app.put('/about', isLoggedIn, function (req, res) {
         mongoose.model('About').findById(req.body._id, function (err, m) {
            if (err) {
                res.send(err);
            } else {
                m.personalInfo = req.body.personalInfo;
                m.workItems = req.body.workItems;
                m.wiu = req.body.wiu;
                m.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(m);
                    }
                });                
            }
         });             
    });    
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
}

module.exports = aboutApi;