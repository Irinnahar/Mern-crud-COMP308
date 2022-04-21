
var symptiomController = require('../controllers/SymptomPredictionController.js');

module.exports = function (app) {

    app.post('/symptom-prediction', symptiomController.Prediction); 

};
