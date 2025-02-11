import { useState } from "react";
import { useEffect } from "react";
import skillsData from "../data/skills.json";

const Skills: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number>(0);

  useEffect(() => {
    console.log(skillsData);
  }, []);

  return (
    <div className="w-2/3 m-10 rounded-xl flex items-stretch bg-white">
      <div className="w-1/3 h-full text-white font-domine rounded-xl">
        {Object.keys(skillsData).map((category, index) => (
          <div
            key={category}
            className={`text-center cursor-pointer p-6 ${
              activeItem === index
                ? " rounded-l-xl text-openai-dark-blue"
                : "bg-openai-dark-blue "
            }`}
            onClick={() => setActiveItem(index)}
          >
            <h3 className="text-l">{category}</h3>
          </div>
        ))}
      </div>

      <div className="w-3/4 text-openai-dark-blue h-full  grid grid-cols-5 gap-4 rounded-r-xl">
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
  );
};

export default Skills;