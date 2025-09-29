import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { LatLng, divIcon, Map } from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { Stamp, StampType } from '../types';
import StampIcon from './StampIcon';

interface MapComponentProps {
  stamps: Stamp[];
  onMapClick: (latlng: LatLng) => void;
  onDeleteStamp: (id: string) => void;
  setMap: (map: Map) => void;
}

const stampColors: { [key in StampType]?: string } = {
    [StampType.SLIDE]: 'bg-yellow-400',
    [StampType.SWING]: 'bg-sky-400',
    [StampType.BARS]: 'bg-gray-400',
    [StampType.SANDBOX]: 'bg-orange-300',
    [StampType.JUNGLE_GYM]: 'bg-indigo-500',
    [StampType.BENCH]: 'bg-green-500',
    [StampType.TOILET]: 'bg-blue-500',
    [StampType.WATER_FOUNTAIN]: 'bg-cyan-400',
    [StampType.WATER_TAP]: 'bg-cyan-600',
    [StampType.ACORN]: 'bg-amber-700',
    [StampType.MEMO]: 'bg-purple-400',
};

const createCustomIcon = (stamp: Stamp) => {
    let iconContent: React.JSX.Element;

    if (stamp.type === StampType.CAUTION) {
        // Caution stamp: Icon only, no background, red color, with shadow for visibility.
        iconContent = (
            <div className="text-red-600" style={{ filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.5))' }}>
                <StampIcon type={stamp.type} className="w-10 h-10" />
            </div>
        );
    } else {
        const bgColor = stampColors[stamp.type] || 'bg-gray-200';
        if (stamp.type === StampType.MEMO) {
            // Memo stamp: User's text content, horizontal.
            iconContent = (
                <div className={`${bgColor} text-white text-sm font-bold py-1 px-3 rounded-lg shadow-lg whitespace-nowrap text-center`}>
                    {stamp.text}
                </div>
            );
        } else {
            // Other stamps: Text label of the stamp type, horizontal.
            iconContent = (
                <div className={`${bgColor} text-white text-xs font-bold py-1 px-2 rounded-lg shadow-lg whitespace-nowrap`}>
                    {stamp.type}
                </div>
            );
        }
    }

    const iconHtml = ReactDOMServer.renderToString(<div>{iconContent}</div>);

    return divIcon({
      html: iconHtml,
      className: 'custom-leaflet-icon',
      popupAnchor: [0, -20],
    });
};

const MapEvents: React.FC<{ onMapClick: (latlng: LatLng) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const MapController: React.FC<{setMap: (map: Map) => void}> = ({ setMap }) => {
    const map = useMap();
    setMap(map);
    return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ stamps, onMapClick, onDeleteStamp, setMap }) => {
  
  return (
    <MapContainer center={[35.6895, 139.6917]} zoom={13} scrollWheelZoom={true} className="w-full h-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController setMap={setMap} />
      <MapEvents onMapClick={onMapClick} />
      {stamps.map((stamp) => (
        <Marker key={stamp.id} position={stamp.position} icon={createCustomIcon(stamp)}>
          <Popup>
            <div className="text-center">
              <p className="font-bold">{stamp.type === StampType.MEMO ? 'メモ' : stamp.type}</p>
              {stamp.text && <p className="my-2">{stamp.text}</p>}
              <button
                onClick={() => onDeleteStamp(stamp.id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                削除
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;