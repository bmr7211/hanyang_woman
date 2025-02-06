// /Users/shinji81/Downloads/my-app/src/component/Detail.js
// 담당 : 지윤, 수인
import React, { useEffect, useState } from "react";
import "./Detail.css";

function Detail({ content, closeModal }) {
  console.log("Content Data_D:", content);
  const [similarContent, setSimilarContent] = useState([]);

  // 콘텐츠 키워드가 있을 때 해당 키워드에 맞는 비슷한 콘텐츠를 가져오기
  useEffect(() => {
    if (content?.keywords && content.keywords.length > 0) {
      fetchSimilarContent(content.keywords);
    }
  }, [content]);

  // 비슷한 콘텐츠 가져오기
  const fetchSimilarContent = async (keywords) => {
    try {
      const queryParams = keywords.map(k => `keywords=${encodeURIComponent(k)}`).join('&');
      const response = await fetch(`http://localhost:3001/api/contents?${queryParams}`);
      const data = await response.json();
      setSimilarContent(data);
    } catch (error) {
      console.error("Error fetching similar content:", error);
    }
  };

  return (
    <div className="container">
      {/* 썸네일 */}
      <div className="content-box">
        <img src={`http://localhost:3001/${content?.contents_poster}`}
        alt="Content Thumbnail" className="content-thumbnail" />
      </div>

      {/* 재생 버튼 */}
      <img src="/images/contentPlay.png" alt="Content Play Icon" className="contentPlay-icon" />
      <img src="/images/device.png" alt="Device Icon" className="device-icon" />
      {/* 취소 버튼 */}
      <img 
      src="/images/contentsdetailPrevious.png" 
      alt="Contents Detail Previous Icon" 
      className="contentsdetailPrevious-icon" 
      onClick={() => {
        console.log("취소 버튼 클릭됨");
        closeModal();
      }}
      style={{ cursor: "pointer" }}
      />
      {/* 볼륨 이미지 */}
      <img src="/images/sound.png" alt="Sound Icon" className="sound-icon" />
      
      {/* 제목 */}
      <div className="content-title">
        <b>{content?.contents_name || "제목 없음"}</b>
      </div>

      {/* 데이터베이스 구현 못함 --> 그냥 텍스트로 */}
      {/* 기타 정보 */}
      <div className="content-year">2022</div>
      <img src="/images/age.png" alt="Age Icon" className="age-icon" />
      <div className="content-time">1시간 59분</div>
      <img src="/images/hd.png" alt="HD Icon" className="hd-icon" />
      <img src="/images/actor.png" alt="Actor Icon" className="actor-icon" />
      
      {/* 콘텐츠 키워드 */}
      <div className="choiced-keyword">
        {content?.keywords && content.keywords.length > 0 ? (
          content.keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">
              {keyword}
            </span>
          ))
        ) : (
          <span className="keyword-tag">키워드 없음</span>
        )}
      </div>

      {/* 재생 & 저장 */}
      <div className="play-box">
        <img src="/images/playButton.png" alt="playButton" className="playButton-icon" />
        재생
      </div>
      <img src="/images/save.png" alt="save" className="save-icon" />
      <div className="save-box">
        저장</div>

      {/* 데이터베이스 구현 못함 --> 그냥 텍스트로 */}
      <div className="contents-plot">
      새로운 세기로 넘어가기 전 마지막 해, 
      보라는 같은 학교 학생인 현진을 짝사랑하는 친구의 간절한 부탁을 받게 된다. 
      그러나 곧 보라에게도 뜻밖의 마음속 소용돌이가 일기 시작한다.
      </div>
      <div className="contents-actors">
        출연: 변우석, 김우정, 노윤서 ... 더 보기 <br />감독: 방우리
      </div>
      
      {/* 찜+평가+공유 */}
      <img src="/images/listplusButton.png" alt="listplusButton" className="listplusButton-icon" />
      <div className="listplus">내가 찜한 리스트</div>
      <img src="/images/assessment.png" alt="assessment" className="assessment-icon" />
      <div className="assessment">평가</div>
      <img src="/images/share.png" alt="share" className="share-icon" />
      <div className="share">공유</div>
      <img src="/images/line.png" alt="line" className="line-icon" />

      {/* 비슷한 콘텐츠 */}
      <div className="similar-content">비슷한 콘텐츠</div>
      <div className="similar-content-container">
        {similarContent.length > 0 ? (
          similarContent.map((similar, index) => (
            <img key={index} src={`http://localhost:3001/${similar.contents_poster}`} alt={`Similar Content ${index + 1}`} className="similar-content-image" />
          ))
        ) : (
          <div>비슷한 콘텐츠가 없습니다.</div>
        )}
      </div>
      {/* <div className="similar-content-container">
          <img src="/images/그시절_소녀.jpg" alt="Similar Content 1" className="similar-content-image" />
          <img src="/images/말할수없는_비밀.jpg" alt="Similar Content 2" className="similar-content-image" />
          <img src="/images/스쿨_오브_락.jpg" alt="Similar Content 3" className="similar-content-image" /> 
      </div> */}
    </div>
  );
}

export default Detail;
