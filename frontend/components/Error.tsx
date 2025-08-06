import { BiErrorCircle } from "react-icons/bi";
import language from "@/translations/en.json";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 px-4">
      <BiErrorCircle className="text-[100px] mb-6" />
      <h1 className="text-2xl font-semibold mb-2">
        {language.fetch.errors.generic}
      </h1>
      <p className="text-center text-sm text-red-600">
        {language.fetch.errors.supportMessage}
      </p>
    </div>
  );
};
export default Error;
