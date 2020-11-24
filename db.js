const { connect } = require("mongoose");

exports.dbConnect = async () => {
  try {
    await connect(process.env.DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("DB CONNECTED");
  } catch (e) {
    if (e) {
      console.log(e.message);
    }
  }
};
