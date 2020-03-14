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
import { uploadVideo, onlyPrivate } from "../middleWares";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Video Edit
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// VideoDelete
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
