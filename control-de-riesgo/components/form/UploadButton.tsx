"use client";
import React, { useState, useEffect } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Answer } from "../index";

interface UploadButtonProps {
  answer: Answer;
  answ_evidence: string;
  onUploadSuccess: (url: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  answer,
  answ_evidence,
  onUploadSuccess,
}) => {
  const [url, setUrl] = useState("");
  const [isClosed, setIsClosed] = useState(false);

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      const urlResult = result.info.secure_url;
      setUrl(urlResult);
      console.log("URL:", urlResult);
    }
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  useEffect(() => {
    if (url && isClosed) {
      console.log("URL saved:", url);
      onUploadSuccess(url);
      setIsClosed(false); // Reset isClosed after saving URL
    }
  }, [url, isClosed, onUploadSuccess]);

  const isButtonDisabled =
    (answer.answ_answer !== "yes" && answer.answ_answer !== "no") ||
    !!answ_evidence;

  return (
    <div>
      {!isButtonDisabled ? (
        <CldUploadButton
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          uploadPreset="my_upload_preset"
          onSuccess={handleUpload}
          onClose={handleClose}
          options={{
            multiple: false,
            resourceType: "image",
            singleUploadAutoClose: false,
          }}
        >
          Subir archivo
        </CldUploadButton>
      ) : (
        <button
          disabled
          className="bg-gray-400 text-gray-700 cursor-not-allowed py-2 px-4 rounded"
        >
          Subir archivo
        </button>
      )}
    </div>
  );
};

export default UploadButton;
