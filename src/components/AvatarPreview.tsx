import { useContext } from "react";
import "../styles/avatarPreview.css";
import { AvatarContext } from "../context";
import { buildURL } from "../Services";

const AvatarPreview = () => {
  const { avatarOptions } = useContext(AvatarContext);

  return (
    <div className="avatar_preview_container">
      <div className="avatar_preview">
        <img src={buildURL(avatarOptions)} alt="avatar" />
      </div>
    </div>
  );
};

export default AvatarPreview
