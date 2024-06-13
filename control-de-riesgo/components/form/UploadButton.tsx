"use client"; // Asegúrate de añadir esto si estás usando Next.js 13+

import React from 'react';
import { CldUploadButton } from 'next-cloudinary';

interface UploadButtonProps {
    answ_id: Number;
}

const UploadButton: React.FC<UploadButtonProps> = ({ answ_id }) => {
  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      console.log('Upload successful: ', result.info);
      // Aquí puedes enviar el resultado al backend para guardarlo en la base de datos
      fetch('/api/cloudinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: result.info.secure_url , answ_id : answ_id}),
      });
    }
  };

  return (
    <div>
      <CldUploadButton
        uploadPreset="my_upload_preset"
        onSuccess={handleUpload}
      >
        Subir archivo
      </CldUploadButton>
    </div>
  );
};

export default UploadButton;