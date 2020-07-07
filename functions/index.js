const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, ctx) => {
    if(!ctx.auth.token.admin){
        return { ok: false, message: 'role error'}
    } else {
        admin.auth().getUserByEmail(data.email).then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            }).then(() => console.log('success...'))
        }).catch(console.log)
    }
})