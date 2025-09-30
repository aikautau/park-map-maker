import React from 'react';
import { StampType } from '../types';
import StampIcon from './StampIcon';

interface ToolbarProps {
  selectedStampType: StampType | null;
  onSelectStamp: (type: StampType | null) => void;
  onPrint: () => void;
  onGeolocate: () => void;
  showPrintPreview: boolean;
  onTogglePrintPreview: () => void;
}

const tools: { type: StampType, color: string, label: string }[] = [
  { type: StampType.SLIDE, color: 'bg-yellow-400', label: 'すべり台' },
  { type: StampType.SWING, color: 'bg-sky-400', label: 'ブランコ' },
  { type: StampType.BARS, color: 'bg-gray-400', label: '鉄棒' },
  { type: StampType.SANDBOX, color: 'bg-orange-300', label: '砂場' },
  { type: StampType.JUNGLE_GYM, color: 'bg-indigo-500', label: 'ジャングルジム' },
  { type: StampType.BENCH, color: 'bg-green-500', label: 'ベンチ' },
  { type: StampType.TOILET, color: 'bg-blue-500', label: 'トイレ' },
  { type: StampType.WATER_FOUNTAIN, color: 'bg-cyan-400', label: '水飲み場' },
  { type: StampType.WATER_TAP, color: 'bg-cyan-600', label: '水道' },
  { type: StampType.ACORN, color: 'bg-amber-700', label: 'どんぐり' },
  { type: StampType.CAUTION, color: 'bg-red-500', label: '注意' },
  { type: StampType.MEMO, color: 'bg-purple-400', label: 'メモ' },
];

const Toolbar: React.FC<ToolbarProps> = ({ 
  selectedStampType, 
  onSelectStamp, 
  onPrint, 
  onGeolocate,
  showPrintPreview,
  onTogglePrintPreview
}) => {

  const handleSelect = (type: StampType) => {
    if (selectedStampType === type) {
      onSelectStamp(null);
    } else {
      onSelectStamp(type);
    }
  };

  return (
    <>
      {/* モバイル版: 下部固定の横スクロールツールバー */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg print:hidden z-20 border-t-2 border-gray-200">
        {/* ツールボタン行 */}
        <div className="flex gap-2 p-2 border-b border-gray-200">
          <button
            onClick={onGeolocate}
            className="flex-1 py-3 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-semibold text-xs transition-colors"
          >
            📍 現在地
          </button>
          <button
            onClick={onTogglePrintPreview}
            className={`flex-1 py-3 px-2 rounded-lg font-semibold text-xs transition-colors ${
              showPrintPreview 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700'
            }`}
          >
            📄 {showPrintPreview ? '範囲ON' : '印刷範囲'}
          </button>
          <button
            onClick={onPrint}
            className="flex-1 py-3 px-2 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-xs transition-colors"
          >
            🖨️ 印刷
          </button>
        </div>
        
        {/* スタンプ横スクロール */}
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex gap-2 p-3" style={{ minWidth: 'max-content' }}>
            {tools.map(({ type, color, label }) => (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all shrink-0 ${
                  selectedStampType === type 
                    ? 'ring-4 ring-blue-500 scale-105' 
                    : 'ring-2 ring-gray-200'
                } ${color} text-white shadow-md active:scale-95`}
                style={{ width: '80px', height: '80px' }}
              >
                {type === StampType.CAUTION ? (
                  <>
                    <div className="w-8 h-8 flex items-center justify-center mb-1">
                        <StampIcon type={type} className="w-full h-full" />
                    </div>
                    <span className="text-xs font-bold text-center leading-tight">{label}</span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-center leading-tight px-1">{label}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* デスクトップ版: 左サイドバー */}
      <div className="hidden md:flex md:flex-col bg-white shadow-lg print:hidden w-64 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🎨 スタンプ選択</h2>
          
          {/* スタンプグリッド */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {tools.map(({ type, color, label }) => (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                  selectedStampType === type 
                    ? 'ring-4 ring-blue-500 scale-105' 
                    : 'ring-2 ring-gray-200 hover:ring-gray-300'
                } ${color} text-white shadow-sm`}
                style={{ minHeight: '70px' }}
              >
                {type === StampType.CAUTION ? (
                  <>
                    <div className="w-7 h-7 flex items-center justify-center mb-1">
                        <StampIcon type={type} className="w-full h-full" />
                    </div>
                    <span className="text-xs font-bold text-center leading-tight">{label}</span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-center leading-tight">{label}</span>
                )}
              </button>
            ))}
          </div>

          {/* ツールボタン */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">🛠️ ツール</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={onGeolocate}
                className="w-full py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
              >
                📍 現在地へ移動
              </button>
              <button
                onClick={onTogglePrintPreview}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-colors ${
                  showPrintPreview 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                📄 {showPrintPreview ? '印刷範囲を非表示' : '印刷範囲を表示'}
              </button>
              <button
                onClick={onPrint}
                className="w-full py-3 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-colors"
              >
                🖨️ 印刷する
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbar;