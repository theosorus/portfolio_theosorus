import { useState } from "react";
import { useEffect } from "react";
import skillsData from "../data/skills.json";

const Skills: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number>(0);

  useEffect(() => {
    console.log(skillsData);
  }, []);

  return (
    <div className="w-2/3 bg-amber-50 m-10 rounded-xl flex">
      <div className="w-1/3 h-full rounded-xl bg-dark-purple">
        {Object.keys(skillsData).map((category, index) => (
          <div
            key={category}
            className={`text-center cursor-pointer p-3  ${
              activeItem === index ? "bg-light-purple rounded-xl" : ""
            }`}
            onClick={() => setActiveItem(index)}
          >
            <h3 className="text-2xl">{category}</h3>
          </div>
        ))}
      </div>

      <div className="w-3/4 h-full text-dark-purple grid grid-cols-5 gap-4">
        {Object.values(skillsData)[activeItem].map(
          (skill: { name: string; image: string }) => (
            <div key={skill.name} className="p-2">
              <img src={`/skills/${skill.image}`} alt={skill.name} className="w-20 h-20 mx-auto object-contain" />
              <h4 className="text-xl text-center">{skill.name}</h4>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Skills;
