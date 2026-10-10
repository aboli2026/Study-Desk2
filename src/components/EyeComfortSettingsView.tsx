import React from 'react';
import {
  ArrowRight,
  Sun,
  Moon,
  BookOpen,
  RotateCcw,
  Check,
  Eye,
  Sliders,
  ShieldCheck,
  Sparkles,
  Info,
  Maximize2,
} from 'lucide-react';
import { EyeComfortSettings, EyeComfortMode } from '../types';

interface EyeComfortSettingsViewProps {
  settings: EyeComfortSettings;
  onUpdateSettings: (newSettings: EyeComfortSettings) => void;
  onClose: () => void;
  fileName?: string;
}

export const EyeComfortSettingsView: React.FC<EyeComfortSettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  fileName,
}) => {
  const handleReset = () => {
    onUpdateSettings({
      brightness: 100,
      colorMode: 'normal',
      warmth: 50,
    });
  };

  const handleBrightnessChange = (val: number) => {
    onUpdateSettings({
      ...settings,
      brightness: Math.max(40, Math.min(120, val)),
    });
  };

  const handleColorModeChange = (mode: EyeComfortMode) => {
    onUpdateSettings({
      ...settings,
      colorMode: mode,
    });
  };

  const handleWarmthChange = (val: number) => {
    onUpdateSettings({
      ...settings,
      warmth: Math.max(20, Math.min(80, val)),
    });
  };

  // Compute live preview CSS filter
  const previewFilter = settings.brightness !== 100 ? `brightness(${settings.brightness}%)` : undefined;

  let previewCanvasFilter = 'none';
  let previewPaperBg = 'bg-white';
  let previewBorder = 'border-neutral-200';
  let previewText = 'text-neutral-900';
  let previewSubtext = 'text-neutral-600';
  let previewHighlightBg = 'bg-amber-300/40 text-neutral-900';

  if (settings.colorMode === 'yellow') {
    previewCanvasFilter = `sepia(${settings.warmth}%) saturate(130%) contrast(92%)`;
    previewPaperBg = 'bg-[#fbf4de]';
    previewBorder = 'border-amber-300/80';
    previewText = 'text-amber-950';
    previewSubtext = 'text-amber-900/80';
    previewHighlightBg = 'bg-amber-400/50 text-amber-950';
  } else if (settings.colorMode === 'dark-gray') {
    previewCanvasFilter = 'invert(88%) hue-rotate(180deg) contrast(95%)';
    previewPaperBg = 'bg-[#222225]';
    previewBorder = 'border-neutral-700/80';
    previewText = 'text-neutral-100';
    previewSubtext = 'text-neutral-400';
    previewHighlightBg = 'bg-amber-500/30 text-amber-200 border border-amber-500/40';
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-100 flex flex-col w-full h-full overflow-hidden select-none animate-ios-modal"
      dir="rtl"
    >
      {/* Top Header Bar */}
      <header className="shrink-0 h-16 bg-white border-b border-neutral-200/90 px-4 md:px-8 flex items-center justify-between shadow-xs">
        {/* Right side: Back button & Title */}
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs md:text-sm font-semibold rounded-xl cursor-pointer shrink-0 ios-spring-btn"
            title="بازگشت به مطالعه جزوه (Esc)"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به مطالعه</span>
          </button>

          <div className="h-6 w-px bg-neutral-200 shrink-0" />

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm md:text-base font-bold text-neutral-900 truncate">
                تنظیمات راحتی چشم و نور صفحه
              </h1>
              <p className="text-[11px] text-neutral-500 truncate hidden sm:block">
                تنظیم نور، رنگ زرد و طوسی تیره برای مطالعه طولانی‌مدت و کاهش خستگی چشم
                {fileName ? ` · ${fileName}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Left side: Reset & Apply Button */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {(settings.colorMode !== 'normal' || settings.brightness !== 100) && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer ios-spring-btn"
              title="بازنشانی تمام تنظیمات به حالت استاندارد"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">بازنشانی به حالت پیش‌فرض</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs md:text-sm font-semibold rounded-xl shadow-xs cursor-pointer ios-spring-btn"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>اعمال و بازگشت</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-neutral-100/90 p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Screen Brightness (تنظیم نور صفحه) */}
            <section className="bg-white rounded-2xl p-5 md:p-6 border border-neutral-200/90 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm md:text-base font-bold text-neutral-900">تنظیم نور صفحه و فایل</h2>
                    <p className="text-xs text-neutral-500">
                      میزان روشنایی صفحه را با توجه به نور اتاق و محیط تنظیم کنید
                    </p>
                  </div>
                </div>

                <div className="text-left">
                  <span className="inline-flex items-center px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-xl text-xs font-mono font-bold text-amber-900 tabular-nums">
                    {settings.brightness}٪
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="range"
                    min={40}
                    max={120}
                    step={5}
                    value={settings.brightness}
                    onChange={(e) => handleBrightnessChange(Number(e.target.value))}
                    className="flex-1 accent-amber-500 cursor-pointer h-2.5 bg-neutral-100 rounded-lg"
                  />
                  <Sun className="w-5 h-5 text-amber-500 shrink-0" />
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {[
                    { label: 'شب (۵۰٪)', sub: 'محیط تاریک', val: 50, icon: Moon },
                    { label: 'ملایم (۷۵٪)', sub: 'نور اتاق کم', val: 75, icon: Eye },
                    { label: 'عادی (۱۰۰٪)', sub: 'استاندارد روز', val: 100, icon: Sun },
                    { label: 'روشن (۱۱۵٪)', sub: 'محیط پرنور', val: 115, icon: Sparkles },
                  ].map((preset) => {
                    const IconComponent = preset.icon;
                    const isSelected = settings.brightness === preset.val;
                    return (
                      <button
                        key={preset.val}
                        onClick={() => handleBrightnessChange(preset.val)}
                        className={`p-2.5 rounded-xl border text-right cursor-pointer ios-spring-btn ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                            : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">{preset.label}</span>
                          <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-neutral-500'}`} />
                        </div>
                        <div className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-neutral-500'}`}>
                          {preset.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Card 2: Color Themes (امکان زرد کردن و طوسی تیره کردن فایل) */}
            <section className="bg-white rounded-2xl p-5 md:p-6 border border-neutral-200/90 shadow-xs">
              <div className="pb-4 mb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm md:text-base font-bold text-neutral-900">
                      رنگ و تم فایل برای راحتی چشم
                    </h2>
                    <p className="text-xs text-neutral-500">
                      یکی از حالت‌های بهینه‌سازی شده زیر را برای ارگونومی بهتر چشم انتخاب کنید
                    </p>
                  </div>
                </div>
              </div>

              {/* Theme Options */}
              <div className="grid grid-cols-1 gap-3">
                {/* 1. Normal White */}
                <div
                  onClick={() => handleColorModeChange('normal')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between ios-spring-card ${
                    settings.colorMode === 'normal'
                      ? 'border-neutral-900 bg-neutral-50/80 shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-300 shadow-xs flex items-center justify-center shrink-0">
                      <Sun className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs md:text-sm font-bold text-neutral-900">سفید عادی (پیش‌فرض)</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 font-medium">
                          رنگ اصلی
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        رنگ طبیعی و واقعی صفحات فایل، مناسب برای مطالعه در نور عادی روز.
                      </p>
                    </div>
                  </div>

                  <div className="mr-3">
                    {settings.colorMode === 'normal' ? (
                      <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-neutral-300" />
                    )}
                  </div>
                </div>

                {/* 2. Warm Yellow (زرد کردن فایل) */}
                <div
                  onClick={() => handleColorModeChange('yellow')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col gap-3 ios-spring-card ${
                    settings.colorMode === 'yellow'
                      ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                      : 'border-neutral-200 hover:border-amber-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#fef08a] border border-amber-300 shadow-xs flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-amber-800" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs md:text-sm font-bold text-amber-950">
                            زرد کردن فایل (محافظ چشم در برابر نور آبی)
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                            کاغذ کتاب
                          </span>
                        </div>
                        <p className="text-xs text-amber-900/80 mt-0.5">
                          فیلتر نور آبی و شبیه‌سازی کاغذ گرم کتاب، از خشکی و سوزش چشم در مطالعه طولانی جلوگیری می‌کند.
                        </p>
                      </div>
                    </div>

                    <div className="mr-3">
                      {settings.colorMode === 'yellow' ? (
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-neutral-300" />
                      )}
                    </div>
                  </div>

                  {/* Sub-slider: Warmth Intensity */}
                  {settings.colorMode === 'yellow' && (
                    <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-200/80 mt-1 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-amber-950">میزان شدت رنگ زرد کاغذ</span>
                        <span className="text-xs font-mono font-bold text-amber-900 tabular-nums">
                          {settings.warmth}٪
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-amber-800">ملایم</span>
                        <input
                          type="range"
                          min={25}
                          max={75}
                          step={5}
                          value={settings.warmth}
                          onChange={(e) => handleWarmthChange(Number(e.target.value))}
                          className="flex-1 accent-amber-600 cursor-pointer h-2 bg-amber-200/80 rounded-lg"
                        />
                        <span className="text-[10px] text-amber-800">پررنگ</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Dark Gray (طوسی تیره کردن فایل) */}
                <div
                  onClick={() => handleColorModeChange('dark-gray')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between ios-spring-card ${
                    settings.colorMode === 'dark-gray'
                      ? 'border-neutral-800 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-400 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 shadow-xs flex items-center justify-center shrink-0">
                      <Moon className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`text-xs md:text-sm font-bold ${settings.colorMode === 'dark-gray' ? 'text-white' : 'text-neutral-900'}`}>
                          طوسی تیره کردن فایل (حالت شب ملایم)
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-700 text-neutral-200 font-bold">
                          حالت شب
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 ${settings.colorMode === 'dark-gray' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        زمینه طوسی تیره ملایم و متن نرم و روشن؛ تضاد نور را در اتاق تاریک از بین می‌برد بدون سیاهی خسته‌کننده.
                      </p>
                    </div>
                  </div>

                  <div className="mr-3">
                    {settings.colorMode === 'dark-gray' ? (
                      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-neutral-300" />
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Scientific Eye Ergonomics & Tips Card */}
            <section className="bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs text-neutral-700 text-xs">
              <div className="flex items-center gap-2 mb-2.5 text-neutral-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>راهنمای ارگونومی و محافظت از بینایی در مطالعه</span>
              </div>
              <ul className="space-y-2 list-disc list-inside text-neutral-600 leading-relaxed pr-1">
                <li>
                  <strong>قانون ۲۰-۲۰-۲۰:</strong> پس از هر ۲۰ دقیقه مطالعه ممتد، به مدت ۲۰ ثانیه به فاصله‌ای دور (حدود ۶ متر) نگاه کنید.
                </li>
                <li>
                  <strong>هماهنگی روشنایی:</strong> در اتاق‌های کم‌نور نور صفحه را روی ۵۰٪ یا ۷۵٪ بگذارید تا تضاد شدید بین صفحه و محیط به چشم آسیب نزند.
                </li>
                <li>
                  <strong>مطالعه عصرگاهی:</strong> فعال کردن حالت «زرد کردن فایل» در غروب و شب باعث کاهش ترشح هورمون‌های مخل خواب و آرامش اعصاب بینایی می‌شود.
                </li>
              </ul>
            </section>
          </div>

          {/* Right Column: Live Interactive Document Preview (5 cols on lg) */}
          <div className="lg:col-span-5 sticky top-6">
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-neutral-200/90 shadow-xs flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-neutral-900">پیش‌نمایش زنده صفحه مطالعه</span>
                </div>
                <span className="text-[11px] font-mono font-medium text-neutral-500 tabular-nums">
                  {settings.brightness}٪ نور ·{' '}
                  {settings.colorMode === 'normal'
                    ? 'سفید عادی'
                    : settings.colorMode === 'yellow'
                    ? 'زرد گرم'
                    : 'طوسی تیره'}
                </span>
              </div>

              {/* Simulated Paper Sheet */}
              <div
                style={{
                  filter: previewFilter,
                  transition: 'background-color 0.25s ease, border-color 0.25s ease, filter 0.2s ease',
                }}
                className={`w-full rounded-2xl p-5 md:p-6 shadow-xl border transition-all ${previewPaperBg} ${previewBorder}`}
              >
                {/* Simulated Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-300/40">
                  <span className={`text-[11px] font-bold ${previewText}`}>
                    فصل سوم: اصول یادگیری و مطالعه پویا
                  </span>
                  <span className={`text-[10px] font-mono ${previewSubtext}`}>صفحه ۱ از ۲۴</span>
                </div>

                {/* Simulated Title */}
                <h3 className={`text-base font-extrabold mb-2.5 ${previewText}`}>
                  تکنیک‌های تقویت تمرکز و حفظ اطلاعات
                </h3>

                {/* Simulated Paragraphs */}
                <p className={`text-xs leading-relaxed mb-3 ${previewSubtext}`}>
                  مطالعه مؤثر نیازمند فضایی آرام و چیدمانی ارگونومیک است. تنظیم نور مناسب و کاهش درخشش صفحات مانع از خستگی زودرس عضلات چشم می‌شود.
                </p>

                {/* Highlighted text block */}
                <div className={`p-2.5 rounded-lg my-3 text-xs leading-relaxed font-medium ${previewHighlightBg}`}>
                  نکته کلیدی: استفاده از پس‌زمینه زرد ملایم یا طوسی تیره در ساعات شب، فشار مضاعف ناشی از نور سفید را از شبکیه چشم برمی‌دارد.
                </div>

                <p className={`text-xs leading-relaxed ${previewSubtext}`}>
                  با این شیوه می‌توانید ساعت‌ها بدون احساس سوزش، خشکی یا سردرد ناشی از نور تند نمایشگر، به مطالعه کتاب‌ها و جزوات خود ادامه دهید.
                </p>

                {/* Simulated Diagram Box */}
                <div className="mt-4 pt-3 border-t border-neutral-300/40 flex items-center justify-between">
                  <span className={`text-[10px] font-semibold ${previewSubtext}`}>وضعیت راحتی چشم:</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700">
                    بهینه و محافظت‌شده ✓
                  </span>
                </div>
              </div>

              {/* Live Preview Info Tip */}
              <div className="w-full mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200/60 text-[11px] text-neutral-500 flex items-start gap-2">
                <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>
                  هر تغییری که در این صفحه اعمال کنید، به‌صورت آنی روی تمام صفحات جزوه شما اعمال و برای مراجعات بعدی ذخیره خواهد شد.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
