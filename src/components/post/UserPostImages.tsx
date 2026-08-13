import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import type { Images } from "../../types";

interface Props {
  images: Images[];
}

const UserPostImages = ({ images }: Props) => {
  if (!images?.length) return null;

  const gridColumns =
    images.length === 1 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3";
  const aspectClass =
    images.length === 1 ? "aspect-[5/3] sm:aspect-[4/3]" : "aspect-[3/2]";

  return (
    <PhotoProvider>
      <div className={`grid ${gridColumns} gap-2`}>
        {images.map((image, index) => (
          <PhotoView key={`${image.url}-${index}`} src={image.url}>
            <div className="overflow-hidden rounded-md bg-slate-100 transition-transform duration-300 hover:scale-[1.01] cursor-pointer">
              <div className={`${aspectClass} w-full`}>
                <img
                  src={image.url}
                  alt="POST"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default UserPostImages;
