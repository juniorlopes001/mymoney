const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.soma = functions.database.ref('/movimentacoes/{dia}').onWrite(async(change, context) => {
    const mesesRef = admin.database().ref('/meses'+context.params.dia);
    const movimentacoesRef = change.after.ref
    const movimentacoesSnapShot = await movimentacoesRef.once('value')
    const movimentacoes = movimentacoesSnapShot.val()
    let entradas = 0;
    let saidas = 0;

    Object.keys(movimentacoes).forEach(m => {
        if(movimentacoes[m].valor >0 ){
            entradas += movimentacoes[m].valor
        } else {
            saidas += movimentacoes[m].valor
        }
    })

    return mesesRef.transaction(current => {
        if(current === null) {
            return {
                entradas,
                saidas,
                previsao
            }
        }
    })

});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
