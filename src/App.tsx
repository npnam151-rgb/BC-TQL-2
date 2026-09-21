import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import {
  Download,
  CheckCircle2,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Table,
  FileCode,
  Copy,
  Check,
  Edit3,
  X,
} from 'lucide-react';
import { ReportForm } from './components/ReportForm';
import { ReportPreview } from './components/ReportPreview';
import {
  TQLReportData,
  createInitialReportData,
  STORES,
  SYSTEM_COLUMNS,
  STORE_COLUMNS,
  ALL_COLUMNS,
  getSystemTime,
} from './types';

// Web App URL của Google Apps Script
const GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxWKIm74psex5-61MTbeSZKTyA5_K8GBE2MzZ3iOcn7bu1ekM7NqvGXDOJLmz88iDGQ/exec';

export default function App() {
  const [reportData, setReportData] = useState<TQLReportData>(createInitialReportData());
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [sheetStatus, setSheetStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [showAllStores, setShowAllStores] = useState(true);
  const [zoomScale, setZoomScale] = useState(0.55); // Default scale for nice preview fit

  // Target sheet name: default 'Sheet17' per user request, configurable for future rename
  const [targetSheetName, setTargetSheetName] = useState<string>(() => {
    return localStorage.getItem('tql_sheet_target') || 'Sheet17';
  });
  const [isEditingSheetName, setIsEditingSheetName] = useState(false);
  const [tempSheetName, setTempSheetName] = useState(targetSheetName);

  // Script modal state
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('tql_sheet_target', targetSheetName);
  }, [targetSheetName]);

  const saveToGoogleSheets = async (data: TQLReportData) => {
    if (!GOOGLE_SHEET_WEBHOOK_URL) {
      console.log('Chưa cấu hình Google Sheets Webhook URL. Bỏ qua bước lưu dữ liệu.');
      return false;
    }

    // Build storesList for 6 stores with values in the exact format:
    // 7 Cột Đánh giá chung toàn chuỗi (chỉ hàng 01 DD có giá trị, các hàng sau để "")
    // CH lv chính (từng cơ sở: 01 DD, 03 NVH, ...)
    // 25 Cột kiểm tra nghiệp vụ cơ sở
    const storesList = STORES.map((s, idx) => {
      const storeVals = data.stores[s.code] || {};
      const sysVals = data.systemEvaluation || {};

      const systemValues = SYSTEM_COLUMNS.map((col) => {
        if (idx === 0) {
          return String(sysVals[col.id] ?? storeVals[col.id] ?? '');
        }
        return '';
      });

      const storeValues = STORE_COLUMNS.map((col) => {
        return String(storeVals[col.id] || '');
      });

      return {
        storeCode: s.code,
        storeName: s.name,
        systemValues: systemValues,
        storeValues: storeValues,
        // Combined values array: 7 system cols + 25 store cols
        values: [...systemValues, ...storeValues],
      };
    });

    const payload = {
      sheetName: targetSheetName || 'Sheet17',
      date: String(data.date || ''),
      time: String(data.sendTime || getSystemTime()),
      reporter: String(data.reporter || ''),
      location: 'Toàn hệ thống (6 cơ sở)',
      systemEvaluation: data.systemEvaluation,
      storesList: storesList,
      stores: data.stores,
    };

    try {
      setSheetStatus('saving');

      // Timeout promise to avoid infinite hang
      const fetchPromise = fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 8000)
      );

      await Promise.race([fetchPromise, timeoutPromise]);

      console.log('Đã gửi dữ liệu lên Google Sheets vào sheet:', targetSheetName);
      setSheetStatus('success');
      return true;
    } catch (error) {
      console.error('Lỗi khi lưu vào Google Sheets:', error);
      setSheetStatus('error');
      return false;
    }
  };

  const handleExportImage = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    setExportSuccess(false);
    setSheetStatus('idle');

    // Always ensure current system time before export
    const currentSendTime = getSystemTime();
    const latestData = {
      ...reportData,
      sendTime: currentSendTime,
    };
    setReportData(latestData);

    try {
      // 1. Lưu dữ liệu lên Google Sheets vào Sheet17
      await saveToGoogleSheets(latestData);

      // Đợi UI cập nhật trạng thái
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 2. Xuất ảnh chất lượng cao
      const dataUrl = await toPng(previewRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const dateStr = latestData.date || new Date().toISOString().split('T')[0];
      const fileName = `BaoCao_TQL_HeThong6CoSo_${dateStr}.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    } catch (err) {
      console.error('Failed to export image', err);
      // Fallback: Thử xuất ảnh trực tiếp nếu sheet bị lỗi/timeout
      try {
        const dataUrl = await toPng(previewRef.current, {
          quality: 0.98,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });
        const dateStr = latestData.date || new Date().toISOString().split('T')[0];
        const fileName = `BaoCao_TQL_HeThong6CoSo_${dateStr}.png`;
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
        setExportSuccess(true);
      } catch (innerErr) {
        alert('Có lỗi xảy ra khi xuất ảnh. Vui lòng thử lại.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  const fullAppsScriptCode = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Lấy tên sheet từ app gửi lên (mặc định "Sheet17", sau này đổi tên sheet thành "BC TQL" hoặc tên khác vẫn nhận)
    var sheetName = data.sheetName || "Sheet17"; 
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": "Không tìm thấy sheet có tên '" + sheetName + "'"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var row = [];

    // XỬ LÝ THEO TỪNG LOẠI BẢNG
    if (sheetName === "BC CX") {
      // 1. TẠO TIÊU ĐỀ NẾU BẢNG TRỐNG
      if (sheet.getLastRow() === 0) {
        var headers = ["Thời gian gửi", "Cơ sở", "Ngày", "Người báo cáo", "Tổng điểm"];
        if (data.items && data.items.length > 0) {
          data.items.forEach(function(item) {
            headers.push(item.title + " (Đánh giá)");
            headers.push(item.title + " (Ghi chú)");
          });
        }
        sheet.appendRow(headers);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f4f6");
        sheet.setFrozenRows(1);
      }
      
      // 2. GHI DỮ LIỆU CỦA báo cáo CX
      row.push(new Date(), data.location, data.date, data.reporter, data.totalScore);
      if (data.items && data.items.length > 0) {
        data.items.forEach(function(item) {
          row.push(item.value); 
          row.push(item.notes);
        });
      }
    } 
    else if (sheetName === "BC Bar" || sheetName === "BC Bar 1") {
      // 1. TẠO TIÊU ĐỀ NẾU BẢNG TRỐNG
      if (sheet.getLastRow() === 0) {
        var headersBar = ["Thời gian gửi", "Cơ sở", "Ngày", "Người báo cáo"];
        if (data.items && data.items.length > 0) {
          data.items.forEach(function(item) {
            headersBar.push(item.title);
          });
        }
        sheet.appendRow(headersBar);
        sheet.getRange(1, 1, 1, headersBar.length).setFontWeight("bold").setBackground("#f3f4f6");
        sheet.setFrozenRows(1);
      }
      
      // 2. GHI DỮ LIỆU CỦA báo cáo BAR
      row.push(new Date(), data.location, data.date, data.reporter);
      if (data.items && data.items.length > 0) {
        data.items.forEach(function(item) {
          row.push(item.value); 
        });
      }
    }
    else if (sheetName === "BC Tổng Bar") {
      // 1. TẠO TIÊU ĐỀ NẾU BẢNG TRỐNG
      if (sheet.getLastRow() === 0) {
        var headersLam = ["Thời gian gửi", "Cơ sở"];
        if (data.items && data.items.length > 0) {
          data.items.forEach(function(item) {
            headersLam.push(item.title);
          });
        }
        sheet.appendRow(headersLam);
        sheet.getRange(1, 1, 1, headersLam.length).setFontWeight("bold").setBackground("#f3f4f6");
        sheet.setFrozenRows(1);
      }
      
      // 2. GHI DỮ LIỆU CỦA báo cáo Lâm
      row.push(new Date(), data.location);
      if (data.items && data.items.length > 0) {
        data.items.forEach(function(item) {
          row.push(item.value);
        });
      }
    }
    // ================== BÁO CÁO TQL - 6 CƠ SỞ (SHEET17 / BC TQL) ==================
    else if (sheetName === "Sheet17" || sheetName === "BC TQL" || sheetName === "BC TQL 1") {
      // 1. TẠO TIÊU ĐỀ NẾU BẢNG TRỐNG (36 CỘT: 3 CỘT ĐẦU + 7 CỘT TOÀN CHUỖI + 1 CỘT CƠ SỞ + 25 CỘT NGHIỆP VỤ)
      if (sheet.getLastRow() === 0) {
        var headersTQL = [
          "Thời gian gửi", "Ngày", "Người báo cáo",
          // ĐÁNH GIÁ CHUNG TOÀN CHUỖI (7 cột - đã xóa cột trùng)
          "DT toàn hệ thống:", "Mục tiêu ngày:", "Tăng/giảm so với hôm trc:", "Tổng lượt khách:", "Số bàn phục vụ:", "DT TB/khách:", "Xếp hạng DT:",
          // CH lv chính (Đưa về SAU Đánh giá chung toàn chuỗi)
          "CH lv chính",
          // PHỤC VỤ (7 cột)
          "Xếp bàn và đón tiếp:", "Order & tư vấn món:", "Chăm sóc KH & upsell:", "Tốc độ ra đồ:", "Vệ sinh:", "Vđ phát sinh:", "Cách giải quyết ps:",
          // NHÂN SỰ (5 cột)
          "Tổng NS bàn đi làm:", "NS nghỉ đột xuất:", "NS nghỉ hẳn:", "NS mới:", "NS hỗ trợ:",
          // BIA (4 cột)
          "Phản hồi của khách:", "Vđ phát sinh:", "Cách giải quyết ps:", "Xuất bán tiệc:",
          // MÓN ĂN (5 cột)
          "Món đẩy:", "Món bán chạy:", "Phản hồi của khách:", "Vđ phát sinh:", "Cách giải quyết ps:",
          // SỬA CHỮA (2 cột)
          "Hỏng hóc cần sửa:", "Hạng mục sửa trong ngày:",
          // ĐÀO TẠO (1 cột)
          "Đào tạo:",
          // ĐỐI NGOẠI (1 cột)
          "Đối ngoại:"
        ];
        sheet.appendRow(headersTQL);
        sheet.getRange(1, 1, 1, headersTQL.length).setFontWeight("bold").setBackground("#f3f4f6");
        sheet.setFrozenRows(1);
      }
      
      // 2. GHI DỮ LIỆU CỦA 6 CƠ SỞ (TQL ĐI TẤT CẢ CÁC ĐIỂM)
      var timeVal = data.time || Utilities.formatDate(new Date(), "GMT+7", "HH:mm");
      var dateVal = data.date || Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
      var reporterVal = data.reporter || "";
      
      if (data.storesList && Array.isArray(data.storesList) && data.storesList.length > 0) {
        data.storesList.forEach(function(st) {
          var storeRow = [
            timeVal,
            dateVal,
            reporterVal
          ];
          
          // 7 cột Đánh giá chung toàn chuỗi
          if (st.systemValues && Array.isArray(st.systemValues)) {
            st.systemValues.forEach(function(val) {
              storeRow.push(val !== undefined ? String(val) : "");
            });
          }
          
          // Cột CH lv chính (sau Đánh giá chung toàn chuỗi)
          storeRow.push(st.storeCode || st.storeName || "");
          
          // 25 cột nghiệp vụ từng cơ sở
          if (st.storeValues && Array.isArray(st.storeValues)) {
            st.storeValues.forEach(function(val) {
              storeRow.push(val !== undefined ? String(val) : "");
            });
          } else if (st.values && Array.isArray(st.values)) {
            st.values.forEach(function(val) {
              storeRow.push(val !== undefined ? String(val) : "");
            });
          }
          sheet.appendRow(storeRow);
        });
      } else if (data.stores) {
        var storeCodes = ["01 DD", "03 NVH", "12 ĐT", "94 LĐ", "96 HT", "98 VTP"];
        var systemKeys = [
          "dt_toan_he_thong", "muc_tieu_ngay", "tang_giam_hom_truoc", "tong_luot_khach", "so_ban_phuc_vu", "dt_tb_khach", "xep_hang_dt"
        ];
        var storeKeys = [
          "xep_ban", "order_tu_van", "cham_soc_upsell", "toc_do_ra_do", "ve_sinh", "vd_phat_sinh_pv", "cach_giai_quyet_pv",
          "tong_ns_di_lam", "ns_nghi_dot_xuat", "ns_nghi_han", "ns_moi", "ns_ho_tro",
          "phan_hoi_khach_bia", "vd_phat_sinh_bia", "cach_giai_quyet_bia", "xuat_ban_tiec",
          "mon_day", "mon_ban_chay", "phan_hoi_khach_mon", "vd_phat_sinh_mon", "cach_giai_quyet_mon",
          "hong_hoc_can_sua", "hang_muc_sua_trong_ngay",
          "dao_tao", "doi_ngoai"
        ];
        var sysVals = data.systemEvaluation || {};
        storeCodes.forEach(function(code, idx) {
          var storeVals = data.stores[code] || {};
          var storeRow = [timeVal, dateVal, reporterVal];
          // 7 cột toàn chuỗi: chỉ ghi ở dòng đầu tiên (01 DD) theo Phương án 1
          systemKeys.forEach(function(k) {
            if (idx === 0) {
              var val = sysVals[k] !== undefined ? sysVals[k] : (storeVals[k] !== undefined ? storeVals[k] : "");
              storeRow.push(String(val));
            } else {
              storeRow.push("");
            }
          });
          // Cột CH lv chính (sau Đánh giá chung toàn chuỗi)
          storeRow.push(code);
          // 25 cột nghiệp vụ cơ sở
          storeKeys.forEach(function(k) {
            storeRow.push(storeVals[k] !== undefined ? String(storeVals[k]) : "");
          });
          sheet.appendRow(storeRow);
        });
      }

      return ContentService.createTextOutput(JSON.stringify({
        "status": "success",
        "message": "Đã lưu 6 cơ sở vào " + sheetName
      })).setMimeType(ContentService.MimeType.JSON);
    }
    // ================== BÁO CÁO SALE SỈ ==================
    else if (sheetName === "BC sale sỉ" || sheetName === "BC Sale sỉ" || sheetName === "BC Sale Sỉ") {
      if (sheet.getLastRow() === 0) {
        var headersSaleSi = [
          "Thời gian gửi",
          "Ngày",
          "Người báo cáo",
          "Điểm mở mới",
          "Phát sinh/ Đề xuất",
          "Tổng số điểm đến chăm sóc",
          "Tổng số đơn đặt hàng"
        ];
        for (var i = 1; i <= 15; i++) {
          headersSaleSi.push("Điểm bán số " + i);
        }
        sheet.appendRow(headersSaleSi);
        sheet.getRange(1, 1, 1, headersSaleSi.length).setFontWeight("bold").setBackground("#f3f4f6");
        sheet.setFrozenRows(1);
      }
      
      row.push(
        new Date(),
        data.date || "",
        data.reporter || "",
        data.newOutlets || "",
        data.issuesOrProposals || "",
        data.visitedOutlets || "",
        data.totalOrders || ""
      );
      
      if (data.outlets && Array.isArray(data.outlets)) {
        for (var i = 0; i < 15; i++) {
          row.push(data.outlets[i] !== undefined ? data.outlets[i] : "");
        }
      } else if (data.items && Array.isArray(data.items)) {
        for (var i = 0; i < 15; i++) {
          row.push(data.items[i] ? (data.items[i].value || "") : "");
        }
      }
    }
    // ================== BÁO CÁO BẾP ==================
    else if (sheetName === "BC Bếp") {
      if (sheet.getLastRow() === 0) {
        var headersBep = [
          "Thời gian gửi", "Cơ sở", "Ngày", "Người báo cáo",
          "Có đủ nv làm việc (Có/Không)", "Có đủ nv làm việc (Diễn giải)",
          "Có nv xin nghỉ hẳn (Có/Không)", "Có nv xin nghỉ hẳn (Diễn giải)",
          "NV mới đi làm",
          "Hàng đặt có về đủ không (Có/Không)", "Hàng đặt có về đủ không (Diễn giải)",
          "Sự cố xảy ra trong ngày không?",
          "Món bán chạy trong ngày",
          "CCDC, thiết bị hỏng trong ngày",
          "CCDC, thiết bị được sửa trong ngày",
          "Đề xuất"
        ];
        sheet.appendRow(headersBep);
        sheet.getRange(1, 1, 1, headersBep.length).setFontWeight("bold").setBackground("#f3f4f6");
        sheet.setFrozenRows(1);
      }
      
      row.push(new Date(), data.location, data.date || "", data.reporter || "");
      
      if (data.items && data.items.length > 0) {
        data.items.forEach(function(item) {
          if (item.id === 201 || item.id === 202 || item.id === 204) {
            var val = (item.value || "").trim();
            var separatorIndex = val.search(/[\.\\,\\-\\n]/);
            
            if (separatorIndex !== -1 && separatorIndex < 15) { 
               var answer = val.substring(0, separatorIndex).trim();
               var explanation = val.substring(separatorIndex + 1).trim();
               row.push(answer);
               row.push(explanation);
            } else {
               row.push(val);
               row.push("");
            }
          } else {
            row.push(item.value);
          }
        });
      }
    }

    // Ghi dữ liệu dòng mới vào bảng tính nếu có
    if (row && row.length > 0) {
      sheet.appendRow(row);
    }
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const handleSaveSheetName = () => {
    const trimmed = tempSheetName.trim();
    if (trimmed) {
      setTargetSheetName(trimmed);
      setIsEditingSheetName(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-xs">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Báo Cáo TQL - Quán Bia
                </h1>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Mẫu bảng tổng hợp 6 cơ sở (37 cột) • Lưu vào Google Sheet: <strong className="text-indigo-700">{targetSheetName}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Sheet target configuration badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <span className="text-slate-500">Sheet đích:</span>
                {isEditingSheetName ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={tempSheetName}
                      onChange={(e) => setTempSheetName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveSheetName()}
                      className="w-24 px-1.5 py-0.5 border border-indigo-300 rounded text-xs font-bold text-indigo-900 outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleSaveSheetName}
                      className="text-indigo-600 hover:text-indigo-800 font-bold text-[11px]"
                    >
                      Lưu
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTempSheetName(targetSheetName);
                        setIsEditingSheetName(false);
                      }}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <strong className="text-indigo-700 font-bold">{targetSheetName}</strong>
                    <button
                      type="button"
                      onClick={() => {
                        setTempSheetName(targetSheetName);
                        setIsEditingSheetName(true);
                      }}
                      title="Bấm để đổi tên sheet nếu sau này bạn đổi tên trong Google Sheets"
                      className="text-slate-400 hover:text-indigo-600 p-0.5"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* View Apps Script Modal button */}
              <button
                type="button"
                onClick={() => setShowScriptModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                title="Xem mã Google Apps Script để dán vào trang tính"
              >
                <FileCode className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Mã Apps Script</span>
              </button>

              {/* Export Button */}
              <button
                onClick={handleExportImage}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{sheetStatus === 'saving' ? 'Đang lưu Sheet...' : 'Đang xuất ảnh...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Tải ảnh & Lưu Sheet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 sm:pb-12">
        {/* Export Success or Error Notice */}
        {exportSuccess && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 border ${
              sheetStatus === 'error'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {sheetStatus === 'error' ? (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              <p className="text-sm font-medium">
                {sheetStatus === 'error'
                  ? `Đã tải ảnh thành công! (Lưu ý: Không thể đồng bộ vào sheet '${targetSheetName}', vui lòng kiểm tra xem bạn đã dán mã Apps Script mới chưa).`
                  : `Đã tải ảnh báo cáo độ phân giải cao thành công và lưu 6 dòng cơ sở vào sheet '${targetSheetName}'!`}
              </p>
            </div>
            {sheetStatus === 'error' && (
              <button
                type="button"
                onClick={() => setShowScriptModal(true)}
                className="text-xs font-bold text-amber-800 underline hover:text-amber-950 shrink-0"
              >
                Xem mã Apps Script
              </button>
            )}
          </div>
        )}

        {/* 2-Column Grid: Form on Left, Preview on Right */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (6 cols on XL) */}
          <div className="xl:col-span-6 space-y-6">
            <ReportForm data={reportData} onChange={setReportData} />
          </div>

          {/* Right Column: Spreadsheet Preview (6 cols on XL) */}
          <div className="xl:col-span-6 space-y-4 xl:sticky xl:top-20">
            {/* Preview Toolbar */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-slate-800">
                  Bản xem trước bảng tính
                </h2>
              </div>

              {/* View options and Zoom controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Toggle Show All 6 Stores */}
                <button
                  type="button"
                  onClick={() => setShowAllStores(!showAllStores)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    showAllStores
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {showAllStores ? 'Hiện 6 cơ sở (Mẫu)' : 'Chỉ cơ sở có dữ liệu'}
                </button>

                {/* Zoom out */}
                <button
                  type="button"
                  title="Thu nhỏ xem tổng thể"
                  onClick={() => setZoomScale((s) => Math.max(0.3, +(s - 0.1).toFixed(2)))}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold text-slate-600 min-w-[38px] text-center">
                  {Math.round(zoomScale * 100)}%
                </span>

                {/* Zoom in */}
                <button
                  type="button"
                  title="Phóng to"
                  onClick={() => setZoomScale((s) => Math.min(1.0, +(s + 0.1).toFixed(2)))}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Reset fit */}
                <button
                  type="button"
                  title="Vừa khung nhìn (55%)"
                  onClick={() => setZoomScale(0.55)}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Container with Scaled Preview */}
            <div className="bg-slate-800/5 rounded-2xl p-2 sm:p-4 border border-slate-300 shadow-inner overflow-hidden">
              <div className="text-[11px] text-slate-500 mb-2 flex items-center justify-between">
                <span>Cuộn ngang để xem tất cả 37 cột. Khi bấm xuất ảnh, file tải về đạt độ nét 100%.</span>
              </div>

              <div
                className="overflow-auto max-h-[78vh] rounded-xl border border-slate-300 bg-slate-100 p-2"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Scale wrapper */}
                <div
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'top left',
                    width: `${100 / zoomScale}%`,
                  }}
                  className="transition-transform duration-150"
                >
                  <ReportPreview
                    ref={previewRef}
                    data={reportData}
                    showAllStores={showAllStores}
                  />
                </div>
              </div>
            </div>

            {/* Quick Helper Notes */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 text-xs text-indigo-950 flex items-start gap-2.5">
              <Table className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-0.5">Tích hợp Google Sheets ({targetSheetName}):</p>
                <p className="text-indigo-900 leading-relaxed">
                  Dữ liệu được gửi tự động với 6 dòng (tương ứng 6 cơ sở: 01 DD, 03 NVH, 12 ĐT, 94 LĐ, 96 HT, 98 VTP). Sau này nếu bạn đổi tên sheet trong Google Sheets từ <strong>{targetSheetName}</strong> sang tên khác (ví dụ <em>BC TQL</em>), chỉ cần bấm vào biểu tượng cây bút ở góc trên để cập nhật lại tên sheet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Script Modal */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <FileCode className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Mã Google Apps Script tích hợp cho Sheet17 (BC TQL)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Đã tích hợp đầy đủ các báo cáo: BC CX, BC Bar, BC Tổng Bar, <strong>Sheet17 / BC TQL (37 cột)</strong>, BC sale sỉ, BC Bếp.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowScriptModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Code Block */}
            <div className="p-4 sm:p-5 overflow-auto flex-1 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed">
              <pre>{fullAppsScriptCode}</pre>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-600 text-center sm:text-left">
                Mở Google Sheets &gt; Tiện ích mở rộng &gt; Apps Script &gt; Dán đè vào hàm <code>doPost</code> &gt; Nhấn <strong>Triển khai mới (New Deployment)</strong>.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã sao chép vào bộ nhớ tạm!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Sao chép toàn bộ mã</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-[0_-8px_20px_-3px_rgba(0,0,0,0.08)] z-40">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <button
            onClick={handleExportImage}
            disabled={isExporting}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{sheetStatus === 'saving' ? 'Đang lưu Sheet...' : 'Đang xuất ảnh...'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Tải ảnh & Lưu vào {targetSheetName}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
