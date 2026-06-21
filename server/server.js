const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Bağlandı!"))
  .catch(err => console.log(err));

// API Rotaları buraya gelecek (Fotoğraf kaydetme/silme vb.)

app.listen(5000, () => console.log("Server 5000 portunda çalışıyor"));
const Photo = require('./models/Photo');

// Tüm fotoğrafları getir
app.get('/api/photos', async (req, res) => {
  const photos = await Photo.find().sort({ date: -1 });
  res.json(photos);
});

// Yeni fotoğraf ekle
app.post('/api/photos', async (req, res) => {
  const newPhoto = new Photo(req.body);
  await newPhoto.save();
  res.json(newPhoto);
});

// Fotoğraf sil
app.delete('/api/photos/:id', async (req, res) => {
  await Photo.findByIdAndDelete(req.params.id);
  res.json({ message: "Silindi" });
});