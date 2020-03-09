import passport from "passport";
import User from "./models/User";

// 이봐, passport 야! strategy 를 하나 사용해!
// strategy 란 로그인하는 방법이다
// 예를 들어, 사용자이름과 이메일로그인, 페이스북 로그인, 깃헙 로그인 등등...
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
