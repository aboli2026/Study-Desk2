import React, { useState, useMemo } from 'react';
import { BookOpen, FileText, Trash2, Search, Play, Calendar, HardDrive, StickyNote, Edit3 } from 'lucide-react';
import { StudyFile } from '../types';

interface LibraryViewProps {
  files: StudyFile[];
  onOpenFile: (file: StudyFile) => void;
  onDeleteFile: (id: string, fileName?: string) => void;
  onTriggerNewFile?: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  files,
  onOpenFile,
  onDeleteFile,
  onTriggerNewFile,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} بایت`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} کیلوبایت`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
  };

  // Deduplicate files by name to ensure no duplicates in library
  const uniqueFiles = useMemo(() => {
    const seen = new Set<string>();
    return files.filter((f) => {
      const key = (f.name || '').trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [files]);

  const filteredFiles = uniqueFiles.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto bg-neutral-50/50">
      <div className="max-w-4xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-neutral-800" />
              <span>کتابخانه فایل‌های مطالعه‌شده</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              آرشیو تمام جزوات و کتاب‌هایی که تا کنون برای مطالعه باز کرده‌اید
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tabular-nums text-neutral-500 bg-white border border-neutral-200 px-3 py-1.5 rounded-xl">
              تعداد فایل‌ها: {uniqueFiles.length}
            </span>
            {onTriggerNewFile && (
              <button
                onClick={onTriggerNewFile}
                className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl cursor-pointer ios-spring-btn"
              >
                + مطالعه فایل جدید
              </button>
            )}
          </div>
        </div>

        {/* Search Bar if files exist */}
        {uniqueFiles.length > 0 && (
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
            <input
              type="text"
              placeholder="جستجو در بین جزوات و کتاب‌های مطالعه‌شده..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 shadow-2xs"
            />
          </div>
        )}

        {/* Files Grid */}
        {uniqueFiles.length === 0 ? (
          <div className="p-12 bg-white border border-neutral-200 rounded-2xl text-center flex flex-col items-center justify-center shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4 text-neutral-700">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 mb-2">کتابخانه هنوز خالی است</h3>
            <p className="text-xs text-neutral-500 mb-6 max-w-sm leading-relaxed">
              هر فایلی که از بخش «باز کردن فایل» انتخاب و مطالعه کنید، به طور خودکار در این کتابخانه ثبت و ذخیره می‌شود تا همیشه به آن دسترسی داشته باشید.
            </p>
            {onTriggerNewFile && (
              <button
                onClick={onTriggerNewFile}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                انتخاب و مطالعه اولین فایل
              </button>
            )}
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="p-8 bg-white border border-neutral-200 rounded-2xl text-center text-xs text-neutral-400">
            فایلی با عنوان «{searchQuery}» پیدا نشد.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => onOpenFile(file)}
                className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-900 bg-white hover:shadow-xs cursor-pointer flex flex-col justify-between group ios-spring-card"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4
                      className="text-xs md:text-sm font-bold text-neutral-900 truncate"
                      title={file.name}
                    >
                      {file.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 mt-2 font-mono tabular-nums">
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        {formatFileSize(file.size)}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {file.uploadDate}
                      </span>
                      {file.currentPage && file.currentPage > 1 && (
                        <>
                          <span>·</span>
                          <span className="text-neutral-700 font-semibold bg-neutral-100 px-1.5 py-0.5 rounded">
                            صفحه {file.currentPage}
                          </span>
                        </>
                      )}
                      {file.stickyNotes && file.stickyNotes.length > 0 && (
                        <span className="text-amber-700 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <StickyNote className="w-3 h-3" />
                          <span>{file.stickyNotes.length} یادداشت</span>
                        </span>
                      )}
                      {file.pageStrokes && Object.values(file.pageStrokes).some((s) => s.length > 0) && (
                        <span className="text-blue-700 bg-blue-50 border border-blue-200/80 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Edit3 className="w-3 h-3" />
                          <span>ویرایش‌شده</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`آیا از حذف «${file.name}» از کتابخانه اطمینان دارید؟`)) {
                        onDeleteFile(file.id, file.name);
                      }
                    }}
                    className="text-neutral-400 hover:text-rose-600 p-1.5 rounded-lg cursor-pointer flex items-center gap-1 text-[11px] ios-spring-tool"
                    title="حذف از کتابخانه"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف</span>
                  </button>

                  <span className="px-3.5 py-1.5 bg-neutral-900 group-hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs ios-spring-btn">
                    <Play className="w-3 h-3 fill-current" />
                    <span>ادامه مطالعه</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
