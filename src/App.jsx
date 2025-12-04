import { useState, useEffect, useRef } from "react";
import { slidesContent } from "./slidesData.jsx";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  X,
  Sun,
  Moon,
  MessageSquare,
  Send,
  Loader2,
  Sparkles,
  Grid,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Hand,
  RotateCcw,
  CheckCircle2
} from "lucide-react";

const SPRING_TRANSITION = { type: "spring", mass: 0.8, stiffness: 120, damping: 25 };

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Manrope:wght@300;400;600&display=swap');
    
    .font-museum-heading { font-family: 'Cormorant Garamond', serif; }
    .font-museum-body { font-family: 'Manrope', sans-serif; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    ::selection { background: rgba(234, 179, 8, 0.3); color: inherit; }
  `}</style>
);

const EndScreen = ({ onRestart, theme }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-[600] flex flex-col items-center justify-center text-center px-6"
    >
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/95' : 'bg-[#f4f4f0]/95'} backdrop-blur-3xl`} />
      
      <div className={`absolute inset-8 border border-double border-opacity-20 pointer-events-none
        ${theme === 'dark' ? 'border-yellow-500' : 'border-black'}`} 
      />

      <div className="relative z-10 max-w-3xl">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <CheckCircle2 size={48} strokeWidth={1} className={`${theme === 'dark' ? 'text-yellow-500' : 'text-blue-600'} opacity-80`} />
          </div>
          
          <p className="text-sm md:text-base uppercase tracking-[0.4em] opacity-50 mb-4 font-museum-body">
            Triển Lãm Kết Thúc
          </p>
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-museum-heading mb-8
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Hành Trình Khép Lại
          </h1>
          
          <p className={`text-lg md:text-xl font-light italic opacity-80 max-w-xl mx-auto mb-12 leading-relaxed font-museum-body
             ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            "Xin cảm ơn quý khách đã dành thời gian tìm hiểu về Tư tưởng Hồ Chí Minh."
          </p>

          <button 
            onClick={onRestart}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-500
              ${theme === 'dark' 
                ? 'bg-white/10 hover:bg-yellow-600 text-white border border-white/10 hover:border-transparent' 
                : 'bg-black/5 hover:bg-black text-black hover:text-white border border-black/10 hover:border-transparent'}`}
          >
            <RotateCcw size={20} className="group-hover:-rotate-180 transition-transform duration-500"/>
            <span className="uppercase tracking-widest text-sm font-semibold">Tham quan lại</span>
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-[-150px] left-0 right-0 text-center"
        >
          <div className="h-16 w-[1px] bg-current opacity-20 mx-auto mb-4"></div>
          <span className="font-museum-heading text-xl opacity-40">The Virtual Museum © 2024</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SlideCard = ({ index, page, totalSlides, slide, theme, xSpring }) => {
  const offset = index - page;
  let adjustedOffset = offset;
  if (offset > totalSlides / 2) adjustedOffset = offset - totalSlides;
  if (offset < -totalSlides / 2) adjustedOffset = offset + totalSlides;

  const isActive = adjustedOffset === 0;

  const x = useTransform(xSpring, [-500, 500], [30, -30]);
  const rotateY = useTransform(xSpring, [-500, 500], [-10, 10]);

  const xBase = adjustedOffset * 600; 
  const zBase = isActive ? 0 : -Math.abs(adjustedOffset) * 400 - 200;
  const rotateYBase = adjustedOffset * -35;
  const opacity = isActive ? 1 : Math.max(0, 0.4 - Math.abs(adjustedOffset) * 0.1);

  return (
    <motion.div
      className={`absolute top-[45%] left-1/2 w-[400px] md:w-[500px] aspect-[3/4] rounded-sm
        ${isActive ? 'z-50 cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
      style={{
        marginTop: -300, 
        marginLeft: -250, 
        x: isActive ? x : 0,
        opacity,
        zIndex: totalSlides - Math.abs(adjustedOffset),
      }}
      initial={false}
      animate={{
        transform: `perspective(1200px) translateX(${xBase}px) translateZ(${zBase}px) rotateY(${rotateYBase}deg)`,
      }}
      transition={SPRING_TRANSITION}
    >
      <motion.div
        className="relative w-full h-full shadow-2xl"
        style={{ rotateY: isActive ? rotateY : 0, transformStyle: "preserve-3d" }}
      >
        <div className={`absolute -inset-4 border-[1px] opacity-20 ${theme === 'dark' ? 'border-yellow-100' : 'border-black'}`}></div>
        <div className={`absolute -inset-2 border-[1px] opacity-40 ${theme === 'dark' ? 'border-yellow-500' : 'border-gray-800'}`}></div>
        
        <div className="w-full h-full overflow-hidden bg-gray-900 relative group">
           <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-60 bg-black'}`} />
           <img 
            src={slide.imageUrl} 
            alt={slide.title} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            draggable={false}
           />
           <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] z-20 pointer-events-none"></div>

           <AnimatePresence>
             {isActive && slide.caption && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 10 }}
                 transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                 className="absolute bottom-0 left-0 right-0 z-40 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
               >
                 <div className="flex flex-col items-center text-center">
                   <div className="w-8 h-[1px] bg-white/50 mb-3"></div>
                   <p className="text-white/90 font-museum-body text-sm md:text-[15px] italic leading-relaxed tracking-wide drop-shadow-md">
                     "{slide.caption}"
                   </p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {isActive && (
          <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 mix-blend-overlay"></div>
        )}

        {isActive && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2`}
          >
            <span className={`h-12 w-[1px] ${theme === 'dark' ? 'bg-yellow-500/50' : 'bg-black/20'}`}></span>
            <span className="text-[10px] tracking-[0.3em] uppercase font-museum-body opacity-60">Exhibit No.{index + 1}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const InfoPanel = ({ slide, page, total, theme }) => {
  return (
    <div className="h-full w-full relative flex flex-col justify-center px-8 md:px-12 lg:px-16">
      <div className={`absolute inset-0 pointer-events-none opacity-30 blur-[100px] transition-colors duration-1000
        ${theme === 'dark' ? 'bg-gradient-to-l from-yellow-900/20 to-transparent' : 'bg-gradient-to-l from-gray-200 to-transparent'}`} 
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-xl"
        >
          <div className="flex items-center gap-3 mb-4 opacity-60">
             <span className={`h-px w-8 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-black'}`}></span>
             <span className="text-[10px] tracking-[0.2em] uppercase font-mono">
              Triển Lãm Số {String(page + 1).padStart(2, '0')}
            </span>
          </div>
          <h1 className={`text-2xl md:text-3xl lg:text-4xl font-museum-heading font-light leading-snug mb-6 tracking-wide
            ${theme === 'dark' ? 'text-yellow-50' : 'text-gray-900'}`}>
            {slide?.title || "Tiêu đề tác phẩm"}
          </h1>
          <div className={`relative pl-6 border-l opacity-80 max-h-[50vh] overflow-y-auto scrollbar-hide pr-4
             ${theme === 'dark' ? 'border-yellow-500/30' : 'border-black/20'}`}>
             <div className={`text-sm md:text-[15px] font-museum-body leading-loose text-justify font-light
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
               {slide?.details || slide?.content}
             </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dashed border-current opacity-20 flex justify-between items-center text-[10px] uppercase tracking-widest">
            <span>Triển Lãm Kĩ Thuật Số</span>
            <span>Tư tưởng Hồ Chí Minh</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const NavigationControl = ({ page, total, paginate, theme }) => {
  const progress = ((page + 1) / total) * 100;

  return (
    <div className={`absolute z-50 transition-all duration-500
      /* Cấu trúc chung: Flex Cột (Thanh ở trên, Chữ ở dưới) */
      flex flex-col gap-3 items-center
      /* Mobile: Căn giữa đáy */
      bottom-8 left-1/2 -translate-x-1/2 w-full
      /* Desktop: Góc trái, dưới header */
      lg:bottom-auto lg:top-[130px] lg:left-8 lg:w-auto lg:translate-x-0
    `}>
      
      <div className={`flex items-center gap-3 rounded-full backdrop-blur-xl border shadow-2xl transition-all duration-500
        ${theme === 'dark' ? 'bg-black/60 border-white/10 text-white' : 'bg-white/60 border-black/10 text-black'}
        /* Mobile: Ngang */
        flex-row px-5 py-2
        /* Desktop: Dọc */
        lg:flex-col lg:px-2 lg:py-4
      `}>
        
        <button 
          onClick={() => paginate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition active:scale-95"
        >
          <ArrowLeft size={20} strokeWidth={1.5} className="lg:hidden"/>
          <ArrowUp size={20} strokeWidth={1.5} className="hidden lg:block"/>
        </button>

        <div className="flex items-center gap-3
          /* Mobile: Ngang */
          flex-row
          /* Desktop: Dọc */
          lg:flex-col
        ">
           <span className="font-mono text-[10px] font-bold opacity-80 tracking-widest whitespace-nowrap">
             {String(page + 1).padStart(2,'0')} <span className="opacity-30">/</span> {String(total).padStart(2,'0')}
           </span>
           
           <div className={`bg-current opacity-10 rounded-full overflow-hidden
             /* Mobile: Ngang */
             w-16 h-[2px]
             /* Desktop: Dọc */
             lg:w-[2px] lg:h-16
           `}>
              <motion.div 
                className={`bg-yellow-500 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-black'}`}
                initial={false}
                animate={{ 
                  width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? '100%' : `${progress}%`,
                  height: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${progress}%` : '100%'
                }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100%' }}
              />
           </div>
        </div>

        <button 
          onClick={() => paginate(1)}
          className="p-2 rounded-full hover:bg-white/10 transition active:scale-95"
        >
          <ArrowRight size={20} strokeWidth={1.5} className="lg:hidden"/>
          <ArrowDown size={20} strokeWidth={1.5} className="hidden lg:block"/>
        </button>
      </div>

      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-40">
         <Hand size={14} className="animate-pulse"/>
         <span className="hidden lg:inline">Điều hướng</span>
         <span className="lg:hidden">Lướt xem</span>
      </div>

    </div>
  );
};

const ChatWidget = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', content: 'Kính chào quý khách. Tôi có thể hỗ trợ thông tin gì về hiện vật này?' }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    try {
      const res = await fetch("https://exe-be-2hzk.onrender.com/api/AI/chat", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: userMsg })
      });
      if (!res.ok) throw new Error("API Error");
      
      const data = await res.json();
      
      const cleanReply = (data.response || "").replace(/\*\*/g, '');
      
      setMessages(prev => [...prev, { role: 'ai', content: cleanReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Xin lỗi, kết nối đến máy chủ triển lãm đang bị gián đoạn." }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end font-museum-body">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`mb-4 w-[360px] h-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border backdrop-blur-3xl
              ${theme === 'dark' ? 'bg-black/80 border-white/10 text-gray-200' : 'bg-white/80 border-gray-200 text-gray-800'}`}
          >
            <div className={`p-4 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 flex items-center justify-center text-white"><Sparkles size={14} /></div>
                <div><h3 className="font-semibold text-sm">Trợ Lý Triển Lãm</h3><p className="text-[10px] opacity-60 uppercase tracking-wider">Trực tuyến</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap
                    ${msg.role === 'user' ? (theme === 'dark' ? 'bg-white/10 text-white rounded-br-sm' : 'bg-black text-white rounded-br-sm') : (theme === 'dark' ? 'bg-yellow-500/10 text-yellow-100 border border-yellow-500/20 rounded-bl-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm')}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><Loader2 className="animate-spin opacity-40" size={16}/></div>}
            </div>
            <div className={`p-3 border-t flex gap-2 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Đặt câu hỏi..." className="flex-1 bg-transparent text-sm px-3 py-2 outline-none placeholder:opacity-40"/>
              <button onClick={handleSend} disabled={!input.trim()} className={`p-2 rounded-full transition-colors ${input.trim() ? 'opacity-100 hover:bg-black/10 dark:hover:bg-white/10' : 'opacity-30'}`}><Send size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border transition-all ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-600 to-yellow-800 border-white/10 text-white' : 'bg-black text-white border-transparent'}`}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

const GridOverlay = ({ isOpen, onClose, slides, setPage, theme }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(20px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className={`fixed inset-0 z-[200] overflow-y-auto p-10 md:p-20 ${theme === 'dark' ? 'bg-black/90' : 'bg-white/95'}`}>
        <div className="max-w-7xl mx-auto">
           <div className="flex justify-between items-end mb-12 border-b border-gray-500/20 pb-6">
              <h2 className="text-4xl md:text-6xl font-museum-heading">Mục Lục Hiện Vật</h2>
              <button onClick={onClose} className="p-4 hover:rotate-90 transition-transform duration-500"><X size={32}/></button>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {slides.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} onClick={() => { setPage(i); onClose(); }} className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden mb-4 relative">
                    <img src={s.imageUrl} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt=""/>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center"><span className="text-white border border-white px-4 py-2 text-xs tracking-widest uppercase">Chi tiết</span></div>
                  </div>
                  <div className="flex items-baseline gap-2 opacity-60 group-hover:opacity-100 transition">
                    <span className="text-xs font-mono">{(i+1).toString().padStart(2,'0')}</span>
                    <h3 className="font-museum-heading text-xl truncate">{s.title}</h3>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [page, setPage] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isGridOpen, setIsGridOpen] = useState(false);
  const totalSlides = slidesContent.length;
  
  const mouseX = useMotionValue(0);
  const xSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleMouseMove = (e) => {
    const { innerWidth } = window;
    const x = e.clientX - innerWidth / 2;
    mouseX.set(x);
  };

  const paginate = (dir) => {
    setPage(prev => {
      const next = prev + dir;
      if (prev === totalSlides - 1 && dir === 1) {
        setHasEnded(true);
        return prev;
      }
      if (next < 0) return totalSlides - 1;
      
      return next;
    });
  };

  const restartTour = () => {
    setHasEnded(false);
    setPage(0);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (hasEnded) return;
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [totalSlides, hasEnded]);

  return (
    <>
      <GlobalStyles />
      <div className={`w-full h-screen overflow-hidden font-museum-body transition-colors duration-1000 relative selection:bg-yellow-500/30 ${theme === 'dark' ? 'bg-[#0a0a0a] text-gray-200' : 'bg-[#f4f4f0] text-gray-800'}`} onMouseMove={handleMouseMove}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        <AnimatePresence>
          {!hasStarted && (
            <motion.div className="absolute inset-0 z-[500] flex flex-col items-center justify-center cursor-pointer" onClick={() => setHasStarted(true)} exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)", transition: { duration: 1 } }}>
              <div className={`absolute inset-0 ${theme==='dark' ? 'bg-black' : 'bg-[#f4f4f0]'}`} />
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="relative z-10 text-center px-6">
                <p className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4 opacity-50">Chào mừng đến với</p>
                <h1 className="text-6xl md:text-8xl font-museum-heading mb-6">TRIỂN LÃM KĨ THUẬT SỐ</h1>
                <h2 className="text-xl md:text-2xl font-light opacity-80 max-w-2xl mx-auto leading-relaxed">HCM202 <br/>TƯ TƯỞNG HỒ CHÍ MINH</h2>
                <div className="mt-16 flex justify-center"><div className="w-[1px] h-24 bg-current opacity-20 animate-pulse origin-top"></div></div>
                <p className="mt-4 text-[10px] uppercase tracking-widest opacity-40">Nhấn để bắt đầu</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hasEnded && <EndScreen onRestart={restartTour} theme={theme} />}
        </AnimatePresence>

        {hasStarted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12">
            
            <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-[60] pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-6">
                 <div className="hidden md:block w-[1px] h-4 bg-current opacity-20"></div>
                 <span className="hidden md:block text-xs opacity-50 uppercase tracking-widest">Triển lãm chuyên đề</span>
              </div>
              <div className="pointer-events-auto flex gap-4">
                 <button onClick={() => setIsGridOpen(true)} className="p-2 hover:opacity-60 transition"><Grid size={20}/></button>
                 <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="p-2 hover:opacity-60 transition">{theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}</button>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-7 relative h-full flex items-center justify-center perspective-[1500px] overflow-hidden">
               <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
                  <div className={`w-[500px] h-[600px] border-2 border-dashed rounded-sm opacity-[0.03] ${theme === 'dark' ? 'border-white' : 'border-black'}`} />
               </div>
               <div className="relative w-full h-full">
                 {slidesContent.map((slide, i) => (
                   <SlideCard key={i} index={i} page={page} totalSlides={totalSlides} slide={slide} theme={theme} xSpring={xSpring}/>
                 ))}
               </div>
            </div>

            <div className="hidden lg:block lg:col-span-5 relative h-full border-l border-white/5 bg-opacity-50 backdrop-blur-sm">
               <InfoPanel slide={slidesContent[page]} page={page} total={totalSlides} theme={theme} />
            </div>

            <div className="lg:hidden absolute bottom-24 left-6 right-6 z-50 pointer-events-none">
               <motion.div key={page} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="bg-black/80 backdrop-blur-xl p-6 rounded-xl border border-white/10 text-white pointer-events-auto shadow-2xl">
                 <h2 className="font-museum-heading text-2xl mb-2">{slidesContent[page].title}</h2>
                 <p className="text-sm opacity-70 line-clamp-3">Xem chi tiết trên máy tính để có trải nghiệm tốt nhất</p>
               </motion.div>
            </div>

            <NavigationControl page={page} total={totalSlides} paginate={paginate} theme={theme} />
            <ChatWidget theme={theme} />
            <GridOverlay isOpen={isGridOpen} onClose={() => setIsGridOpen(false)} slides={slidesContent} setPage={setPage} theme={theme} />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default App;