/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const admin = require("firebase-admin");
// const {onRequest} = require("firebase-functions/https");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors  = require("cors")({origin: true});


admin.initializeApp();


setGlobalOptions({ maxInstances: 10 });

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
        const booksCollection = admin.firestore().collection('books'); 
        const snapshot = await booksCollection.get();
        const bookCount = snapshot.size;

    //   const booksSnapshot = await admin.firestore().collection('books').get();
    //   const bookCount = booksSnapshot.size;

      res.status(200).json({ count: bookCount });
    } catch (error) {
      logger.error("Error counting books:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});