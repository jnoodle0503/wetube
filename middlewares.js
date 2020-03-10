import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;

  // 여기서 req.user 는 passport 패키지에서 설정해준 객체이다
  // 즉, passport 에서 request 객체에 user 라는 객체를 만들어주고 그안에 사용자의 로그인 정보가 담겨있다
  res.locals.user = req.user || null;

  console.log(req.user);
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
