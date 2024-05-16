export default function TranstionBox({
  name,
  value,
  title,
}: {
  name: string;
  value: string;
  title: string;
}) {
  return (
    <div className="h-80 border rounded mt-10 bg-[#ededed] shadow-xl">
      <div className="w-full h-2/3 relative">
        <div className="w-[95%] bg-[#0e4884] absolute h-[110%] rounded-lg translate-x-1/2 right-1/2 top-[-30px] shadow-lg"></div>
      </div>
      <div className="w-[90%] mx-auto flex">
        <h2 className="lg:text-xl font-bold text-[#0e4884]">{name}</h2>
        <h2 className="lg:text-xl ms-auto font-bold text-[#0e4884]">{value}</h2>
      </div>
      <hr className="border-black border-1 mt-5 w-[90%] mx-auto" />
      <p className="w-[90%] mx-auto mt-3 text-gray-700">{title}</p>
    </div>
  );
}
