import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, content, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-400 p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <div className="flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={onCancel}>
            Cancelar
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
