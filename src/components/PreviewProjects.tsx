import React, { useState, useEffect } from "react";
import NormalProjects from "./NormalProjects";
import MinimizedProject from "./MinimizedProject";
import square_arrow from "../../public/icons/square-arrow-out-up-right.svg"
import { useTranslation } from "react-i18next";

const PreviewProjects: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [t] = useTranslation('global');

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex flex-col items-center">
      
      
      {width >= 930 ? <NormalProjects /> : <MinimizedProject />}
      <div className="flex gap-2 bg-dark-purple p-3">
        <h1> {t('projects.view_all_button')}</h1>
        <img src={square_arrow} alt="Arrow Icon" className="invert opacity-70" />
      </div>
    </div>
  );
};

export default PreviewProjects;