var mongoose = require('mongoose'); 
var aboutApi = function (app) {    
    app.get('/about', function (req, res) {
        mongoose.model('About').findOne({}, function (err, model) {
            if (err) {
                return console.error(err);
            } else {
                res.json(model);
            }
        });               
    });
    
    app.put('/about', function (req, res) {
         mongoose.model('About').findById(req.body._id, function (err, m) {
            if (err) {
                res.send(err);
            } else {
                m.personalInfo = req.body.personalInfo;
                m.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(m);
                    }
                })
                
            }
         });             
    });
}

module.exports = aboutApi;