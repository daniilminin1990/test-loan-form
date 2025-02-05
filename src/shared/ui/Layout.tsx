import { ReactNode } from "react";
import s from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={s.layout}>
      {children}
    </div>
  );
};
