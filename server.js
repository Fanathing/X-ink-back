const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRouter = require('./routes/auth.route.js');
const { sequelize } = require('./models');
const seedUsers = require('./seeders/user.seed');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 설정
app.use(
  cors({
    origin: ['http://43.201.39.164:3000', 'http://localhost:3000'],
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

// 서버 시작 (Sequelize 연결 확인 + 더미 데이터 시딩 포함)
const startServer = async () => {
  try {
    // 데이터베이스 연결 테스트
    await sequelize.authenticate();
    console.log('✅ 데이터베이스 연결이 성공적으로 설정되었습니다.\n');

    // 더미 사용자 데이터 시딩
    await seedUsers();

    app.listen(PORT, () => {
      console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error('❌ 서버 시작 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
