const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * POST /auth/login
 * 사용자 로그인
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. 입력 값 검증
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '이메일과 비밀번호를 입력해주세요.',
      });
    }

    // 2. 이메일로 사용자 조회
    const user = await User.findOne({ where: { email } });

    // 3. 사용자가 존재하지 않는 경우
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '존재하지 않는 이메일입니다.',
      });
    }

    // 4. 비밀번호 비교 (해시값 길이 10설정함 참고)
    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    // 5. JWT 토큰 생성
    const accessToken = jwt.sign(
      {
        id: user.ID,
        name: user.NAME,
        role: 'user',
        provider: 'local',
      },

      JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );

    // https://x-ink.store
    // https://api.x-ink.store
    // 6. 로그인 성공 응답
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // 이거 ture하면 https만 허용한다함 우린 false가 맞음
      sameSite: 'None', // 우린 도메인이 다르니까 크로스사이트상태 none으로 두자
      maxAge: 1000 * 60 * 60 * 24,
      domain: '.x-ink.store',
    });

    return res.status(200).json({ message: 'login success' });
  } catch (error) {
    console.error('로그인 오류:', error);
    return res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
    });
  }
};

module.exports = {
  login,
};
