import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
  videoDetail,
  deleteVideo
} from "../controllers/videoController";
// eslint-disable-next-line import/no-unresolved
import { uploadVideo } from "../middleWares";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// VideoDelete
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
