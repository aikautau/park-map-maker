// @ts-ignore
import L from 'leaflet';

// スタンプの定義
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

// 状態管理
let map: any;
let printMap: any = null;
let selectedStamp: string | null = null;
let markers: any[] = [];
let printMarkers: any[] = [];
let pendingMemoPosition: L.LatLng | null = null;

// 地図の初期化
function initMap() {
    map = L.map('map').setView([35.6895, 139.6917], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // 地図クリックイベント
    map.on('click', (e: any) => {
        if (!selectedStamp) return;
        
        if (selectedStamp === 'memo') {
            pendingMemoPosition = e.latlng;
            openModal();
        } else {
            addMarker(e.latlng, selectedStamp);
        }
    });
}

// 印刷用地図を準備
function preparePrintMap() {
    // 既存の印刷用地図を削除
    if (printMap) {
        printMap.remove();
        printMap = null;
    }

    // 現在の地図の表示範囲を取得
    const bounds = map.getBounds();
    const center = map.getCenter();
    const zoom = map.getZoom();

    // 印刷用地図コンテナを作成
    const printContainer = document.getElementById('print-map')!;
    
    // 印刷用地図を初期化
    printMap = L.map('print-map', {
        zoomControl: false,
        attributionControl: false
    }).setView(center, zoom);
    
    // 同じタイルレイヤーを追加
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(printMap);

    // 表示範囲を合わせる
    printMap.fitBounds(bounds);

    // スタンプをコピー
    printMarkers = [];
    markers.forEach((marker) => {
        if (marker) {
            const latlng = marker.getLatLng();
            const icon = marker.options.icon;
            const printMarker = L.marker(latlng, { icon }).addTo(printMap);
            printMarkers.push(printMarker);
        }
    });

    // 地図のレンダリングを待つ
    setTimeout(() => {
        printMap.invalidateSize();
    }, 100);
}

// 印刷実行
(window as any).printMap = () => {
    preparePrintMap();
    setTimeout(() => {
        window.print();
    }, 500);
};

// スタンプボタンの生成
function initStampButtons() {
    const grid = document.getElementById('stamp-grid')!;
    const mobileGrid = document.getElementById('mobile-stamp-grid')!;
    
    stamps.forEach(stamp => {
        // デスクトップ用ボタン
        const btn = document.createElement('button');
        btn.className = 'stamp-btn';
        btn.style.backgroundColor = stamp.color;
        btn.textContent = stamp.label;
        btn.onclick = () => selectStamp(stamp.id);
        btn.setAttribute('data-stamp', stamp.id);
        grid.appendChild(btn);

        // モバイル用ボタン
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'stamp-btn';
        mobileBtn.style.backgroundColor = stamp.color;
        mobileBtn.textContent = stamp.label;
        mobileBtn.onclick = () => selectStamp(stamp.id);
        mobileBtn.setAttribute('data-stamp', stamp.id);
        mobileGrid.appendChild(mobileBtn);
    });
}

// スタンプ選択
function selectStamp(stampId: string) {
    if (selectedStamp === stampId) {
        selectedStamp = null;
    } else {
        selectedStamp = stampId;
    }
    
    // UIの更新
    document.querySelectorAll('.stamp-btn').forEach(btn => {
        if (btn.getAttribute('data-stamp') === selectedStamp) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// マーカーの追加
function addMarker(latlng: L.LatLng, stampId: string, text?: string) {
    const stamp = stamps.find(s => s.id === stampId)!;
    
    // カスタムアイコンの作成
    let iconHtml = '';
    
    if (stampId === 'memo' && text) {
        iconHtml = `
            <div style="
                display: inline-block;
                background: ${stamp.color};
                color: white;
                padding: 8px 14px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 14px;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            ">${text}</div>
        `;
    } else if (stampId === 'caution') {
        iconHtml = `
            <div style="
                display: inline-block;
                font-size: 32px;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            ">⚠️</div>
        `;
    } else {
        iconHtml = `
            <div style="
                display: inline-block;
                background: ${stamp.color};
                color: white;
                padding: 6px 12px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 13px;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            ">${stamp.label}</div>
        `;
    }
    
    const icon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [0, 0],
        iconAnchor: [0, 0]
    });
    
    const marker = L.marker(latlng, { icon }).addTo(map);
    
    // ポップアップの追加
    const popupContent = `
        <div style="text-align: center;">
            <strong>${stampId === 'memo' ? 'メモ' : stamp.label}</strong>
            ${text ? `<p style="margin: 8px 0;">${text}</p>` : ''}
            <button onclick="deleteMarker(${markers.length})" style="
                background: #ef4444;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
                margin-top: 8px;
            ">削除</button>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    markers.push(marker);
}

// マーカー削除
(window as any).deleteMarker = (index: number) => {
    if (markers[index]) {
        map.removeLayer(markers[index]);
        markers[index] = null;
    }
};

// モーダル操作
(window as any).openModal = () => {
    document.getElementById('modal')!.classList.add('active');
    (document.getElementById('memo-input') as HTMLTextAreaElement).value = '';
    (document.getElementById('memo-input') as HTMLTextAreaElement).focus();
};

(window as any).closeModal = () => {
    document.getElementById('modal')!.classList.remove('active');
    pendingMemoPosition = null;
};

(window as any).addMemo = () => {
    const input = document.getElementById('memo-input') as HTMLTextAreaElement;
    const text = input.value.trim();
    
    if (text && pendingMemoPosition) {
        addMarker(pendingMemoPosition, 'memo', text);
        (window as any).closeModal();
    }
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initStampButtons();
});