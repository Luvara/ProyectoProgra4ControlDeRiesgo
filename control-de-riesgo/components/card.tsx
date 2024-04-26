const Card = ({ title, description, icon }: { title: string, description: string, icon: JSX.Element }) => {
  return (
    <div className="xl:w-60 md:w-56 p-2">
      <div className="border h-full border-gray-200 p-6 rounded-lg">
        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
          {icon ? icon : (
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          )}
        </div>
        <h2 className="text-xl text-white font-semibold title-font mb-2">{title}</h2>
        <p className="leading-relaxed text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
