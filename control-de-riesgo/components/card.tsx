import Image from "next/image";

const Card = ({
  svg,
  title,
  onClick,
  isActive,
}: {
  svg: string;
  title: string;
  onClick: any;
  isActive: boolean;
}) => {
  return (
    <div className="flex w-full " onClick={onClick}>
      <a
        href="#"
        className={`flex justify-center border w-full p-2 border-gray-200 rounded-lg  hover:bg-slate-600 text-white btn-form ${isActive ? 'btn-form-active' : 'btn-form'}`}
      >
        <Image src={svg} width={40} height={40} alt="Image" className="lg:me-2" />
        <div className="hidden lg:flex lg:items-center lg:justify-center leading-normal">
          <p className="text-base font-medium tracking-tight ">{title}</p>
        </div>
      </a>
    </div>
  );
};

export default Card;
