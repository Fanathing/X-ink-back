const express = require('express');
require('dotenv').config();
const { syncDatabase } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: '구인구직 서비스 V1 백엔드 API' });
});

// 헬스 체크
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 서버 시작
const startServer = async () => {
  try {
    // 데이터베이스 동기화 (개발 환경에서만 force: true 사용)
    await syncDatabase(process.env.NODE_ENV === 'development' ? false : false);
    
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error('서버 시작 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;


