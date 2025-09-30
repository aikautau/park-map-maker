// @ts-ignore
import L from 'leaflet';

// スタンプ定義
const stamps = [
    { id: 'slide', label: 'すべり台', color: '#fbbf24' },
    { id: 'swing', label: 'ブランコ', color: '#38bdf8' },
    { id: 'bars', label: '鉄棒', color: '#9ca3af' },
    { id: 'sandbox', label: '砂場', color: '#fb923c' },
    { id: 'jungle', label: 'ジャングルジム', color: '#6366f1' },
    { id: 'bench', label: 'ベンチ', color: '#22c55e' },
    { id: 'toilet', label: 'トイレ', color: '#3b82f6' },
    { id: 'fountain', label: '水飲み場', color: '#06b6d4' },
    { id: 'tap', label: '水道', color: '#0891b2' },
    { id: 'acorn', label: 'どんぐり', color: '#b45309' },
    { id: 'caution', label: '⚠️ 注意', color: '#ef4444' },
    { id: 'memo', label: '📝 メモ', color: '#a855f7' }
];

let map: any;
let selectedStamp: string | null = null;
let markers: any[] = [];
let pendingMemoPosition: L.LatLng | null = null;

// 地図初期化
function initMap() {
    map = L.map('map', {
        zoomControl: true,
        attributionControl: true
    }).setView([35.6895, 139.6917], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    map.on('click', (e: any) => {
        if (!selectedStamp) return;
        
        if (selectedStamp === 'memo') {
            pendingMemoPosition = e.latlng;
            (document.getElementById('memo-modal') as HTMLElement).classList.add('active');
        } else {
            addMarker(e.latlng, selectedStamp);
        }
    });
}

// スタンプボタン生成
function initStampButtons() {
    const grid = document.getElementById('stamp-grid')!;
    
    stamps.forEach(stamp => {
        const btn = document.createElement('button');
        btn.className = 'stamp-btn';
        btn.style.backgroundColor = stamp.color;
        btn.textContent = stamp.label;
        btn.onclick = () => selectStamp(stamp.id);
        btn.setAttribute('data-stamp', stamp.id);
        grid.appendChild(btn);
    });
}

// スタンプ選択
function selectStamp(stampId: string) {
    if (selectedStamp === stampId) {
        selectedStamp = null;
    } else {
        selectedStamp = stampId;
    }
    
    document.querySelectorAll('.stamp-btn').forEach(btn => {
        if (btn.getAttribute('data-stamp') === selectedStamp) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// マーカー追加
function addMarker(latlng: L.LatLng, stampId: string, text?: string) {
    const stamp = stamps.find(s => s.id === stampId)!;
    
    let iconHtml = '';
    if (stampId === 'memo' && text) {
        iconHtml = `
            <div style="background:${stamp.color};color:white;padding:6px 12px;
            border-radius:6px;font-weight:bold;font-size:12px;white-space:nowrap;
            box-shadow:0 2px 6px rgba(0,0,0,0.3)">${text}</div>
        `;
    } else if (stampId === 'caution') {
        iconHtml = `<div style="font-size:28px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">⚠️</div>`;
    } else {
        iconHtml = `
            <div style="background:${stamp.color};color:white;padding:4px 10px;
            border-radius:6px;font-weight:bold;font-size:11px;white-space:nowrap;
            box-shadow:0 2px 6px rgba(0,0,0,0.3)">${stamp.label}</div>
        `;
    }
    
    const icon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [0, 0],
        iconAnchor: [0, 0]
    });
    
    const marker = L.marker(latlng, { icon }).addTo(map);
    
    marker.bindPopup(`
        <div style="text-align:center">
            <strong>${stampId === 'memo' ? 'メモ' : stamp.label}</strong>
            ${text ? `<p style="margin:6px 0">${text}</p>` : ''}
            <button onclick="deleteMarker(${markers.length})" 
                style="background:#ef4444;color:white;border:none;padding:4px 10px;
                border-radius:4px;cursor:pointer;font-weight:bold;margin-top:6px">
                削除
            </button>
        </div>
    `);
    
    markers.push(marker);
}

// マーカー削除
(window as any).deleteMarker = (index: number) => {
    if (markers[index]) {
        map.removeLayer(markers[index]);
        markers[index] = null;
    }
};

// メモモーダル
(window as any).closeMemoModal = () => {
    document.getElementById('memo-modal')!.classList.remove('active');
    pendingMemoPosition = null;
};

(window as any).addMemo = () => {
    const input = document.getElementById('memo-input') as HTMLTextAreaElement;
    const text = input.value.trim();
    
    if (text && pendingMemoPosition) {
        addMarker(pendingMemoPosition, 'memo', text);
        (window as any).closeMemoModal();
        input.value = '';
    }
};

// 印刷範囲の境界取得
function getPrintBounds(): L.LatLngBounds {
    const frame = document.getElementById('print-frame')!;
    const frameRect = frame.getBoundingClientRect();
    const mapContainer = document.getElementById('map')!;
    const mapRect = mapContainer.getBoundingClientRect();
    
    // 枠の中心座標（地図コンテナ内での相対座標）
    const frameCenterX = frameRect.left + frameRect.width / 2 - mapRect.left;
    const frameCenterY = frameRect.top + frameRect.height / 2 - mapRect.top;
    
    // 枠の四隅の座標
    const topLeft = map.containerPointToLatLng([
        frameCenterX - frameRect.width / 2,
        frameCenterY - frameRect.height / 2
    ]);
    const bottomRight = map.containerPointToLatLng([
        frameCenterX + frameRect.width / 2,
        frameCenterY + frameRect.height / 2
    ]);
    
    return L.latLngBounds(topLeft, bottomRight);
}

// PDF出力
(window as any).exportPDF = async () => {
    const frame = document.getElementById('print-frame')!;
    const frameRect = frame.getBoundingClientRect();
    const mapContainer = document.getElementById('map')!;
    
    // html2canvasで印刷範囲をキャプチャ
    // @ts-ignore
    const canvas = await html2canvas(mapContainer, {
        x: frameRect.left - mapContainer.getBoundingClientRect().left,
        y: frameRect.top - mapContainer.getBoundingClientRect().top,
        width: frameRect.width,
        height: frameRect.height,
        useCORS: true,
        allowTaint: true,
        scale: 3 // 高解像度
    });
    
    // キャンバスを画像に変換
    const imgData = canvas.toDataURL('image/png');
    
    // PDF出力用のウィンドウを開く
    const pdfWindow = window.open('', '_blank');
    if (pdfWindow) {
        pdfWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>おさんぽマップ</title>
                <style>
                    @page { 
                        size: A4 portrait; 
                        margin: 10mm; 
                    }
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body { 
                        margin: 0; 
                        padding: 10mm;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background: white;
                    }
                    #map-image { 
                        width: 190mm; 
                        height: 190mm;
                        object-fit: contain;
                        display: block;
                    }
                    #credit {
                        text-align: center;
                        font-size: 9pt;
                        color: #666;
                        margin-top: 5mm;
                        font-family: sans-serif;
                    }
                    @media print {
                        body {
                            padding: 0;
                        }
                        #map-image {
                            width: 190mm;
                            height: 190mm;
                        }
                    }
                </style>
            </head>
            <body>
                <img id="map-image" src="${imgData}" alt="おさんぽマップ" />
                <div id="credit">地図データ: © OpenStreetMap contributors</div>
                <script>
                    // 画像読み込み完了後に自動的に印刷ダイアログを表示
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `);
        pdfWindow.document.close();
    }
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initStampButtons();
});