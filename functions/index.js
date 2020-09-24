const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

admin.initializeApp();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const idToken = req.headers.authorization.split(" ")[1];
    await admin
      .auth()
      .verifyIdToken(idToken)
      .then(function(decodedToken) {
        if (!decodedToken.admin) {
          return res
            .status(403)
            .send("Authorization failed. You are not allowed here.");
        }
        res.locals.user = decodedToken;
        // TODO: Figure out a better way to init admin users
        //admin.auth().setCustomUserClaims(decodedToken.uid, {admin: true});
        console.log(decodedToken);
        next();
      })
      .catch(function(error) {
        console.log(error);
        return res.status(403).send("Authorization failed verification");
      });
  } else {
    return res.status(403).send("Authorization missing from header");
  }
});

app.get("/", (req, res) => {
  res.json({ hello: "World" });
});

app.get("/me", (req, res) => {
  res.json({ hello: "World" });
});

app.get("/users", async (req, res) => {
  const results = await admin.auth().listUsers();
  res.json(results.users);
});

app.post("/users/admin/grant", async (req, res) => {
  const uid = req.body.uid;
  const adminRole = req.body.admin;
  await admin.auth().setCustomUserClaims(uid, { admin: adminRole });
  res.json("ok");
});

exports.adminPortal = functions.https.onRequest(app);
