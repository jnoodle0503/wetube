import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// 스키마 생성
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

// 스키마 생성 후 passport-local-mongoose 모듈을 사용하기 위해선
// mongoose schema 의 plugin 함수를 사용한다
// 첫번째 인자값으로 passportLocalMongoose 를 넣어주고
// 두번재 인자값으로는 passportLocalMongoose 에 관한 설정객체가 들어간다
// 설정객체에는 인증을 진행하기위해 사용할 필드명을 넣어주면 된다
// passportLocalMongoose 의 설정객체에 관한 더 자세한 내용은 아래의 페이지에서
// “Main Options” 부분을 참고하자
// https://www.npmjs.com/package/passport-local-mongoose
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
