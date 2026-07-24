import { MdDeleteOutline } from "react-icons/md";

type ImageUploaderProps = {
  images: File[];
  onChangeImages: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
};

function ImageUploader({
  images,
  onChangeImages,
  removeImage,
}: ImageUploaderProps) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <label className="text-sm font-medium text-slate-700">
        Upload Images
      </label>

      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={onChangeImages}
        className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
      />

      <p className="text-xs text-slate-500">Maximum 4 images</p>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => {
            const preview = URL.createObjectURL(image);

            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border"
              >
                <img
                  src={preview}
                  alt={image.name}
                  className="h-40 w-full object-cover"
                  onLoad={() => URL.revokeObjectURL(preview)}
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white hover:bg-red-600"
                >
                  <MdDeleteOutline />
                </button>

                <div className="truncate bg-white p-2 text-xs">
                  {image.name}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
