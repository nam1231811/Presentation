import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { slidesContent } from "./slidesData.jsx";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  LayoutGrid,
  X,
  Search,
  Sun,
  Moon,
  Expand,
  Minimize,
  Settings,
  Keyboard,
  Play,
} from "lucide-react";

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

// --- HIỆU ỨNG NỘI DUNG ---
const contentPanelVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// --- COMPONENT PHÍM TẮT ---
const ShortcutHints = () => (
  <div className="absolute top-full left-0 mt-2 w-64 p-4 rounded-lg shadow-xl border dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-200">
    <h4 className="font-bold text-lg mb-2 dark:text-white text-gray-900">Phím tắt</h4>
    <ul className="space-y-1 text-sm dark:text-gray-300 text-gray-700">
      <li className="flex justify-between"><span>Chuyển slide</span> <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">←</code> <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">→</code></li>
      <li className="flex justify-between"><span>Toàn màn hình</span> <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">F</code></li>
      <li className="flex justify-between"><span>Grid View</span> <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">G</code></li>
      <li className="flex justify-between"><span>Đóng Grid/Tìm kiếm</span> <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">Esc</code></li>
    </ul>
  </div>
);

// --- NỀN ---
const CinematicBackground = ({ bgImage }) => (
  <div className="absolute inset-0 overflow-hidden bg-black">
    <motion.img
      src={bgImage}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover filter blur-xl brightness-50"
      initial={{ scale: 1.1, x: 0 }}
      animate={{ scale: 1, x: "-5%" }}
      transition={{ 
        duration: 40, 
        ease: "linear", 
        repeat: Infinity, 
        repeatType: "reverse"
      }}
    />
    <div 
      className="absolute inset-0" 
      style={{ 
        backgroundImage: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.5) 100%)" 
      }} 
    />
  </div>
);

// --- MÀN HÌNH MỞ ĐẦU --- 
const OpeningCredits = ({ onIntroFinished, theme, bgImage }) => {
  const [step, setStep] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);

  const credits = [
    { text: "Click để bắt đầu", duration: 0 },
    { text: "Xin chào cô và các bạn!", duration: 2500 },
    { text: "Hôm nay Nhóm 5 xin được phép thuyết trình về chủ đề:", duration: 3000 },
    { text: "CẠNH TRANH Ở CẤP ĐỘ ĐỘC QUYỀN TRONG NỀN KINH TẾ THỊ TRƯỜNG", duration: 4000 },
    { text: "Xin mời mọi người cùng theo dõi phần thuyết trình của nhóm mình ạ!", duration: 5000 }, 
  ];

  useEffect(() => {
    if (!isTriggered || step >= credits.length) return;

    if (step === credits.length - 1) {
      const timer = setTimeout(() => {
        onIntroFinished();
      }, credits[step].duration);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setStep(s => s + 1);
    }, credits[step].duration);

    return () => clearTimeout(timer);
  }, [isTriggered, step, onIntroFinished, credits]);

  const handleClick = () => {
    if (!isTriggered) {
      setIsTriggered(true);
      setStep(1);
    }
  };

  const currentCredit = credits[step];

  return (
    <motion.div
      className={`absolute inset-0 z-[101] flex flex-col justify-center items-center cursor-pointer overflow-hidden text-gray-100`} // <-- Sửa: Xóa bg, text luôn sáng
      exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
      onClick={handleClick}
    >
      <CinematicBackground bgImage={bgImage} />
      
      <div className="relative z-10 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.0 } }}
            exit={{ opacity: 0, transition: { duration: 1.0 } }}
            className={`font-inter text-center ${
              step === 0 ? 'text-xl opacity-50' : 'text-3xl md:text-5xl'
            } ${
              step === 3 ? 'font-bold' : 'font-light'
            }`}
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            {currentCredit.text}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};


// --- MÀN HÌNH BẮT ĐẦU ---
const SplashScreen = ({ onStart, theme }) => {
  const firstSlide = slidesContent[0];
  return (
    <motion.div
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-sm p-4"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.95), rgba(30, 41, 59, 0.95))'
          : 'linear-gradient(to bottom right, rgba(248, 250, 252, 0.95), rgba(243, 244, 246, 0.95))'
      }}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.4 } }}
        className={`mb-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
      >
        <p className="text-sm font-medium tracking-wider uppercase">MLN122 - Kinh tế chính trị Mác-Lênin</p>
      </motion.div>

      <motion.div
        className="relative w-[500px] max-w-full h-[550px] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] } }}
      >
        <img
          src={firstSlide.imageUrl}
          alt={firstSlide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } }}
          className={`absolute bottom-8 left-8 right-8 text-3xl md:text-4xl font-bold text-white ${theme === 'dark' ? 'drop-shadow-lg' : ''}`}
        >
          {firstSlide.title}
        </motion.h1>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{
            y: 0,
            opacity: 1,
            scale: [1, 1.03, 1],
            transition: {
                y: { duration: 0.5, delay: 0.7 },
                opacity: { duration: 0.5, delay: 0.7 },
                scale: {
                    delay: 1.5,
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }
            }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className={`flex items-center gap-3 mt-8 px-8 py-4 rounded-full text-lg md:text-xl font-semibold shadow-lg transition-colors ${ 
          theme === 'dark'
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <Play className="fill-white" size={24} />
        Bắt đầu Trình bày
      </motion.button>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.9 } }}
        className={`mt-4 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
      >
        <p className="text-xs font-semibold">Thực hiện bởi: Nhóm 5</p>
      </motion.div>
    </motion.div>
  );
};

// --- SLIDE CARD (VỚI PARALLAX) ---
const SlideCard = ({ index, page, totalSlides, slide, theme, handleDragEnd }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-275, 275], [5, -5]);
  const rotateY = useTransform(x, [-250, 250], [-5, 5]);

  const handleMouseMove = (e) => {
    if (index !== page || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cardX = e.clientX - rect.left - rect.width / 2;
    const cardY = e.clientY - rect.top - rect.height / 2;
    x.set(cardX);
    y.set(cardY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`slide-card-${index}`} 
      ref={cardRef}
      key={index}
      className={`absolute w-[500px] h-[550px] top-[calc(50%-275px)] left-[calc(50%-250px)] rounded-2xl overflow-hidden transition-colors duration-300 ${ 
        theme === 'dark'
          ? 'bg-gray-800 border border-gray-700/50 shadow-2xl'
          : 'bg-white border border-gray-200 shadow-xl'
      } ${index === page ? 'cursor-grab active:cursor-grabbing' : ''}`}
      style={{ transformStyle: "preserve-3d" }}
      initial={getSlideStyle(index, page, totalSlides)}
      animate={getSlideStyle(index, page, totalSlides)}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      drag={index === page ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full relative overflow-hidden"
        style={{
          rotateX: index === page ? rotateX : 0,
          rotateY: index === page ? rotateY : 0,
          transition: "transform 0.1s ease-out",
        }}
      >
        <img
          src={slide.imageUrl}
          alt="Minh họa"
          className="w-full h-full object-cover"
          draggable={false}
          onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x600/${theme === 'dark' ? '374151/9ca3af' : 'e5e7eb/6b7280'}?text=Error`; }}
        />
        <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-opacity-90 to-transparent pointer-events-none transition-colors duration-300 ${theme === 'dark' ? 'from-gray-800' : 'from-white'}`}>
          <img
            src={slide.imageUrl}
            alt=""
            className="w-full h-full object-cover opacity-20 transform -scale-y-100"
            style={{ maskImage: "linear-gradient(to bottom, transparent, black 30%)" }}
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- THANH FILMSTRIP ---
const Filmstrip = ({ slides, currentPage, goToSlide, theme }) => {
  const itemRefs = useRef([]);

  useEffect(() => {
    if (itemRefs.current[currentPage]) {
      itemRefs.current[currentPage].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentPage]);

  return (
    <div className={`absolute bottom-4 left-0 right-0 z-10 h-24 rounded-t-lg
        bg-black/10 dark:bg-black/20 backdrop-blur-sm shadow-inner`}> 
      <div
        className="w-full h-full px-4 md:px-16 flex items-center justify-start gap-3 overflow-x-auto scrollbar-thin"
        style={{
            scrollbarColor: `var(--scrollbar-thumb) var(--scrollbar-track)`,
            scrollbarWidth: 'thin',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        {slides.map((slide, index) => (
          <motion.button
            ref={(el) => (itemRefs.current[index] = el)}
            key={index}
            onClick={() => goToSlide(index)}
            whileTap={{ scale: 0.95 }}
            className={`aspect-[16/10] w-24 h-auto flex-shrink-0 rounded overflow-hidden border-[3px] transition-all duration-300
               ${
              index === currentPage
                ? 'border-blue-500 shadow-xl scale-105'
                : `${theme === 'dark' ? 'border-gray-700/50 hover:border-gray-500/80' : 'border-gray-300/80 hover:border-gray-400'} opacity-60 hover:opacity-90`
            }`}
            title={`Slide ${index + 1}: ${slide.title}`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/160x100/${theme === 'dark' ? '374151/9ca3af' : 'e5e7eb/6b7280'}?text=...`; }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// --- MÀN HÌNH KẾT THÚC ---
const ClosingCredits = ({ theme, onReset, bgImage }) => {
  const [isFinished, setIsFinished] = useState(false);

  const handleScrollEnd = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 1500);
  };

  const handleClick = () => {
    if (isFinished) {
      onReset();
    }
  };

  return (
    <motion.div
      className={`absolute inset-0 z-[102] overflow-hidden ${
        isFinished ? 'cursor-pointer' : 'cursor-default'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      onClick={handleClick}
    >
      <CinematicBackground bgImage={bgImage} />

      <div className={`absolute top-0 left-0 w-full h-1/4 z-10 bg-gradient-to-b from-black to-transparent`} />
      <div className={`absolute bottom-0 left-0 w-full h-1/4 z-10 bg-gradient-to-t from-black to-transparent`} />

      <motion.div
        className={`font-inter text-center absolute w-full z-10 text-gray-200`} 
        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }} 
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 20, ease: "linear", delay: 1.5 }}
        onAnimationComplete={handleScrollEnd}
      >
        <div className="py-20 space-y-10">
          <div className="space-y-2">
            <p className="text-xl opacity-70">ĐƯỢC LÀM BỞI</p>
            <p className="text-3xl font-bold">[CÁC THÀNH VIÊN NHÓM 5]</p>
          </div>
          <div className="space-y-2">
            <p className="text-xl opacity-70">THÀNH VIÊN</p>
            <p className="text-2xl">[Vũ Nhật Nam - SE181565]</p>
            <p className="text-2xl">[Hoàng Chí Trung - SE181597]</p>
            <p className="text-2xl">[Nguyễn Quang Huy - SE181563]</p>
            <p className="text-2xl">[Nguyễn Đức Hoàng Vũ - SE181551]</p>
          </div>
          <div className="space-y-2">
            <p className="text-xl opacity-70">THIẾT KẾ & KỸ XẢO</p>
            <p className="text-2xl">React</p>
            <p className="text-2xl">Framer Motion</p>
            <p className="text-2xl">Tailwind CSS</p>
          </div>
          <div className="space-y-2 pt-10">
            <p className="text-3xl font-bold">RẤT CẢM ƠN</p>
            <p className="text-3xl">Cô và các bạn đã lắng nghe</p>
          </div>
          <div className="h-48"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENT CHÍNH ---
function App() {
  const [introDone, setIntroDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [page, setPage] = useState(0);
  const totalSlides = slidesContent.length;
  const [slideDirection, setSlideDirection] = useState(0);

  const [isGridView, setIsGridView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const appRef = useRef(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  const handleStart = useCallback(() => {
    setHasStarted(true);
  }, []);

  const handleResetApp = useCallback(() => {
    setIntroDone(false);
    setHasStarted(false);
    setIsShuttingDown(false);
    setPage(0);
    setIsGridView(false);
    setIsSettingsOpen(false);
    setSearchTerm("");
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      appRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

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

  const paginate = useCallback((newDirection) => {
    setSlideDirection(newDirection);

    if (newDirection === 1 && page === totalSlides - 1) {
      setIsShuttingDown(true);
      return; 
    }

    setPage((prevPage) => {
      let newPage = prevPage + newDirection;
      if (newPage < 0) return totalSlides - 1; 
      if (newPage >= totalSlides) return 0; 
      return newPage;
    });
  }, [totalSlides, page]);

  const goToSlide = useCallback((index) => {
    setSlideDirection(index > page ? 1 : -1);
    setPage(index);
    setIsGridView(false);
  }, [page]); 

  useEffect(() => {
    if (!hasStarted) return;
    
    const handleKeyDown = (e) => {
      if (isShuttingDown) return; 

      if (isGridView && !['Escape', 'g', 'G'].includes(e.key)) return;
      if (e.target.tagName === 'INPUT') return;

      switch (e.key) {
        case 'ArrowRight': paginate(1); break;
        case 'ArrowLeft': paginate(-1); break;
        case 'Escape':
          if (isGridView) { setIsGridView(false); }
          break;
        case 'f': case 'F':
          toggleFullscreen();
          break;
        case 'g': case 'G':
          setIsGridView(prev => !prev);
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, isGridView, paginate, toggleFullscreen, hasStarted, isShuttingDown]);

  const handleDragEnd = (event, { offset }) => {
    if (isShuttingDown) return;

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
  const currentSlideData = slidesContent[page];
  
  const bgImage = useMemo(() => slidesContent[0].imageUrl, []);

  return (
    <div
      ref={appRef}
      className={`min-h-screen w-full font-inter overflow-hidden transition-colors duration-300s
        ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-slate-900 text-gray-100' : 'bg-gradient-to-br from-slate-50 to-gray-100 text-gray-800'} 
        ${hasStarted ? 'grid grid-cols-10' : 'block'}`}
    >
      <AnimatePresence>
        {!introDone && (
          <OpeningCredits 
            onIntroFinished={() => setIntroDone(true)} 
            theme={theme} 
            bgImage={bgImage}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introDone && !hasStarted && (
          <SplashScreen onStart={handleStart} theme={theme} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            className="contents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
          >
            {/* --- Menu Cài Đặt --- */}
            <div className="absolute top-6 left-6 z-[60]">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen);
                }}
                className={`relative p-3 rounded-full transition-colors ${theme === 'dark' ? 'bg-black/40 text-white hover:bg-black/60' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md border border-gray-200'}`}
                title="Cài đặt và Chế độ xem"
              >
                <Settings size={24} />
              </motion.button>
              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className={`absolute top-full left-0 mt-2 w-max p-2 rounded-lg shadow-xl border flex flex-col items-start gap-1 ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
                  >
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setIsGridView(!isGridView); setIsSettingsOpen(false); }} className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left transition-colors ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-100'}`} >
                      {isGridView ? <X size={20} /> : <LayoutGrid size={20} />}
                      <span>{isGridView ? "Đóng Grid" : "Mở Grid"}</span>
                      <span className="ml-auto text-xs font-mono opacity-60">G</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { toggleTheme(); setIsSettingsOpen(false); }} className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left transition-colors ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-100'}`} >
                      {theme === 'dark' ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-blue-600" />}
                      <span>{theme === 'dark' ? "Light Mode" : "Dark Mode"}</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => { toggleFullscreen(); setIsSettingsOpen(false); }} className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left transition-colors ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-100'}`} >
                      {isFullscreen ? <Minimize size={20} /> : <Expand size={20} />}
                      <span>{isFullscreen ? "Thoát" : "Toàn màn hình"}</span>
                         <span className="ml-auto text-xs font-mono opacity-60">F</span>
                    </motion.button>
                    <div className="w-full h-px my-1 bg-gray-700/50" />
                    <div className="relative group">
                      <motion.button whileTap={{ scale: 0.95 }} className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-left transition-colors ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-100'}`} >
                        <Keyboard size={20} />
                        <span>Phím tắt</span>
                      </motion.button>
                      <div className="absolute left-0 top-full mt-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                        <ShortcutHints />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- GRID VIEW --- */}
            <AnimatePresence>
              {isGridView && (
                <motion.div
                  className="absolute inset-0 z-50 backdrop-blur-xl overflow-y-auto p-8 sm:p-16 pt-24"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.9)' : 'rgba(243, 244, 246, 0.9)' }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-full max-w-3xl mx-auto mb-8 sticky top-0 z-10"> <div className="relative"> <input type="search" placeholder="Tìm kiếm nội dung slide..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full p-4 pl-12 border rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400 shadow-sm'}`} /> <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} size={20} /> </div> </div> <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"> {filteredSlides.map((slide, index) => { const originalIndex = slidesContent.findIndex(s => s === slide); return ( 
                    <motion.div 
                      layoutId={`slide-card-${originalIndex}`} 
                      key={originalIndex} 
                      className={`aspect-[16/10] rounded-lg shadow-lg cursor-pointer border overflow-hidden relative group transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`} 
                      onClick={() => { goToSlide(originalIndex); }} 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      whileHover={{ scale: 1.03, boxShadow: theme === 'dark' ? "0 0 15px rgba(59, 130, 246, 0.4)" : "0 0 20px rgba(59, 130, 246, 0.2)" }} 
                    > 
                      <img src={slide.imageUrl} alt={`Slide ${originalIndex + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x600/${theme === 'dark' ? '374151/9ca3af' : 'e5e7eb/6b7280'}?text=Error`; }} /> 
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> 
                      <span className="absolute bottom-1.5 left-2.5 text-xl font-bold text-white tabular-nums drop-shadow"> {originalIndex + 1} </span> 
                    </motion.div> 
                  ); })} {filteredSlides.length === 0 && ( <p className={`col-span-full text-center text-xl mt-10 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}> Không tìm thấy slide nào phù hợp với "{searchTerm}" </p> )} </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* --- CỘT TRÁI --- */}
            <div className="col-span-7 relative flex flex-col items-center justify-center h-screen overflow-hidden">
              <div className="relative w-full max-w-6xl h-full flex items-center justify-center pt-10 pb-28">
                <div className="absolute top-0 left-0 w-full h-1.5 z-40">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ type: "tween", duration: 0.5 }}
                  />
                </div>

                <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
                  <AnimatePresence initial={false}>
                    {slidesContent.map((slide, index) => (
                      <SlideCard
                        key={index}
                        index={index}
                        page={page}
                        totalSlides={totalSlides}
                        slide={slide}
                        theme={theme}
                        handleDragEnd={handleDragEnd}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(-1)}
                  className={`absolute top-1/2 left-4 md:left-16 -translate-y-1/2 z-40 p-2 backdrop-blur-sm rounded-full transition-colors ${theme === 'dark' ? 'bg-black/40 text-white hover:bg-black/60' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md border border-gray-200'}`}
                >
                  <ChevronLeftIcon className="w-10 h-10" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(1)}
                  className={`absolute top-1/2 right-4 md:right-16 -translate-y-1/2 z-40 p-2 backdrop-blur-sm rounded-full transition-colors ${theme === 'dark' ? 'bg-black/40 text-white hover:bg-black/60' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md border border-gray-200'}`}
                >
                  <ChevronRightIcon className="w-10 h-10" />
                </motion.button>
              </div>

              <Filmstrip
                slides={slidesContent}
                currentPage={page}
                goToSlide={goToSlide}
                theme={theme}
              />
            </div>

            {/* --- CỘT PHẢI --- */}
            <div className={`col-span-3 h-screen border-l flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-800/50 border-gray-700/50' : 'bg-white/80 border-gray-200 shadow-lg backdrop-blur-sm'}`}>
              <div className={`p-8 md:p-10 border-b ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200'} flex-shrink-0`}>
                 <motion.h2 key={`title-${page}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className={`text-3xl font-bold leading-snug ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} > {currentSlideData?.title || "Tiêu đề Slide"} </motion.h2> <motion.span key={`count-${page}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className={`text-sm font-medium tabular-nums mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} > Slide {page + 1} / {totalSlides} </motion.span> </div>
                 <div className={`flex-grow overflow-y-auto relative scrollbar-thin`} style={{ scrollbarColor: `var(--scrollbar-thumb) var(--scrollbar-track)`, scrollbarWidth: 'thin', maskImage: 'linear-gradient(to bottom, black calc(100% - 40px), transparent 100%)', }} > <AnimatePresence mode="wait"> <motion.div key={page} custom={slideDirection} variants={contentPanelVariants} initial="initial" animate="animate" exit="exit" className={`p-8 md:p-10 pt-6 prose prose-lg max-w-none transition-colors duration-300 ${ theme === 'dark' ? 'prose-invert text-gray-300 prose-headings:text-blue-400 prose-strong:text-gray-100' : 'text-gray-700 prose-headings:text-blue-600 prose-strong:text-gray-900' }`} > {currentSlideData?.details || currentSlideData?.content || <p>Đang tải nội dung...</p>} </motion.div> </AnimatePresence> </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MÀN HÌNH TẮT MÁY --- */}
      <AnimatePresence>
        {isShuttingDown && (
          <ClosingCredits 
            theme={theme} 
            onReset={handleResetApp} 
            bgImage={bgImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

