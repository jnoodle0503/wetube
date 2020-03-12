import Video from "../models/Video";

// eslint-disable-next-line import/no-cycle
import routes from "../routes";

// render 함수의 첫번째 인자값은 템플릿파일이며, 두번째 인자값은 템플릿에 추가할 정보가 담길 객체이다

// Home
export const home = async (req, res) => {
  try {
    // find함수는 Video 테이블에 있는 모든 데이터 가져온다
    // MySQL 의 select 문법처럼 사용하면된다
    // 인자값에는 where 문법처럼 사용하면 된다
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.rend("home", { pageTitle: "Home", videos: [] });
  }
};

// Video Search
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;

  let videos = [];

  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// Video Get Upload
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

// Video Post Upload (실제 DB 에 Video 정보 저장됨)
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  // Video 테이블에 데이터 생성 (정보 생성)
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    // populate 함수는 ObjectId 에만 반응하며, 해당 Id 내의 정보를 객체형태로 반환한다
    const video = await Video.findById(id).populate("creator");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Get Edit Video (수정할 Video 정보 가져옴)
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Post Edit Video (실제 DB 에 있는 Video 정보 수정)
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }

  res.redirect(routes.home);
};
