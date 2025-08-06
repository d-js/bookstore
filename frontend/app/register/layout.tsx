import Title from "@/components/Title";
import { ReactNode } from "react";
import language from "@/translations/en.json";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Title title={language.pages.labels.register} />
      {children}
    </>
  );
};
export default layout;
