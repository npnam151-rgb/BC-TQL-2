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

export const REPORT_GROUPS: ReportGroupDef[] = [
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
        example: 'Bàn số 8 phản ánh món cá nướng hơi mặn',
      },
      {
        id: 'cach_giai_quyet_pv',
        header: 'Cách giải quyết ps:',
        groupKey: 'phuc_vu',
        placeholder: 'Cách thức và kết quả giải quyết phát sinh...',
        example: 'Đã xin lỗi khách, đổi món mới và tặng tráng miệng',
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
        example: '1 bạn (bị sốt)',
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
        example: '1 bạn mới (Mai - ca tối)',
        type: 'text',
      },
      {
        id: 'ns_ho_tro',
        header: 'NS hỗ trợ:',
        groupKey: 'nhan_su',
        placeholder: 'Nhân sự tăng cường từ cơ sở khác...',
        example: '1 bạn hỗ trợ từ 94 LĐ',
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
        example: 'Đã xả van kiểm tra và vận hành ổn định',
      },
      {
        id: 'xuat_ban_tiec',
        header: 'Xuất bán tiệc:',
        groupKey: 'bia',
        placeholder: 'Bia xuất tiệc, số lượng bom, khuyến mãi nếu có...',
        example: 'Tiệc công ty 25 người: dùng 4 bom bia',
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
        example: 'Dê xào lăn, Chim câu quay lá móc mật',
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
        example: 'Hết rau muống xào tỏi lúc 21h15',
      },
      {
        id: 'cach_giai_quyet_mon',
        header: 'Cách giải quyết ps:',
        groupKey: 'mon_an',
        placeholder: 'Cách xử lý của TQL và bếp...',
        example: 'Bếp đã bổ sung cải ngọt thay thế kịp thời',
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
        example: 'Đèn hắt khu sân vườn bị chập chờn',
      },
      {
        id: 'hang_muc_sua_trong_ngay',
        header: 'Hạng mục sửa trong ngày:',
        groupKey: 'sua_chua',
        placeholder: 'Các thiết bị đã sửa chữa xong trong ngày...',
        example: 'Đã thay bóng đèn và siết lại vòi bồn rửa tay',
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
        example: 'Hướng dẫn nhân viên mới quy trình rót bia và chào khách chuẩn',
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
        example: 'Tổ dân phố nhắc nhở xếp xe gọn gàng, đã xử lý ngay',
      },
    ],
  },
];

// Flat list of all 25 field columns
export const ALL_COLUMNS: ReportColumnDef[] = REPORT_GROUPS.flatMap(g => g.columns);

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
  sendTime: string; // Tự động lấy giờ hệ thống lúc tạo/xuất
  date: string;     // e.g. "2026-09-21"
  reporter: string; // e.g. "Nguyễn Văn Nam"
  // Map of data per store for all 6 stores (01 DD, 03 NVH, 12 ĐT, 94 LĐ, 96 HT, 98 VTP)
  stores: Record<StoreCode, StoreReportValues>;
}

export const createEmptyStoreValues = (): StoreReportValues => {
  const values: StoreReportValues = {};
  ALL_COLUMNS.forEach(col => {
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
    stores: initialStores,
  };
};

export const getSampleReportData = (): TQLReportData => {
  const base = createInitialReportData();
  base.reporter = 'Nguyễn Văn Nam';
  base.sendTime = getSystemTime();
  base.stores['01 DD'] = {
    xep_ban: 'Đón tiếp niềm nở, xếp khách vào tầng 1 & sân vườn, không để khách chờ',
    order_tu_van: 'Tư vấn tốt combo tiệc, gợi ý món nướng và bia tươi mới khui',
    cham_soc_upsell: 'Chăm sóc chu đáo, rót bia liên tục, upsell thêm 6 tháp bia',
    toc_do_ra_do: 'Bia ra ngay sau 1-2 phút, đồ ăn 5-8 phút đúng chuẩn',
    ve_sinh: 'Sạch sẽ, dọn bàn nhanh, khu WC kiểm tra 30p/lần khô ráo',
    vd_phat_sinh_pv: 'Bàn 12 đề nghị giảm bớt điều hòa vì có trẻ em',
    cach_giai_quyet_pv: 'Đã chỉnh nhiệt độ lên 26 độ và chuyển góc ấm hơn',
    tong_ns_di_lam: '9 bạn',
    ns_nghi_dot_xuat: '1 bạn (bị cảm sốt ca tối)',
    ns_nghi_han: 'Không có',
    ns_moi: '1 bạn mới (Hương - bàn)',
    ns_ho_tro: '1 bạn hỗ trợ từ 94 LĐ',
    phan_hoi_khach_bia: 'Khách khen bia lạnh sâu, bọt mịn thơm',
    vd_phat_sinh_bia: 'Không có sự cố',
    cach_giai_quyet_bia: 'Duy trì ổn định nhiệt độ bồn ủ lạnh',
    xuat_ban_tiec: '2 tiệc liên hoan: xuất bán 8 bom bia',
    mon_day: 'Bò tơ nướng tảng, Lẩu gà lá é',
    mon_ban_chay: 'Dồi sụn nướng, Chả ốc, Đậu lướt ván',
    phan_hoi_khach_mon: 'Khách đánh giá món ăn vừa miệng, nóng hổi',
    vd_phat_sinh_mon: 'Bàn 6 giục món nướng lúc 20h10 do đông khách',
    cach_giai_quyet_mon: 'Bếp đã ưu tiên lên trước, tặng đĩa đậu phộng tráng miệng',
    hong_hoc_can_sua: 'Đèn trang trí sân vườn bị nhấp nháy 1 bóng',
    hang_muc_sua_trong_ngay: 'Đã thay bóng đèn mới, siết lại vòi nước bồn rửa ly',
    dao_tao: 'Đào tạo kỹ năng xử lý tình huống phàn nàn và cách chào bàn chuẩn cho 3 bạn mới',
    doi_ngoai: 'Tổ dân phố đi tuần lúc 20h, nhắc nhở xếp xe gọn gàng, cửa hàng chấp hành tốt',
  };

  base.stores['03 NVH'] = {
    ...createEmptyStoreValues(),
    xep_ban: 'Khách kín tầng 1, xếp bàn hợp lý, điều phối xe tốt',
    order_tu_van: 'Order nhanh, tư vấn thêm bia Trúc Bạch và đồ nguội',
    cham_soc_upsell: 'Rót bia kịp thời, bàn luôn có đá lạnh',
    toc_do_ra_do: 'Đồ uống 2p, đồ ăn 7-10p',
    ve_sinh: 'Sàn nhà sạch, bàn ăn dọn ngay khi khách đứng dậy',
    vd_phat_sinh_pv: 'Không có',
    cach_giai_quyet_pv: 'Ổn định',
    tong_ns_di_lam: '8 bạn',
    ns_nghi_dot_xuat: 'Không có',
    ns_nghi_han: 'Không có',
    ns_moi: 'Không có',
    ns_ho_tro: 'Không có',
    phan_hoi_khach_bia: 'Bia đạt chuẩn, nhiệt độ lạnh tốt',
    vd_phat_sinh_bia: 'Không có',
    cach_giai_quyet_bia: 'Vận hành tốt',
    xuat_ban_tiec: '1 tiệc sinh nhật 15 người',
    mon_day: 'Chân giò chiên giòn, Cá chép om dưa',
    mon_ban_chay: 'Nem chua rán, Lẩu riêu cua',
    phan_hoi_khach_mon: 'Khách khen cá tươi ngon',
    vd_phat_sinh_mon: 'Không có',
    cach_giai_quyet_mon: 'Bếp ra đồ đều',
    hong_hoc_can_sua: 'Máy làm đá bị đóng tuyết nhẹ',
    hang_muc_sua_trong_ngay: 'Đã xả tuyết và bảo dưỡng máy đá',
    dao_tao: 'Nhắc nhở kiểm tra tem date thực phẩm trong tủ bảo quản',
    doi_ngoai: 'Không có vấn đề phát sinh',
  };

  base.stores['12 ĐT'] = {
    ...createEmptyStoreValues(),
    xep_ban: 'Đón tiếp chu đáo, khách vào đông từ 19h30',
    order_tu_van: 'Tư vấn nhiệt tình các món nướng than hoa',
    cham_soc_upsell: 'Upsell tốt 4 combo khai vị',
    toc_do_ra_do: 'Đạt chuẩn 5-7 phút',
    ve_sinh: 'Khu vực quầy bar và WC sạch sẽ, khô ráo',
    tong_ns_di_lam: '7 bạn',
    ns_nghi_dot_xuat: 'Không có',
    ns_nghi_han: 'Không có',
    ns_moi: '1 bạn học việc (Tuấn)',
    ns_ho_tro: 'Không có',
    phan_hoi_khach_bia: 'Bia rót chuẩn bọt 2 ngón tay, khách hài lòng',
    xuat_ban_tiec: 'Không có',
    mon_day: 'Dê tái chanh, Ba chỉ nướng riềng mẻ',
    mon_ban_chay: 'Chả ốc, Dồi sụn, Lạc luộc',
    phan_hoi_khach_mon: 'Món ăn đậm đà, nóng sốt',
    hong_hoc_can_sua: 'Không có',
    hang_muc_sua_trong_ngay: 'Đã thay pin mic loa kéo',
    dao_tao: 'Hướng dẫn bạn Tuấn cách bưng bê khay an toàn',
    doi_ngoai: 'Khách gửi xe trật tự, bảo vệ hỗ trợ tốt',
  };

  base.stores['94 LĐ'] = {
    ...createEmptyStoreValues(),
    xep_ban: 'Đón tiếp tốt, khách đoàn 30 khách xếp phòng riêng tầng 2',
    order_tu_van: 'Nhân viên nắm rõ thực đơn, tư vấn món chính chuẩn',
    cham_soc_upsell: 'Bàn tiệc được phục vụ chu đáo, rót bia liên tục',
    toc_do_ra_do: 'Đồ tiệc lên đúng tiến độ đã đặt trước',
    ve_sinh: 'Vệ sinh phòng tiệc sạch trước và sau khi khách dùng',
    tong_ns_di_lam: '11 bạn',
    ns_nghi_dot_xuat: 'Không có',
    ns_nghi_han: 'Không có',
    ns_moi: 'Không có',
    ns_ho_tro: 'Đã điều 1 bạn sang 01 DD hỗ trợ ca tối',
    phan_hoi_khach_bia: 'Bia xuất đều, nhiệt độ ủ lạnh sâu',
    vd_phat_sinh_bia: 'Không có',
    xuat_ban_tiec: '1 tiệc công ty 30 người (10 bom)',
    mon_day: 'Gà nướng lu, Lẩu ếch măng cay',
    mon_ban_chay: 'Chả ốc, Dê nướng bản gang',
    phan_hoi_khach_mon: 'Khách đánh giá đồ ăn ngon, số lượng đầy đặn',
    hong_hoc_can_sua: 'Quạt treo tường phòng 201 phát tiếng kêu',
    hang_muc_sua_trong_ngay: 'Đã tra dầu và siết lại ốc quạt',
    dao_tao: 'Đào tạo kỹ năng phục vụ phòng VIP cho nhân viên bàn',
    doi_ngoai: 'An ninh trật tự tốt, xe cộ gọn gàng',
  };

  base.stores['96 HT'] = {
    ...createEmptyStoreValues(),
    xep_ban: 'Khách lẻ vào rải rác, xếp bàn thoáng mát tầng 1',
    order_tu_van: 'Tư vấn món nhanh, giới thiệu bia mùa mới',
    cham_soc_upsell: 'Chăm sóc bàn tốt, dọn đĩa trống kịp thời',
    toc_do_ra_do: 'Đồ uống ra ngay, đồ ăn trung bình 6 phút',
    ve_sinh: 'Sạch sẽ, thông thoáng',
    tong_ns_di_lam: '7 bạn',
    ns_nghi_dot_xuat: 'Không có',
    ns_nghi_han: 'Không có',
    ns_moi: 'Không có',
    ns_ho_tro: 'Không có',
    phan_hoi_khach_bia: 'Khách khen bia thơm mát, tươi ngon',
    xuat_ban_tiec: 'Không có tiệc lớn',
    mon_day: 'Bò nhúng dấm, Mực một nắng nướng',
    mon_ban_chay: 'Ngô chiên, Đậu phụ chiên giòn, Khoai lang kén',
    phan_hoi_khach_mon: 'Đồ nhắm vừa vặn với bia',
    hong_hoc_can_sua: 'Không có',
    hang_muc_sua_trong_ngay: 'Đã kiểm tra định kỳ bình PCCC',
    dao_tao: 'Nhắc nhở tác phong đồng phục và vệ sinh cá nhân',
    doi_ngoai: 'Khu vực để xe thông thoáng',
  };

  base.stores['98 VTP'] = {
    ...createEmptyStoreValues(),
    xep_ban: 'Đón tiếp tốt, hướng dẫn khách lên tầng 2 có điều hòa',
    order_tu_van: 'Gợi ý món lẩu riêu cua bắp bò',
    cham_soc_upsell: 'Upsell thêm đồ nhúng lẩu và bia',
    toc_do_ra_do: 'Nồi lẩu lên sau 5 phút, đồ ăn kèm đầy đủ',
    ve_sinh: 'Bàn ghế lau khô ráo, khu vực bếp sạch sẽ',
    tong_ns_di_lam: '8 bạn',
    ns_nghi_dot_xuat: 'Không có',
    ns_nghi_han: 'Không có',
    ns_moi: 'Không có',
    ns_ho_tro: 'Không có',
    phan_hoi_khach_bia: 'Bia giữ lạnh tốt',
    xuat_ban_tiec: 'Không có',
    mon_day: 'Lẩu riêu cua bắp bò sườn sụn',
    mon_ban_chay: 'Dồi sụn, Khoai tây chiên, Mực nướng',
    phan_hoi_khach_mon: 'Khách hài lòng',
    hong_hoc_can_sua: 'Không có',
    hang_muc_sua_trong_ngay: 'Vệ sinh lưới lọc điều hòa phòng lớn',
    dao_tao: 'Hướng dẫn quy trình bật tắt điện tiết kiệm cuối ca',
    doi_ngoai: 'Tổ dân phố không có phản ánh',
  };

  return base;
};
