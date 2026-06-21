import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import confetti from 'canvas-confetti';
import FloatingCakes from './components/FloatingCakes';
import cicekResmi from './assets/cicek.jpeg';


const API_URL = 'http://localhost:5000/api/photos';

function App() {
  const [photos, setPhotos] = useState([
    {
      "_id": "default-1",
      "url": "fotograf.jpeg",
      "caption": "iyi ki doğdunn... 🎀",
      "date": "2026-05-13"
    }
  ]);
  const [party, setParty] = useState(false);


  // --- ÖZEL CÜMLELER ---

  const moralSentences = [
    "İyi ki varsın 🌸",
    "Varlığın çok özel ✨",
    "Seni buldum ya başka ne isterim...",
    "Sen çok iyi kalpli bir insansın 🫶🏻",
    "Dünyanın en iyi hocası 🙂",
    "Bir sabah seni bana getiren kaderin güzel oyunu...",
    "O tatlı gözlerin her daim gülsün 💙",
    "Her zaman yanındayım 🥰",
    "Mükemmelsinn 💫",
    "Kalp yıllardır seni arıyor...",
    "Çok hayranım sana 😍",
    
  ];

  const [currentMoral, setCurrentMoral] = useState('');
  
  const [usedIndices, setUsedIndices] = useState([]);

  const handleRandomMoral = () => {
    if (moralSentences.length === 0) return;

    let availableIndices = [];

    for (let i = 0; i < moralSentences.length; i++) {
      if (!usedIndices.includes(i)) {
        availableIndices.push(i);
      }
    }

    if (availableIndices.length === 0) {
      availableIndices = moralSentences.map((_, idx) => idx);
      const lastChosen = usedIndices[usedIndices.length - 1];
     
      if (availableIndices.length > 1) {
        availableIndices = availableIndices.filter(idx => idx !== lastChosen);
      }
      setUsedIndices([]);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    
    setCurrentMoral(moralSentences[randomIndex]);
    setUsedIndices(prev => [...prev, randomIndex]);

    
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.85 },
      colors: ['#a855f7', '#ec4899', '#f43f5e']
    });
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data.length > 0) {
          setPhotos(res.data);
        }
      } catch (err) {
        console.log("Sunucu bağlantısı yok, yerel verilerle devam ediliyor.");
      }
    };
    fetchPhotos();
  }, []);

  const handleParty = () => {
    setParty(true);
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const [giftOpened, setGiftOpened] = useState(false);
  const handleGiftOpen = () => {
    setGiftOpened(true);
    
    // --- ÇİÇEK PATLAMASI SÜRESİ ---
    const duration = 6 * 1000; 
    const animationEnd = Date.now() + duration;
    const scalar = 2.5; 

    // --- ÇİÇEK ŞEKİLLERİ ---
    const flower = confetti.shapeFromText({ text: '🌸', scalar });
    const yellow = confetti.shapeFromText({ text: '💛', scalar });
    const rose = confetti.shapeFromText({ text: '🌹', scalar });
    const tulip = confetti.shapeFromText({ text: '🌷', scalar });
    const white = confetti.shapeFromText({ text: '🌼', scalar });
    const pink = confetti.shapeFromText({ text: '💚', scalar });
    const purple = confetti.shapeFromText({ text: '💜', scalar });
    const red = confetti.shapeFromText({ text: '💓', scalar });

    const frame = () => {
      // Sol taraftan çiçek fışkırtma
      confetti({
        shapes: [flower, rose, tulip, white, pink, yellow, purple, red],
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        scalar
      });
      // Sağ taraftan çiçek fışkırtma
      confetti({
        shapes: [flower, rose, tulip, white, pink, yellow, purple,red],
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        scalar
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  };

  const [blowStage, setBlowStage] = useState('initial'); // 'initial', 'counting', 'blown'
  const [counter, setCounter] = useState(5);

  const handleBlowCakes = () => {
    setBlowStage('counting');
    let count = 5;
    const timer = setInterval(() => {
      count -= 1;
      setCounter(count);
      if (count === 0) {
        clearInterval(timer);
        setBlowStage('blown');

        
        // --- MUM SÖNÜNCE KONFETİ PATLATMA ---
        const end = Date.now() + (6 * 1000); 
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff69b4', '#da70d6', '#ffffff']
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff69b4', '#da70d6', '#ffffff']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
        setTimeout(() => {
          setBlowStage('initial');
          setCounter(5);
        }, 3000);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-100 to-red-300 text-purple-900 selection:bg-pink-200 scroll-smooth font-['Dancing_Script'] relative">
      <FloatingCakes />

      {/* MUM ÜFLERKEN KARARTMA MODU */}
      {(blowStage === 'counting' || blowStage === 'blown') && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-[2px] z-40 transition-opacity duration-500" />
      )}
      
      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md p-8 md:p-14 rounded-[40px] shadow-2xl max-w-3xl w-full text-center relative border border-white/50"
        >
          <div className="absolute top-8 left-8 text-pink-300 text-2xl">✨</div>
          <div className="absolute bottom-8 right-8 text-pink-300 text-2xl">✨</div>

          <p className="tracking-[0.4em] text-black-800 uppercase text-s mb-6 font-semibold">13 TEMMUZ</p>
          
          <h1 className="text-5xl md:text-5xl font-bold mb-2 text-gray-800">Burak</h1>
          
          <h2 className="text-4xl md:text-5xl text-pink-400 leading-tight">
            Doğum Günün Kutlu Olsun!
          </h2>

          <div className="flex justify-center my-4">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl select-none"
            >
              🎂
            </motion.div>
          </div>

          <p className="text-purple-400 italic text-xl md:text-2xl mb-6 opacity-150">
            - Bugün senin günün -
          </p>

          <p className="text-black text-lg md:text-2xl leading-relaxed mb-8 px-4 md:px-10 font-medium">
            Burakcım, doğum günün kutlu olsun. Bu sayfa sadece senin için ve sana özel olarak hazırlandı. Tıpkı senin de dediğin gibi :) <br />
            "Bazı şeyler hazır alınır, <br />bazılarıysa  gerçekten değer verilen kişiler için yapılır." <br />Bu hediye de onlardan biri...  iyi ki doğdun!
            <span className="block mt-2 text-pink-400/70 italic text-base md:text-lg"></span>
          </p>

          <p className="text-pink-400 text-2xl md:text-3xl font-bold mb-10">
            İYİ Kİ VARSIN :)
          </p>

          <div className="flex flex-col items-center gap-3">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-[1.5px] h-10 bg-gradient-to-b from-gray-300 to-transparent"
            ></motion.div>
            <p className="tracking-widest text-gray-500 text-[12px] uppercase font-semibold">SÜRPRİZLERİNİ GÖRMEK İÇİN AŞAĞI KAYDIR</p>
          </div>
        </motion.div>
      </section>


      {/* --- ANILARIMIZ --- */}
      <section className="py-20 px-4 max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl text-center mb-16 underline decoration-pink-200 underline-offset-8 font-bold italic">
          
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div 
                key={photo._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
                className="bg-white p-5 shadow-2xl rounded-sm w-96 border-b-[80px] border-white relative transition-all"
              >
                {/* Fotoğraf Alanı */}
                <div className="overflow-hidden bg-gray-50 h-[420px] flex items-center justify-center">
                   <img 
                    src={photo.url} 
                    alt="Anı" 
                    className="w-full h-full object-contain p-2"
                   />
                </div>

                {/* Polaroid Alt Yazısı */}
                <p className="absolute bottom-[-40px] left-0 w-full text-center text-2xl text-gray-600 font-bold italic tracking-tight">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

     {/* --- PASTA ÜFLEME BÖLÜMÜ --- */}
<section className={`py-20 px-4 text-center relative ${(blowStage === 'counting' || blowStage === 'blown') ? 'z-[60]' : 'z-10'}`}>
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    style={{ position: 'relative', zIndex: blowStage === 'counting' ? 50 : 10 }}
    className={`max-w-xl mx-auto bg-white/95 backdrop-blur-md p-10 rounded-[40px] border-2 border-pink-200 shadow-xl relative overflow-hidden transition-all duration-300 ${
      blowStage === 'counting' ? 'ring-4 ring-pink-400 bg-white shadow-[0_0_50px_rgba(244,63,94,0.4)]' : ''
    }`}
  >
    
    {/* TEKRARLA BUTONU */}
    {blowStage === 'blown' && (
      <motion.button 
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        onClick={() => { 
          setBlowStage('initial'); 
          setCounter(5);           
        }}
        className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 transition-colors text-3xl z-30"
        title="Tekrarla"
      >
        <span className="block hover:rotate-[-45deg] transition-transform"></span>
      </motion.button>
    )}

    <div className="relative flex flex-col items-center">
      
      {/* SADECE PASTA EMOJİSİ VE ÜZERİNDEKİ CANLI ALEVLER */}
      <div className={`relative my-12 transition-all duration-500 ${blowStage === 'blown' ? 'grayscale-[0.4] brightness-75' : ''}`}>
        
        {/* Direkt Orijinal Pasta Emojisi */}
        <div className="text-7xl select-none">
          🎂
        </div>

        {/* --- PASTADAKİ MUMLAR --- */}
        {blowStage !== 'blown' && (
          <>
            {/* Sol Mumun Alevi */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="absolute top-[-8px] left-[29px] w-2 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[0.5px] shadow-[0_0_8px_rgba(251,146,60,0.9)] z-20"
            />
            {/* Orta Mumun Alevi */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.45, delay: 0.1 }}
              className="absolute top-[-8px] left-[45px] w-2 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[0.5px] shadow-[0_0_8px_rgba(251,146,60,0.9)] z-20"
            />
            {/* Sağ Mumun Alevi */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.4, delay: 0.2 }}
              className="absolute top-[-8px] left-[62px] w-2 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[0.5px] shadow-[0_0_8px_rgba(251,146,60,0.9)] z-20"
            />
          </>
        )}

      </div>

      {/* Dinamik Yazı Alanı */}
      <AnimatePresence mode="wait">
        {blowStage === 'initial' && (
          <motion.button
            key="btn"
            onClick={handleBlowCakes}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-pink-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg"
          >
            bir dilek tut ve tıkla 💫
          </motion.button>
        )}

        {blowStage === 'counting' && (
          <motion.div 
            key="count"
            initial={{ scale: 0 }} animate={{ scale: 1.2 }} 
            className="text-3xl font-bold text-pink-600 italic"
          >
            {counter}... Muma Üfle!
          </motion.div>
        )}
        
        {blowStage === 'blown' && (
          <motion.div 
            key="done"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-purple-600"
          >
            Dileğinin gerçekleşmesi ümidiyle... 💖
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
</section>

{/* --- SÜRPRİZ HEDİYE BÖLÜMÜ --- */}
<section className="py-20 px-4 text-center relative z-10">
  <div className="max-w-2xl mx-auto bg-white/40 backdrop-blur-md p-12 rounded-[40px] border border-white shadow-lg relative overflow-hidden">
    
    {/* TEKRARLA BUTONU */}
    {giftOpened && (
      <motion.button 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={() => setGiftOpened(false)}
        className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 transition-colors text-3xl z-30"
      >
        <span className="block hover:rotate-[-45deg] transition-transform">🔄</span>
      </motion.button>
    )}

    <h2 className="text-3xl mb-10 text-pink-600 font-bold italic">Senin için Minik Bir Sürpriz ✨</h2>
    
    <div className="py-6 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!giftOpened ? (
          <motion.button
            key="gift-btn"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleGiftOpen}
            className="group flex items-center gap-4 bg-white/80 border-2 border-pink-300 px-10 py-5 rounded-2xl shadow-xl transition-all"
          >
            <span className="text-4xl group-hover:rotate-12 transition-transform">🎁</span>
            <div className="text-left">
              <p className="text-2xl text-pink-500 font-bold">Hediyeni Görmek için Tıkla</p>
              <p className="text-xs text-gray-400 font-sans italic">Burada senin için küçük bir şey var... 💖</p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="photo-surprise-animated"
            initial={{ opacity: 0, y: 30, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* ANİMASYONLU FOTOĞRAF ALANI */}
            <motion.div
              animate={{ 
                y: [0, -15, 0], 
                rotate: [-2, 2, -2] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative"
            >
              
              <div className="w-64 h-54 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src={cicekResmi} 
                  alt="Sürpriz Fotoğraf" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.span
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 text-4xl"
              >
                
              </motion.span>
            </motion.div>

            <p className="mt-8 text-3xl text-pink-500 font-bold italic">
              Nice güzel yaşların olsun! 🌸
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</section>


      {/* --- PARTİ BUTONU (DOĞUM GÜNÜ NOTU BUTONU) --- */}
      <div className="flex justify-center pb-20 relative z-20">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleParty}
          className="bg-gradient-to-r from-pink-400 to-purple-600 text-white px-16 py-6 rounded-full text-2xl shadow-xl font-bold"
        >
          🎉 Doğum Günü Notunu Görmek için Tıkla! 🎉
        </motion.button>
      </div>


      {/* --- MORAL KUTUSU --- */}
      <section className="pb-20 px-4 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white/50 backdrop-blur-md p-10 rounded-[40px] border border-pink-200 shadow-xl"
        >
          <h2 className="text-3xl text-purple-800 mb-2 font-bold ">
            Kelimeler bazen bir sarılışın yerini tutar... 
            <br />Senin için buraya sevgi fısıldadım. 💜
          </h2>
          <p className="text-sm text-gray-600 font-sans mb-8 italic">
            Ne zaman istersen bir cümle aç  :) 
          </p>

          <div className="min-h-[80px] flex items-center justify-center px-4 mb-6">
            <AnimatePresence mode="wait">
              {currentMoral ? (
                <motion.p
                  key={currentMoral}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-2xl text-pink-600 font-medium leading-relaxed font-['Dancing_Script']"
                >
                  "{currentMoral}"
                </motion.p>
              ) : (
                <p className="text-gray-400 italic text-xl">Henüz bir cümle açılmadı...</p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRandomMoral}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-xl font-bold shadow-md transition-all"
          >
            okumak için tıkla ✨
          </motion.button>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pb-16 flex flex-col items-center justify-center text-center relative z-10 space-y-4">
        <div className="relative inline-block">
          <p className="text-2xl md:text-2.5xl text-purple-800 font-medium px-4">
            Burak Mutluer için özel olarak hazırlandı
          </p>
          
        </div>
        
        <p className="text-gray-500 text-0xl font-sans tracking-widest flex items-center gap-2">
          Made with <span className="text-pink-400">💜</span> in 2026
        </p>
      </footer>

      {/* --- DOĞUM GÜNÜ NOTU YAZISI (MODAL) --- */}
      <AnimatePresence>
        {party && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              className="bg-white/95 p-12 text-center max-w-md rounded-[45px] shadow-2xl border-4 border-pink-50"
            >
              <h2 className="text-3xl text-pink-500 mb-6 font-bold">Burakcım İyi Ki Varsın! </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Varlığınla her şeyi güzelleştiriyorsun. Güzel kalbin kadar nice güzel yaşların olsun.
                Mutluluk saçan o tatlı gözlerin hep gülsün. Sen hep iyi ol, hep mutlu ol.
                Varlığın çok kıymetli, çok özel bunu hiçbir zaman unutma. 
                Yanımda olman bana her an güç ve huzur veriyor. Bunun değerini kelimelerle anlatmak zor. 
                Çünkü bütün duyguları anlatmaya yetecek kadar kelime yoktur, gerek de yoktur... :)
                <br />Her daim hayatımda olman dileğiyle... ❤️  
                <br />Sevgilerimle... 🙂  
                
              </p>
              <button 
                onClick={() => setParty(false)}
                className="text-purple-400 hover:text-purple-600 font-bold underline underline-offset-4"
              >
                kapat 
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
