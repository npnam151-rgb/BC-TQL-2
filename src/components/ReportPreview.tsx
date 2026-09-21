import React, { forwardRef } from 'react';
import {
  STORES,
  SYSTEM_REPORT_GROUP,
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

    // Render all 6 stores (TQL inspects all points)
    const storesToRender = showAllStores
      ? STORES
      : STORES.filter((store) => {
          const storeVals = data.stores[store.code];
          if (!storeVals) return false;
          return Object.values(storeVals).some((v) => typeof v === 'string' && v.trim().length > 0);
        });

    return (
      <div
        ref={ref}
        id="report-preview-sheet"
        className="bg-white text-slate-900 p-6 shadow-md select-text inline-block min-w-max"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Title & Metadata Top Banner */}
        <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-3">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
              BÁO CÁO TỔNG QUẢN LÝ (TQL)
            </h1>
            <span className="text-xs text-slate-500 font-medium">
              Kiểm tra toàn bộ hệ thống 6 cơ sở
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="text-slate-500">Thời gian gửi: </span>
              <span className="font-semibold text-slate-800">{data.sendTime || '...'}</span>
            </div>
            <div>
              <span className="text-slate-500">Ngày: </span>
              <span className="font-semibold text-slate-800">{formattedDate || '...'}</span>
            </div>
            <div>
              <span className="text-slate-500">Người báo cáo: </span>
              <span className="font-semibold text-slate-800">{data.reporter || 'Chưa nhập'}</span>
            </div>
            <div>
              <span className="text-slate-500">Phạm vi: </span>
              <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Tất cả 6 điểm
              </span>
            </div>
          </div>
        </div>

        {/* The Exact Spreadsheet Table from User Image */}
        <div className="border border-slate-400 bg-white">
          <table
            className="border-collapse text-left text-[12px] leading-tight"
            style={{ borderSpacing: 0 }}
          >
            <thead>
              {/* Header Row 1: Top categories */}
              <tr className="bg-slate-100 text-slate-900 font-bold divide-x divide-slate-400 border-b border-slate-400">
                <th
                  rowSpan={2}
                  className="p-2 border-r border-slate-400 text-center font-bold align-middle w-[90px] min-w-[90px]"
                >
                  Thời gian gửi
                </th>
                <th
                  rowSpan={2}
                  className="p-2 border-r border-slate-400 text-center font-bold align-middle w-[95px] min-w-[95px]"
                >
                  Ngày
                </th>
                <th
                  rowSpan={2}
                  className="p-2 border-r border-slate-400 text-center font-bold align-middle w-[120px] min-w-[120px]"
                >
                  Người báo cáo
                </th>
                {/* 1. Đánh giá chung toàn chuỗi (7 cột con) */}
                <th
                  colSpan={SYSTEM_COLUMNS.length}
                  className="p-2 text-center font-extrabold uppercase border-r border-slate-400 tracking-wider bg-slate-100 align-middle"
                >
                  {SYSTEM_REPORT_GROUP.title}
                </th>

                {/* 2. CH lv chính (Đưa về SAU Đánh giá chung toàn chuỗi theo yêu cầu) */}
                <th
                  rowSpan={2}
                  className="p-2 border-r border-slate-400 text-center font-bold align-middle w-[85px] min-w-[85px]"
                >
                  CH lv chính
                </th>

                {/* 3. Nhóm nghiệp vụ từng cơ sở */}
                {STORE_REPORT_GROUPS.map((group) => {
                  const isSingleColGroup =
                    group.key === 'dao_tao' || group.key === 'doi_ngoai';

                  return (
                    <th
                      key={group.key}
                      colSpan={isSingleColGroup ? 1 : group.columns.length}
                      rowSpan={isSingleColGroup ? 2 : 1}
                      className="p-2 text-center font-extrabold uppercase border-r border-slate-400 tracking-wider bg-slate-100 align-middle"
                    >
                      {group.title}
                    </th>
                  );
                })}

                {/* 4. Cột Ý KIẾN KHÁC: Thuộc phần Chung toàn chuỗi, đặt ở cuối bảng theo mẫu, rowSpan=2 */}
                <th
                  rowSpan={2}
                  className="p-2 text-center font-extrabold uppercase border-r border-slate-400 tracking-wider bg-slate-100 align-middle min-w-[140px] max-w-[220px]"
                >
                  Ý KIẾN KHÁC
                </th>
              </tr>

              {/* Header Row 2: Sub-columns */}
              <tr className="bg-slate-50 text-slate-800 text-[11px] font-semibold divide-x divide-slate-400 border-b border-slate-400">
                {/* 7 Cột con của Đánh giá chung toàn chuỗi */}
                {SYSTEM_COLUMNS.map((col) => (
                  <th
                    key={col.id}
                    className="p-2 border-r border-slate-400 align-top font-semibold leading-snug break-words min-w-[95px] max-w-[125px] text-center"
                  >
                    {col.header}
                  </th>
                ))}

                {/* Cột con của các nhóm cơ sở */}
                {STORE_REPORT_GROUPS.map((group) => {
                  if (group.key === 'dao_tao' || group.key === 'doi_ngoai') {
                    return null;
                  }

                  return group.columns.map((col) => (
                    <th
                      key={col.id}
                      className="p-2 border-r border-slate-400 align-top font-semibold leading-snug break-words min-w-[110px] max-w-[150px] text-left"
                    >
                      {col.header}
                    </th>
                  ));
                })}
              </tr>
            </thead>

            {/* Data Rows for Stores */}
            <tbody className="divide-y divide-slate-400">
              {storesToRender.map((store, idx) => {
                const storeVals: StoreReportValues =
                  data.stores[store.code] || {};

                return (
                  <tr
                    key={store.code}
                    className={`divide-x divide-slate-400 transition-colors ${
                      idx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                    }`}
                  >
                    {/* Column 1: Thời gian gửi (Rowspan merged for all rows) */}
                    {idx === 0 && (
                      <td
                        rowSpan={storesToRender.length}
                        className="p-2 text-center align-middle border-r border-slate-400 text-slate-800 font-semibold bg-white"
                      >
                        {data.sendTime}
                      </td>
                    )}

                    {/* Column 2: Ngày (Rowspan merged for all rows) */}
                    {idx === 0 && (
                      <td
                        rowSpan={storesToRender.length}
                        className="p-2 text-center align-middle border-r border-slate-400 text-slate-800 font-semibold bg-white"
                      >
                        {formattedDate}
                      </td>
                    )}

                    {/* Column 3: Người báo cáo (Rowspan merged for all rows) */}
                    {idx === 0 && (
                      <td
                        rowSpan={storesToRender.length}
                        className="p-2 text-center align-middle border-r border-slate-400 text-slate-900 font-bold bg-white"
                      >
                        {data.reporter || '—'}
                      </td>
                    )}

                    {/* 7 Cột ĐÁNH GIÁ CHUNG TOÀN CHUỖI: Gộp ô (rowSpan = 6) xuyên suốt toàn bộ 6 cơ sở, đặt TRƯỚC CH lv chính */}
                    {idx === 0 &&
                      SYSTEM_COLUMNS.map((col) => {
                        const sysValue =
                          data.systemEvaluation?.[col.id] ||
                          storeVals[col.id] ||
                          '';
                        return (
                          <td
                            key={col.id}
                            rowSpan={storesToRender.length}
                            className="p-2.5 text-center align-middle border-r border-slate-400 text-slate-900 text-[11px] leading-relaxed break-words font-semibold bg-white min-w-[95px] max-w-[125px]"
                          >
                            {sysValue ? (
                              <span className="font-bold text-slate-900">{sysValue}</span>
                            ) : (
                              <span className="text-slate-300 select-none">—</span>
                            )}
                          </td>
                        );
                      })}

                    {/* CH lv chính (Đưa về SAU Đánh giá chung toàn chuỗi - mỗi dòng là một cơ sở) */}
                    <td className="p-2 text-center align-middle border-r border-slate-400 font-extrabold text-slate-900 bg-slate-50/60">
                      <span className="text-[12px]">{store.code}</span>
                    </td>

                    {/* 25 Cột Nghiệp Vụ Từng Cơ Sở (Phục vụ, Nhân sự, Bia, Món ăn, Sửa chữa, Đào tạo, Đối ngoại) */}
                    {STORE_REPORT_GROUPS.map((group) => {
                      return group.columns.map((col) => {
                        const cellValue = storeVals[col.id] || '';
                        return (
                          <td
                            key={col.id}
                            className="p-2 align-top border-r border-slate-400 text-slate-800 text-[11px] leading-relaxed break-words whitespace-pre-wrap min-w-[110px] max-w-[160px]"
                          >
                            {cellValue ? (
                              <span>{cellValue}</span>
                            ) : (
                              <span className="text-slate-300 select-none"></span>
                            )}
                          </td>
                        );
                      });
                    })}

                    {/* Cột Ý KIẾN KHÁC: Thuộc phần Chung toàn chuỗi (không riêng cơ sở nào), gộp ô (rowSpan = 6) dọc xuyên suốt 6 cơ sở */}
                    {idx === 0 && (
                      <td
                        rowSpan={storesToRender.length}
                        className="p-2.5 align-top border-r border-slate-400 text-slate-900 text-[11px] leading-relaxed break-words whitespace-pre-wrap bg-white min-w-[140px] max-w-[220px]"
                      >
                        {data.systemEvaluation?.y_kien_khac ? (
                          <span className="font-normal text-slate-800">{data.systemEvaluation.y_kien_khac}</span>
                        ) : (
                          <span className="text-slate-300 select-none">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info note */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <div>
            <span>* Mẫu bảng tổng hợp báo cáo TQL theo chuẩn hệ thống nhà hàng - bia (6 cơ sở).</span>
          </div>
          <div className="text-right">
            <span>Thời gian xuất báo cáo: {formattedDate} - {data.sendTime}</span>
          </div>
        </div>
      </div>
    );
  }
);

ReportPreview.displayName = 'ReportPreview';
