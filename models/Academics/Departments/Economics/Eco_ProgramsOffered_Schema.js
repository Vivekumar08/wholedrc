const mongoose = require('mongoose');

const Eco_ProgramsOffered_Schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      required: true,
      trim: true
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Eco_ProgramsOffered = mongoose.model('Eco_ProgramsOffered', Eco_ProgramsOffered_Schema);

module.exports = Eco_ProgramsOffered;