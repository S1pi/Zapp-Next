import { useRef, useState } from "react";
import { MdCloudUpload, MdCheckCircle } from "react-icons/md";
import { Input } from "./Input";
import { useFormContext } from "react-hook-form";

type CustomImageInputProps = {
  inputName: string;
  labelText: string;
  imageHeight: string;
  className?: string;
  onFileChange?: (file: File | null) => void;
};

const CustomFileInput = ({
  inputName,
  labelText,
  className,
  imageHeight,
  onFileChange,
}: CustomImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setValue, resetField, clearErrors } = useFormContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);

    setPreviewUrl(URL.createObjectURL(file));

    // Callback function to parent component
    onFileChange && onFileChange(file);

    setValue(inputName, file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    clearErrors(inputName);
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    onFileChange && onFileChange(null);
    resetField(inputName);
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 text-seabed-green">
      {/* If component is reusable change this */}
      {/* <label className={`text-primary ${labelStyles}`} htmlFor={inputName}>
        {labelText}
      </label> */}

      <Input
        ref={fileInputRef}
        label={labelText}
        name={inputName}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {previewUrl && (
        <>
          <div className="flex items-center gap-2">
            <img
              src={previewUrl}
              alt="destination preview"
              className={`w-full rounded-lg object-cover ` + imageHeight}
            />
          </div>
          <div className="flex gap-4">
            <span
              className="cursor-pointer text-sm text-secondary underline"
              onClick={handleFileInputClick}
            >
              Change image
            </span>
            <button
              className="cursor-pointer text-sm text-red-500"
              onClick={() => {
                removeFile();
              }}
            >
              Remove
            </button>
          </div>
        </>
      )}
      <div
        className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-full bg-gradient-to-l from-blueg1 to-blueg2 px-3 py-1"
        onClick={handleFileInputClick}
      >
        {previewUrl ? (
          <>
            <span className="flex items-center gap-1">
              <MdCheckCircle className="text-green-400" /> {selectedFile?.name}
            </span>
          </>
        ) : (
          <div className="flex items-center gap-2 w-32">
            <MdCloudUpload className="text-4xl text-seabed-green" />
            <span className="text-sm text-seabed-green">Select image</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFileInput;
