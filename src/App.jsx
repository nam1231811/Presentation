import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { slidesContent } from "./slidesData.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// NÂNG CẤP: Thêm icon Expand/Minimize
import { LayoutGrid, X, Search, Sun, Moon, Expand, Minimize } from "lucide-react";
import * as Tone from 'tone';

// --- ÂM THANH ---
const clickSound = new Tone.MembraneSynth({ pitchDecay: 0.01, octaves: 5, synth: { oscillator: { type: 'sine' } } }).toDestination();
const swooshSound = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.005, decay: 0.15, sustain: 0 } }).toDestination();
// ----------------

// --- HÀM TÍNH TOÁN 3D ---
const getSlideStyle = (index, page, totalSlides) => {
  const offset = index - page;
  let adjustedOffset = offset;
  if (offset > totalSlides / 2) adjustedOffset = offset - totalSlides;
  if (offset < -totalSlides / 2) adjustedOffset = offset + totalSlides;

  const scale = 1 - Math.abs(adjustedOffset) * 0.15;
  const rotateY = adjustedOffset * -25;
  const x = adjustedOffset * (600 * 0.35);
  const z = -Math.abs(adjustedOffset) * 150;
  const opacity = Math.max(0, 1 - Math.abs(adjustedOffset) * 0.4);

  return {
    transform: `perspective(1200px) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: totalSlides - Math.abs(adjustedOffset),
  };
};
// -----------------------

// --- HIỆU ỨNG NỘI DUNG (ĐÃ THÊM STAGGER) ---
const contentPanelVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      // NÂNG CẤP: Các phần tử con sẽ xuất hiện cách nhau 0.05s (nhanh hơn chút)
      staggerChildren: 0.05,
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  },
};

// Hiệu ứng cho từng phần tử con (Tiêu đề, danh sách...)
const contentChildVariants = {
  initial: (direction) => ({ // Dùng direction để quyết định hướng trượt vào
      opacity: 0,
      y: direction > 0 ? 15 : -15 // Giảm độ trượt
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" } // Nhanh hơn chút
  },
   // Không cần exit riêng cho từng child vì cả panel đã exit rồi
};
// --------------------------

// --- COMPONENT CHÍNH ---
function App() {
  const [page, setPage] = useState(0);
  const totalSlides = slidesContent.length;
  const [slideDirection, setSlideDirection] = useState(0);

  const [isGridView, setIsGridView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [audioReady, setAudioReady] = useState(false);
  const audioInitialized = useRef(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // --- TÍNH NĂNG MỚI: FULLSCREEN ---
  const [isFullscreen, setIsFullscreen] = useState(false);
  const appRef = useRef(null); // Ref để tham chiếu đến div chính của app

  const toggleFullscreen = () => {
    playClick();
    if (!document.fullscreenElement) {
      appRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Lắng nghe sự kiện thay đổi fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  // ------------------------------------

  // --- CÁC HÀM XỬ LÝ KHÁC ---
  const toggleTheme = () => {
    playClick();
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--scrollbar-thumb', '#4b5563');
      root.style.setProperty('--scrollbar-track', '#1f2937');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--scrollbar-thumb', '#9ca3af');
      root.style.setProperty('--scrollbar-track', '#f3f4f6');
    }
  }, [theme]);


  const playClick = useCallback(() => { if (audioReady) clickSound.triggerAttackRelease("C2", "8n"); }, [audioReady]);
  const playSwoosh = useCallback(() => { if (audioReady) swooshSound.triggerAttackRelease("4n"); }, [audioReady]);

  const initializeAudio = () => {
    if (audioInitialized.current || !Tone.context || Tone.context.state === 'running') return;
    Tone.start().then(() => {
      setAudioReady(true);
      audioInitialized.current = true;
      console.log("Audio context started by user interaction.");
    }).catch(e => console.error("Error starting Tone.js:", e));
  };


  const paginate = useCallback((newDirection) => {
    playSwoosh();
    setSlideDirection(newDirection);
    setPage((prevPage) => {
      let newPage = prevPage + newDirection;
      if (newPage < 0) return totalSlides - 1;
      if (newPage >= totalSlides) return 0;
      return newPage;
    });
  }, [playSwoosh, totalSlides]);

  const goToSlide = useCallback((index) => {
    playSwoosh();
    setSlideDirection(index > page ? 1 : -1);
    setPage(index);
    setIsGridView(false);
  }, [playSwoosh, page]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGridView && e.key !== 'Escape') return;

      switch (e.key) {
        case 'ArrowRight': paginate(1); break;
        case 'ArrowLeft': paginate(-1); break;
        case 'Escape':
           if (isGridView) { setIsGridView(false); playClick(); }
          break;
        case 'f': // Nút F để bật/tắt fullscreen
           toggleFullscreen();
           break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, isGridView, paginate, playClick, toggleFullscreen]); // Thêm toggleFullscreen

  const handleDragEnd = (event, { offset }) => {
    if (offset.x < -50) paginate(1);
    else if (offset.x > 50) paginate(-1);
  };

  const filteredSlides = useMemo(() => {
    if (searchTerm === "") return slidesContent;
    return slidesContent.filter(slide =>
      slide.rawText && slide.rawText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const progressPercent = ((page + 1) / totalSlides) * 100;
  // NÂNG CẤP: Lấy *toàn bộ* object slide hiện tại
  const currentSlideData = slidesContent[page];

  return (
    // THÊM: Gắn ref vào div chính
    <div
      ref={appRef} // <-- Gắn Ref ở đây
      className={`grid grid-cols-10 min-h-screen w-full font-inter overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-slate-50'}`}
      onClick={initializeAudio}
    >
      {/* Nút Grid View */}
      {/* THAY ĐỔI: Dịch nút qua trái */}
      <button
        onClick={() => { playClick(); setIsGridView(!isGridView); }}
        className={`absolute top-6 left-[8rem] z-[60] p-3 rounded-full transition-all ${theme === 'dark' ? 'bg-black/30 text-white hover:bg-black/50' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md border border-gray-200'}`}
        title={isGridView ? "Đóng Grid View (Esc)" : "Mở Grid View"}
      >
        {isGridView ? <X size={24} /> : <LayoutGrid size={24} />}
      </button>

      {/* Nút Chuyển đổi Theme */}
      {/* THAY ĐỔI: Dịch nút qua trái */}
      <button
        onClick={toggleTheme}
        className={`absolute top-6 left-[4.5rem] z-[60] p-3 rounded-full transition-all ${theme === 'dark' ? 'bg-black/30 text-yellow-300 hover:bg-black/50' : 'bg-white text-blue-600 hover:bg-gray-50 shadow-md border border-gray-200'}`}
        title={theme === 'dark' ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* NÚT MỚI: Fullscreen */}
      <button
        onClick={toggleFullscreen}
        className={`absolute top-6 left-6 z-[60] p-3 rounded-full transition-all ${theme === 'dark' ? 'bg-black/30 text-white hover:bg-black/50' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md border border-gray-200'}`}
        title={isFullscreen ? "Thoát Toàn Màn Hình (F)" : "Vào Toàn Màn Hình (F)"}
      >
        {isFullscreen ? <Minimize size={24} /> : <Expand size={24} />}
      </button>

      {/* --- GRID VIEW (Giữ nguyên) --- */}
      <AnimatePresence>
        {isGridView && (
          <motion.div
             className="absolute inset-0 z-50 backdrop-blur-xl overflow-y-auto p-16 pt-24"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(248, 250, 252, 0.9)' }} // Nền slate-50/90
             exit={{ opacity: 0 }}
          >
            {/* Thanh Tìm kiếm */}
            <div className="w-full max-w-3xl mx-auto mb-8 sticky top-0 z-10">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Tìm kiếm nội dung slide..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-4 pl-12 border rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 shadow-sm'}`}
                />
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              </div>
            </div>

            {/* Lưới slide */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredSlides.map((slide, index) => {
                const originalIndex = slidesContent.findIndex(s => s === slide);
                return (
                  <motion.div
                    key={originalIndex}
                    className={`aspect-[16/10] rounded-lg shadow-lg cursor-pointer border overflow-hidden relative group transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      playClick();
                      goToSlide(originalIndex);
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, boxShadow: theme === 'dark' ? "0 0 15px rgba(59, 130, 246, 0.5)" : "0 0 20px rgba(59, 130, 246, 0.3)" }}
                  >
                    <img
                      src={slide.imageUrl}
                      alt={`Slide ${originalIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x600/${theme === 'dark' ? '374151/9ca3af' : 'e5e7eb/6b7280'}?text=Error`; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-2xl font-bold text-white tabular-nums">
                      {originalIndex + 1}
                    </span>
                  </motion.div>
                );
              })}
              {filteredSlides.length === 0 && (
                <p className={`col-span-full text-center text-2xl mt-10 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Không tìm thấy slide nào phù hợp với "{searchTerm}"
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CỘT TRÁI (70%): SLIDER 3D (Giữ nguyên) --- */}
      <div className="col-span-7 relative flex flex-col items-center justify-center h-screen overflow-hidden">
         {/* ... giữ nguyên code Slider 3D ... */}
         <div className="relative w-full max-w-6xl h-[700px] flex items-center justify-center">
          {/* Thanh tiến trình */}
          <div className="absolute top-0 left-0 w-full h-1.5 z-40">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "tween", duration: 0.5 }}
            />
          </div>

          {/* Không gian render 3D */}
          <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
            <AnimatePresence initial={false}>
              {slidesContent.map((slide, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-[500px] h-[550px] top-[calc(50%-275px)] left-[calc(50%-250px)] rounded-2xl overflow-hidden transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border border-gray-700 shadow-2xl'
                      : 'bg-white border border-gray-200 shadow-xl'
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                  initial={getSlideStyle(index, page, totalSlides)}
                  animate={getSlideStyle(index, page, totalSlides)}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  drag={index === page ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  onClick={initializeAudio}
                >
                  {/* Ảnh */}
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={slide.imageUrl}
                      alt="Minh họa"
                      className="w-full h-full object-cover"
                      draggable={false}
                      onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x600/${theme === 'dark' ? '374151/9ca3af' : 'e5e7eb/6b7280'}?text=Error`; }}
                    />
                    {/* Reflection */}
                    <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t via-opacity-80 to-transparent pointer-events-none transition-colors duration-300 ${theme === 'dark' ? 'from-gray-800' : 'from-white'}`}>
                      <img
                        src={slide.imageUrl}
                        alt=""
                        className="w-full h-full object-cover opacity-20 transform -scale-y-100"
                        style={{ maskImage: "linear-gradient(to bottom, transparent, black 30%)" }}
                        draggable={false}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Nút điều khiển */}
          <button
            onClick={() => paginate(-1)}
            className={`absolute top-1/2 left-4 md:left-16 -translate-y-1/2 z-40 p-2 backdrop-blur-sm rounded-full transition-all ${theme === 'dark' ? 'bg-black/30 text-white hover:bg-black/50' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md border border-gray-200'}`}
          >
            <ChevronLeftIcon className="w-10 h-10" />
          </button>
          <button
            onClick={() => paginate(1)}
            className={`absolute top-1/2 right-4 md:right-16 -translate-y-1/2 z-40 p-2 backdrop-blur-sm rounded-full transition-all ${theme === 'dark' ? 'bg-black/30 text-white hover:bg-black/50' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md border border-gray-200'}`}
          >
            <ChevronRightIcon className="w-10 h-10" />
          </button>
        </div>

        {/* Dấu chấm */}
        <div className="flex justify-center space-x-2 mt-6 z-10">
          {slidesContent.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === page
                  ? "bg-blue-500 w-6"
                  : `${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- CỘT PHẢI (30%): BẢNG NỘI DUNG (Đã thêm animation stagger) --- */}
      <div className={`col-span-3 h-screen border-l flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 shadow-2xl' : 'bg-white border-gray-200 shadow-lg'}`}>
        <div className={`flex-grow overflow-y-auto relative scrollbar-thin`}
             style={{
               scrollbarColor: `var(--scrollbar-thumb) var(--scrollbar-track)`,
               scrollbarWidth: 'thin',
             }}
        >
          <AnimatePresence mode="wait">
              {/* NÂNG CẤP: Bọc nội dung trong motion.div để áp dụng stagger */}
              <motion.div
                key={page} // Key phải là page để nó chạy lại anim khi chuyển slide
                custom={slideDirection} // Truyền hướng vào anim
                variants={contentPanelVariants} // Variants của cả panel (fade in/out + stagger)
                initial="initial"
                animate="animate"
                exit="exit"
                // NÂNG CẤP: Thêm class `prose` để tự động style chữ đẹp hơn
                className={`p-8 md:p-10 prose prose-lg max-w-none transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'prose-invert text-gray-100 prose-headings:text-blue-400 prose-strong:text-white' // Style cho dark mode
                    : 'text-gray-700 prose-headings:text-blue-600 prose-strong:text-gray-900' // Style cho light mode
                }`}
              >
                 {/*
                   Render nội dung bên trong motion.div này.
                   Các component SlideTitle, ListItem, SubItem trong slidesData.jsx
                   cần được bọc trong <motion.div variants={contentChildVariants}>
                   để nhận được hiệu ứng stagger.
                 */}
                {currentSlideData?.content || <p>Đang tải nội dung...</p>}
              </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;