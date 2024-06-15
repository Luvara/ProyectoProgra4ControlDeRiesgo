"use client";

import React from 'react';
import { CldUploadButton } from 'next-cloudinary';

interface UploadButtonProps {
  answ_id: number | null;
  answ_evidence: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ answ_id, answ_evidence }) => {
  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      fetch('/api/cloudinary', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: result.info.secure_url, answ_id: answ_id }),
      });
    }
  };

  const isButtonDisabled = answ_id === null || answ_id === 0;

  return (
    <div>
      {isButtonDisabled || answ_evidence ? (
        <button disabled className="bg-gray-400 text-gray-700 cursor-not-allowed py-2 px-4 rounded">Subir archivo</button>
      ) : (
        <CldUploadButton
          uploadPreset="my_upload_preset"
          onSuccess={handleUpload}
        >
          Subir archivo
        </CldUploadButton>
      )}
    </div>
  );
};

export default UploadButton;
