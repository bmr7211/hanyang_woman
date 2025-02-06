// /Users/shinji81/Downloads/my-app_fe/src/component/Search.js
// 담당 : 지윤, 수인
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import Detail from "./Detail";

function Search() {
  const navigate = useNavigate();
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [hideKeywords, setHideKeywords] = useState(false);
  const [hideContent, setHideContent] = useState(false);  
  const [searchText, setSearchText] = useState("");  
  const [contentList, setContentList] = useState([]);  
  const inputRef = useRef(null);

  // 모달 상태
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const keywords = [
    "#리메이크", "#청춘", "#직장", "#미식", "#역사",
    "#재난", "#블랙코미디", "#힐링", "#코즈믹호러",
    "#사이버펑크", "#가족", "#여행", "#성장", "#펫"
  ];

  // 키워드 클릭 시 처리
  const handleKeywordClick = (keyword) => {
    setSelectedKeywords((prev) => {
      const newSelectedKeywords = prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword];
  
      setSearchText(newSelectedKeywords.join(" "));
  
      if (newSelectedKeywords.length > 0) {
        fetchContent(newSelectedKeywords); 
      } else {
        setContentList([]);
      }
  
      return newSelectedKeywords;
    });
  };

  // 콘텐츠 데이터 가져오기 (백엔드 API 호출)
  const fetchContent = async (keywords) => {
    try {
      const queryParams = keywords.map(k => `keywords=${encodeURIComponent(k.replace("#", ""))}`).join('&'); 
      const response = await axios.get(`http://localhost:3001/api/contents?${queryParams}`);
      
      setContentList(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // 초기화 버튼 클릭 --> 모든 값 초기화
  const handleDeselectClick = () => {
    setSelectedKeywords([]); // 선택된 키워드 초기화
    setSearchText(""); // 검색창 텍스트 초기화
    setContentList([]); // 콘텐츠 리스트 초기화
    setHideKeywords(false);
    setHideContent(false);
  };

  // 검색창 클릭 시 동작
  const handleSearchBoxClick = () => {
    if (selectedKeywords.length === 0) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setHideKeywords(true);
      setHideContent(true);
    }
  };

  // 텍스트 변경 시
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setHideKeywords(false);
      setHideContent(false);
    } else {
      setHideContent(true);
    }
  };

  // 모달 열기
  const handleContentClick = async (content) => {
    // 콘솔 로그
    console.log("Content Data_S: ", content);
    if (content && content.keywords) {
      console.log("Keywords: ", content.keywords);
    } else {
      console.log("No keywords found in content.");
    }

    // 키워드 필터링
    const filteredKeywords = content.keywords 
      ? content.keywords.filter(keyword => selectedKeywords.includes(keyword))
      : [];
    console.log("Filtered Keywords:", filteredKeywords);

    const similarContent = await fetchSimilarContent(filteredKeywords);
    setSelectedContent({ ...content, keywords: filteredKeywords, similarContent  });
    setShowModal(true);
  };

    // 비슷한 콘텐츠 가져오기
    const fetchSimilarContent = async (keywords) => {
      try {
        const queryParams = keywords.map(k => `keywords=${encodeURIComponent(k)}`).join('&');
        const response = await axios.get(`http://localhost:3001/api/contents?${queryParams}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching similar content:", error);
        return [];
      }
    };

  // 모달 닫기 & 검색 화면으로 이동
  const closeModal = () => {
    setShowModal(false);
    setSelectedContent(null);
  };

  return (
    <div className="container">
      {/* 뒤로 버튼 */}
      <img  
        src="/images/previous.png"
        alt="previous"
        className="previous-icon"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }} 
      />   
      {/* 검색박스 */}
      <div className="search-box" onClick={handleSearchBoxClick}>
        <img 
          src="/images/graysearchIcon.png" // 돋보기 아이콘
          alt="graysearch" 
          className="graysearch-icon" 
        />
        <input
          ref={inputRef}
          type="text"
          value={searchText}
          onChange={handleInputChange} 
          className="search-input"
          placeholder="게임, 시리즈, 영화를 검색하세요..."
          disabled={selectedKeywords.length > 0}
        />
      </div>
      {/* 초기화 버튼 */}
      <img 
        src="/images/deselect.png" 
        alt="deselect" 
        className="deselect-icon" 
        onClick={handleDeselectClick} 
      />

      {/* 키워드 리스트 - 항상 보이게 */}
      <div className="keywordButton-container">
        {keywords.map((keyword, index) => (
          <div
          key={index}
          className="keywordButton"
          onClick={() => handleKeywordClick(keyword)}
          style={{
            borderColor: selectedKeywords.includes(keyword) ? "#E50814" : "white",
            color: selectedKeywords.includes(keyword) ? "#E50814" : "white",
          }}
          >
            {keyword}
          </div>
        ))}
      </div>

      {/* 추천 콘텐츠 - 키워드가 선택되지 않았을 때만 표시 */}
      {selectedKeywords.length === 0 && !hideContent && (
        <div>
          <div className="recommended-box">추천 시리즈 & 영화</div>
          <div className="my-box">
            <img src="/images/my.webp" alt="my" />
            나의 해방일지
            <img src="/images/recommandedPlay.png" alt="recommandedPlay" className="my-recommanded-play" />
          </div>

          <div className="oldguard-box">
            <img src="/images/oldguard.jpeg" alt="oldguard" />
            올드가드
            <img src="/images/recommandedPlay.png" alt="recommandedPlay" className="oldguard-recommanded-play" />
          </div>

          <div className="youngSheldon-box">
            <img src="/images/youngSheldon.png" alt="youngSheldon" />
            영 셸던
            <img src="/images/recommandedPlay.png" alt="recommandedPlay" className="youngSheldon-recommanded-play" />
          </div>

          <div className="haikyu-box">
            <img src="/images/haikyu.jpg" alt="haikyu" />
            하이큐!!
            <img src="/images/recommandedPlay.png" alt="recommandedPlay" className="haikyu-recommanded-play" />
          </div>

          <div className="bfood-box">
            <img src="/images/bfood.jpg" alt="bfood" />
            극장판 짱구는 못말려 21기: <br />
            엄청 맛있어! B급 음식 <br />
            서바이벌
            <img src="/images/recommandedPlay.png" alt="recommandedPlay" className="bfood-recommanded-play" />
          </div>

          <div className="doc-box">
            <img src="/images/doc.jpg" alt="doc" />
            슬기로운 의사생활
            <img src="/images/recommandedPlay.png" alt="recommandedPlay" className="doc-recommanded-play" />
          </div>
        </div>
      )}

      {/* 검색 결과 */}
      {selectedKeywords.length > 0 && (
        <div>
          {contentList.length > 0 ? (
            <>
            <div className="recommended-box">영화 & 시리즈</div>
            <div className="content-list">
              {contentList.map((content) => (
                <div
                key={content.contents_id}
                className="content-item"
                onClick={() => handleContentClick(content)}>
                  <img 
                  src={`http://localhost:3001/${content.contents_poster}`} 
                  alt={content.contents_name} 
                  className="content-img"/>
                </div>
              ))}
            </div>
            </>
            ) : (
            <div className="recommended-box-ex">이런! 찾으시는 작품이 없습니다.</div>
          )}
        </div>
      )}

      {/* 상세 화면 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Detail content={selectedContent} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;