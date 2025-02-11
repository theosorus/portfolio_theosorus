import skillsData from "../data/skills.json";
import { useRef, useEffect, useState } from "react";

const Skills = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [highlight, setHighlight] = useState({ top: 0, height: 0 });
  const [activeItem, setActiveItem] = useState(0);

  const setItemRef = (el: HTMLDivElement, index: number) => {
    itemRefs.current[index] = el;
  };

  useEffect(() => {
    if (listRef.current && itemRefs.current[activeItem]) {
      const containerRect = listRef.current.getBoundingClientRect();
      const itemRect = itemRefs.current[activeItem].getBoundingClientRect();
      setHighlight({
        top: itemRect.top - containerRect.top,
        height: itemRect.height,
      });
    }
  }, [activeItem, skillsData]);

  return (
    <div className="w-2/3 m-10 rounded-xl flex items-stretch">
      <div
        ref={listRef}
        className="w-1/3 relative text-white font-domine rounded-xl"
      >
        <div
          className="absolute left-0 rounded-l-xl bg-white text-openai-dark-blue font-main transition-all duration-300"
          style={{
            top: highlight.top,
            height: highlight.height,
            width: "103%",
          }}
        />
        {Object.keys(skillsData).map((category, index) => (
          <div
            key={category}
            ref={(el) => {
              if (el) setItemRef(el, index);
            }}
            className="relative text-center cursor-pointer p-6 py-7 z-10"
            onClick={() => setActiveItem(index)}
          >
            <h3
              className={`text-l ${
                activeItem === index
                  ? "text-openai-dark-blue font-main"
                  : "text-white "
              }`}
            >
              {category}
            </h3>
          </div>
        ))}
      </div>

      <div
        className={`w-3/4 text-openai-dark-blue rounded-xl bg-white`}
      >
        <div className="grid grid-cols-5">
          {Object.values(skillsData)[activeItem].map(
            (skill: { name: string; image: string }) => (
              <div key={skill.name} className="p-4 ">
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
