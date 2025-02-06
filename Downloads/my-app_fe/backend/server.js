// /Users/shinji81/Downloads/my-app_fe/backend/server.js
// 담당 : 지윤
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// 정적 파일
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 라우터 설정
const imageRoutes = require('./routes/imageRoutes'); 

app.use('/api', imageRoutes); 

// 서버 포트 설정
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});