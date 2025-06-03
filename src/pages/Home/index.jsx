import React from "react";

const ComingSoon = () => {
  return (
    <div
      className="main-area center-text"
      style={{
        backgroundImage: "url('/images/comingsoon_bg.jpg')",
        position: "relative",
        height: "100vh",
        zIndex: 1,
        padding: "0 20px",
        backgroundSize: "cover",
        color: "#fff",
      }}
    >
      <style>{`
        html, body {
          font-size: 16px;
          font-family: 'Open Sans', sans-serif;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          word-wrap: break-word;
          overflow-x: hidden;
          color: #333;
        }

        h1, h2, h3 {
          font-family: 'Poppins', sans-serif;
        }

        .main-area::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
          opacity: 0.4;
          background: #000;
        }

        .center-text {
          text-align: center;
        }

        .display-table {
          display: table;
          height: 100%;
          width: 100%;
        }

        .display-table-cell {
          display: table-cell;
          vertical-align: middle;
        }

        .title {
          font-size: 3.5em;
          line-height: 1;
        }

        .desc {
          margin: 20px auto;
          max-width: 500px;
          line-height: 1.6;
          font-size: 1.05em;
          color: #fff;
        }

        .announcement {
          font-size: 1.2em;
          max-width: 800px;
          margin: 40px auto 20px;
          line-height: 1.8;
          font-weight: bold;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
        }

        .font-white {
          color: #fff;
        }

        .social-btn {
          position: absolute;
          bottom: 40px;
          width: 100%;
          left: 50%;
          transform: translateX(-50%);
        }

        .social-btn li {
          list-style: none;
          display: inline-block;
        }

        .social-btn li a {
          margin: 0 10px;
          padding-bottom: 7px;
          position: relative;
          overflow: hidden;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s;
        }

        .social-btn li a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #F84982;
          transition: all 0.2s;
        }

        .social-btn li a:hover::after {
          transform: translateX(100%);
        }
      `}</style>

      <div className="display-table">
        <div className="display-table-cell">
          {/* 🎯 Announcement Block */}
          <div className="announcement">
            NFT Drop scheduled for week June 9th 2025. <br />
            Watch the explainer video, read the Rainbow Paper and reserve a coin here: <br />
            <a
              href="https://linktr.ee/TheLeprechaunsWish"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#00f7ff', textDecoration: 'underline' }}
            >
              https://linktr.ee/TheLeprechaunsWish
            </a>
          </div>

          {/* 🌐 Social Links */}
          <ul className="social-btn font-white">
            <li>
              <a href="https://x.com/LeprechaunsWish" target="_blank" rel="noopener noreferrer">twitter</a>
            </li>
            <li>
              <a href="https://discord.gg/thefairyrealm" target="_blank" rel="noopener noreferrer">discord</a>
            </li>
            <li>
              <a href="https://t.me/TheLeprechaunsWish" target="_blank" rel="noopener noreferrer">telegram</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
