import EyeFillIcon from "remixicon-react/EyeFillIcon";
import EyeOffLineIcon from "remixicon-react/EyeOffFillIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import { useState } from "react";

export const PasswordCard = ({ password, data, setData }) => {
  const [isShown, setIsShown] = useState(false);

  const toggleShowPassword = () => setIsShown((prev) => !prev);

  const deletePasswordHandler = (title) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete the password for "${title}"?`
    );

    if (confirmation) {
      const filteredData = data.filter((item) => item.title !== title);
      setData(filteredData);
      localStorage.setItem("passwords", JSON.stringify(filteredData));
    }
  };

  const encryptPassword = () => {
    return "*".repeat(password.password.length);
  };

  const formatUrl = (url) => {
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  return (
    <div className="password-card">
      <div className="top">
        <div className="title">{password.title}</div>
        <a
          href={formatUrl(password.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          open link
        </a>
      </div>
      <hr />
      <div className="bottom">
        <div className="show-password-con">
          <div className="password">
            {isShown ? password.password : encryptPassword()}
          </div>
          {isShown ? (
            <EyeFillIcon className="icon" onClick={toggleShowPassword} />
          ) : (
            <EyeOffLineIcon className="icon" onClick={toggleShowPassword} />
          )}
        </div>
        <button
          className="delete-icon"
          onClick={() => deletePasswordHandler(password.title)}
        >
          <DeleteBinLineIcon className="icon" size={24} />
        </button>
      </div>
    </div>
  );
};
