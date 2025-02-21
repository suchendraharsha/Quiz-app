import React, { useState, useEffect, useRef } from "react";
import "./QuizNavbar.css";
import diamond from "../../Images/diamond.png";
import { openDB, deleteDB, wrap, unwrap } from "idb";
import { Link, useNavigate } from "react-router-dom";

const QuizNavbar = ({ totalTests }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Rumi Aktar");
  const [userId, setUserId] = useState("ID-1809");
  const [profilePicture, setProfilePicture] = useState("path/to/profile.jpg");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingId, setIsEditingId] = useState(false);
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const nameInputRef = useRef(null);
  const idInputRef = useRef(null);
  const profilePictureInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const dbPromise = useRef(null);

  useEffect(() => {
    const initDB = async () => {
      dbPromise.current = await openDB("quizUserData", 1, {
        upgrade(db) {
          db.createObjectStore("user");
        },
      });
      await loadUserData();
    };

    initDB();
  }, []);

  const loadUserData = async () => {
    if (!dbPromise.current) return;
    const db = dbPromise.current;
    const tx = db.transaction("user", "readonly");
    const store = tx.objectStore("user");
    const storedName = await store.get("userName");
    const storedId = await store.get("userId");
    const storedProfilePicture = await store.get("profilePicture");

    if (storedName) setUserName(storedName);
    if (storedId) setUserId(storedId);
    if (storedProfilePicture) setProfilePicture(storedProfilePicture);
  };

  const saveUserData = async (name, id, profilePic) => {
    if (!dbPromise.current) return;
    const db = dbPromise.current;
    const tx = db.transaction("user", "readwrite");
    const store = tx.objectStore("user");
    await store.put(name, "userName");
    await store.put(id, "userId");
    await store.put(profilePic, "profilePicture");
  };

  const handleNameDoubleClick = () => {
    setIsEditingName(true);
    setTimeout(() => nameInputRef.current.focus(), 0);
  };

  const handleIdDoubleClick = () => {
    setIsEditingId(true);
    setTimeout(() => idInputRef.current.focus(), 0);
  };

  const handleProfilePictureDoubleClick = () => {
    setIsEditingProfilePicture(true);
    setTimeout(() => fileInputRef.current.click(), 0);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
    saveUserData(userName, userId, profilePicture);
  };

  const handleIdBlur = () => {
    setIsEditingId(false);
    saveUserData(userName, userId, profilePicture);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        saveUserData(userName, userId, reader.result);
        setIsEditingProfilePicture(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNameBlur();
    }
  };

  const handleIdKeyDown = (e) => {
    if (e.key === "Enter") {
      handleIdBlur();
    }
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <nav className="quiz-navbar">
      <div className="navbar-content">
        <div className="user-info">
          <div className="navbar-section">
            
              <button onClick={handleBack} className="back-arrow1">
                ← {/* Left arrow symbol */}
              </button>
            </div>
            
              <div
                className="profile-picture"
                onDoubleClick={handleProfilePictureDoubleClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfilePictureChange}
                  accept="image/*"
                />
                <img src={profilePicture} alt="Profile" />
              </div>
              <div className="user-details">
                {isEditingName ? (
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                    className="edit-input"
                  />
                ) : (
                  <span
                    className="user-name"
                    onDoubleClick={handleNameDoubleClick}
                  >
                    {userName}
                  </span>
                )}
                {isEditingId ? (
                  <input
                    ref={idInputRef}
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    onBlur={handleIdBlur}
                    onKeyDown={handleIdKeyDown}
                    className="edit-input"
                  />
                ) : (
                  <span className="user-id" onDoubleClick={handleIdDoubleClick}>
                    {userId}
                  </span>
                )}
              </div>
            
          
        </div>
        <div className="score-info">
          <div className="score-label">
            <img src={diamond} alt="logo" className="diamond_img" />
            {totalTests} Tests Taken
          </div>
        </div>
      </div>
    </nav>
  );
};

export default QuizNavbar;
