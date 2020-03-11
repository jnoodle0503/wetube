/* eslint-disable prettier/prettier */
import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback, kakaoLoginCallback } from "./controllers/userController";
import routes from "./routes";

// 이봐, passport 야! strategy 를 하나 사용해!
// strategy 란 로그인하는 방법이다
// 예를 들어, 사용자이름과 이메일로그인, 페이스북 로그인, 깃헙 로그인 등등...
// 아래는 local 방식(username 과 email 인증 방식)
passport.use(User.createStrategy());

// 아래는 Github 인증 방식
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

passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KA_ID,
            clientSecret: "",
            callbackURL: "http://localhost:4000/oauth"
        },
        kakaoLoginCallback
    )
);

// -----------------------------------  페이스북 격리  -----------------------------------------
// 아래는 Facebook 인증 방식
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_ID,
            clientSecret: process.env.FB_SECRET,
            callbackURL: `http://localhost:4000${routes.facebookCallback}`,
            profileFields: ["id", "displayName", "photos", "email"],
            scope: ["public_profile", "email"]
        },
        facebookLoginCallback
    )
);
// -----------------------------------  페이스북 격리  -----------------------------------------


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
