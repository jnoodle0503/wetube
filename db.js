// mongoose 모듈 가져오기
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// we-tubeDB 세팅
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// 연결된 we-tubeDB 사용
const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log(`❌ Error on DB Connection: ${error}`);

// 연결 성공
db.once("open", handleOpen);

// 연결 실패
db.on("error", handleError);
