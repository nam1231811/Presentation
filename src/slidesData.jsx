import React from "react";
import { motion } from "framer-motion";

// --- Helper Components ---

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
      className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1"
      fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/>
    </svg>
    <span>{children}</span>
  </motion.li>
);

export const slidesContent = [
  // --- Slide 1: Tiêu đề ---
  {
    imageUrl:
      "https://cdn.vietnambiz.vn/2019/9/18/dreamstimel90203178-1568799247509525047733.jpg",
    rawText:
      "CẠNH TRANH Ở CẤP ĐỘ ĐỘC QUYỀN TRONG NỀN KINH TẾ THỊ TRƯỜNG. Chủ đề: Độc quyền & Độc quyền nhà nước",
    // TÁCH RA:
    title: "CẠNH TRANH Ở CẤP ĐỘ ĐỘC QUYỀN TRONG NỀN KINH TẾ THỊ TRƯỜNG",
    details: (
      <motion.div variants={contentChildVariants} className="flex flex-col items-center justify-center h-full text-center">
        {/* H1 đã được chuyển lên title */}
        <p className="text-xl">
          Chủ đề: Cạnh tranh và độc quyền trong nền kinh tế thị trường
        </p>
      </motion.div>
    ),
  },

  // --- Slide 2: Độc quyền là gì? ---
  {
    imageUrl:
      "https://cdn0.iconfinder.com/data/icons/economic-challenges-2/512/06_Monopoly-1024.png",
    rawText:
      "ĐỘC QUYỀN LÀ GÌ? Dự báo (C.Mác & Ph.Ăngghen): Tự do cạnh tranh → Tích tụ & tập trung sản xuất → Độc quyền. Khái niệm: Độc quyền là sự liên minh giữa các doanh nghiệp lớn. Mục đích: Thâu tóm việc sản xuất và tiêu thụ hàng hóa. Định ra giá cả độc quyền. Thu lợi nhuận độc quyền cao.",
    title: "ĐỘC QUYỀN LÀ GÌ?",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Dự báo (C.Mác & Ph.Ăngghen)">
            Tự do cạnh tranh → Tích tụ & tập trung sản xuất → Độc quyền.
          </ListItem>
          <ListItem title="Khái niệm">
            Độc quyền là sự liên minh giữa các doanh nghiệp lớn.
          </ListItem>
          <ListItem title="Mục đích">
            <ul>
              <SubItem>Thâu tóm việc sản xuất và tiêu thụ hàng hóa.</SubItem>
              <SubItem>Định ra giá cả độc quyền.</SubItem>
              <SubItem>Thu lợi nhuận độc quyền cao.</SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

 // --- Slide 3: Nguyên nhân hình thành ĐQ ---
  {
    imageUrl:
      "https://seocom.agency/wp-content/uploads/2025/03/que-es-query-seocom-agency.webp",
    rawText:
      "NGUYÊN NHÂN HÌNH THÀNH ĐỘC QUYỀN. 1. Sự phát triển của Lực lượng sản xuất: Tiến bộ KHKT đòi hỏi vốn lớn, thúc đẩy tích tụ và tập trung sản xuất. 2. Cạnh tranh gay gắt: Doanh nghiệp nhỏ phá sản, doanh nghiệp lớn phải liên kết. 3. Khủng hoảng & Hệ thống tín dụng: Khủng hoảng kinh tế và sự phát triển của công ty cổ phần trở thành đòn bẩy.",
    title: "NGUYÊN NHÂN HÌNH THÀNH ĐỘC QUYỀN",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="1. Sự phát triển của Lực lượng sản xuất">
             Tiến bộ khoa học kĩ thuật đòi hỏi vốn lớn, thúc đẩy tích tụ và tập trung sản
             xuất.
          </ListItem>
          <ListItem title="2. Cạnh tranh gay gắt">
             Doanh nghiệp nhỏ phá sản, doanh nghiệp lớn phải liên kết.
          </ListItem>
          <ListItem title="3. Khủng hoảng & Hệ thống tín dụng">
             Khủng hoảng kinh tế và sự phát triển của công ty cổ phần trở thành
             đòn bẩy.
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 4: Giá cả & Lợi nhuận ĐQ ---
  {
    imageUrl:
      "https://openend.vn/wp-content/uploads/2021/12/chin-luoc-dinh-gia-trong-kinh-doanh-scaled.jpg",
    rawText:
      "GIÁ CẢ & LỢI NHUẬN ĐỘC QUYỀN. Giá cả độc quyền: Áp đặt giá bán cao. Áp đặt giá mua thấp. Nguồn gốc Lợi nhuận độc quyền cao: Lao động của công nhân trong và ngoài xí nghiệp độc quyền. Giá trị thặng dư của tư bản vừa và nhỏ. Lao động của người sản xuất nhỏ, nhân dân thuộc địa.",
    title: "GIÁ CẢ & LỢI NHUẬN ĐỘC QUYỀN",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Giá cả độc quyền">
            <ul>
              <SubItem>Áp đặt giá bán cao.</SubItem>
              <SubItem>Áp đặt giá mua thấp.</SubItem>
            </ul>
          </ListItem>
          <ListItem title="Nguồn gốc Lợi nhuận độc quyền cao">
            <ul>
              <SubItem>
                Lao động của công nhân trong và ngoài xí nghiệp độc quyền.
              </SubItem>
              <SubItem>Giá trị thặng dư của tư bản vừa và nhỏ.</SubItem>
              <SubItem>Lao động của người sản xuất nhỏ, nhân dân thuộc địa.</SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 5: Độc quyền nhà nước (ĐQNN) ---
  {
    imageUrl:
      "https://cdn.luatminhkhue.vn/lmk/articles/82/411138/phan-tich-chuc-nang-cua-nha-nuoc-viet-nam-hien-nay---411138.jpg",
    rawText:
      "ĐỘC QUYỀN NHÀ NƯỚC (ĐQNN). Khái niệm: Là kiểu độc quyền trong đó nhà nước nắm giữ vị thế độc quyền ở những lĩnh vực then chốt. Bản chất (trong CNTB): Sự 'cộng sinh' giữa độc quyền tư nhân và sức mạnh nhà nước. Phục vụ lợi ích của tổ chức độc quyền tư nhân.",
    title: "ĐỘC QUYỀN NHÀ NƯỚC (ĐQNN)",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Khái niệm">
            Là kiểu độc quyền trong đó nhà nước nắm giữ vị thế độc quyền ở những
            lĩnh vực then chốt.
          </ListItem>
          <ListItem title="Bản chất (trong Chủ nghĩa tư bản)">
            <ul>
              <SubItem>
                Sự "cộng sinh" giữa độc quyền tư nhân và sức mạnh nhà nước.
              </SubItem>
              <SubItem>Phục vụ lợi ích của tổ chức độc quyền tư nhân.</SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 6: Nguyên nhân hình thành ĐQNN ---
  {
    imageUrl:
      "https://seocom.agency/wp-content/uploads/2025/03/que-es-query-seocom-agency.webp",
    rawText:
      "NGUYÊN NHÂN HÌNH THÀNH ĐQNN. 1. Do sản xuất xã hội hóa cao: Đòi hỏi sự điều tiết từ trung tâm (nhà nước). 2. Đầu tư vào kết cấu hạ tầng: Các ngành (năng lượng, giao thông...) vốn lớn, thu hồi chậm. Nhà nước phải đứng ra. 3. Giải quyết mâu thuẫn xã hội: Nhà nước can thiệp (trợ cấp, phúc lợi) để xoa dịu mâu thuẫn. 4. Quan hệ quốc tế: Điều tiết các quan hệ kinh tế quốc tế.",
    title: "NGUYÊN NHÂN HÌNH THÀNH ĐQNN",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="1. Do sản xuất xã hội hóa cao"> Đòi hỏi sự điều tiết từ trung tâm (nhà nước).</ListItem>
          <ListItem title="2. Đầu tư vào kết cấu hạ tầng"> Các ngành (năng lượng, giao thông...) vốn lớn, thu hồi chậm. Nhà nước phải đứng ra.</ListItem>
          <ListItem title="3. Giải quyết mâu thuẫn xã hội"> Nhà nước can thiệp (trợ cấp, phúc lợi) để xoa dịu mâu thuẫn.</ListItem>
          <ListItem title="4. Quan hệ quốc tế"> Điều tiết các quan hệ kinh tế quốc tế.</ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 7: Tác động tích cực của ĐQ ---
  {
    imageUrl:
      "https://media.zim.vn/66bc1e4437731d74539e4ffe/hoc-tap-tich-cuc.jpg",
    rawText:
      "TÁC ĐỘNG TÍCH CỰC CỦA ĐỘC QUYỀN. 1. Thúc đẩy tiến bộ kỹ thuật: Có khả năng lớn (tài chính) để R&D. 2. Tăng năng suất & năng lực cạnh tranh: Có ưu thế vốn để ứng dụng công nghệ mới. 3. Thúc đẩy sản xuất lớn, hiện đại: Tập trung sức mạnh kinh tế để đầu tư vào lĩnh vực trọng điểm.",
    title: "TÁC ĐỘNG TÍCH CỰC CỦA ĐỘC QUYỀN",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="1. Thúc đẩy tiến bộ kỹ thuật"> Có khả năng lớn (tài chính) để R&D.</ListItem>
          <ListItem title="2. Tăng năng suất & năng lực cạnh tranh"> Có ưu thế vốn để ứng dụng công nghệ mới.</ListItem>
          <ListItem title="3. Thúc đẩy sản xuất lớn, hiện đại"> Tập trung sức mạnh kinh tế để đầu tư vào lĩnh vực trọng điểm.</ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 8: Tác động tiêu cực của ĐQ ---
  {
    imageUrl:
      "https://media.thaythichtructhaiminh.com/files/do_hang/2023/07/23/neu-khong-tim-duoc-manh-moi-cua-cam-xuc-tieu-cuc-chung-ta-chi-can-nhan-dien-doi-dien-voi-no-1144.webp",
    rawText:
      "TÁC ĐỘNG TIÊU CỰC CỦA ĐỘC QUYỀN. 1. Gây thiệt hại cho người tiêu dùng: Áp đặt giá bán cao, giá mua thấp. 2. Kìm hãm tiến bộ kỹ thuật: Có khả năng R&D, nhưng có thể 'kìm hãm' nếu R&D đe dọa vị thế độc quyền. 3. Tăng phân hóa giàu nghèo & Lợi ích nhóm: Chi phối kinh tế, xã hội vì lợi ích nhóm.",
    title: "TÁC ĐỘNG TIÊU CỰC CỦA ĐỘC QUYỀN",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="1. Gây thiệt hại cho người tiêu dùng"> Áp đặt giá bán cao, giá mua thấp.</ListItem>
          <ListItem title="2. Kìm hãm tiến bộ kỹ thuật"> Có khả năng R&D, nhưng có thể 'kìm hãm' nếu R&D đe dọa vị thế độc quyền.</ListItem>
          <ListItem title="3. Tăng phân hóa giàu nghèo & Lợi ích nhóm"> Chi phối kinh tế, xã hội vì lợi ích nhóm.</ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 9: Cạnh tranh trong trạng thái ĐQ ---
  {
    imageUrl:
      "https://img.timviec.com.vn/2020/04/loi-the-canh-tranh-la-gi-1.jpg",
    rawText:
      "CẠNH TRANH TRONG TRẠNG THÁI ĐỘC QUYỀN. Độc quyền không thủ tiêu cạnh tranh, mà làm nó đa dạng và gay gắt hơn. Các hình thức cạnh tranh mới: 1. Giữa độc quyền vs. ngoài độc quyền. 2. Giữa các tổ chức độc quyền với nhau. 3. Cạnh tranh nội bộ tổ chức độc quyền.",
    title: "CẠNH TRANH TRONG TRẠNG THÁI ĐQ",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem>
            Độc quyền <strong className="text-red-600 dark:text-red-400">không thủ tiêu</strong>{" "}
            cạnh tranh, mà làm nó đa dạng và gay gắt hơn.
          </ListItem>
          <ListItem title="Các hình thức cạnh tranh mới">
            <ul>
              <SubItem>1. Giữa độc quyền vs. ngoài độc quyền.</SubItem>
              <SubItem>2. Giữa các tổ chức độc quyền với nhau.</SubItem>
              <SubItem>3. Cạnh tranh nội bộ tổ chức độc quyền.</SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 10: Kết luận (Phần 1) ---
  {
    imageUrl:
      "https://png.pngtree.com/png-vector/20190809/ourlarge/pngtree-choice-conclusion-court-judgment-law-blue-icon-on-abstract-c-png-image_1652976.jpg",
    rawText:
      "Kết luận (Phần 4.1). Trong nền kinh tế thị trường hiện đại, Cạnh tranh và Độc quyền luôn cùng tồn tại song hành với nhau.",
    title: "KẾT LUẬN (PHẦN 4.1)",
    details: (
      <>
        <motion.p variants={contentChildVariants} className="text-2xl font-semibold leading-relaxed mt-4">
          Trong nền kinh tế thị trường hiện đại,{" "}
          <strong className="text-3xl font-bold text-blue-600 dark:text-blue-400">Cạnh tranh</strong> và{" "}
          <strong className="text-3xl font-bold text-purple-600 dark:text-purple-400">Độc quyền</strong>{" "}
          luôn cùng tồn tại song hành với nhau.
        </motion.p>
      </>
    ),
  },

  // --- Slide 11: 5 Đặc điểm của ĐQ (Lênin) ---
  {
    imageUrl:
      "https://thesaigontimes.vn/wp-content/uploads/2022/10/kinhte.jpg",
    rawText:
      "5 ĐẶC ĐIỂM KINH TẾ CỦA ĐỘC QUYỀN (V.I. LÊNIN). 1. Các tổ chức độc quyền có quy mô tích tụ và tập trung tư bản lớn. 2. Sức mạnh của ĐQ do tư bản tài chính và hệ thống tài phiệt chi phối. 3. Xuất khẩu tư bản trở thành phổ biến. 4. Cạnh tranh để phân chia thị trường thế giới. 5. Lôi kéo chính phủ vào việc phân định khu vực lãnh thổ.",
    title: "5 ĐẶC ĐIỂM KINH TẾ CỦA ĐQ (LÊNIN)",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-3 list-decimal list-outside pl-8">
          <ListItem>Tích tụ và tập trung tư bản lớn.</ListItem>
          <ListItem>Sức mạnh của tư bản tài chính và tài phiệt.</ListItem>
          <ListItem>Xuất khẩu tư bản trở thành phổ biến.</ListItem>
          <ListItem>Cạnh tranh để phân chia thị trường thế giới.</ListItem>
          <ListItem>Lôi kéo chính phủ vào việc phân định khu vực lãnh thổ.</ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 12: Đặc điểm 1: Tích tụ & Tập trung ---
  {
    imageUrl:
      "https://fundsnetservices.com/wp-content/uploads/capital-accumulation.jpg",
    rawText:
      "ĐẶC ĐIỂM 1: TÍCH TỤ & TẬP TRUNG TƯ BẢN LỚN. Các hình thức độc quyền (từ thấp đến cao): Cartel (Các-ten): Thỏa thuận giá cả, sản lượng. (Độc lập sản xuất & lưu thông). Syndicate (Xanh-đi-ca): Mất độc lập lưu thông (mua, bán chung). Trust (Tờ-rớt): Mất cả độc lập sản xuất & lưu thông (do 1 ban quản trị chung). Consortium (Công-xoóc-xi-om): Hình thức cao nhất. Liên kết nhiều ngành (liên kết dọc), phụ thuộc tài chính.",
    title: "ĐĐ 1: TÍCH TỤ & TẬP TRUNG TƯ BẢN LỚN",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Các hình thức độc quyền (từ thấp đến cao)">
            <ul>
              <SubItem>
                <strong>Cartel:</strong> Thỏa thuận giá cả, sản lượng. (Độc lập sản
                xuất & lưu thông).
              </SubItem>
              <SubItem>
                <strong>Syndicate:</strong> Mất độc lập lưu thông (mua, bán
                chung).
              </SubItem>
              <SubItem>
                <strong>Trust:</strong> Mất cả độc lập sản xuất & lưu thông (do 1
                ban quản trị chung).
              </SubItem>
              <SubItem>
                <strong>Consortium:</strong> Hình thức cao nhất. Liên kết nhiều
                ngành (liên kết dọc), phụ thuộc tài chính.
              </SubItem>
          </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 13: Đặc điểm 2: Tư bản tài chính & Tài phiệt ---
  {
    imageUrl:
      "http://tcorp.vn/wp-content/uploads/2023/05/gold-stacking-vector-1565671221188512658446.jpg",
    rawText:
      "ĐẶC ĐIỂM 2: TƯ BẢN TÀI CHÍNH VÀ TÀI PHIỆT. Tư bản tài chính (Financial Capital): Là sự 'hợp nhất' giữa tư bản ngân hàng độc quyền và tư bản công nghiệp độc quyền. Tài phiệt (Financial Oligarchy): Một nhóm nhỏ các nhà tư bản kếch xù chi phối toàn bộ kinh tế, chính trị. Phương thức thống trị: 'Chế độ tham dự' (Mua cổ phiếu khống chế 'công ty mẹ' → mẹ chi phối con → con chi phối cháu...).",
    title: "ĐĐ 2: TƯ BẢN TÀI CHÍNH VÀ TÀI PHIỆT",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Tư bản tài chính (Financial Capital)">
            Là sự "hợp nhất" giữa tư bản ngân hàng độc quyền và tư bản công
            nghiệp độc quyền.
          </ListItem>
          <ListItem title="Tài phiệt (Financial Oligarchy)">
            <ul>
              <SubItem>
                Một nhóm nhỏ các nhà tư bản kếch xù chi phối toàn bộ kinh tế,
                chính trị.
              </SubItem>
              <SubItem>
                <strong>Phương thức thống trị:</strong> "Chế độ tham dự" (Mua cổ
                phiếu khống chế "công ty mẹ" → mẹ chi phối con → con chi phối
                cháu...).
              </SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 14: Đặc điểm 3: Xuất khẩu tư bản (XKTB) ---
  {
    imageUrl:
      "https://interlogistics.com.vn/static/1434/2023/08/15/export47.jpg",
    rawText:
      "ĐẶC ĐIỂM 3: XUẤT KHẨU TƯ BẢN (XKTB). Khái niệm: Là xuất khẩu giá trị (đầu tư) ra nước ngoài nhằm thu giá trị thặng dư. Hai hình thức XKTB: 1. Đầu tư trực tiếp (FDI): Xây dựng/mua lại xí nghiệp ở nước ngoài, trực tiếp kinh doanh. 2. Đầu tư gián tiếp: Cho vay thu lợi tức, mua cổ phần, cổ phiếu... (không trực tiếp tham gia quản lý).",
    title: "ĐĐ 3: XUẤT KHẨU TƯ BẢN (XKTB)",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Khái niệm">
            Là xuất khẩu giá trị (đầu tư) ra nước ngoài nhằm thu giá trị thặng dư.
          </ListItem>
          <ListItem title="Hai hình thức XKTB">
            <ul>
              <SubItem>
                <strong>1. Đầu tư trực tiếp (FDI):</strong> Xây dựng/mua lại xí
                nghiệp ở nước ngoài, trực tiếp kinh doanh.
              </SubItem>
              <SubItem>
                <strong>2. Đầu tư gián tiếp:</strong> Cho vay thu lợi tức, mua
                cổ phần, cổ phiếu... (không trực tiếp tham gia quản lý).
              </SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 15: Đặc điểm 4 & 5: Phân chia thế giới ---
  {
    imageUrl:
      "https://gobranding.com.vn/wp-content/uploads/2023/06/phan-tich-thi-truong-02.jpg",
    rawText:
      "ĐẶC ĐIỂM 4 & 5: PHÂN CHIA THẾ GIỚI. 4. Phân chia thị trường (Kinh tế): XKTB tăng → phân chia thế giới về kinh tế. 5. Phân chia lãnh thổ (Ảnh hưởng): Cạnh tranh nguyên liệu → đấu tranh chiếm thuộc địa. Đòi chia lại lãnh thổ → nguyên nhân chiến tranh. Hiện nay: Chủ nghĩa thực dân mới (dùng viện trợ kinh tế, kỹ thuật, quân sự).",
    title: "ĐĐ 4 & 5: PHÂN CHIA THẾ GIỚI",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="4. Phân chia thị trường (Kinh tế)">
            Xuất khẩu tư bản tăng → phân chia thế giới về kinh tế.
          </ListItem>
          <ListItem title="5. Phân chia lãnh thổ (Ảnh hưởng)">
            <ul>
              <SubItem>Cạnh tranh nguyên liệu → đấu tranh chiếm thuộc địa.</SubItem>
              <SubItem>
                Đòi chia lại lãnh thổ → nguyên nhân chiến tranh.
              </SubItem>
              <SubItem>
                <strong>Hiện nay:</strong> Chủ nghĩa thực dân mới (dùng viện trợ
                kinh tế, kỹ thuật, quân sự).
              </SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 16: Đặc trưng của ĐQNN ---
  {
    imageUrl:
      "https://9746c6837f.vws.vegacdn.vn/posts/files/dac-diem-cua-kinh-te-thi-truong.jpg",
    rawText:
      "ĐẶC TRƯNG KINH TẾ CỦA ĐỘC QUYỀN NHÀ NƯỚC. 1. Sự kết hợp về nhân sự giữa tổ chức độc quyền và nhà nước. 2. Sự hình thành, phát triển sở hữu nhà nước. 3. ĐQNN trở thành công cụ để nhà nước điều tiết nền kinh tế.",
    title: "ĐẶC TRƯNG KINH TẾ CỦA ĐQNN",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-3 list-decimal list-outside pl-8">
          <ListItem>Sự kết hợp về nhân sự giữa tổ chức độc quyền và nhà nước.</ListItem>
          <ListItem>Sự hình thành, phát triển sở hữu nhà nước.</ListItem>
          <ListItem>Độc quyền nhà nước trở thành công cụ để nhà nước điều tiết nền kinh tế.</ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 17: ĐQNN - Đặc trưng 1: Kết hợp nhân sự ---
  {
    imageUrl:
      "https://1office.vn/wp-content/uploads/2022/11/10-tinh-huong-nhan-su-02-2048x1365.jpg",
    rawText:
      "ĐQNN (1): SỰ KẾT HỢP VỀ NHÂN SỰ. V.I.Lênin: 'Hôm nay là bộ trưởng, ngày mai là chủ ngân hàng...'. Cơ chế: Thông qua các đảng phái và các Hội chủ xí nghiệp độc quyền. Hội chủ này là 'chính phủ đằng sau chính phủ'. Hình thức (Sự thâm nhập lẫn nhau): Đại biểu của độc quyền tham gia vào bộ máy nhà nước. Quan chức nhà nước được 'cài cắm' vào ban quản trị của tổ chức độc quyền.",
    title: "ĐQNN (1): SỰ KẾT HỢP VỀ NHÂN SỰ",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="V.I.Lênin">
             "Hôm nay là bộ trưởng, ngày mai là chủ ngân hàng; hôm nay là chủ ngân hàng, ngày mai là bộ trưởng".
          </ListItem>
          <ListItem title="Cơ chế">
            <ul>
              <SubItem>
                Thông qua các đảng phái và các{" "}
                <strong>Hội chủ xí nghiệp độc quyền</strong>.
              </SubItem>
              <SubItem>
                Hội chủ này là "chính phủ đằng sau chính phủ".
              </SubItem>
            </ul>
          </ListItem>
          <ListItem title="Hình thức (Sự thâm nhập lẫn nhau)">
            <ul>
              <SubItem>
                Đại biểu của độc quyền tham gia vào bộ máy nhà nước.
              </SubItem>
              <SubItem>
                Quan chức nhà nước được "cài cắm" vào ban quản trị của tổ
                chức độc quyền.
              </SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 18: ĐQNN - Đặc trưng 2: Sở hữu nhà nước ---
  {
    imageUrl:
      "https://static.hieuluat.vn/uploaded/Images/Original/2023/01/03/Quyen-tham-gia-quan-ly-Nha-nuoc-xa-hoi_0301145614.jpg",
    rawText:
      "ĐQNN (2): SỞ HỮU NHÀ NƯỚC. Bản chất: Là sở hữu tập thể của giai cấp tư sản, phục vụ lợi ích của tư bản độc quyền. Vai trò: Mở rộng sản xuất cho ĐQ; Giúp ĐQ di chuyển vốn; Làm chỗ dựa cho sự điều tiết kinh tế. Thị trường nhà nước: Nhà nước trở thành khách hàng 'bao mua' sản phẩm (đặc biệt là đơn hàng quân sự), đảm bảo lợi nhuận cao và ổn định cho ĐQ.",
    title: "ĐQNN (2): SỞ HỮU NHÀ NƯỚC",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Bản chất"> Là sở hữu tập thể của giai cấp tư sản, phục vụ lợi ích của tư bản độc quyền.</ListItem>
          <ListItem title="Vai trò"> Mở rộng sản xuất cho độc quyền; Giúp độc quyền di chuyển vốn; Làm chỗ dựa cho sự điều tiết kinh tế.</ListItem>
          <ListItem title="Thị trường nhà nước"> Nhà nước trở thành khách hàng "bao mua" sản phẩm (đặc biệt là đơn hàng quân sự), đảm bảo lợi nhuận cao và ổn định cho độc quyền.</ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 19: ĐQNN - Đặc trưng 3: Điều tiết kinh tế ---
  {
    imageUrl:
      "https://cuthongthai.vn/wp-content/uploads/2022/12/o437681715031-15676768865582057261744.jpg",
    rawText:
      "ĐQNN (3): NHÀ NƯỚC ĐIỀU TIẾT NỀN KINH TẾ. Công cụ điều tiết: Ngân sách, thuế; Hệ thống tiền tệ, tín dụng; Doanh nghiệp nhà nước; Kế hoạch hóa... Cơ chế điều tiết: Là sự dung hợp của 3 cơ chế: Thị trường, Độc quyền tư nhân, và Điều tiết của nhà nước. Mục đích: Phục vụ lợi ích của chủ nghĩa tư bản độc quyền.",
    title: "ĐQNN (3): NHÀ NƯỚC ĐIỀU TIẾT KINH TẾ",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Công cụ điều tiết"> Ngân sách, thuế; Hệ thống tiền tệ, tín dụng; Doanh nghiệp nhà nước; Kế hoạch hóa...</ListItem>
          <ListItem title="Cơ chế điều tiết"> Là sự <strong>dung hợp</strong> của 3 cơ chế: Thị trường, Độc quyền tư nhân, và Điều tiết của nhà nước.</ListItem>
          <ListItem title="Mục đích"> Phục vụ lợi ích của chủ nghĩa tư bản độc quyền.</ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 20: BHM 1: Tích tụ & Tập trung ---
  {
    imageUrl:
      "https://vieclam123.vn/ckfinder/userfiles/images/images/ban-chat-cua-tich-luy-tu-ban.jpg",
    rawText:
      "BIỂU HIỆN MỚI (BHM) 1: TÍCH TỤ & TẬP TRUNG TƯ BẢN. Hình thức tổ chức mới (Công ty xuyên quốc gia): Concern (Consơn): Độc quyền đa ngành, (Để đối phó luật chống độc quyền). Conglomerate (Công-gơ-lô-mê-rết): Kết hợp các hãng không liên quan. (Mục đích: thu lợi từ chứng khoán). Vai trò của doanh nghiệp vừa và nhỏ (SMEs): Vẫn tồn tại và quan trọng. (Phụ thuộc vào Concern; Có thế mạnh riêng).",
    title: "BHM 1: TÍCH TỤ & TẬP TRUNG TƯ BẢN",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Hình thức tổ chức mới (Công ty xuyên quốc gia)">
            <ul>
              <SubItem>
                <strong>Concern:</strong> Độc quyền <strong>đa ngành</strong>. (Để
                đối phó luật chống độc quyền).
              </SubItem>
              <SubItem>
                <strong>Conglomerate:</strong> Kết hợp các hãng{" "}
                <strong>không liên quan</strong>. (Mục đích: thu lợi từ chứng khoán).
              </SubItem>
            </ul>
          </ListItem>
          <ListItem title="Vai trò của doanh nghiệp vừa và nhỏ (SMEs)">
            <ul>
              <SubItem>Vẫn tồn tại và quan trọng.</SubItem>
              <SubItem>
                (Lý do: Phụ thuộc vào Concern; Có thế mạnh riêng).
              </SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 21: BHM 2: Tư bản tài chính ---
  {
    imageUrl:
      "https://www.pace.edu.vn/uploads/news/2023/05/quan-tri-chien-luoc.jpg",
    rawText:
      "BHM 2: VAI TRÒ CỦA TƯ BẢN TÀI CHÍNH. Mở rộng phạm vi: Liên kết được mở rộng ra nhiều ngành, tạo thành các tổ hợp đa dạng (công - nông - thương - tín - dịch vụ). Thay đổi cơ chế khống chế: 'Chế độ tham dự' được bổ sung thêm 'chế độ uỷ nhiệm'. Quốc tế hóa: Thành lập các ngân hàng đa quốc gia; ra đời các trung tâm tài chính thế giới.",
    title: "BHM 2: VAI TRÒ CỦA TƯ BẢN TÀI CHÍNH",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Mở rộng phạm vi"> Liên kết được mở rộng ra nhiều ngành, tạo thành các tổ hợp đa dạng (công - nông - thương - tín - dịch vụ).</ListItem>
          <ListItem title="Thay đổi cơ chế khống chế"> "Chế độ tham dự" được bổ sung thêm <strong>"chế độ uỷ nhiệm"</strong>.</ListItem>
          <ListItem title="Quốc tế hóa"> Thành lập các ngân hàng đa quốc gia; ra đời các trung tâm tài chính thế giới.</ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 22: BHM 3: Xuất khẩu tư bản (XKTB) ---
  {
    imageUrl:
      "https://interlogistics.com.vn/static/1434/2023/08/15/export47.jpg",
    rawText:
      "BHM 3: XUẤT KHẨU TƯ BẢN (XKTB). 1. Thay đổi về hướng: Trước: Nước phát triển → Nước kém phát triển. Nay: Dòng vốn chảy qua lại giữa các nước phát triển với nhau. 2. Thay đổi về chủ thể: Vai trò của Công ty xuyên quốc gia (TNCs) ngày càng to lớn. 3. Thay đổi về hình thức: Xuất hiện hình thức mới như BOT, BT. 4. Thay đổi về nguyên tắc: Nguyên tắc cùng có lợi được đề cao.",
    title: "BHM 3: XUẤT KHẨU TƯ BẢN (XKTB)",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-3 list-decimal list-outside pl-8 text-xl">
          <ListItem>
             Thay đổi về hướng: Dòng vốn chảy qua lại giữa các nước phát triển.
          </ListItem>
          <ListItem>
             Thay đổi về chủ thể: Vai trò của Công ty xuyên quốc gia (TNCs) tăng.
          </ListItem>
          <ListItem>
             Thay đổi về hình thức: Xuất hiện BOT, BT...
          </ListItem>
          <ListItem>
             Thay đổi về nguyên tắc: Nguyên tắc cùng có lợi được đề cao.
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 23: BHM 4 & 5: Phân chia thị trường & Lãnh thổ ---
  {
    imageUrl:
      "https://accesstrade.vn/wp-content/uploads/2022/10/phan-khuc-thi-truong-la-gi-1.jpg",
    rawText:
      "BHM 4 & 5: PHÂN CHIA THỊ TRƯỜNG & LÃNH THỔ. Phân chia thị trường (Kinh tế): Bị tác động bởi 2 xu hướng: Toàn cầu hóa (do TNCs) và Khu vực hóa (EU, NAFTA, OPEC...). Phân chia lãnh thổ (Ảnh hưởng): Hình thức mới: 'Chiến lược biên giới mềm', bành trướng 'biên giới kinh tế'. Thay thế chiến tranh thế giới bằng chiến tranh thương mại, sắc tộc...",
    title: "BHM 4 & 5: PHÂN CHIA THỊ TRƯỜNG & LÃNH THỔ",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Phân chia thị trường (Kinh tế)">
            Bị tác động bởi 2 xu hướng: Toàn cầu hóa (do TNCs)
            và Khu vực hóa (EU, NAFTA, OPEC...).
          </ListItem>
          <ListItem title="Phân chia lãnh thổ (Ảnh hưởng)">
            <ul>
              <SubItem>
                Hình thức mới: "Chiến lược biên giới mềm", bành trướng "biên giới kinh tế".
              </SubItem>
              <SubItem>
                Thay thế chiến tranh thế giới bằng chiến tranh thương mại, sắc tộc...
              </SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 24: BHM của ĐQNN (P.1) ---
  {
    imageUrl:
      "https://easyedu.vn/wp-content/uploads/2021/01/33948420.jpg",
    rawText:
      "BIỂU HIỆN MỚI CỦA ĐỘC QUYỀN NHÀ NƯỚC (P.1). 1. Về quan hệ nhân sự: Thể chế Đa nguyên phổ biến; xuất hiện cơ chế thỏa hiệp. 2. Về sở hữu nhà nước (Vai trò Nhà nước): Nhà nước tăng đầu tư vào R&D, kết cấu hạ tầng (gánh chịu rủi ro). Là nhân tố quyết định ổn định kinh tế vĩ mô. Vai trò 'giải cứu': Dùng ngân sách cứu các tập đoàn lớn (Vd: Citigroup, AIG 2008).",
    title: "BHM CỦA ĐQNN (P.1)",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="1. Về quan hệ nhân sự"> Thể chế <strong>Đa nguyên</strong> phổ biến; xuất hiện cơ chế <strong>thỏa hiệp</strong>.</ListItem>
          <ListItem title="2. Về sở hữu nhà nước (Vai trò Nhà nước)">
            <ul>
              <SubItem>
                Nhà nước tăng đầu tư vào R&D, kết cấu hạ tầng (gánh chịu rủi ro).
              </SubItem>
              <SubItem>
                Là nhân tố quyết định <strong>ổn định kinh tế vĩ mô</strong>.
              </SubItem>
              <SubItem>
                <strong>Vai trò "giải cứu":</strong> Dùng ngân sách cứu các tập
                đoàn lớn (VD: Citigroup, AIG 2008).
              </SubItem>
          </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- Slide 25: BHM của ĐQNN (P.2) ---
  {
    imageUrl:
      "https://9746c6837f.vws.vegacdn.vn/posts/files/cac-chu-the-trong-nen-kinh-te-thi-truong.jpg",
    rawText:
      "BIỂU HIỆN MỚI CỦA ĐỘC QUYỀN NHÀ NƯỚC (P.2). 3. Về vai trò điều tiết kinh tế: Điều tiết chính trị: Dùng 'Đa nguyên tư sản' để làm dịu đấu tranh. Điều tiết kinh tế (Viện trợ ODA): Trở thành công cụ điều tiết kinh tế TRONG NƯỚC. (Đẩy hàng tồn kho, công nghệ lỗi thời). Nước nhận viện trợ chủ yếu nhận hàng hóa, chuyên gia của nước cung cấp.",
    title: "BHM CỦA ĐQNN (P.2)",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="3. Về vai trò điều tiết kinh tế">
            <ul>
              <SubItem>
                <strong>Điều tiết chính trị:</strong> Dùng "Đa nguyên tư sản" để làm dịu đấu tranh.
              </SubItem>
              <SubItem>
                <strong>Điều tiết kinh tế (Viện trợ ODA):</strong> Trở thành công
                cụ điều tiết kinh tế <strong>TRONG NƯỚC</strong>.
              </SubItem>
              <SubItem>
                (Mục đích: Đẩy hàng tồn kho, công nghệ lỗi thời).
              </SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

  // --- SLIDE 26: CÂU HỎI LIÊN HỆ ---
{
    imageUrl:
      "https://i1-ngoisao.vnecdn.net/2022/08/12/3-2797-1660275082.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=thE_5ekqk4knaxCzDzO6oA",
    rawText:
      "LIÊN HỆ THỰC TẾ: ÂN XÁ TÀI PHIỆT HÀN QUỐC 2022. Câu hỏi: Tại sao Chính phủ Hàn Quốc ân xá cho 'thái tử' Samsung và các tài phiệt khác vào 8/2022? Lý do chính: Tầm quan trọng kinh tế của Chaebol (Tài phiệt): Các tập đoàn như Samsung đóng góp lớn vào GDP, xuất khẩu, việc làm. Chính phủ tin rằng việc ân xá sẽ giúp các lãnh đạo này điều hành, đầu tư mạnh mẽ hơn, vực dậy kinh tế sau khủng hoảng. Mối quan hệ Nhà nước - Độc quyền: Hành động này thể hiện mối liên kết chặt chẽ, nơi lợi ích kinh tế quốc gia (gắn với các tập đoàn lớn) có thể được ưu tiên. Gây tranh cãi: Quyết định này gây tranh cãi, đặt ra câu hỏi về sự công bằng pháp luật và ảnh hưởng của giới tài phiệt.",
    title: "LIÊN HỆ: ÂN XÁ TÀI PHIỆT HÀN QUỐC 2022",
    details: (
      <>
        <motion.p variants={contentChildVariants} className="text-xl text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-gray-700 p-4 rounded-lg mb-6 shadow-inner">
          <strong>Câu hỏi:</strong> Tại sao Chính phủ Hàn Quốc ân xá cho "thái tử"
          Samsung và các tài phiệt khác vào 8/2022, với một lí do mong muốn họ đóng góp vượt qua khủng hoảng kinh tế quốc gia?
        </motion.p>
        <motion.ul variants={contentChildVariants} className="space-y-4">
          <ListItem title="Tầm quan trọng kinh tế của Chaebol(Tài phiệt)">
            <ul>
              <SubItem>
                Các tập đoàn như Samsung đóng góp rất lớn vào GDP, xuất khẩu,
                việc làm của Hàn Quốc.
               </SubItem>
              <SubItem>
                Chính phủ tin rằng việc ân xá sẽ giúp các lãnh đạo này quay
                lại điều hành, đưa ra các quyết định đầu tư táo bạo, góp phần
                vực dậy kinh tế trong bối cảnh khó khăn (lạm phát, hậu
                COVID...).
            </SubItem>
            </ul>
          </ListItem>
          <ListItem title="Mối quan hệ Nhà nước - Độc quyền">
            <ul>
              <SubItem>
                Hành động này phản ánh mối liên kết chặt chẽ giữa nhà nước và
                các tập đoàn kinh tế lớn (tương tự khái niệm độc quyền nhà
                nước).
              </SubItem>
              <SubItem>
                Lợi ích kinh tế quốc gia (được cho là gắn liền với sự phát
                triển của các chaebol) có thể được ưu tiên hơn các vấn đề
                pháp lý.
              </SubItem>
         </ul>
          </ListItem>
          <ListItem title="Gây tranh cãi">
            <ul>
              <SubItem>
                Quyết định này vấp phải sự phản đối, đặt ra câu hỏi về sự
              công bằng ("luật pháp chỉ dành cho người nghèo?") và tầm ảnh
                hưởng quá lớn của giới tài phiệt lên chính trị.
              </SubItem>
            </ul>
          </ListItem>
        </motion.ul>
      </>
    ),
  },

   // --- SLIDE 27: REFERENCES ---
  {
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3476/3476029.png",
    rawText: "Tài liệu tham khảo. Giáo trình Kinh tế chính trị Mác - Lênin. Các bài báo và tài liệu liên quan.",
    title: "TÀI LIỆU THAM KHẢO",
    details: (
      <>
        <motion.ul variants={contentChildVariants} className="space-y-4 list-disc list-outside pl-6">
          <motion.li variants={contentChildVariants}>
            Giáo trình Kinh tế chính trị Mác - Lênin (Dành cho hệ đào tạo đại học không chuyên lý luận chính trị) - NXB Chính trị quốc gia sự thật.
        </motion.li>
          <motion.li variants={contentChildVariants}>
            Các bài báo, tài liệu, hình ảnh minh họa từ Internet.
          </motion.li>
        </motion.ul>
      </>
    ),
  },
];