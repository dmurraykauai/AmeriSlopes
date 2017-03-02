const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RunSchema = new Schema({
  mountain: {
    type: Schema.Types.ObjectId,
    ref: 'mountain'
  },
  likes: {type: Number, default: 0},
  content: {type: String}
});

RunSchema.statics.like = function(id) {
  const Run = mongoose.model('run');

  return Run.findById(id)
    .then(run => {
      ++run.likes;
      return run.save();
    })
};

mongoose.model('run', RunSchema);
