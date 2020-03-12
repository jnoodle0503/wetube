import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      // 테이블 내의 정보 ID
      // Comment 테이블의 ObjectId 를 저장함
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  creator: {
    // 테이블 내의 정보 ID
    // User 테이블의 ObjectId 를 저장함
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model("Video", VideoSchema);

export default model;
