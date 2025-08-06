import Title from "@/components/Title";
import { ReactNode } from "react";
import language from "@/translations/en.json";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Title title={language.pages.labels.login} />
      {children}
    </div>
  );
};
export default layout;
