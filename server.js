const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRouter = require('./routes/auth.route.js');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 설정
app.use(
  cors({
    origin: 'http://43.201.39.164:3000',
    credentials: true,
  }),
);

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

// 인증 라우트
app.use('/auth', authRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

module.exports = app;
