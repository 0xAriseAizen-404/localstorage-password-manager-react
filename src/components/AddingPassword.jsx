import { useState } from "react";
import { toast } from "react-toastify";
import GlobalLineIcon from "remixicon-react/GlobalLineIcon";
import UserLineIcon from "remixicon-react/LockLineIcon";
import LockLineIcon from "remixicon-react/LockLineIcon";

export const AddingPassword = () => {
  const [data, setData] = useState({
    title: "",
    password: "",
    url: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.title === "" || data.password === "" || data.url === "") {
      return toast.error("Please fill all the fields");
    }
    // Add data to localstorage (consider secure storage instead)
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords.push(data);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    toast.success("Added successfully");
    setData({
      title: "",
      password: "",
      url: "",
    });
  };

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form className="AddingPassword">
      <h2>Add New Password</h2>
      <div className="form-group">
        <label htmlFor="title">Enter Title : </label>
        <div className="input-con">
          <div className="icon-con">
            <GlobalLineIcon className="icon" />
          </div>
          <input
            type="text"
            placeholder="Ex. instagram"
            id="title"
            value={data.title}
            onChange={(e) => handleInput(e)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Enter Password :</label>
        <div className="input-con">
          <div className="icon-con">
            <UserLineIcon className="icon" />
          </div>
          <input
            type="password" // Use type="password" to hide characters
            placeholder="Ex. password123"
            id="password"
            value={data.password}
            onChange={(e) => handleInput(e)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="url">Enter URL of the site : </label>
        <div className="input-con">
          <div className="icon-con">
            <LockLineIcon className="icon" />
          </div>
          <input
            type="text"
            placeholder="Ex. https://instagram.com"
            id="url"
            value={data.url}
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>
      <p>
        <u>Note:</u> Please consider using a more secure storage mechanism for
        passwords. Local Storage is not recommended.
      </p>
      <div className="form-group">
        <button type="submit" onClick={(e) => submitHandler(e)}>
          Add Password
        </button>
      </div>
    </form>
  );
};
