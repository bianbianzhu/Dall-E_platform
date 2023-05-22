import { download } from '../../assets';
import { IPost } from '../../constants/interfaces';
import { captialize, downloadImage } from '../../utils';

const Card = ({ _id, name, prompt, imageUrl }: IPost) => {
  return (
    <div className="card group relative rounded-xl shadow-card hover:shadow-cardhover">
      <img
        src={imageUrl}
        alt={prompt}
        className="h-auto w-full rounded-xl object-center"
      />

      <div className="absolute bottom-0 left-0 m-2 hidden max-h-[94.5%] flex-col rounded-md bg-backgroundBlack p-4 group-hover:flex">
        <p className="prompt overflow-y-auto text-sm text-white">{prompt}</p>

        <div className="mt-5 flex items-center justify-between gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-darkGreen object-cover text-xs font-bold text-white">
            {captialize(name.charAt(0))}
          </div>
          <p className="mr-auto text-sm text-white">{captialize(name)}</p>

          <button
            className="border-none bg-transparent outline-none"
            type="button"
            onClick={() => {
              downloadImage(_id, imageUrl);
            }}
          >
            <img
              src={download}
              alt="download-icon"
              className="aspect-square w-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
