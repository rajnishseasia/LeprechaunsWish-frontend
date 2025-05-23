
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
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
          <h1 className="title font-white">
            <b>Coming Soon</b>
          </h1>
          <p className="desc font-white">
            {/* Our website is currently undergoing scheduled maintenance. */}
            We are getting ready to share the magic.
            <br />
            {/* We should be back shortly. Thank you for your patience. */}
            Stay tuned          </p>
          <ul className="social-btn font-white">
            {/* <li><a href="#">facebook</a></li> */}
            <li><a href="#">twitter</a></li>
            {/* <li><a href="#">google</a></li> */}
            <li><a href="#">discord</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
