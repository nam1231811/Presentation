import { motion } from "framer-motion";

const contentChildVariants = {
  initial: (direction) => ({ opacity: 0, y: direction > 0 ? 15 : -15 }),
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const ListItem = ({ title, children, className = "" }) => (
  <motion.li variants={contentChildVariants} className={`mb-3 ${className}`}>
    {title && <strong className="text-lg block mb-1">{title}</strong>}
    {children && (
      <div className={title ? "mt-1" : ""}>
        {children}
      </div>
    )}
  </motion.li>
);

const SubItem = ({ children, className = "" }) => (
  <motion.li variants={contentChildVariants} className={`flex items-start gap-2 text-base ${className}`}>
    <svg
      className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1"
      fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/>
    </svg>
    <span>{children}</span>
  </motion.li>
);

export const slidesContent = [
  // Slide 1
  {
    imageUrl: "https://baoquangbinh.vn/dataimages/201609/original/images597962_anhbia.jpg",
    title: "CHƯƠNG 5: TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC VÀ ĐOÀN KẾT QUỐC TẾ",
    details: (
      <motion.div variants={contentChildVariants} className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-xl font-semibold mb-4">Các nội dung chính:</p>
        <ul className="text-left space-y-3 inline-block text-lg">
            <li>3. Điều kiện để xây dựng khối đại đoàn kết toàn dân tộc</li>
            <li>4. Hình thức, nguyên tắc tổ chức của khối đại đoàn kết toàn dân tộc - Mặt trận dân tộc thống nhất</li>
            <li>5. Phương thức xây dựng khối đại đoàn kết dân tộc</li>
        </ul>
      </motion.div>
    ),
  },

  // Slide 2
  {
    imageUrl: "https://images.hcmcpv.org.vn/res/news/2021/11/18-11-2021-mat-tran-dan-toc-thong-nhat-bieu-tuong-cua-khoi-dai-doan-ket-toan-dan-D02C716E.jpg",
    caption: "Đại hội toàn quốc thống nhất Mặt trận Việt Minh - Liên Việt thành Mặt trận Liên hiệp quốc dân Việt Nam, tại Tuyên Quang, ngày 3/3/1951.",
    title: "3. ĐIỀU KIỆN ĐỂ XÂY DỰNG KHỐI ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC",
    details: (
      <motion.div variants={contentChildVariants} className="flex flex-col items-center justify-center h-full text-center p-4">
        <p className="text-xl md:text-2xl font-light italic mb-6 opacity-80">
          "Đại đoàn kết tức là trước hết phải đoàn kết đại đa số nhân dân, mà đại đa số nhân dân ta là công nhân, nông dân và các tầng lớp nhân dân lao động khác."
        </p>
        <div className="w-24 h-1 bg-yellow-600 dark:bg-yellow-500 rounded-full mb-6"></div>
        <p className="text-lg opacity-90">
          Để thực hiện được đại đoàn kết, Hồ Chí Minh chỉ ra cần phải đảm bảo các điều kiện tiên quyết sau đây:
        </p>
      </motion.div>
    ),
  },

  // Slide 3
  {
    imageUrl: "http://tuyengiao.hagiang.gov.vn/upload/64711/fck/files/image-20180904082009-1.jpeg",
    rawText: "3. Điều kiện để xây dựng khối đại đoàn kết toàn dân tộc. Một là, phải lấy lợi ích chung làm điểm quy tụ, đồng thời tôn trọng các lợi ích khác biệt chính đáng.",
    title: "MỘT LÀ, PHẢI LẤY LỢI ÍCH CHUNG LÀM ĐIỂM QUY TỤ, ĐỒNG THỜI TÔN TRỌNG CÁC LỢI ÍCH KHÁC BIỆT CHÍNH ĐÁNG",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Xử lý mối quan hệ lợi ích">
           Trong xã hội luôn tồn tại nhiều lợi ích khác nhau, cần tìm ra điểm tương đồng, lợi ích chung để đoàn kết lực lượng.
        </ListItem>
        <ListItem title="Mục đích chung">
           Đoàn kết lực lượng để thực hiện mục đích chung của Mặt trận: Vì nước, vì dân.
        </ListItem>
        <ListItem title="Nguyên tắc bất di bất dịch">
           Phải lấy lợi ích tối cao của dân tộc làm mục tiêu phấn đấu.
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 4
  {
    imageUrl: "https://cdn.noron.vn/2022/08/03/img20201113091945-1659491642.jpg",
    rawText: "Hai là, phải kế thừa truyền thống yêu nước, nhân nghĩa, đoàn kết của dân tộc.",
    title: "HAI LÀ, PHẢI KẾ THỪA TRUYỀN THỐNG YÊU NƯỚC, NHÂN NGHĨA, ĐOÀN KẾT CỦA DÂN TỘC",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Nguồn gốc lịch sử">
           Được hình thành, củng cố và phát triển trong suốt quá trình dựng nước và giữ nước hàng ngàn năm của dân tộc.
        </ListItem>
        <ListItem title="Giá trị bền vững">
           Truyền thống yêu nước, nhân nghĩa đã thấm sâu vào tư tưởng mỗi con người Việt Nam và lưu truyền qua nhiều thế hệ.
        </ListItem>
        <ListItem title="Cội nguồn sức mạnh">
           Là cội nguồn sức mạnh vô địch để cả dân tộc chiến đấu và chiến thắng thiên tai địch họa.
        </ListItem>
        <ListItem title="Bảo vệ bản sắc">
           Làm cho đất nước được trường tồn, bản sắc dân tộc được giữ vững.
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 5
  {
    imageUrl: "https://f.hoatieu.vn/data/image/2021/10/14/bieu-hien-cua-long-yeu-thuong-con-nguoi-so-1.jpg",
    rawText: "Ba là, phải có lòng khoan dung, độ lượng với con người.",
    title: "BA LÀ, PHẢI CÓ LÒNG KHOAN DUNG, ĐỘ LƯỢNG VỚI CON NGƯỜI",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Vì lợi ích cách mạng">
           Phải có lòng khoan dung độ lượng, chấp nhận những điểm khác biệt nhỏ.
        </ListItem>
        <ListItem title="Cách nhìn nhận con người">
           Cần trân trọng phần thiện dù là nhỏ nhất ở mỗi người để cảm hóa và quy tụ họ.
        </ListItem>
        <ListItem title="Mục đích">
           Tập hợp, quy tụ rộng rãi mọi lực lượng vào khối đại đoàn kết.
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 6
  {
    imageUrl: "https://baotanghochiminh.vn/pic/Customer/images/73.jpg",
    rawText: "Bốn là, phải có niềm tin vào nhân dân.",
    title: "BỐN LÀ, PHẢI CÓ NIỀM TIN VÀO NHÂN DÂN",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Nguyên tắc tối cao theo Bác">
           Yêu dân, tin dân, dựa vào dân, sống và phấn đấu vì hạnh phúc của nhân dân.
        </ListItem>
        <ListItem title="Tiếp nối truyền thống">
           Kế thừa tư tưởng "Nước lấy dân làm gốc", "Chở thuyền và lật thuyền cũng là dân".
        </ListItem>
        <ListItem title="Nguyên lý Mác-xít">
           Quán triệt sâu sắc nguyên lý: "Cách mạng là sự nghiệp của quần chúng".
        </ListItem>
        <ListItem title="Vị trí của Nhân dân">
           <ul>
              <SubItem>Là chỗ dựa vững chắc.</SubItem>
              <SubItem>Là nguồn sức mạnh vô địch của khối đại đoàn kết dân tộc.</SubItem>
           </ul>
        </ListItem>
        <ListItem title="Ý nghĩa sống còn">
           Nhân dân là nhân tố quyết định thắng lợi của cách mạng.
        </ListItem>
        <ListItem title="Kết luận">
           Muốn thực hiện đại đoàn kết toàn dân tộc, dứt khoát phải có niềm tin vào nhân dân.
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 7
  {
    imageUrl: "https://file3.qdnd.vn/data/images/0/2022/11/10/thutrang_la/mat-tran-to-quoc-1983.jpg?dpi=150&quality=100&w=870",
    title: "4. HÌNH THỨC, NGUYÊN TẮC TỔ CHỨC CỦA KHỐI ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC - MẶT TRẬN DÂN TỘC THỐNG NHẤT",
    caption: "Đại hội đại biểu toàn quốc Mặt trận Tổ quốc Việt Nam lần thứ II được tổ chức tại Hà Nội từ ngày 12 đến ngày 14-5-1983.",
    details: (
      <motion.div variants={contentChildVariants} className="flex flex-col items-center justify-center h-full text-center p-4">
        <p className="text-xl md:text-2xl font-light italic mb-6 opacity-80">
          "Chính sách Mặt trận là một chính sách rất quan trọng. Công tác Mặt trận là một công tác rất quan trọng trong toàn bộ công tác cách mạng."
        </p>
        <div className="w-24 h-1 bg-yellow-600 dark:bg-yellow-500 rounded-full mb-6"></div>
        <p className="text-lg opacity-90">
          Tìm hiểu về hình thức tổ chức duy nhất (Mặt trận Dân tộc Thống nhất) và các nguyên tắc vàng để xây dựng và vận hành khối đại đoàn kết.
        </p>
      </motion.div>
    ),
  },

  // Slide 8
  {
    imageUrl: "https://vnanet.vn/Data/Articles/2020/11/12/5127161/vna_potal_ky_niem_90_nam_ngay_thanh_lap_mat_tran_dan_toc_thong_nhat_viet_nam_-_ngay_truyen_thong_mat_tran_to_quoc_viet_nam_18111930_%E2%80%93_18112020___stand.jpg",
    rawText: "4. Hình thức tổ chức: Mặt trận dân tộc thống nhất. Là nơi quy tụ mọi tổ chức và cá nhân yêu nước.",
    caption: "Chủ tịch Hồ Chí Minh tại Đại hội thành lập Mặt trận Tổ quốc Việt Nam, tổ chức tại Hà Nội, tháng 9/1955.",
    title: "I/ MẶT TRẬN DÂN TỘC THỐNG NHẤT",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Bản chất">
           Là nơi quy tụ mọi tổ chức và cá nhân yêu nước, tập hợp người dân Việt Nam cả trong và ngoài nước.
        </ListItem>
        <ListItem title="Tư tưởng Hồ Chí Minh">
           Chú trọng tập hợp quần chúng vào các tổ chức ái hữu, tương trợ... nhưng bao trùm là Mặt trận dân tộc thống nhất.
        </ListItem>
        <ListItem title="Sự đa dạng về tên gọi">
           Tùy từng thời kỳ cách mạng mà Mặt trận có tên gọi khác nhau (Mặt trận Việt Minh, Mặt trận Liên Việt...).
        </ListItem>
        <ListItem title="Mục tiêu chung nhất">
           Phấn đấu vì độc lập, thống nhất của Tổ quốc và tự do, hạnh phúc của nhân dân.
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 9
  {
    imageUrl: "https://tttctt.1cdn.vn/thumbs/1200x630/2023/08/18/anh-2-9-.jpg",
    title: "II/ NGUYÊN TẮC XÂY DỰNG VÀ HOẠT ĐỘNG CỦA MẶT TRẬN DÂN TỘC THỐNG NHẤT",
    caption: "Kỳ họp thứ nhất của Quốc hội khóa I thể hiện sự đại đoàn kết toàn dân tộc để phục vụ nhiệm vụ kháng chiến kiến quốc.",
    details: (
      <motion.div variants={contentChildVariants} className="flex flex-col items-center justify-center h-full text-center p-4">
        <p className="text-xl md:text-2xl font-light italic mb-6 opacity-80">
          "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công."
        </p>
        <div className="w-24 h-1 bg-yellow-600 dark:bg-yellow-500 rounded-full mb-6"></div>
        <p className="text-lg opacity-90 font-museum-body">
          Để Mặt trận thực sự trở thành nơi quy tụ sức mạnh toàn dân tộc, Hồ Chí Minh đã đề ra 3 nguyên tắc hoạt động cốt lõi không thể tách rời.
        </p>
      </motion.div>
    ),
  },

  // Slide 10
  {
    imageUrl: "https://www.tapchicongsan.org.vn/image/journal/article?img_id=152099845&t=1637916050670",
    rawText: "Nguyên tắc 1: Xây dựng trên nền tảng liên minh công - nông - trí thức và đặt dưới sự lãnh đạo của Đảng.",
    title: "MỘT LÀ, PHẢI ĐƯỢC XÂY DỰNG TRÊN NỀN TẢNG LIÊN MINH CÔNG - NÔNG - TRÍ THỨC VÀ ĐẶT DƯỚI SỰ LÃNH ĐẠO CỦA ĐẢNG",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Nền tảng bắt buộc">
           <ul>
              <SubItem>Liên minh Công nhân – Nông dân – Trí thức.</SubItem>
              <SubItem>Đặt dưới sự lãnh đạo của Đảng Cộng sản Việt Nam.</SubItem>
           </ul>
        </ListItem>
        <ListItem title="Tại sao Công-Nông là nòng cốt?">
           Vì họ là lực lượng sản xuất trực tiếp, đông đảo nhất, bị áp bức nặng nề nhất và có chí khí cách mạng bền bỉ.
        </ListItem>
        <ListItem title="Sự mở rộng">
           Hồ Chí Minh nhấn mạnh cần mở rộng liên minh với các giai cấp, tầng lớp khác, đặc biệt là trí thức.
        </ListItem>
        <ListItem title="Đặc điểm vai trò lãnh đạo của Đảng">
           <ul>
              <SubItem>Đảng không có lợi ích riêng, lợi ích của Đảng gắn liền với lợi ích dân tộc.</SubItem>
              <SubItem>Lãnh đạo bằng việc nắm bắt quy luật lịch sử, đề ra đường lối đúng đắn.</SubItem>
           </ul>
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 11
  {
    imageUrl: "https://btnmt.1cdn.vn/2022/05/19/t2(1).jpg",
    rawText: "Nguyên tắc 2: Hoạt động theo nguyên tắc hiệp thương dân chủ. Mọi vấn đề phải được thảo luận công khai.",
    caption: "Chủ tịch Hồ Chí Minh đọc diễn văn khai mạc Đại hội đại biểu toàn quốc lần thứ III.",
    title: "HAI LÀ, PHẢI HOẠT ĐỘNG THEO NGUYÊN TẮC HIỆP THƯƠNG DÂN CHỦ",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Lý do cần hiệp thương">
           Mặt trận gồm nhiều giai cấp, tầng lớp, đảng phái, tôn giáo với lợi ích khác nhau nên phải dùng hiệp thương dân chủ.
        </ListItem>
        <ListItem title="Cách thức thực hiện">
           Mọi vấn đề phải được thảo luận công khai, các thành viên cùng bàn bạc để đi đến nhất trí, tránh áp đặt.
        </ListItem>
        <ListItem title="Xử lý lợi ích">
           Tôn trọng lợi ích riêng chính đáng nếu phù hợp với lợi ích chung; điều chỉnh dần những lợi ích chưa phù hợp.
        </ListItem>
        <ListItem title="Giá trị của Hiệp thương">
           Giúp quy tụ nhiều lực lượng xã hội, tạo sự đồng thuận để xây dựng khối đại đoàn kết dân tộc vững chắc.
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 12
  {
    imageUrl: "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/5/7/1189327/Chien-Dich-Dien-Bien.jpg",
    rawText: "Nguyên tắc 3: Đoàn kết lâu dài, chặt chẽ, thật sự. Phương châm 'Cầu đồng tồn dị'.",
    title: "BA LÀ, PHẢI ĐOÀN KẾT LÂU DÀI, CHẶT CHẼ, ĐOÀN KẾT THẬT SỰ, CHÂN THÀNH, THÂN ÁI GIÚP ĐỠ NHAU CÙNG TIẾN BỘ",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Yêu cầu đoàn kết">
           Phải đoàn kết lâu dài, chặt chẽ, đoàn kết thật sự, chân thành, thân ái giúp đỡ nhau cùng tiến bộ.
        </ListItem>
        <ListItem title="Phương châm 'Cầu đồng tồn dị'">
           Hồ Chí Minh nhấn mạnh việc lấy cái chung (Độc lập, Tự do) để hạn chế cái riêng, cái khác biệt.
        </ListItem>
        <ListItem title="Phương châm về sự đoàn kết">
           Tiền đề để mở rộng khối đại đoàn kết trong mặt trận dân tộc thống nhất.
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 13
  {
    imageUrl: "https://kienthucplus.vn/wp-content/uploads/2023/04/bac-ho-chuyen-tham-quang-binh-vinh-linh.jpg ",
    title: "5. PHƯƠNG THỨC XÂY DỰNG KHỐI ĐẠI ĐOÀN KẾT DÂN TỘC",
    details: (
      <motion.div variants={contentChildVariants} className="flex flex-col items-center justify-center h-full text-center p-4">
        <p className="text-xl md:text-2xl font-light italic mb-6 opacity-80">
          "Dễ trăm lần không dân cũng chịu,<br/>Khó vạn lần dân liệu cũng xong."
        </p>
        <div className="w-24 h-1 bg-yellow-600 dark:bg-yellow-500 rounded-full mb-6"></div>
        <p className="text-lg opacity-90 font-museum-body">
          Để biến tư tưởng đại đoàn kết thành sức mạnh vật chất, Hồ Chí Minh chỉ ra hai phương thức then chốt: Dân vận và Tổ chức.
        </p>
      </motion.div>
    ),
  },

  // Slide 14
  {
    imageUrl: "https://hatinh.gov.vn/uploads/topics/16029766295536.jpeg",
    rawText: "5. Phương thức xây dựng. Một là, làm tốt công tác vận động quần chúng. Đây là nhiệm vụ hàng đầu.",
    title: "MỘT LÀ, LÀM TỐT CÔNG TÁC VẬN ĐỘNG QUẦN CHÚNG",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Tầm quan trọng">
           Hồ Chí Minh coi đại đoàn kết là nhiệm vụ hàng đầu của Đảng, do đó phải làm tốt công tác dân vận.
        </ListItem>
        <ListItem title="Trách nhiệm">
           Đảng, Nhà nước và cán bộ phải: Giáo dục – Tuyên truyền – Hướng dẫn – Giúp đỡ – Vận động nhân dân.
        </ListItem>
        <ListItem title="Mục tiêu dân vận">
           Giúp nhân dân hiểu rõ quyền, lợi ích, trách nhiệm để họ tự giác, chủ động tham gia cách mạng.
        </ListItem>
        <ListItem title="Lời Bác dặn">
           "Cần phải chịu khó tìm đủ cách giải thích cho họ hiểu rằng: những việc đó là vì ích lợi của họ mà phải làm".
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 15
  {
    imageUrl: "https://baocantho.com.vn/image/fckeditor/upload/2018/20180727/images/Bac-Ho.jpg",
    rawText: "Hai là, thành lập đoàn thể, tổ chức quần chúng phù hợp. Chiến lược: Đoàn kết, đoàn kết, đại đoàn kết...",
    title: "HAI LÀ, THÀNH LẬP ĐOÀN THỂ, TỔ CHỨC QUẦN CHÚNG PHÙ HỢP VỚI TỪNG ĐỐI TƯỢNG ĐỂ TẬP HỢP QUẦN CHÚNG",
    caption: "Chủ tịch Hồ Chí Minh đến thăm và huấn thị cho cán bộ, chiến sĩ Công an nhân dân vũ trang bảo vệ Thủ đô Hà Nội, ngày 14-02-1961.",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-4">
        <ListItem title="Sợi dây kết nối">
           Các đoàn thể, tổ chức quần chúng là sợi dây gắn kết Đảng với nhân dân.
        </ListItem>
        <ListItem title="Bản chất">
           Các tổ chức này là của dân, có vai trò vận động quần chúng tham gia vào tổ chức.
        </ListItem>
        <ListItem title="Chiến lược thành công">
           <span className="italic text-yellow-600 font-semibold">"Đoàn kết, đoàn kết, đại đoàn kết - Thành công, thành công, đại thành công"</span>.
        </ListItem>
      </motion.ul>
    ),
  },

  // Slide 16
  {
    imageUrl: "https://salt.tikicdn.com/cache/w1200/ts/product/15/10/d2/5e7e4a36695c21a21e5cdc7bf3429abe.jpg",
    title: "TÀI LIỆU THAM KHẢO",
    details: (
      <motion.ul variants={contentChildVariants} className="space-y-6">
        <ListItem title="Các tài liệu tham khảo:">
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
             <SubItem>Giáo trình Tư tưởng Hồ Chí Minh (Bộ Giáo dục & Đào tạo).</SubItem>
             <SubItem>Hồ Chí Minh: Toàn tập (Tập 10, 12) - NXB Chính trị quốc gia Sự thật.</SubItem>
             <SubItem>Văn kiện Đại hội đại biểu toàn quốc của Đảng.</SubItem>
             <SubItem>Cổng thông tin điện tử Đảng Cộng sản Việt Nam (dangcongsan.org.vn).</SubItem>
             <SubItem>Các bài báo nghiên cứu từ Tạp chí Cộng sản & Tạp chí Tuyên giáo.</SubItem>
           </ul>
        </ListItem>
      </motion.ul>
    ),
  },
];