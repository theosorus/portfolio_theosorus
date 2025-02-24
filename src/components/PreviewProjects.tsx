import React, { useState, useEffect } from "react";
import NormalProjects from "./NormalProjects";
import MinimizedProject from "./MinimizedProject";

const PreviewProjects: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width >= 930 ? <NormalProjects /> : <MinimizedProject />;
};

export default PreviewProjects;