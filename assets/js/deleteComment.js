import axios from "axios";

const deleteComment = document.getElementsByClassName("jsDeleteComment");
const deleteCommentBtn = document.getElementsByClassName("jsDeleteCmtBtn");
const hiddenCmtId = document.getElementsByClassName("commentId");

const handleSubmit = async event => {
  const {
    target: {
      elements: {
        1: { value }
      }
    }
  } = event;

  for (let i = 0; i < hiddenCmtId.length; i++) {
    if (value == hiddenCmtId[i].value) {
      await axios({
        url: `/api/${value}/delete`,
        method: "POST"
      });
    }
  }
  /*
  await axios({
    url: `/api/${commentId}/delete`,
    method: "POST"
  });
  */
};

const handleClick = () => {
  for (let i = 0; i < deleteComment.length; i++) {
    deleteComment[i].addEventListener("submit", handleSubmit);
  }
};

function init() {
  for (let i = 0; i < deleteComment.length; i++) {
    deleteCommentBtn[i].addEventListener("click", handleClick);
    hiddenCmtId[i].addEventListener("click", handleClick);
  }
}

if (deleteComment) {
  init();
}
