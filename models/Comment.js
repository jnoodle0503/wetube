import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  creator: {
    // 테이블 내의 정보 ID
    // User 테이블의 ObjectId 를 저장함
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
