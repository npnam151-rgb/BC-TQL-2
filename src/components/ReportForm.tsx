import React, { useState, useEffect, useRef } from 'react';
import {
  STORES,
  StoreCode,
  SYSTEM_REPORT_GROUP,
  STORE_REPORT_GROUPS,
  SYSTEM_COLUMNS,
  TQLReportData,
  createEmptyStoreValues,
  getRandomReportData,
  getSystemTime,
} from '../types';
import {
  Calendar,
  Clock,
  User,
  Building2,
  TrendingUp,
  Dices,
  RotateCcw,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Store,
} from 'lucide-react';

interface ReportFormProps {
  data: TQLReportData;
  onChange: (data: TQLReportData) => void;
}

export function ReportForm({ data, onChange }: ReportFormProps) {
  // Which store is currently active in the form tabs
  const [activeStore, setActiveStore] = useState<StoreCode>('01 DD');
  // Expand/collapse state for system evaluation card
  const [collapsedSystem, setCollapsedSystem] = useState<boolean>(false);
  // Expand/collapse state for categories
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const categoriesTopRef = useRef<HTMLDivElement>(null);

  // Keep sendTime updated with system time automatically
  useEffect(() => {
    const updateTime = () => {
      const nowTime = getSystemTime();
      if (data.sendTime !== nowTime) {
        onChange({
          ...data,
          sendTime: nowTime,
        });
      }
    };

    // Update initially and every 30 seconds
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, [data, onChange]);

  const toggleGroup = (key: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSystemFieldChange = (fieldId: string, value: string) => {
    onChange({
      ...data,
      systemEvaluation: {
        ...(data.systemEvaluation || {}),
        [fieldId]: value,
      },
    });
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    const currentStoreValues = data.stores[activeStore] || createEmptyStoreValues();
    const updatedStoreValues = {
      ...currentStoreValues,
      [fieldId]: value,
    };

    onChange({
      ...data,
      stores: {
        ...data.stores,
        [activeStore]: updatedStoreValues,
      },
    });
  };

  const handleLoadSample = () => {
    const randomSample = getRandomReportData();
    onChange(randomSample);
    setActiveStore('01 DD');
  };

  const handleClearCurrentStore = () => {
    const storeInfo = STORES.find((s) => s.code === activeStore);
    if (confirm(`Bạn có chắc muốn xóa toàn bộ nội dung đã nhập của cơ sở ${activeStore} (${storeInfo?.name})?`)) {
      onChange({
        ...data,
        stores: {
          ...data.stores,
          [activeStore]: createEmptyStoreValues(),
        },
      });
    }
  };

  // Count filled fields for a given store (25 fields)
  const getFilledCount = (code: StoreCode) => {
    const storeVals = data.stores[code];
    if (!storeVals) return 0;
    return Object.values(storeVals).filter((v) => typeof v === 'string' && v.trim().length > 0).length;
  };

  const totalSystemFields = SYSTEM_COLUMNS.length + 1;
  const filledSystemCount =
    SYSTEM_COLUMNS.filter((col) => Boolean(data.systemEvaluation?.[col.id]?.trim())).length +
    (Boolean(data.systemEvaluation?.y_kien_khac?.trim()) ? 1 : 0);

  const currentStoreValues = data.stores[activeStore] || createEmptyStoreValues();

  const currentStoreIndex = STORES.findIndex((s) => s.code === activeStore);

  const handleSwitchStore = (newStore: StoreCode, shouldScrollTop = false) => {
    setActiveStore(newStore);
    if (shouldScrollTop && categoriesTopRef.current) {
      categoriesTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Total stores with data entered
  const totalStoresWithData = STORES.filter((s) => getFilledCount(s.code) > 0).length;

  return (
    <div className="space-y-6">
      {/* Top Header Card: Thông tin chung */}
      <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Thông tin báo cáo chung
              </h2>
              <p className="text-xs text-slate-500">
                Báo cáo kiểm tra tổng quản lý (TQL) toàn bộ 6 cơ sở
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors shadow-2xs"
            >
              <Dices className="w-4 h-4 text-indigo-600" />
              Nạp ngẫu nhiên (Random)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Thời gian gửi (Tự động theo hệ thống) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              Thời gian gửi
            </label>
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 font-bold">
              <span className="text-indigo-950 text-base">{data.sendTime || getSystemTime()}</span>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Giờ hệ thống
              </span>
            </div>
          </div>

          {/* Ngày */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              Ngày báo cáo
            </label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => onChange({ ...data, date: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-slate-800"
            />
          </div>

          {/* Người báo cáo */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              Người báo cáo (TQL)
            </label>
            <input
              type="text"
              value={data.reporter}
              placeholder="Họ tên người báo cáo..."
              onChange={(e) => onChange({ ...data, reporter: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-slate-800"
            />
          </div>
        </div>

        {/* Phạm vi đi tất cả các điểm */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Store className="w-4 h-4 text-indigo-600" />
            <span>Phạm vi: <strong className="text-slate-800">Đi kiểm tra toàn bộ 6 cơ sở</strong></span>
          </div>
          <div className="text-slate-500">
            Tiến độ: <strong className="text-indigo-700">{totalStoresWithData}/6 cơ sở</strong> đã có nội dung
          </div>
        </div>
      </div>

      {/* KHUNG ĐÁNH GIÁ CHUNG TOÀN CHUỖI (Nhập 1 lần duy nhất, gộp ô 6 cơ sở trên ảnh) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div
          onClick={() => setCollapsedSystem(!collapsedSystem)}
          className="w-full px-5 py-3.5 bg-gradient-to-r from-slate-50 to-indigo-50/40 hover:bg-slate-100 flex items-center justify-between border-b border-slate-200 cursor-pointer transition-colors select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-100 text-indigo-800 rounded-md">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                ĐÁNH GIÁ CHUNG TOÀN CHUỖI
              </span>
              <span className="ml-2 text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Số liệu toàn hệ thống • Nhập 1 lần (gộp ô 6 cơ sở)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-semibold">
              {filledSystemCount}/{SYSTEM_COLUMNS.length} chỉ số
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              {collapsedSystem ? 'Mở rộng' : 'Thu gọn'}
            </span>
            {collapsedSystem ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </div>

        {!collapsedSystem && (
          <div className="p-4 sm:p-5">
            <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              💡 <strong>Phương án 1:</strong> Các chỉ số bên dưới là số liệu chung của toàn hệ thống (6 quán). Bạn chỉ cần nhập 1 lần tại đây; trên ảnh báo cáo hệ thống sẽ tự động gộp ô xuyên suốt 6 dòng cơ sở, và khi xuất Google Sheets sẽ chỉ lưu ở dòng đầu tiên để không bị cộng dồn sai lệch doanh thu.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SYSTEM_COLUMNS.map((col) => {
                const value = data.systemEvaluation?.[col.id] || '';
                return (
                  <div key={col.id}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                        {col.header}
                        {value && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                        )}
                      </label>
                    </div>
                    <input
                      type="text"
                      value={value}
                      placeholder={col.placeholder || col.header}
                      onChange={(e) => handleSystemFieldChange(col.id, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-slate-800 transition-colors"
                    />
                    {col.example && (
                      <p className="text-[11px] text-slate-400 mt-1 italic">
                        Ví dụ: {col.example}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mục Ý KIẾN KHÁC (Chung toàn chuỗi, không riêng cơ sở nào) */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="uppercase text-indigo-900 tracking-wider">Ý KIẾN KHÁC:</span>
                  {data.systemEvaluation?.y_kien_khac && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                  )}
                </label>
                <span className="text-[11px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 self-start sm:self-auto font-medium">
                  Thuộc phần Chung toàn chuỗi • Gộp ô xuyên suốt 6 cơ sở ở cuối bảng
                </span>
              </div>
              <textarea
                rows={2}
                value={data.systemEvaluation?.y_kien_khac || ''}
                placeholder="Nhập nhận xét, kiến nghị, giải pháp hoặc ý kiến khác cho toàn hệ thống..."
                onChange={(e) => handleSystemFieldChange('y_kien_khac', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-slate-800 transition-colors placeholder:text-slate-400"
              />
              <p className="text-[11px] text-slate-400 mt-1 italic">
                Ví dụ: Toàn chuỗi vận hành ổn định trong khung giờ cao điểm. Đề xuất tuần tới bổ sung thêm 200 cốc bia chuẩn cho 94 LĐ và 98 VTP.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* TOP Store Selector Tabs */}
      <div ref={categoriesTopRef} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Chọn cơ sở để nhập báo cáo ({currentStoreIndex + 1}/6):
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              TQL đi tất cả các điểm. Bấm vào từng cơ sở bên dưới để điền nội dung kiểm tra.
            </p>
          </div>
          {getFilledCount(activeStore) > 0 && (
            <button
              type="button"
              onClick={handleClearCurrentStore}
              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium self-start sm:self-auto px-2 py-1 hover:bg-rose-50 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Xóa dữ liệu {activeStore}
            </button>
          )}
        </div>

        {/* 6 Store Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {STORES.map((s) => {
            const count = getFilledCount(s.code);
            const isActive = activeStore === s.code;

            return (
              <button
                key={s.code}
                type="button"
                onClick={() => handleSwitchStore(s.code, false)}
                className={`relative p-3 rounded-lg border text-left transition-all ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-extrabold text-sm ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {s.code}
                  </span>
                  {count > 0 ? (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                      {count}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-300">0</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-1">
                  {s.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notice Banner of Active Store */}
      <div className="bg-indigo-50/80 border-l-4 border-indigo-600 px-4 py-3 rounded-r-lg flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600">Đang nhập dữ liệu cho cơ sở:</span>
          <span className="text-sm font-extrabold text-indigo-950 bg-white px-3 py-1 rounded-md border border-indigo-200 shadow-2xs">
            {activeStore} - {STORES.find((s) => s.code === activeStore)?.name}
          </span>
        </div>
        <span className="text-xs text-slate-600">
          Đã điền: <strong className="text-indigo-900">{getFilledCount(activeStore)}/25</strong> hạng mục
        </span>
      </div>

      {/* The 7 Store Inspection Categories */}
      <div className="space-y-4">
        {STORE_REPORT_GROUPS.map((group) => {
          const isCollapsed = collapsedGroups[group.key];
          const groupFilledCount = group.columns.filter(
            (c) => currentStoreValues[c.id] && currentStoreValues[c.id].trim().length > 0
          ).length;

          return (
            <div
              key={group.key}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Category Header */}
              <div
                onClick={() => toggleGroup(group.key)}
                className="w-full px-5 py-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between border-b border-slate-200 cursor-pointer transition-colors select-none"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-sm uppercase tracking-wider text-slate-800">
                    {group.title}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                    {groupFilledCount}/{group.columns.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {isCollapsed ? 'Mở rộng' : 'Thu gọn'}
                  </span>
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Category Fields */}
              {!isCollapsed && (
                <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.columns.map((col) => {
                    const value = currentStoreValues[col.id] || '';
                    const isShortInput =
                      col.id.startsWith('tong_ns') ||
                      col.id.startsWith('ns_nghi') ||
                      col.id.startsWith('ns_moi') ||
                      col.id.startsWith('ns_ho_tro');

                    return (
                      <div
                        key={col.id}
                        className={
                          group.columns.length === 1
                            ? 'md:col-span-2'
                            : ''
                        }
                      >
                        <div className="flex items-baseline justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                            {col.header}
                            {value && (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
                            )}
                          </label>
                        </div>

                        {isShortInput ? (
                          <input
                            type="text"
                            value={value}
                            placeholder={col.placeholder || col.header}
                            onChange={(e) => handleFieldChange(col.id, e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-slate-800 transition-colors"
                          />
                        ) : (
                          <textarea
                            rows={2}
                            value={value}
                            placeholder={col.placeholder || col.header}
                            onChange={(e) => handleFieldChange(col.id, e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-slate-800 resize-y transition-colors min-h-[58px]"
                          />
                        )}

                        {col.example && (
                          <p className="text-[11px] text-slate-400 mt-1 italic">
                            Gợi ý: {col.example}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BOTTOM Store Selector - Per User Request */}
      <div className="bg-white p-5 rounded-xl shadow-md border-2 border-indigo-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-indigo-900 flex items-center gap-2">
              <Store className="w-4 h-4 text-indigo-600" />
              Chọn cơ sở (Đang ở: {activeStore} - {STORES.find(s => s.code === activeStore)?.name})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bấm vào cơ sở bạn muốn chuyển đến để tiếp tục báo cáo.
            </p>
          </div>
          <button
            type="button"
            onClick={() => categoriesTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-700 font-medium px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 rounded-lg transition-colors self-start sm:self-auto"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Lên đầu mục
          </button>
        </div>

        {/* 6 Store Pills at Bottom */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {STORES.map((s) => {
            const count = getFilledCount(s.code);
            const isActive = activeStore === s.code;

            return (
              <button
                key={s.code}
                type="button"
                onClick={() => handleSwitchStore(s.code, true)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-sm ring-2 ring-indigo-300'
                    : 'border-slate-200 hover:border-indigo-300 bg-slate-50 hover:bg-white text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{s.code}</span>
                  {count > 0 && (
                    <span
                      className={`px-1.5 py-0.2 text-[9px] font-bold rounded-full ${
                        isActive
                          ? 'bg-white text-indigo-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </div>
                <div
                  className={`text-[10px] truncate mt-0.5 ${
                    isActive ? 'text-indigo-100' : 'text-slate-500'
                  }`}
                >
                  {s.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
