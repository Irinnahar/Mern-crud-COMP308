
var X = require('./machine-learning/X_data.json');
var Y = require('./machine-learning/Y_data.json');
var Y_number = require('./machine-learning/Y_number.json');
var data = require('./machine-learning/data.json');
const { RandomForestClassifier, RandomForestRegressor } = require('random-forest')

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

/* rfc*/
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
        const rf = new RandomForestClassifier({
            nEstimators: 100,
            maxDepth: 10,
            maxFeatures: 'auto',
            minSamplesLeaf: 5,
            minInfoGain: 0,
        })
        rf.train(X, Y)
        const ypred = rf.predict(userListSym)
        console.log(ypred)
        res.status(200).json({ success: true, prediction: ypred });

    } catch (error) {
        res.status(400).json({
            error,
            message: 'Failed at prediction',
        });
    }

}
