const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = path.join(__dirname, 'data.json');

// Tạo file data.json nếu chưa tồn tại
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  console.log('Created data.json');
}

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let contacts = [];
    if (!err && data) contacts = JSON.parse(data);

    const newContact = { name, email, message, date: new Date().toISOString() };
    contacts.push(newContact);

    fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error('Write error:', err);
        return res.status(500).json({ error: 'Lỗi khi lưu dữ liệu' });
      }
      res.status(200).json({ message: 'Cảm ơn bạn đã gửi thông tin!' });
    });
  });
});

app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));