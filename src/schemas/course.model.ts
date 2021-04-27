const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  link: [
    {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  comment: {
    type: String,
  },
  rating: {
    type: Number,
  },
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
