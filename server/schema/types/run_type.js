const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const Run = mongoose.model('run');

const RunType = new GraphQLObjectType({
  name: 'RunType',
  fields: () => ({
    id: {type: GraphQLID},
    likes: {type: GraphQLInt},
    content: {type: GraphQLString},
    mountain: {
      type: require('./mountain_type'),
        resolve(parentValue) {
        return Run.findById(parentValue).populate('mountain')
          .then(run => {
            //console.log(run);
            return run.mountain
          });
        }
    }
  })
});

module.exports = RunType;

