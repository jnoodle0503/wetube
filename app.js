import express from "express";
import morgan from "morgan"; // 어플리케이션에서 발생하는 모든 일을 logging 해주는 모듈
import helmet from "helmet"; // 어플리케이션을 안전하게 만들어주는 모듈
import cookieParser from "cookie-parser"; // Cookie를 관리해주는 모듈
import bodyParser from "body-parser"; // 사용자가 웹사이트로 전달하는 정보들을 검사하는 모듈
import passport from "passport";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import "./passport";

const app = express();

app.use(helmet());

app.set("view engine", "pug");
// view engine (템플릿 엔진) 을 pug로 사용하기 위한 설정

app.use("/uploads", express.static("uploads"));
// 정적 경로 설정 (지정된 경로에서 파일을 가져온다)

app.use("/static", express.static("static"));

app.use(cookieParser());
// cookie-parser 모듈 내부에 있는 미들웨어이며, 실질적으로 Cookie를 전달받아서 사용할 수 있도록 해주는 미들웨어

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 사용자가 웹사이트로 전달하는 정보들을 검사하며,
// 위의 코드같은 경우는 웹사이트로 전달되는 정보중 body 내부에 form 형태또는 json 형태인지를 검사한다
// 참고로 전달된 정보는 request 객체에 저장된다

app.use(morgan("dev"));
// 어플리케이션을 logging 해주며, logging 의 범위를 설정할 수 있다

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
