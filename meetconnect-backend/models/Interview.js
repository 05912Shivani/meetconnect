const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }, // ✅ Add this line
  interviewer: { type: String, required: true },
  resources: { 
    type: [{ title: String, link: String }], // Ensuring an array of objects with title & link
    default: [] 
  }
}, { timestamps: true });

module.exports = mongoose.model('Interview', InterviewSchema);



