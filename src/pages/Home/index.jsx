import React from "react";
import "./styles.css"
const ComingSoon = () => {
  return (
    <div
      className="main-area center-text"
      style={{
        backgroundImage: "url('/images/rainbowpaper.png')",
        position: "relative",
        height: "100vh",
        zIndex: 1,
        padding: "0 20px",
        backgroundSize: "cover",
        color: "#fff",
      }}
    >
      <style>{`
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

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
          max-width: 100%;
          margin: auto;
          line-height: 1.8;
          font-weight: bold;
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.6);

          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center;     /* Center vertically */
          gap: 20px;               /* Space between divs */
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
          color: #facc15;
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

        {/* 🎯 Announcement Block */}
        <div className="announcement flex gap-4 p-6">
          <button
            className="btn neon-btn neon-orange"
            onClick={() => window.open("https://youtu.be/zVY7zPQ8dXMT", "_blank")}
          >
            INTRO VIDEO
          </button>

          <button
            className="btn neon-btn neon-orange"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1Sos-oWMoLfBMVwXkCcIIdZzRjlqWHhng/view?usp=sharing",
                "_blank"
              )
            }
          >
            THE RAINBOW PAPER
          </button>

          <button 
          className="btn neon-btn neon-orange"
          onClick={() =>
            window.open("https://docs.google.com/forms/d/1uBmZAPTvNVAiPV_srBo5vit4S8GGF1gTLCSsX3fguaY/viewform?pli=1&pli=1&edit_requested=true",
              "_blank"
            )
            }
          >
            RESERVE A COIN
          </button>
        </div>
        {/* 🌐 Social Links */}
        <ul className="social-btn font-semibold space-y-2 text-xl">
          <li>
            <a href="https://x.com/LeprechaunsWish" target="_blank" rel="noopener noreferrer">
              twitter
            </a>
          </li>
          <li>
            <a href="https://discord.gg/thefairyrealm" target="_blank" rel="noopener noreferrer">
              discord
            </a>
          </li>
          <li>
            <a href="https://t.me/TheLeprechaunsWish" target="_blank" rel="noopener noreferrer">
              telegram
            </a>
          </li>
        </ul>


    </div>
  );
};

export default ComingSoon;