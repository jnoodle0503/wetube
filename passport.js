import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

// 이봐, passport 야! strategy 를 하나 사용해!
// strategy 란 로그인하는 방법이다
// 예를 들어, 사용자이름과 이메일로그인, 페이스북 로그인, 깃헙 로그인 등등...
passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

/*
아래 코드를 사용했을 때 에러가 났다
"Error: Failed to serialize user into session" 
아마도 "passport-local-mongoose" 패키지의 버그같다고 한다
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/

// 아래의 코드는 위의 코드와 동일한 의미를 가진다
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
