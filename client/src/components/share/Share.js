import React, { useContext, useEffect, useRef, useState } from "react";
import sh from "./Share.module.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function Share({setreload}) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const descRef = useRef();
  const [file, setFile] = useState(null);


  const handlesubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    };

    // if there is a file create new FormData indicate file and name and upload it
    if (file) {
      // to prevent conflict in filename users can upload file with same name can create conflicts ,Date.now() will create some numbers according to current date along with file.name

      const fileName = Date.now() + file.name;
      const data = new FormData();
      data.append("name", fileName);
      data.append("file", file);

      // add one more attribute img to newPost that is fileName
      newPost.img = fileName;

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("/posts/create", newPost);
      // we can craete postContext also and update post state
      
setreload(true);
descRef.current.value=""
setFile(null)
      
    } catch (error) {}
  };
  return (
    <div className={sh.share}>
      <div className={sh.shareWrapper}>
        <div className={sh.shareTop}>
          <img
            className={sh.shareProfileImg}
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`Whats in your mind ${user.username} ?`}
            className={sh.shareInput}
            ref={descRef}
          ></input>
        </div>
        <hr className={sh.shareHr}></hr>
        {file && (
          <div className={sh.shareImgContainer}>
            {/* URL.createObjectURL allows us to create pseudo url to view file before uploading  */}
            <img
              className={sh.shareImg}
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Cancel
              className={sh.shareCancelImg}
              onClick={() => setFile(null)}
            />
          </div>
        ) }
        <form className={sh.shareBottom} onSubmit={handlesubmit}>
          <div className={sh.shareOptions}>
            <label htmlFor="file" className={sh.shareOption}>
              <PermMedia
                htmlColor="tomato"
                className={sh.shareIcon}
              ></PermMedia>
              <span className={sh.shareOptionText}>Photo or Video</span>
              {/* to upload only 1 file at a time e.target.files[0]*/}
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className={sh.shareOption}>
              <Label htmlColor="blue" className={sh.shareIcon}></Label>
              <span className={sh.shareOptionText}>Tag</span>
            </div>
            <div className={sh.shareOption}>
              <Room htmlColor="green" className={sh.shareIcon}></Room>
              <span className={sh.shareOptionText}>Location</span>
            </div>
            <div className={sh.shareOption}>
              <EmojiEmotions
                htmlColor="goldenrod"
                className={sh.shareIcon}
              ></EmojiEmotions>
              <span className={sh.shareOptionText}>Feelings</span>
            </div>
          </div>
          <button className={sh.shareButton} type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
