import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// 회원가입 페이지
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

// 사용자 회원가입 DB 정보 생성
export const postJoin = async (req, res, next) => {
  // console.log(req.body)
  // request 객체의 body 객체에 form을 통해 보낸 사용자의 정보들을 저장한다
  // 전송한 정보가 어떤것인지 알 수 있는 방법은 expressjs 모듈중 bodyparser 로 알 수 있다

  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });

      // 비밀번호 암호화 후, 사용자 등록
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

// 로그인 페이지
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

// 로그인 인증
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

// 사용자를 github 로 보내주는 과정 (github 에 인증요청)
// github 에 인증요청을 마친 후, github 에서는 callbakc URL 을 보내준다
// 여기선 /auth/github/callback 이주소다
export const githubLogin = passport.authenticate("github");

// Github 에서 로그인 후, 돌아오는(WeTube 사이트로) 과정
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;

  try {
    // github 에 등록된 이메일과 WeTube 에 가입한 이메일이 동일할 때의 상황
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

// Github 인증 성공 후 홈 화면으로...
export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

// 카카오톡 로그인 인증
export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, kakaoProfile, cb) => {
  const {
    _json: {
      id,
      properties: { nickname: name },
      kakao_account: {
        profile: { profile_image_url: avatarUrl },
        email
      }
    }
  } = kakaoProfile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

// -----------------------------------  페이스북 격리  -----------------------------------------
// Facebook 인증
export const facebookLogin = passport.authenticate("facebook");

// 페이스북 라이브 상태 문제 해결되면 코드 수정해야함
export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: null
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
// 페이스북 라이브 상태 문제 해결되면 코드 수정해야함

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};
// -----------------------------------  페이스북 격리  -----------------------------------------

// 로그아웃
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// 사용자 정보
export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

// 사용자 정보
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// 프로필 수정
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  console.log(req.body);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

// 비밀번호 변경
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
