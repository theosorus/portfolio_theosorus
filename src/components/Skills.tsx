import { useRef, useLayoutEffect, useState, useCallback } from "react";
import skillsData from "../data/skills.json";

const Skills = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [highlight, setHighlight] = useState({ top: 0, height: 0 });
  const [activeItem, setActiveItem] = useState(0);

  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      itemRefs.current[index] = el;
    }
  };

  const updateHighlight = useCallback(() => {
    if (!listRef.current || !itemRefs.current[activeItem]) return;

    const containerRect = listRef.current.getBoundingClientRect();
    const itemRect = itemRefs.current[activeItem].getBoundingClientRect();

    setHighlight({
      top: itemRect.top - containerRect.top,
      height: itemRect.height,
    });
  }, [activeItem]);

  useLayoutEffect(() => {
    updateHighlight();

    const handleResize = () => {
      updateHighlight();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeItem, skillsData, updateHighlight]);

  return (
    <div className="w-full m-4 rounded-xl flex flex-col items-stretch 
    md:w-2/3 md:flex-row md:m-10 wrap
    ">


      {/* Categories Title  (667) */}
      <div
        ref={listRef}
        className=" flex  relative  font-domine rounded-xl text-black
        md:w-1/3 md:flex-col md:text-white flex-wrap justify-center mb-5 md:mb-0"
      >

        {/* Selector     */ }
        <div
          className="absolute left-0 rounded-l-xl bg-white text-openai-dark-blue font-main transition-all duration-300 hidden
          md:inline"
          style={{
            top: highlight.top,
            height: highlight.height,
            width: "104%",
          }}
        />


        {Object.keys(skillsData).map((category, index) => (
            <div
            key={category}
            ref={(el) => setItemRef(el, index)}
            className={`md:w-auto text-center cursor-pointer md:p-6 
            md:py-7 z-10 md:bg-transparent rounded-3xl px-4 py-2 border-1 md:border-0 border-white m-1 md:m-0 ${
              activeItem === index ? "bg-white" : ""
            }`}
            onClick={() => setActiveItem(index)}
            >
            <h3
              className={`text-l ${
              activeItem === index
          ? "text-openai-dark-blue font-main "
          : "text-white"
              }`}
            >
              {category}
            </h3>
            </div>
        ))}
      </div>



        {/* Skills image */}
      <div className="w-full md:w-3/4 text-openai-dark-blue rounded-xl bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Object.values(skillsData)[activeItem].map(
            (skill: { name: string; image: string }) => (
              <div key={skill.name} className="p-4">
                <img
                  src={`/skills/${skill.image}`}
                  alt={skill.name}
                  className="w-20 h-20 mx-auto object-contain"
                />
                <h4 className="text-m text-center">{skill.name}</h4>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;