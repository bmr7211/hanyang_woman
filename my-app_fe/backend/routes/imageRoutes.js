// /Users/shinji81/Downloads/my-app_fe/backend/routes/imageRoutes.js
// 담당 : 지윤
const express = require('express');
const router = express.Router();
const db = require('../database/db');

// 키워드 목록 가져오기
router.get('/keywords', async (req, res) => {  
  console.log('키워드 요청 받음'); 

  try {
    const query = 'SELECT * FROM keywords';
    const [results] = await db.promise().query(query); 
    res.json(results); 
  } catch (err) {
    console.error('Error fetching keywords:', err);
    res.status(500).send('Error fetching keywords');
  }
});

// 콘텐츠 검색
router.get('/contents', async (req, res) => { 
  let keywords = req.query.keywords; 

  if (!keywords || keywords.length === 0) {
    return res.json([]);
  }

  if (typeof keywords === 'string') {
    keywords = [decodeURIComponent(keywords)]; 
  } else {
    keywords = keywords.map(keyword => decodeURIComponent(keyword)); 
  }
  console.log("Decoded Keywords:", keywords);
  const placeholders = keywords.map(() => '?').join(', ');

  const query = `
    SELECT DISTINCT c.*
    FROM contents c
    JOIN contents_keywords ck ON c.contents_id = ck.contents_id
    JOIN keywords k ON ck.keywords_id = k.keywords_id
    WHERE k.keywords_name IN (${placeholders})
    GROUP BY c.contents_id
    HAVING COUNT(DISTINCT k.keywords_name) = ?;
  `;

  try {
    const [results] = await db.promise().query(query, [...keywords, keywords.length]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching contents:', err);
    res.status(500).send('Error fetching contents');
  }
});

// 수정 필요함
// 콘텐츠 상세 정보 키워드
router.get('/contents/:id', async (req, res) => {
  const contentId = req.params.id;

  const query = `
    SELECT c.*, JSON_ARRAYAGG(k.keywords_name) AS keywords
    FROM contents c
    JOIN contents_keywords ck ON c.contents_id = ck.contents_id
    JOIN keywords k ON ck.keywords_id = k.keywords_id
    WHERE c.contents_id = ?
    GROUP BY c.contents_id;
  `;

  try {
    const [results] = await db.promise().query(query, [contentId]);
    console.log("Returned Content Data:", results[0]);
    if (results[0]) {
      console.log("Keywords:", results[0].keywords);
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching content details:', err);
    res.status(500).send('Error fetching content details');
  }
});

// 비슷한 콘텐츠
router.get('/contents/:id/similar', async (req, res) => {
  const contentId = req.params.id;

  try {
    // 클릭한 콘텐츠의 키워드 가져오기
    const keywordQuery = `
      SELECT k.keywords_id 
      FROM contents_keywords ck 
      JOIN keywords k ON ck.keywords_id = k.keywords_id 
      WHERE ck.contents_id = ?;
    `;
    const [keywords] = await db.promise().query(keywordQuery, [contentId]);

    if (keywords.length === 0) {
      return res.json([]);
    }

    const keywordIds = keywords.map(k => k.keywords_id);

    // 같은 키워드를 가진 다른 콘텐츠 가져오기 (자기 자신 제외)
    const similarContentQuery = `
      SELECT DISTINCT c.contents_id, c.contents_name, c.contents_poster 
      FROM contents c
      JOIN contents_keywords ck ON c.contents_id = ck.contents_id
      WHERE ck.keywords_id IN (?)
      AND c.contents_id != ?
      LIMIT 5;
    `;
    const [similarContents] = await db.promise().query(similarContentQuery, [keywordIds, contentId]);

    res.json(similarContents);
  } catch (error) {
    console.error("Error fetching similar content:", error);
    res.status(500).json({ error: "Error fetching similar content" });
  }
});

module.exports = router;