export const STORES = [
  { code: '01 DD', name: '01 Đặng Dung' },
  { code: '03 NVH', name: '03 Nguyễn Văn Huyên' },
  { code: '12 ĐT', name: '12 Đào Tấn' },
  { code: '94 LĐ', name: '94 Lò Đúc' },
  { code: '96 HT', name: '96 Hồng Tiến' },
  { code: '98 VTP', name: '98 Vũ Trọng Phụng' },
] as const;

export type StoreCode = typeof STORES[number]['code'];

export interface ReportColumnDef {
  id: string;
  header: string;
  groupKey: string;
  placeholder?: string;
  example?: string;
  type?: 'text' | 'number';
}

export interface ReportGroupDef {
  key: string;
  title: string;
  columns: ReportColumnDef[];
}

export const SYSTEM_REPORT_GROUP: ReportGroupDef = {
  key: 'danh_gia_chung',
  title: 'ĐÁNH GIÁ CHUNG TOÀN CHUỖI',
  columns: [
    {
      id: 'dt_toan_he_thong',
      header: 'DT toàn hệ thống:',
      groupKey: 'danh_gia_chung',
      placeholder: 'Doanh thu toàn chuỗi...',
      example: '158.5 tr',
    },
    {
      id: 'muc_tieu_ngay',
      header: 'Mục tiêu ngày:',
      groupKey: 'danh_gia_chung',
      placeholder: 'Mục tiêu DT toàn chuỗi...',
      example: '160.0 tr',
    },
    {
      id: 'tang_giam_hom_truoc',
      header: 'Tăng/giảm so với hôm trc:',
      groupKey: 'danh_gia_chung',
      placeholder: 'Tăng/giảm tiền hoặc %...',
      example: '+12.8 tr (+8.8%)',
    },
    {
      id: 'tong_luot_khach',
      header: 'Tổng lượt khách:',
      groupKey: 'danh_gia_chung',
      placeholder: 'Tổng lượt khách toàn chuỗi...',
      example: '1,080 khách',
    },
    {
      id: 'so_ban_phuc_vu',
      header: 'Số bàn phục vụ:',
      groupKey: 'danh_gia_chung',
      placeholder: 'Tổng số bàn toàn chuỗi...',
      example: '275 bàn',
    },
    {
      id: 'dt_tb_khach',
      header: 'DT TB/khách:',
      groupKey: 'danh_gia_chung',
      placeholder: 'DT bình quân/khách toàn chuỗi...',
      example: '147k/khách',
    },
    {
      id: 'xep_hang_dt',
      header: 'Xếp hạng DT:',
      groupKey: 'danh_gia_chung',
      placeholder: 'Thứ tự DT các quán...',
      example: '12 ĐT > 01 DD > 94 LĐ',
    },
  ],
};

// Cột Ý KIẾN KHÁC (Thuộc phần Chung toàn chuỗi, không riêng cơ sở nào, hiển thị ở cuối bảng)
export const SYSTEM_OTHER_OPINION_COLUMN: ReportColumnDef = {
  id: 'y_kien_khac',
  header: 'Ý kiến khác:',
  groupKey: 'y_kien_khac',
  placeholder: 'Nhận xét, kiến nghị chung cho toàn chuỗi...',
  example: 'Toàn hệ thống vận hành trơn tru; đề xuất bổ sung thêm 200 cốc bia chuẩn cho 94 LĐ và 98 VTP',
};

export const STORE_REPORT_GROUPS: ReportGroupDef[] = [
  {
    key: 'phuc_vu',
    title: 'PHỤC VỤ',
    columns: [
      {
        id: 'xep_ban',
        header: 'Xếp bàn và đón tiếp:',
        groupKey: 'phuc_vu',
        placeholder: 'Tình hình đón tiếp, sắp xếp chỗ ngồi, hướng dẫn khách...',
        example: 'Đón tiếp chu đáo, khách vào đều, xếp bàn hợp lý',
      },
      {
        id: 'order_tu_van',
        header: 'Order & tư vấn món:',
        groupKey: 'phuc_vu',
        placeholder: 'Kỹ năng order, tư vấn món phù hợp, tốc độ ghi nhận...',
        example: 'Nhân viên tư vấn nhiệt tình các món đặc sản',
      },
      {
        id: 'cham_soc_upsell',
        header: 'Chăm sóc KH & upsell:',
        groupKey: 'phuc_vu',
        placeholder: 'Chăm sóc bàn, rót bia, gợi ý thêm món/bia tươi...',
        example: 'Chăm sóc bàn kịp thời, upsell thành công 5 tháp bia',
      },
      {
        id: 'toc_do_ra_do',
        header: 'Tốc độ ra đồ:',
        groupKey: 'phuc_vu',
        placeholder: 'Thời gian phục vụ đồ uống và món ăn ra bàn...',
        example: 'Bia ra ngay sau 2 phút, đồ ăn 5-10 phút đúng chuẩn',
      },
      {
        id: 'chuong_trinh_km',
        header: 'Chương trình KM:',
        groupKey: 'phuc_vu',
        placeholder: 'Triển khai CTKM, tư vấn ưu đãi cho khách, áp dụng voucher/tặng bia...',
        example: 'Tư vấn tốt CTKM tặng 1 tháp bia cho bàn từ 6 người, khách hưởng ứng',
      },
      {
        id: 've_sinh',
        header: 'Vệ sinh:',
        groupKey: 'phuc_vu',
        placeholder: 'Vệ sinh bàn ghế, sàn nhà, bát đĩa, WC...',
        example: 'Sạch sẽ, dọn bàn nhanh, khu WC thơm tho sạch nước',
      },
      {
        id: 'vd_phat_sinh_pv',
        header: 'Vđ phát sinh:',
        groupKey: 'phuc_vu',
        placeholder: 'Các vấn đề hoặc phàn nàn phát sinh trong ca...',
        example: 'Không có phát sinh',
      },
      {
        id: 'cach_giai_quyet_pv',
        header: 'Cách giải quyết ps:',
        groupKey: 'phuc_vu',
        placeholder: 'Cách thức và kết quả giải quyết phát sinh...',
        example: 'Vận hành ổn định',
      },
    ],
  },
  {
    key: 'nhan_su',
    title: 'NHÂN SỰ',
    columns: [
      {
        id: 'tong_ns_di_lam',
        header: 'Tổng NS bàn đi làm:',
        groupKey: 'nhan_su',
        placeholder: 'Tổng số nhân viên phục vụ bàn đi làm ca...',
        example: '8 bạn',
        type: 'text',
      },
      {
        id: 'ns_nghi_dot_xuat',
        header: 'NS nghỉ đột xuất:',
        groupKey: 'nhan_su',
        placeholder: 'Nhân sự nghỉ không báo trước hoặc đột xuất...',
        example: 'Không có',
        type: 'text',
      },
      {
        id: 'ns_nghi_han',
        header: 'NS nghỉ hẳn:',
        groupKey: 'nhan_su',
        placeholder: 'Nhân viên nghỉ hẳn trong ngày...',
        example: 'Không có',
        type: 'text',
      },
      {
        id: 'ns_moi',
        header: 'NS mới:',
        groupKey: 'nhan_su',
        placeholder: 'Nhân sự mới thử việc, học việc...',
        example: 'Không có',
        type: 'text',
      },
      {
        id: 'ns_ho_tro',
        header: 'NS hỗ trợ:',
        groupKey: 'nhan_su',
        placeholder: 'Nhân sự tăng cường từ cơ sở khác...',
        example: 'Không có',
        type: 'text',
      },
    ],
  },
  {
    key: 'bia',
    title: 'BIA',
    columns: [
      {
        id: 'phan_hoi_khach_bia',
        header: 'Phản hồi của khách:',
        groupKey: 'bia',
        placeholder: 'Ý kiến của khách về chất lượng bia, nhiệt độ, bọt...',
        example: 'Khách khen bia lạnh sâu, bọt mịn',
      },
      {
        id: 'vd_phat_sinh_bia',
        header: 'Vđ phát sinh:',
        groupKey: 'bia',
        placeholder: 'Sự cố vòi bia, áp suất, hao hụt, bom bia...',
        example: 'Không có',
      },
      {
        id: 'cach_giai_quyet_bia',
        header: 'Cách giải quyết ps:',
        groupKey: 'bia',
        placeholder: 'Phương án xử lý phát sinh về bia...',
        example: 'Duy trì ổn định bồn ủ lạnh',
      },
      {
        id: 'xuat_ban_tiec',
        header: 'Xuất bán tiệc:',
        groupKey: 'bia',
        placeholder: 'Bia xuất tiệc, số lượng bom, khuyến mãi nếu có...',
        example: '1 tiệc sinh nhật: xuất 4 bom',
      },
    ],
  },
  {
    key: 'mon_an',
    title: 'MÓN ĂN',
    columns: [
      {
        id: 'mon_day',
        header: 'Món đẩy:',
        groupKey: 'mon_an',
        placeholder: 'Món trọng tâm cần đẩy bán...',
        example: 'Dê xào lăn, Chim câu quay',
      },
      {
        id: 'mon_ban_chay',
        header: 'Món bán chạy:',
        groupKey: 'mon_an',
        placeholder: 'Món được khách gọi nhiều nhất...',
        example: 'Dồi sụn nướng, Nem chua rán, Chả ốc',
      },
      {
        id: 'phan_hoi_khach_mon',
        header: 'Phản hồi của khách:',
        groupKey: 'mon_an',
        placeholder: 'Đánh giá khẩu vị, chất lượng, định lượng món...',
        example: 'Món ăn vừa miệng, nóng hổi',
      },
      {
        id: 'vd_phat_sinh_mon',
        header: 'Vđ phát sinh:',
        groupKey: 'mon_an',
        placeholder: 'Món thiếu nguyên liệu, món ra chậm, khách đổi trả...',
        example: 'Không có',
      },
      {
        id: 'cach_giai_quyet_mon',
        header: 'Cách giải quyết ps:',
        groupKey: 'mon_an',
        placeholder: 'Cách xử lý của TQL và bếp...',
        example: 'Bếp ra đồ đều',
      },
    ],
  },
  {
    key: 'sua_chua',
    title: 'SỬA CHỮA',
    columns: [
      {
        id: 'hong_hoc_can_sua',
        header: 'Hỏng hóc cần sửa:',
        groupKey: 'sua_chua',
        placeholder: 'Thiết bị điện, nước, âm thanh, điều hòa cần bảo trì...',
        example: 'Không có',
      },
      {
        id: 'hang_muc_sua_trong_ngay',
        header: 'Hạng mục sửa trong ngày:',
        groupKey: 'sua_chua',
        placeholder: 'Các thiết bị đã sửa chữa xong trong ngày...',
        example: 'Bảo dưỡng định kỳ',
      },
    ],
  },
  {
    key: 'dao_tao',
    title: 'ĐÀO TẠO:',
    columns: [
      {
        id: 'dao_tao',
        header: 'Đào tạo:',
        groupKey: 'dao_tao',
        placeholder: 'Nội dung đào tạo nội bộ, hướng dẫn quy trình mới...',
        example: 'Đào tạo kỹ năng rót bia chuẩn 2 ngón bọt cho nhân viên mới',
      },
    ],
  },
  {
    key: 'doi_ngoai',
    title: 'ĐỐI NGOẠI:',
    columns: [
      {
        id: 'doi_ngoai',
        header: 'Đối ngoại:',
        groupKey: 'doi_ngoai',
        placeholder: 'Tình hình tiếp đoàn kiểm tra, cư dân, trật tự đô thị...',
        example: 'Khu vực để xe gọn gàng, an ninh trật tự đảm bảo',
      },
    ],
  },
];

// All report groups: Whole system group first, then 7 store inspection groups
export const REPORT_GROUPS: ReportGroupDef[] = [
  SYSTEM_REPORT_GROUP,
  ...STORE_REPORT_GROUPS,
];

// Flat list of 8 system evaluation columns
export const SYSTEM_COLUMNS: ReportColumnDef[] = SYSTEM_REPORT_GROUP.columns;

// Flat list of 26 store inspection columns
export const STORE_COLUMNS: ReportColumnDef[] = STORE_REPORT_GROUPS.flatMap(g => g.columns);

// Flat list of all 34 inspection field columns
export const ALL_COLUMNS: ReportColumnDef[] = [...SYSTEM_COLUMNS, ...STORE_COLUMNS];

export interface SystemEvaluationValues {
  [columnId: string]: string;
}

export interface StoreReportValues {
  [columnId: string]: string;
}

export const getSystemTime = (): string => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export interface TQLReportData {
  sendTime: string;
  date: string;
  reporter: string;
  systemEvaluation: SystemEvaluationValues;
  stores: Record<StoreCode, StoreReportValues>;
}

export const createEmptySystemEvaluation = (): SystemEvaluationValues => {
  const values: SystemEvaluationValues = {};
  SYSTEM_COLUMNS.forEach(col => {
    values[col.id] = '';
  });
  values['y_kien_khac'] = '';
  return values;
};

export const createEmptyStoreValues = (): StoreReportValues => {
  const values: StoreReportValues = {};
  STORE_COLUMNS.forEach(col => {
    values[col.id] = '';
  });
  return values;
};

export const createInitialReportData = (): TQLReportData => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const initialStores: Record<StoreCode, StoreReportValues> = {
    '01 DD': createEmptyStoreValues(),
    '03 NVH': createEmptyStoreValues(),
    '12 ĐT': createEmptyStoreValues(),
    '94 LĐ': createEmptyStoreValues(),
    '96 HT': createEmptyStoreValues(),
    '98 VTP': createEmptyStoreValues(),
  };

  return {
    sendTime: getSystemTime(),
    date: dateStr,
    reporter: '',
    systemEvaluation: createEmptySystemEvaluation(),
    stores: initialStores,
  };
};

// --- DATA POOLS FOR RANDOM SAMPLE GENERATION ---
const randomPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const POOLS = {
  reporters: [
    'Nguyễn Văn Nam',
    'Trần Tuấn Anh',
    'Hoàng Minh Đức',
    'Phạm Quốc Huy',
    'Đỗ Quang Hưng',
  ],
  xepBan: [
    'Đón tiếp niềm nở, xếp khách vào tầng 1 & sân vườn, không để khách chờ',
    'Khách đông từ 19h30, điều phối bàn nhanh, hướng dẫn xe chu đáo',
    'Xếp khách hợp lý, ưu tiên đoàn 20 khách đặt trước phòng VIP',
    'Đón tiếp chu đáo, mở cửa chào khách to rõ, tạo thiện cảm tốt',
    'Khách vào rải rác đều, phân bổ các khu vực tầng 1 và tầng 2 thoáng đãng',
    'Nhân viên chủ động ghép bàn cho đoàn 15 người nhanh chóng',
  ],
  orderTuVan: [
    'Tư vấn tốt combo nướng và bia tươi Trúc Bạch mới khui',
    'Order nhanh qua tablet, gợi ý các món đặc sản bán chạy đạt hiệu quả',
    'Tư vấn nhiệt tình các món nhắm khai vị và đồ uống phù hợp',
    'Nắm chắc menu, giải thích rõ định lượng từng món cho khách',
    'Gợi ý đổi món hết nhanh gọn, khách vui vẻ đồng ý',
    'Order chính xác, không nhầm bàn, ghi chú rõ món ít cay cho khách',
  ],
  chamSocUpsell: [
    'Rót bia kịp thời, bàn luôn đầy đủ đá lạnh và ly sạch',
    'Chăm sóc bàn chu đáo, upsell thêm 4 tháp bia và 2 đĩa nướng',
    'Lấy thêm đĩa sạch liên tục, upsell thành công 3 set lẩu riêu cua',
    'Quan sát khách tốt, châm đá và bia ngay khi cạn ly',
    'Khách khen nhân viên ngoan, upsell thêm 2 món chiên khai vị',
    'Phục vụ nhiệt tình, gợi ý tráng miệng hoa quả tươi thành công',
  ],
  tocDoRaDo: [
    'Bia ra ngay sau 1-2 phút, đồ nướng 6-8 phút đúng chuẩn',
    'Đồ uống ra tức thì, đồ ăn trung bình 5-7 phút nóng hổi',
    'Tốc độ ra đồ nhanh, không bị dồn đơn bếp lúc cao điểm',
    'Đạt chuẩn: 3 phút món khai vị, 8 phút món chính',
    'Kiểm soát bill tốt, ra đồ theo đúng thứ tự bàn gọi',
    'Bếp và bar phối hợp nhịp nhàng, ra đồ đồng bộ chuẩn ca',
  ],
  chuongTrinhKM: [
    'Tư vấn tốt CTKM tặng 1 tháp bia cho bàn từ 6 người, khách hưởng ứng',
    'Nhân viên phổ biến rõ chương trình giảm 10% giờ vàng trưa cho khách văn phòng',
    'Chạy tốt CTKM combo nướng + bia hơi, khách phản hồi rất tích cực',
    'Áp dụng voucher tặng món khai vị cho khách check-in đúng quy trình',
    'Tư vấn nhiệt tình ưu đãi sinh nhật tặng bánh và giảm 15% đồ uống',
    'Nhân viên nắm vững thể lệ CTKM tháng, không có sai sót khi chốt bill',
  ],
  veSinh: [
    'Sạch sẽ, dọn bàn nhanh, khu WC kiểm tra 30p/lần khô ráo thơm tho',
    'Sàn nhà khô ráo, bàn ghế lau cồn sạch sẽ bóng loáng',
    'Khu vực quầy bar và WC thơm mùi tinh dầu sả, sạch nước',
    'Dọn đĩa trống liên tục, mặt bàn luôn thoáng đãng',
    'Bát đũa bóng loáng, thùng rác không bị đầy ứ',
    'Kiểm tra định kỳ khu vực bồn rửa và thảm lau chân sạch sẽ',
  ],
  vdPhatSinhPV: [
    'Không có phát sinh',
    'Bàn số 8 đề nghị giảm bớt điều hòa vì có trẻ nhỏ',
    'Khách xin đổi vị trí bàn ra gần quạt mát',
    'Bàn 12 gọi thêm 2 ghế phụ lúc quán đang đông',
    'Khách thanh toán chuyển khoản bị chậm mạng 1 phút',
    'Không có sự cố',
  ],
  cachGiaiQuyetPV: [
    'Vận hành ổn định',
    'Đã tăng nhiệt độ lên 26 độ và chuyển hướng gió',
    'Đã hỗ trợ chuyển bàn sang góc thoáng theo ý khách',
    'Đã lấy ghế phụ dự phòng bổ sung ngay cho khách',
    'Đã hướng dẫn khách quét mã QR mạng phụ thành công',
    'Ca làm việc trôi chảy',
  ],
  nsNghiDotXuat: [
    'Không có',
    'Không có',
    '1 bạn (bị cảm sốt ca tối)',
    'Không có',
    '1 bạn (việc gia đình đột xuất)',
    'Không có',
  ],
  nsNghiHan: ['Không có', 'Không có', 'Không có', '1 bạn (chuyển chỗ ở)', 'Không có'],
  nsMoi: [
    'Không có',
    '1 bạn mới (Mai - ca tối)',
    'Không có',
    '1 bạn học việc (Tuấn - bàn)',
    'Không có',
    '1 bạn thử việc (Hương)',
  ],
  nsHoTro: [
    'Không có',
    'Không có',
    '1 bạn tăng cường từ 94 LĐ',
    'Đã điều 1 bạn sang 01 DD hỗ trợ',
    'Không có',
  ],
  phanHoiBia: [
    'Khách khen bia lạnh sâu, bọt mịn thơm mát',
    'Bia đạt chuẩn, nhiệt độ ủ lạnh hoàn hảo',
    'Khách uống khen bia Trúc Bạch đậm đà, chuẩn vị',
    'Bọt rót chuẩn 2 ngón tay, giữ nhiệt tốt',
    'Bia ngon, cốc ướp lạnh sẵn đạt chuẩn hệ thống',
    'Khách quen khen chất lượng bia ổn định',
  ],
  vdPhatSinhBia: [
    'Không có sự cố',
    'Không có',
    'Áp suất vòi số 2 hơi yếu đầu ca',
    'Không có',
    'Không có',
  ],
  cachGiaiQuyetBia: [
    'Duy trì ổn định nhiệt độ bồn ủ lạnh',
    'Vận hành tốt',
    'Đã xả van kiểm tra và chỉnh lại van CO2 đạt chuẩn',
    'Bảo dưỡng hệ thống định kỳ',
    'Vận hành trơn tru',
  ],
  xuatBanTiec: [
    'Không có tiệc lớn',
    '1 tiệc sinh nhật 16 người: xuất bán 5 bom',
    '2 tiệc liên hoan công ty: xuất 9 bom bia',
    '1 tiệc họp lớp 22 khách (6 bom)',
    'Khách lẻ tiêu thụ 4 bom bia tươi',
    'Không có tiệc',
  ],
  monDay: [
    'Bò tơ nướng tảng, Lẩu gà lá é',
    'Dê xào lăn, Chim câu quay lá móc mật',
    'Chân giò chiên giòn, Cá chép om dưa',
    'Gà nướng lu than hoa, Lẩu ếch măng cay',
    'Bò nhúng dấm, Mực một nắng nướng sa tế',
    'Lẩu riêu cua bắp bò sườn sụn, Dê nướng tảng',
  ],
  monBanChay: [
    'Dồi sụn nướng, Chả ốc, Đậu lướt ván',
    'Nem chua rán, Lạc luộc, Mực chiên bơ',
    'Khoai tây chiên, Ngô chiên, Dê nướng tảng',
    'Dồi sụn, Lẩu riêu cua, Nộm tai heo',
    'Chả ốc nướng giấy bạc, Đậu tẩm hành',
    'Thịt dải nướng, Khoai lang kén, Rau luộc kho quẹt',
  ],
  phanHoiMon: [
    'Món ăn vừa miệng, nóng hổi, trình bày sạch đẹp',
    'Khách khen món nướng ướp đậm đà, lẩu ngọt nước',
    'Đồ nhắm phong phú, định lượng đầy đặn',
    'Khách khen cá tươi ngon, gia vị chuẩn vị',
    'Món ăn hợp khẩu vị số đông khách',
    'Bếp giữ chất lượng món ổn định',
  ],
  vdPhatSinhMon: [
    'Không có',
    'Hết rau muống xào tỏi lúc 21h10',
    'Khách giục món nướng lúc 20h do đông',
    'Không có',
    'Khách xin thêm sốt chấm thịt nướng',
    'Không có',
  ],
  cachGiaiQuyetMon: [
    'Bếp ra đồ đều đặn',
    'Đã tư vấn đổi sang rau cải ngọt xào tỏi khách ưng ý',
    'Bếp ưu tiên nướng trước và tặng tráng miệng',
    'Đã tiếp thêm nước sốt đặc biệt ngay cho khách',
    'Phối hợp bếp trôi chảy',
    'Ca ổn định',
  ],
  hongHoc: [
    'Không có',
    'Đèn trang trí sân vườn bị chập chờn 1 bóng',
    'Vòi bồn rửa tay WC tầng 1 bị lỏng ren',
    'Quạt treo tường số 2 phát tiếng kêu nhẹ',
    'Không có',
    'Không có',
  ],
  suaChua: [
    'Bảo dưỡng định kỳ các thiết bị',
    'Đã thay bóng LED mới, sáng rõ',
    'Đã siết lại ren và thay gioăng cao su',
    'Đã tra dầu bảo dưỡng quạt chạy êm',
    'Đã vệ sinh lưới lọc điều hòa phòng lớn',
    'Đã kiểm tra định kỳ hệ thống điện và bình PCCC',
  ],
  daoTao: [
    'Đào tạo kỹ năng chào bàn chuẩn và kỹ thuật upsell tháp bia',
    'Nhắc nhở kiểm tra tem date thực phẩm và nguyên tắc FIFO trong kho lạnh',
    'Hướng dẫn kỹ thuật rót bia bọt chuẩn 2 ngón tay và cách bưng khay an toàn',
    'Đào tạo kỹ năng xử lý phàn nàn và xin lỗi khách hàng chuyên nghiệp',
    'Họp đầu ca chốt mục tiêu doanh thu và nhắc nhở tác phong đồng phục',
    'Hướng dẫn quy trình dọn bàn 3 phút và setup bàn tiệc mới',
  ],
  doiNgoai: [
    'Khu vực để xe thông thoáng, bảo vệ dắt xe chu đáo, an ninh trật tự tốt',
    'Tổ dân phố đi tuần lúc 20h, nhắc nhở giữ trật tự chung, cửa hàng chấp hành nghiêm',
    'Cư dân xung quanh hài hòa, không có phản ánh về tiếng ồn',
    'Phối hợp tốt với công an phường đảm bảo an ninh trật tự hè phố',
    'Xe của khách được xếp ngay ngắn trong vạch quy định, giao thông thông suốt',
    'Mọi việc đối ngoại trong ngày diễn ra êm đẹp, không phát sinh vấn đề',
  ],
  yKienKhacToanChuoi: [
    'Toàn chuỗi vận hành ổn định trong khung giờ cao điểm. Đề xuất tuần tới bổ sung thêm 200 cốc bia chuẩn cho 94 LĐ và 98 VTP, đồng thời lên kế hoạch kiểm tra chất lượng nguồn đá chung.',
    'Các cơ sở bám sát mục tiêu doanh thu ngày. Kế hoạch đào tạo upsell món nhậu mới mang lại hiệu quả rõ rệt. Nhắc nhở chung các TQL kiểm soát chặt chẽ hao hụt bia tươi cuối ca.',
    'Tình hình toàn hệ thống ngày cuối tuần rất khả quan. Đề xuất phòng vận hành hỗ trợ thêm 2 nhân sự tăng cường cho 12 ĐT vào thứ 7 và chủ nhật tới.',
    'Toàn chuỗi đảm bảo tốt an ninh trật tự và vệ sinh ATTP. Tiếp tục duy trì phong độ phục vụ nhiệt tình, đón tiếp khách chu đáo.',
    'Đề xuất bộ phận kho tổng kiểm tra và cân đối lại lượng bia lon dự phòng cho 01 DD và 03 NVH trước đợt nắng nóng tuần sau.',
  ],
};

/**
 * Generates truly randomized, realistic data for all 6 stores.
 * Numbers and evaluation texts are uniquely computed every time.
 */
export const getRandomReportData = (): TQLReportData => {
  const base = createInitialReportData();
  base.reporter = randomPick(POOLS.reporters);
  base.sendTime = getSystemTime();

  // Generate randomized revenues for each store and sort for ranking
  const storeRevenues = STORES.map((s) => {
    const rev = randomInt(160, 360) / 10; // 16.0 to 36.0 tr
    const target = (Math.round(rev / 5) * 5) + randomPick([-2, 0, 2, 3]);
    const diff = +(rev - target).toFixed(1);
    const diffPct = +((diff / target) * 100).toFixed(1);
    const guests = Math.round((rev * 1000) / randomInt(135, 160));
    const tables = Math.round(guests / randomInt(3, 5));
    const avgPerGuest = Math.round((rev * 1000) / Math.max(1, guests));

    return {
      code: s.code,
      rev,
      target,
      diff,
      diffPct,
      guests,
      tables,
      avgPerGuest,
    };
  });

  // Sort by revenue descending to determine rank
  const sorted = [...storeRevenues].sort((a, b) => b.rev - a.rev);
  const rankingSummary = sorted.map((item) => item.code).join(' > ');

  // Calculate aggregated metrics for the whole system
  const totalRev = +(storeRevenues.reduce((acc, cur) => acc + cur.rev, 0)).toFixed(1);
  const totalTarget = +(storeRevenues.reduce((acc, cur) => acc + cur.target, 0)).toFixed(1);
  const totalDiff = +(totalRev - totalTarget).toFixed(1);
  const totalDiffPct = +((totalDiff / totalTarget) * 100).toFixed(1);
  const totalGuests = storeRevenues.reduce((acc, cur) => acc + cur.guests, 0);
  const totalTables = storeRevenues.reduce((acc, cur) => acc + cur.tables, 0);
  const avgPerGuestSystem = Math.round((totalRev * 1000) / Math.max(1, totalGuests));

  // 1. ĐÁNH GIÁ CHUNG TOÀN CHUỖI (7 chỉ số cấp hệ thống + Ý kiến khác toàn chuỗi)
  base.systemEvaluation = {
    dt_toan_he_thong: `${totalRev.toFixed(1)} tr`,
    muc_tieu_ngay: `${totalTarget.toFixed(1)} tr`,
    tang_giam_hom_truoc: `${totalDiff >= 0 ? '+' : ''}${totalDiff.toFixed(1)} tr (${totalDiffPct >= 0 ? '+' : ''}${totalDiffPct}%)`,
    tong_luot_khach: `${totalGuests.toLocaleString('vi-VN')} khách`,
    so_ban_phuc_vu: `${totalTables} bàn`,
    dt_tb_khach: `${avgPerGuestSystem}k/khách`,
    xep_hang_dt: rankingSummary,
    y_kien_khac: randomPick(POOLS.yKienKhacToanChuoi),
  };

  // 2. Điền 26 hạng mục nghiệp vụ cho từng cơ sở (không lặp lại 8 cột toàn chuỗi)
  storeRevenues.forEach((item) => {
    const code = item.code;

    base.stores[code] = {
      // PHỤC VỤ (8 cột)
      xep_ban: randomPick(POOLS.xepBan),
      order_tu_van: randomPick(POOLS.orderTuVan),
      cham_soc_upsell: randomPick(POOLS.chamSocUpsell),
      toc_do_ra_do: randomPick(POOLS.tocDoRaDo),
      chuong_trinh_km: randomPick(POOLS.chuongTrinhKM),
      ve_sinh: randomPick(POOLS.veSinh),
      vd_phat_sinh_pv: randomPick(POOLS.vdPhatSinhPV),
      cach_giai_quyet_pv: randomPick(POOLS.cachGiaiQuyetPV),

      // NHÂN SỰ (5 cột)
      tong_ns_di_lam: `${randomInt(7, 11)} bạn`,
      ns_nghi_dot_xuat: randomPick(POOLS.nsNghiDotXuat),
      ns_nghi_han: randomPick(POOLS.nsNghiHan),
      ns_moi: randomPick(POOLS.nsMoi),
      ns_ho_tro: randomPick(POOLS.nsHoTro),

      // BIA (4 cột)
      phan_hoi_khach_bia: randomPick(POOLS.phanHoiBia),
      vd_phat_sinh_bia: randomPick(POOLS.vdPhatSinhBia),
      cach_giai_quyet_bia: randomPick(POOLS.cachGiaiQuyetBia),
      xuat_ban_tiec: randomPick(POOLS.xuatBanTiec),

      // MÓN ĂN (5 cột)
      mon_day: randomPick(POOLS.monDay),
      mon_ban_chay: randomPick(POOLS.monBanChay),
      phan_hoi_khach_mon: randomPick(POOLS.phanHoiMon),
      vd_phat_sinh_mon: randomPick(POOLS.vdPhatSinhMon),
      cach_giai_quyet_mon: randomPick(POOLS.cachGiaiQuyetMon),

      // SỬA CHỮA (2 cột)
      hong_hoc_can_sua: randomPick(POOLS.hongHoc),
      hang_muc_sua_trong_ngay: randomPick(POOLS.suaChua),

      // ĐÀO TẠO (1 cột)
      dao_tao: randomPick(POOLS.daoTao),

      // ĐỐI NGOẠI (1 cột)
      doi_ngoai: randomPick(POOLS.doiNgoai),
    };
  });

  return base;
};

// getSampleReportData points to getRandomReportData for continuous fresh variations
export const getSampleReportData = (): TQLReportData => {
  return getRandomReportData();
};
