const Title = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex justify-center items-center py-8 px-4 bg-red-50">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 tracking-wider leading-tight capitalize">
        {title}
      </h1>
    </div>
  );
};

export default Title;
