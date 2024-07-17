const mongoose = require("mongoose");

const { Schema } = mongoose;

//mongoos 도 시퀄처럼 _id는 기본적으로 생력함
const userSchema = new Schema({
  name: {
    type: String,
    required: true, // 옵션들
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//model 사용
module.exports = mongoose.model("User", userSchema);
