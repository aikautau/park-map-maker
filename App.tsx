import React, { useState, useCallback, useRef } from 'react';
import { Map, LatLng } from 'leaflet';
import { Stamp, StampType } from './types';
import MapComponent from './components/MapComponent';
import Toolbar from './components/Toolbar';
import MemoModal from './components/MemoModal';

const App: React.FC = () => {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [selectedStampType, setSelectedStampType] = useState<StampType | null>(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [memoModalState, setMemoModalState] = useState<{ isOpen: boolean; position: [number, number] | null }>({
    isOpen: false,
    position: null,
  });

  const mapRef = useRef<Map | null>(null);

  const handleMapClick = useCallback((latlng: LatLng) => {
    if (!selectedStampType) return;

    if (selectedStampType === StampType.MEMO) {
      setMemoModalState({ isOpen: true, position: [latlng.lat, latlng.lng] });
    } else {
      const newStamp: Stamp = {
        id: `${Date.now()}-${Math.random()}`,
        type: selectedStampType,
        position: [latlng.lat, latlng.lng],
      };
      setStamps((prevStamps) => [...prevStamps, newStamp]);
    }
  }, [selectedStampType]);

  const handleDeleteStamp = useCallback((id: string) => {
    setStamps((prevStamps) => prevStamps.filter((stamp) => stamp.id !== id));
  }, []);

  const handleAddMemo = useCallback((text: string) => {
    if (memoModalState.position) {
      const newStamp: Stamp = {
        id: `${Date.now()}-${Math.random()}`,
        type: StampType.MEMO,
        position: memoModalState.position,
        text,
      };
      setStamps((prevStamps) => [...prevStamps, newStamp]);
    }
    setMemoModalState({ isOpen: false, position: null });
    setSelectedStampType(null);
  }, [memoModalState.position]);

  const handlePrint = () => {
    window.print();
  };
  
  const handleGeolocate = () => {
    if (mapRef.current) {
        mapRef.current.locate({ setView: true, maxZoom: 16 });
    }
  };

  const togglePrintPreview = () => {
    setShowPrintPreview(!showPrintPreview);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
      {/* モバイル: 上部ツールバー、デスクトップ: 左サイドバー */}
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' }} className="flex-col md:flex-row">
        <Toolbar
          selectedStampType={selectedStampType}
          onSelectStamp={setSelectedStampType}
          onPrint={handlePrint}
          onGeolocate={handleGeolocate}
          showPrintPreview={showPrintPreview}
          onTogglePrintPreview={togglePrintPreview}
        />
        <main style={{ flex: 1, position: 'relative', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* 印刷プレビュー枠（A4サイズ） */}
          {showPrintPreview && (
            <div 
              className="print:hidden absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              style={{ padding: '20px' }}
            >
              <div 
                style={{
                  width: '210mm',
                  height: '297mm',
                  maxWidth: '90%',
                  maxHeight: '90%',
                  border: '3px dashed #3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)',
                  pointerEvents: 'none'
                }}
              >
                <div className="text-blue-600 font-bold text-sm bg-blue-100 px-2 py-1 inline-block m-2 rounded">
                  A4印刷範囲
                </div>
              </div>
            </div>
          )}
          
          <div style={{ width: '100%', height: '100%' }}>
            <MapComponent
              stamps={stamps}
              onMapClick={handleMapClick}
              onDeleteStamp={handleDeleteStamp}
              setMap={map => mapRef.current = map}
            />
          </div>
        </main>
      </div>
      
      <MemoModal
        isOpen={memoModalState.isOpen}
        onClose={() => {
            setMemoModalState({ isOpen: false, position: null });
            setSelectedStampType(null);
        }}
        onAdd={handleAddMemo}
      />
    </div>
  );
};

export default App;