const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Đường dẫn file JSON
const DATA_FILE = 'data.json';

// Tạo file data.json nếu chưa tồn tại
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  console.log('Created data.json');
}

// API để nhận dữ liệu từ form liên hệ
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let contacts = [];
    if (!err && data) contacts = JSON.parse(data);

    const newContact = { name, email, message, date: new Date().toISOString() };
    contacts.push(newContact);

    fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Lỗi khi lưu dữ liệu' });
      }
      res.status(200).json({ message: 'Cảm ơn bạn đã gửi thông tin!' });
    });
  });
});

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));