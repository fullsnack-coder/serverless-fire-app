const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, ctx) => {
  if (!ctx.auth.token.admin) {
    return { ok: false, message: "Only admins can grant privileges" };
  }
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin
        .auth()
        .setCustomUserClaims(user.uid, {
          admin: true,
        })
        .then(() => ({
          message: `Success, the user with email: ${data.email} is admin`,
        }));
    })
    .catch(console.log);
});
