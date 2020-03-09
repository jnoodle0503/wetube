import dotenv from "dotenv";
import "./db";
import app from "./app";

// MongoDB에 현재의 Mongoose 모델들을 인식시키는 것이 모델을 '등록'하는 것과 같다.
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
