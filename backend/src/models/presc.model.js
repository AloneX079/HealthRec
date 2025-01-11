const mongoose = require("mongoose");

const prescSchema = new mongoose.Schema(
  {
    doctorid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctor: {
      type: String,
    },
    illness: {
      type: String,
    },
    prescription: {
      type: String,
    },
    prescribedTest: {
      type: String,
    },
    testResults: {
      type: String,
    },
  },
  { timestamps: true }
);

const Presc = mongoose.model("Presc", prescSchema);
module.exports = Presc;
