const scikit = require('scikit-learn');
const pickle = require('pickle');
var jpickle = require('jpickle');
const pd = require('node-pandas-js');
const fs = require('fs');
var RandomForestClassifier = require('random-forest-classifier').RandomForestClassifier;
var SVM = require('ml-svm');
var X = require('./machine-learning/X_data.json');
var Y = require('./machine-learning/Y_data.json');
var data = require('./machine-learning/data.json');
const tf = require('@tensorflow/tfjs');

const Symptoms = ['itching', 'skin rash', 'nodal skin eruptions',
    'continuous sneezing', 'shivering', 'chills', 'joint pain',
    'stomach pain', 'acidity', 'ulcers on tongue', 'muscle wasting',
    'vomiting', 'burning micturition', 'spotting urination', 'fatigue',
    'weight gain', 'anxiety', 'cold hands and feets', 'mood swings',
    'weight loss', 'restlessness', 'lethargy', 'patches in throat',
    'irregular sugar level', 'cough', 'high fever', 'sunken eyes',
    'breathlessness', 'sweating', 'dehydration', 'indigestion',
    'headache', 'yellowish skin', 'dark urine', 'nausea',
    'loss of appetite', 'pain behind the eyes', 'back pain',
    'constipation', 'abdominal pain', 'diarrhoea', 'mild fever',
    'yellow urine', 'yellowing of eyes', 'acute liver failure',
    'fluid overload', 'swelling of stomach', 'swelled lymph nodes',
    'malaise', 'blurred and distorted vision', 'phlegm',
    'throat irritation', 'redness of eyes', 'sinus pressure',
    'runny nose', 'congestion', 'chest pain', 'weakness in limbs',
    'fast heart rate', 'pain during bowel movements',
    'pain in anal region', 'bloody stool', 'irritation in anus',
    'neck pain', 'dizziness', 'cramps', 'bruising', 'obesity',
    'swollen legs', 'swollen blood vessels', 'puffy face and eyes',
    'enlarged thyroid', 'brittle nails', 'swollen extremeties',
    'excessive hunger', 'extra marital contacts',
    'drying and tingling lips', 'slurred speech', 'knee pain',
    'hip joint pain', 'muscle weakness', 'stiff neck',
    'swelling joints', 'movement stiffness', 'spinning movements',
    'loss of balance', 'unsteadiness', 'weakness of one body side',
    'loss of smell', 'bladder discomfort', 'foul smell ofurine',
    'continuous feel of urine', 'passage of gases', 'internal itching',
    'toxic look (typhos)', 'depression', 'irritability', 'muscle pain',
    'altered sensorium', 'red spots over body', 'belly pain',
    'abnormal menstruation', 'dischromic patches',
    'watering from eyes', 'increased appetite', 'polyuria',
    'family history', 'mucoid sputum', 'rusty sputum',
    'lack of concentration', 'visual disturbances',
    'receiving blood transfusion', 'receiving unsterile injections',
    'coma', 'stomach bleeding', 'distention of abdomen',
    'history of alcohol consumption', 'blood in sputum',
    'prominent veins on calf', 'palpitations', 'painful walking',
    'pus filled pimples', 'blackheads', 'scurring', 'skin peeling',
    'silver like dusting', 'small dents in nails',
    'inflammatory nails', 'blister', 'red sore around nose',
    'yellow crust ooze', 'prognosis'];

const Weight = [1, 3, 4, 4, 5, 3, 3, 5, 3, 4, 3, 5, 6, 6, 4, 3, 4, 5, 3, 3, 5, 2,
    6, 5, 4, 7, 3, 4, 3, 4, 5, 3, 3, 4, 5, 4, 4, 3, 4, 4, 6, 5, 4, 4,
    6, 6, 7, 6, 6, 5, 5, 4, 5, 4, 5, 5, 7, 7, 5, 5, 6, 5, 6, 5, 4, 4,
    4, 4, 5, 5, 5, 6, 5, 5, 4, 5, 4, 4, 3, 2, 2, 4, 5, 5, 6, 4, 4, 4,
    3, 4, 5, 6, 5, 4, 5, 3, 2, 2, 2, 3, 4, 6, 6, 4, 5, 4, 5, 4, 4, 3,
    3, 5, 2, 7, 6, 4, 5, 4, 5, 6, 4, 2, 2, 2, 2, 3, 2, 2, 2, 4, 2, 3,
    5];
/* tf
exports.Prediction = async (req, res, next) => {
try {
    var listOfSymptom = req.body.symptoms;
    //listOfSymptom = [s1, s2, s3, s4, s5, s6, s7];
    console.log(listOfSymptom);

    for (var i = 0; i < listOfSymptom.length; ++i) {
        for (var j = 0; j < Symptoms.length; ++j) {
            if (listOfSymptom[i] == Symptoms[j]) {
                listOfSymptom[i] = Weight[j]
                console.log(Weight[j])
            }
        }
    }
    var userListSym = new Array(listOfSymptom)

    const trainingData = tf.tensor2d(data.map(item => [
        item.Disease, item.Symptom_1, item.Symptom_2, item.Symptom_3, item.Symptom_4, item.Symptom_5,
        item.Symptom_6, item.Symptom_7
    ]))

    const outputData = tf.tensor2d(Y)

    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [7], // four input neurons
        activation: "sigmoid",
        units: 5, //dimension of output space (first hidden layer)
    }))
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 41, //dimension of final output (setosa, virginica, versicolor)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 41, //dimension of final output (setosa, virginica, versicolor)
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(userLearningRate),
    })
    console.log(model.summary())
    //
    //Train the model and predict the results for testing data
    //
    // train/fit the model for the fixed number of epochs
    async function run() {
        const startTime = Date.now()
        //train the model
        async function run() {
            const startTime = Date.now()
            //train the model
            await model.fit(trainingData, outputData,
                {
                    epochs: userEpochs,
                    callbacks: { //list of callbacks to be called during training
                        onEpochEnd: async (epoch, log) => {
                            lossValue = log.loss;
                            console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                            elapsedTime = Date.now() - startTime;
                            console.log('elapsed time: ' + elapsedTime)
                        }
                    }
                }

            )

            const results = model.predict(userListSym);
            console.log(results);
            //

        } //end of run function
        run()
    }

} catch (error) {
    res.status(400).json({
        error,
        message: 'Failed at prediction',
    });
}

}
*/
/* svm*/
exports.Prediction = async (req, res, next) => {
    try {

        var listOfSymptom = req.body.symptoms;
        //listOfSymptom = [s1, s2, s3, s4, s5, s6, s7];
        console.log(listOfSymptom);

        for (var i = 0; i < listOfSymptom.length; ++i) {
            for (var j = 0; j < Symptoms.length; ++j) {
                if (listOfSymptom[i] == Symptoms[j]) {
                    listOfSymptom[i] = Weight[j]
                    console.log(Weight[j])
                }
            }
        }
        var userListSym = new Array(listOfSymptom)
        var options = {
            C: 0.01,
            tol: 10e-4,
            maxPasses: 10,
            maxIterations: 10000,
            kernel: 'rbf',
            kernelOptions: {
                sigma: 0.5
            }
        };
        var svm = new SVM(options);
        var features = [[0, 0], [0, 1], [1, 1], [1, 0]];
        var labels = ['a','b', 'a', 'b'];
        svm.train(features, labels);
        //svm.train(X,Y);
        var margins = svm.margin(features);
        console.log(margins);

        var pred = svm.predict(features);
        console.log(pred);
        res.status(200).json({ success: true, prediction: pred });


    } catch (error) {
        res.status(400).json({
            error,
            message: 'Failed at prediction',
        });
    }

}

/* rfc
exports.Prediction = async (req, res, next) => {
   try {

       var listOfSymptom = req.body.symptoms;
       //listOfSymptom = [s1, s2, s3, s4, s5, s6, s7];
       console.log(listOfSymptom);

       for (var i = 0; i < listOfSymptom.length; ++i) {
           for (var j = 0; j < Symptoms.length; ++j) {
               if (listOfSymptom[i] == Symptoms[j]) {
                   listOfSymptom[i] = Weight[j]
                   console.log(Weight[j])
               }
           }
       }
       var userListSym = new Array(listOfSymptom)

       var rf = new RandomForestClassifier({n_estimators:700,verbose:4});
       console.log('training model');
       rf.fit(data,null,'Disease',function(err,trees){
           var pred = rf.predict(userListSym,trees);
           console.log(pred)
           res.status(200).json({ success: true, prediction: pred });
       })
      
       
   } catch (error) {
       res.status(400).json({
           error,
           message: 'Failed at prediction',
       });
   }

}*/

/*exports.Prediction = async (req, res, next) => {
    try {

        var listOfSymptom = req.body.symptoms;
        //listOfSymptom = [s1, s2, s3, s4, s5, s6, s7];
        console.log(listOfSymptom);

        for (var i = 0; i < listOfSymptom.length; ++i) {
            for (var j = 0; j < Symptoms.length; ++j) {
                if (listOfSymptom[i] == Symptoms[j]) {
                    listOfSymptom[i] = Weight[j]
                    console.log(Weight[j])
                }
            }
        }
        var result = new Array(listOfSymptom)
        console.log('loading file')
        const file = fs.readFileSync('./controllers/rfc_model.pkl', {encoding:'binary'});
        
        console.log('model loading')
        const model = jpickle.loads(file)

        //console.log(model)

        var pred = model.predict(result)
        console.log(pred)
        res.status(200).json({ success: true, prediction: pred[0] });
    } catch (error) {
        res.status(400).json({
            error,
            message: 'Failed at prediction',
        });
    }

}*/