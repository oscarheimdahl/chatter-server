const Message = require('./models/messages');
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/chatter',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED TO DB');
});

async function save(msg) {
  const message = new Message({
    content: msg.content,
    username: msg.username,
    userID: msg.userID,
    time: msg.time,
    _id: mongoose.Types.ObjectId()
  });
  message
    .save()
    .then()
    .catch(err => console.log(err));
}

async function getAll(msg) {
  const allMessages = await Message.find()
    .exec()
    .then(res => res);
  return allMessages;
}

module.exports = {
  getAll,
  save
};
