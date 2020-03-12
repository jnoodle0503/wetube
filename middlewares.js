import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;

  // 여기서 req.user 는 passport 패키지에서 설정해준 객체이다
  // 즉, passport 에서 request 객체에 user 라는 객체를 만들어주고 그안에 사용자의 로그인 정보가 담겨있다
  res.locals.loggedUser = req.user || null;

  //console.log(req.user);
  next();
};

// 경로 제한을 위한 미들웨어

// 로그아웃 상태에서만 들어갈 수 있음
// 예를 들어, 로그인 상태에서 회원가입, 로그인 등등 경로 제한
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// 로그인 상태에서만 들어갈 수 있는 경로 설정
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
