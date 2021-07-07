import mongoose from 'mongoose';

const db = {
  server: 'mongodb',
  port: 27017,
  name: 'transaction-parser',
  user: 'admin',
  pass: 'password',
};

const connectionStr = `mongodb://${db.server}:${db.port}/${db.name}`;

mongoose.connect(connectionStr, {
  auth: {
    user: db.user,
    password: db.pass,
  },
  authSource: 'admin',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

export default mongoose;
