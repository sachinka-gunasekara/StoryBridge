import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onConfirm, bookTitle }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-lg text-center font-semibold mb-8">Are you sure you want to delete &quot;{bookTitle}&quot;?</h2>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-500 text-gray-500 rounded hover:bg-gray-600 hover:text-white">Cancel</button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
