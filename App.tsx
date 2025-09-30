import React, { useState, useCallback, useRef } from 'react';
import { Map, LatLng } from 'leaflet';
import { Stamp, StampType } from './types';
import MapComponent from './components/MapComponent';
import Toolbar from './components/Toolbar';
import MemoModal from './components/MemoModal';

const App: React.FC = () => {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [selectedStampType, setSelectedStampType] = useState<StampType | null>(null);
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

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <header className="w-full p-4 bg-white shadow-md print:block hidden">
        <h1 className="text-2xl font-bold text-center">おさんぽマップ</h1>
      </header>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' }} className="print:flex-col">
        <main style={{ flex: 1, position: 'relative', height: '100%' }}>
          <MapComponent
            stamps={stamps}
            onMapClick={handleMapClick}
            onDeleteStamp={handleDeleteStamp}
            setMap={map => mapRef.current = map}
          />
          <div className="hidden print:block print:fixed print:bottom-2 print:left-2 text-xs bg-white/80 p-1 rounded z-[1000]">
            地図データ © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors
          </div>
        </main>
        <Toolbar
          selectedStampType={selectedStampType}
          onSelectStamp={setSelectedStampType}
          onPrint={handlePrint}
          onGeolocate={handleGeolocate}
        />
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