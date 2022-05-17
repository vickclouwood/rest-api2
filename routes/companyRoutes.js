const express = require("express");
const { Collection } = require("mongoose");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { default: mongoose } = require("mongoose");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

router.post("/fetchCompanies", (req, res) => {
  //res.status(200).json({ message: "Set goals" });
  let _id = req.body.id;
  let seed = req.body.seed;

  // write down a mongobdb find query
  //   database
  //     .collection("company")
  //     .find({ _id: "23432", seed: "asdfas" }, (err, result) => {
  //       if (err) {
  //         res.status(500).json({ success: false, reason: "Invalid Session" });
  //       } else {
  //         res.status(200).json({ success: true, companies: result });
  //       }
  //     });
  // });

  const document = database.collection("users").find({ _id: _id, seed: seed });
  console.log(document);

  if (document) {
    //Update mongo document, set seed = seed where id = id
    res.status(200).json({ success: true, seed: document });
  } else res.status(200).json({ success: false, reason: "Invalid Session" });
});

module.exports = router;
