
import React, { useState, useEffect } from 'react';

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (text: string) => void;
}

const MemoModal: React.FC<MemoModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setText('');
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print:hidden">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">メモを追加</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="ここにメモを入力..."
          autoFocus
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            キャンセル
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoModal;
