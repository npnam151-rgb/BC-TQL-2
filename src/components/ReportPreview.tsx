import React, { forwardRef } from 'react';
import {
  STORES,
  SYSTEM_COLUMNS,
  STORE_REPORT_GROUPS,
  TQLReportData,
  StoreReportValues,
} from '../types';
import { format } from 'date-fns';

interface ReportPreviewProps {
  data: TQLReportData;
  showAllStores?: boolean;
}

export const ReportPreview = forwardRef<HTMLDivElement, ReportPreviewProps>(
  ({ data, showAllStores = true }, ref) => {
    const formattedDate = data.date
      ? (() => {
          try {
            return format(new Date(data.date), 'dd/MM/yyyy');
          } catch {
            return data.date;
          }
        })()
      : '';

    // Render 6 stores
    const storesToRender = showAllStores
      ? STORES
      : STORES.filter((store) => {
          const storeVals = data.stores[store.code];
          if (!storeVals) return false;
          return Object.values(storeVals).some(
            (v) => typeof v === 'string' && v.trim().length > 0
          );
        });

    const isHighlightRow = (colId: string) => {
      return (
        colId === 'vd_phat_sinh' ||
        colId === 'vd_phat_sinh_bia' ||
        colId === 'vd_phat_sinh_mon' ||
        colId === 'ns_nghi_dot_xuat' ||
        colId === 'ns_nghi_han' ||
        colId === 'hong_hoc_can_sua'
      );
    };

    return (
      <div
        ref={ref}
        id="report-preview-sheet"
        className="bg-white text-slate-900 p-6 sm:p-7 shadow-lg select-text border border-slate-300 inline-block w-[1160px] min-w-[1160px] box-border"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Title & Metadata Top Banner */}
        <div className="mb-5 pb-4 border-b-2 border-indigo-900 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              BÁO CÁO TỔNG QUẢN LÝ (TQL)
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Kiểm tra &amp; Giám sát vận hành toàn bộ hệ thống 6 cơ sở
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 font-medium">Thời gian gửi: </span>
              <span className="font-bold text-slate-900">{data.sendTime || '...'}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Ngày: </span>
              <span className="font-bold text-slate-900">{formattedDate || '...'}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Người báo cáo: </span>
              <span className="font-bold text-indigo-900">{data.reporter || 'Chưa nhập'}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Phạm vi: </span>
              <span className="font-bold text-emerald-700">6 cơ sở</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: ĐÁNH GIÁ CHUNG TOÀN CHUỖI */}
        <div className="mb-6">
          <div className="bg-slate-900 text-white px-3.5 py-2 font-bold text-xs uppercase tracking-wider rounded-t-lg flex items-center justify-between">
            <span>I. Đánh giá chung toàn chuỗi</span>
            <span className="text-[11px] font-normal text-slate-300">
              Tổng hợp chỉ số doanh thu &amp; lượt khách
            </span>
          </div>

          <div className="border-x border-b border-slate-300 rounded-b-lg overflow-hidden bg-white">
            <table className="w-full table-fixed border-collapse text-center text-xs">
              <colgroup>
                {SYSTEM_COLUMNS.map((col) => (
                  <col key={col.id} className="w-[14.28%]" />
                ))}
              </colgroup>
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 divide-x divide-slate-300">
                  {SYSTEM_COLUMNS.map((col) => (
                    <th key={col.id} className="p-2.5 leading-snug">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-slate-300 text-[13px] bg-white">
                  {SYSTEM_COLUMNS.map((col) => {
                    const val = data.systemEvaluation?.[col.id] || '';
                    return (
                      <td key={col.id} className="p-3 font-bold text-slate-900 align-middle break-words">
                        {val ? (
                          <span className="text-indigo-950">{val}</span>
                        ) : (
                          <span className="text-slate-300 font-normal select-none">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: BẢNG MA TRẬN CHUYỂN VỊ - ĐỐI CHIẾU 6 CƠ SỞ */}
        <div className="mb-6">
          <div className="bg-indigo-900 text-white px-3.5 py-2 font-bold text-xs uppercase tracking-wider rounded-t-lg flex items-center justify-between">
            <span>II. Chi tiết nghiệp vụ từng cơ sở (Bảng ma trận đối chiếu)</span>
            <span className="text-[11px] font-normal text-indigo-200">
              So sánh 6 điểm bán theo từng tiêu chí
            </span>
          </div>

          <div className="border-x border-b border-slate-400 rounded-b-lg overflow-hidden bg-white shadow-2xs">
            <table className="w-full table-fixed border-collapse text-left text-[12px]">
              <colgroup>
                <col className="w-[25%]" />
                <col className="w-[12.5%]" />
                <col className="w-[12.5%]" />
                <col className="w-[12.5%]" />
                <col className="w-[12.5%]" />
                <col className="w-[12.5%]" />
                <col className="w-[12.5%]" />
              </colgroup>
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-400 divide-x divide-slate-300 text-slate-900">
                  {/* Cột 1: Hạng mục kiểm tra */}
                  <th className="p-3 font-extrabold uppercase text-xs tracking-wider bg-slate-200/90 text-slate-800 align-middle">
                    Hạng mục kiểm tra
                  </th>

                  {/* 6 Cột Cơ sở */}
                  {storesToRender.map((store) => (
                    <th
                      key={store.code}
                      className="p-2.5 text-center align-middle bg-slate-100"
                    >
                      <div className="text-sm font-black text-indigo-950 tracking-tight">
                        {store.code}
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 mt-0.5 leading-snug">
                        {store.name.replace(/^\d+\s+/, '')}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-300">
                {STORE_REPORT_GROUPS.map((group, groupIndex) => {
                  // Themed group header colors for visual clarity
                  const groupTheme = (() => {
                    switch (group.key) {
                      case 'phuc_vu':
                        return {
                          bg: 'bg-sky-100/80 text-sky-950 border-sky-300',
                          badge: 'bg-sky-600',
                        };
                      case 'nhan_su':
                        return {
                          bg: 'bg-violet-100/80 text-violet-950 border-violet-300',
                          badge: 'bg-violet-600',
                        };
                      case 'bia':
                        return {
                          bg: 'bg-amber-100/80 text-amber-950 border-amber-300',
                          badge: 'bg-amber-600',
                        };
                      case 'mon_an':
                        return {
                          bg: 'bg-emerald-100/80 text-emerald-950 border-emerald-300',
                          badge: 'bg-emerald-600',
                        };
                      case 'sua_chua':
                        return {
                          bg: 'bg-slate-200/80 text-slate-900 border-slate-400',
                          badge: 'bg-slate-700',
                        };
                      case 'dao_tao':
                        return {
                          bg: 'bg-teal-100/80 text-teal-950 border-teal-300',
                          badge: 'bg-teal-600',
                        };
                      case 'doi_ngoai':
                        return {
                          bg: 'bg-rose-100/80 text-rose-950 border-rose-300',
                          badge: 'bg-rose-600',
                        };
                      default:
                        return {
                          bg: 'bg-slate-100 text-slate-900 border-slate-300',
                          badge: 'bg-slate-600',
                        };
                    }
                  })();

                  return (
                    <React.Fragment key={group.key}>
                      {/* Section Header Row */}
                      <tr className={`${groupTheme.bg} border-t-2 border-b font-bold divide-x divide-slate-300`}>
                        <td
                          colSpan={storesToRender.length + 1}
                          className="px-3 py-1.5 font-bold uppercase tracking-wider text-[11.5px]"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${groupTheme.badge}`} />
                            <span>
                              {groupIndex + 1}. {group.title}
                            </span>
                          </div>
                        </td>
                      </tr>

                      {/* Criterion Rows inside this Group */}
                      {group.columns.map((col, colIdx) => {
                        const isIssueCol = isHighlightRow(col.id);

                        return (
                          <tr
                            key={col.id}
                            className={`divide-x divide-slate-300 hover:bg-slate-50/60 transition-colors ${
                              colIdx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                            }`}
                          >
                            {/* Column 1: Criterion Name */}
                            <td className="p-2.5 font-semibold text-slate-800 text-[11.5px] align-top bg-slate-50/60 break-words">
                              <span className={isIssueCol ? 'text-amber-950 font-bold' : ''}>
                                {col.header}
                              </span>
                            </td>

                            {/* Store Values */}
                            {storesToRender.map((store) => {
                              const storeVals: StoreReportValues = data.stores[store.code] || {};
                              const cellValue = (storeVals[col.id] || '').trim();
                              const hasValue = cellValue.length > 0;

                              return (
                                <td
                                  key={store.code}
                                  className={`p-2.5 align-top text-[11.5px] leading-relaxed break-words whitespace-pre-wrap ${
                                    isIssueCol && hasValue && cellValue !== 'Không có'
                                      ? 'bg-amber-50/90 text-amber-950 font-semibold border-l-2 border-l-amber-400'
                                      : 'text-slate-800'
                                  }`}
                                >
                                  {hasValue ? (
                                    <span>{cellValue}</span>
                                  ) : (
                                    <span className="text-slate-300 select-none font-normal">—</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: Ý KIẾN KHÁC & ĐỀ XUẤT TOÀN HỆ THỐNG */}
        <div className="mb-4">
          <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
            <div className="bg-slate-100 px-3.5 py-2 font-bold text-xs text-slate-800 border-b border-slate-300 uppercase tracking-wide flex items-center justify-between">
              <span>III. Ý kiến khác &amp; Đề xuất chung</span>
              <span className="text-[11px] font-normal text-slate-500">Toàn hệ thống</span>
            </div>
            <div className="p-3 text-xs leading-relaxed text-slate-800 min-h-[48px] whitespace-pre-wrap">
              {data.systemEvaluation?.y_kien_khac ? (
                <p className="font-normal">{data.systemEvaluation.y_kien_khac}</p>
              ) : (
                <p className="text-slate-400 italic">Không có ý kiến phát sinh.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div>
            <span>* Mẫu bảng tổng hợp báo cáo TQL theo chuẩn ma trận chuyển vị 6 cơ sở.</span>
          </div>
          <div className="text-right font-medium">
            <span>
              Thời gian xuất: {formattedDate} — {data.sendTime}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ReportPreview.displayName = 'ReportPreview';
