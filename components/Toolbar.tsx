import React from 'react';
import { StampType } from '../types';
import StampIcon from './StampIcon';

interface ToolbarProps {
  selectedStampType: StampType | null;
  onSelectStamp: (type: StampType | null) => void;
  onPrint: () => void;
  onGeolocate: () => void;
}

const tools: { type: StampType, color: string }[] = [
  { type: StampType.SLIDE, color: 'bg-yellow-400' },
  { type: StampType.SWING, color: 'bg-sky-400' },
  { type: StampType.BARS, color: 'bg-gray-400' },
  { type: StampType.SANDBOX, color: 'bg-orange-300' },
  { type: StampType.JUNGLE_GYM, color: 'bg-indigo-500' },
  { type: StampType.BENCH, color: 'bg-green-500' },
  { type: StampType.TOILET, color: 'bg-blue-500' },
  { type: StampType.WATER_FOUNTAIN, color: 'bg-cyan-400' },
  { type: StampType.WATER_TAP, color: 'bg-cyan-600' },
  { type: StampType.ACORN, color: 'bg-amber-700' },
  { type: StampType.CAUTION, color: 'bg-red-500' },
  { type: StampType.MEMO, color: 'bg-purple-400' },
];

const Toolbar: React.FC<ToolbarProps> = ({ selectedStampType, onSelectStamp, onPrint, onGeolocate }) => {

  const handleSelect = (type: StampType) => {
    if (selectedStampType === type) {
      onSelectStamp(null);
    } else {
      onSelectStamp(type);
    }
  };

  return (
    <div className="bg-white shadow-lg p-2 md:p-4 print:hidden md:w-64 md:h-full md:order-first md:overflow-y-auto">
      <div className="flex md:flex-col gap-2">
        <div className="flex-grow">
          <h2 className="text-sm font-bold text-gray-600 mb-2 text-center md:text-left">スタンプ</h2>
          <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {tools.map(({ type, color }) => (
              <button
                key={type}
                onClick={() => handleSelect(type)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all transform hover:scale-105 ${selectedStampType === type ? 'ring-4 ring-blue-400' : 'ring-1 ring-gray-200'} ${color} text-white`}
                title={type}
                style={{ minHeight: '80px' }}
              >
                {type === StampType.CAUTION ? (
                  <>
                    <div className="w-8 h-8 flex items-center justify-center">
                        <StampIcon type={type} className="w-full h-full" />
                    </div>
                    <span className="text-xs mt-1 font-semibold break-all">{type}</span>
                  </>
                ) : (
                  <span className="text-sm font-semibold break-all text-center">{type}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-l md:border-l-0 md:border-t border-gray-200 pl-2 md:pl-0 md:pt-4 md:mt-4">
          <h2 className="text-sm font-bold text-gray-600 mb-2 text-center md:text-left">ツール</h2>
          <div className="flex md:flex-col gap-2">
            <button
              onClick={onGeolocate}
              className="flex-1 p-2 rounded-lg transition-colors bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-sm"
              title="現在地"
            >
              現在地
            </button>
            <button
              onClick={onPrint}
              className="flex-1 p-2 rounded-lg transition-colors bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm"
              title="印刷"
            >
              印刷
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;