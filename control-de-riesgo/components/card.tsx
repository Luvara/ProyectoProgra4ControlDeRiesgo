import Image from "next/image";

const Card = ({ svg, title }) => {
  return (
    <div className="w-20 h-20 md:w-40 p-2">
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <Image
          src={svg}
          width={100}
          height={100}
          alt="Image"
          className="m-2 object-cover w-7 rounded-t-lg md:h-auto md:w-10 md:rounded-none md:rounded-l-lg"
        />
        <div className="hidden md:flex md:items-center md:justify-center leading-normal">
          <h5 className="text-base font-medium tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
      </a>
    </div>
  );
};

export default Card;
