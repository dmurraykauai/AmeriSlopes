const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MountainSchema = new Schema({
  title: {type: String},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  runs: [{
    type: Schema.Types.ObjectId,
    ref: 'run'
  }]
});

MountainSchema.statics.addRun = function(id, content) {
  const Run = mongoose.model('run');

  return this.findById(id)
    .then(mountain => {
      const run = new Run({content, mountain});
      mountain.runs.push(run);
      return Promise.all([run.save(), mountain.save()])
        .then(([run, mountain]) => mountain);
    });
};

MountainSchema.statics.findRuns = function(id) {
  return this.findById(id)
    .populate('runs')
    .then(mountain => mountain.runs);
};

mongoose.model('mountain', MountainSchema);