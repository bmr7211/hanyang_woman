// /Users/shinji81/Downloads/my-app/src/component/Home.js
// 담당 : 수인
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./Home.css";
import Search from "./Search";
import Detail from "./Detail";

function Home() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="username">
                User 님
                <img src="/images/mainIcon.png" alt="Main Icon" className="main-icon" />

                <Link to="/Search"> 
                  <img src="/images/searchIcon.png" alt="Search Icon" className="search-icon" />
                </Link>
              </div>

              <div className="button-container">
                <div className="button">시리즈</div>
                <div className="button">영화</div>
                <div className="dropdown">
                  카테고리
                  <img src="/images/vec.png" alt="Dropdown Icon" />
                </div>
              </div>

              <div className="main-content">
                <div className="playlist-buttons">
                  <button className="play-button">
                    <img src="/images/playButton.png" alt="Play Button" />
                    재생
                  </button>
                  <button className="list-button">
                    <img
                      src="/images/listplusButton.png"
                      alt="List Plus Button"
                    />
                    내가 찜한 리스트
                  </button>
                </div>
                <img src="/images/little.jpg" alt="Little Image" className="little-image" />
              </div>

              <div className="additional-section">
                모바일 게임
                <span className="list-text">내가 찜한 리스트</span>
                <img src="/images/rightArrow.png" alt="Right Arrow" className="right-arrow" />
              </div>

              <div className="game-images">
                <img src="/images/squidgame.webp" alt="Squid Game" />
                <img src="/images/solitaire.png" alt="Solitaire" />
                <img src="/images/snake.png" alt="Snake" />
                <img src="/images/monument.webp" alt="Monument" />
              </div>

              <div className="bottom-box"></div>

              <div className="bottom-menu">
                <div className="menu-item active">
                  <div className="menu-icon">
                    <img src="/images/home.png" alt="Home Icon" className="home-img" />
                  </div>
                  홈
                </div>
                <div className="menu-item">
                  <div className="menu-icon">
                    <img src="/images/newhot.png" alt="New & Hot Icon" className="newhot-img" />
                  </div>
                  NEW & HOT
                </div>
                <div className="menu-item">
                  <div className="menu-icon">
                    <img src="/images/profile.jpg" alt="Profile Icon" className="profile-img" />
                  </div>
                  나의 넷플릭스
                </div>
              </div>
            </div>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/content" element={<Detail />} /> {/* /:id */}
      </Routes>
    </Router>
  ); 
}

export default Home;
