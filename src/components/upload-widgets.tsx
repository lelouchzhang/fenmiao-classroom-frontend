import {
  ALLOWED_TYPES,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  MAX_FILE_SIZE,
} from "@/constant";
import { UploadWidgetProps, UploadWidgetValue } from "@/types";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const UploadWidgets = ({
  value = null,
  onChange,
  disabled = false,
}: UploadWidgetProps) => {
  // 预览上传的图片
  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);

  // 渲染中使用ref，持久化cld upload widget
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  // 每次渲染都同步最新onChange结果，但不触发重渲染，以解决陈旧闭包问题。
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initialWidget = () => {
      if (!window.cloudinary || widgetRef.current) return false;
      widgetRef.current = window.cloudinary?.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          multiple: false,
          folder: "uploads",
          maxFileSize: MAX_FILE_SIZE,
          clientAllowedFormats: ALLOWED_TYPES,
        },
        (error, result) => {
          if (!error && result.event === "success") {
            const payload: UploadWidgetValue = {
              url: result.info.secure_url,
              publicId: result.info.public_id,
            };
            setPreview(payload);
            onChangeRef.current?.(payload);
          }
        }
      );
      return true;
    };
    if (initialWidget()) return;

    const intervalId = window.setInterval(() => {
      if (initialWidget()) {
        window.clearInterval(intervalId);
      }
    }, 500);
    return () => {
      window.clearInterval(intervalId);
      if (widgetRef.current) {
        widgetRef.current.destroy();
        widgetRef.current = null;
      }
    };
  }, []);

  const openWidget = () => {
    if (!disabled) widgetRef.current?.open();
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="upload-preview">
          <img src={preview.url} alt="uploaded file preview" />
        </div>
      ) : (
        <div
          className="upload-dropzone"
          role="button"
          tabIndex={0}
          onClick={openWidget}
        >
          <div className="upload-prompt">
            <UploadCloud className="icon" />
            <div>
              <p>Click to upload photo</p>
              <p>png, jpg, webp up to 3MB</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWidgets;
