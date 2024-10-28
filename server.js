// server.js
const express = require('express');
const app = express();
const port = 3000;

// JSON 요청을 파싱하기 위한 미들웨어
app.use(express.json());

// 간단한 라우트 예제
app.get('/', (req, res) => {
  res.send('Hello, REST API Server!');
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// 데이터 예제
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// 1. 모든 사용자 조회 (GET)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// 2. 특정 사용자 조회 (GET)
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// 3. 사용자 추가 (POST)
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 4. 사용자 정보 수정 (PUT)
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name;
  res.json(user);
});

// 5. 사용자 삭제 (DELETE)
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});
