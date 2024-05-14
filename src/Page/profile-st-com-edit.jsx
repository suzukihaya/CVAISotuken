import React, { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

export function SCEdit() {
  useEffect(() => {
    document.title = "プロフィール";
  }, []);

  return (
    <>
      <header className="header" style={{ textAlign: "center" }}>
        <h1>プロフィール編集画面</h1>
      </header>
      <div className="main">
        <div className="left-border">
          <p>
            <br />
            ・すんばらしぃ
          </p>
          <p>
            ・
            <font size="3.5">
              <Link to="/profile-st">個人情報</Link>
            </font>
          </p>
        </div>
        <div className="down-border">
          <p>できてほしい</p>
        </div>
      </div>
    </>
  );
}
