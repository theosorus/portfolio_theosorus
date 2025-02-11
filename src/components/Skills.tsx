import { useState } from "react";
import { useEffect } from "react";
import skillsData from "../data/skills.json";

const Skills: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number>(0);

  useEffect(() => {
    console.log(skillsData);
  }, []);

  return (
    <div className="w-2/3 m-10 rounded-xl flex items-stretch">
      <div className="w-1/3 text-white font-domine rounded-xl">
        {Object.keys(skillsData).map((category, index) => (
          <div
            key={category}
            className={`text-center cursor-pointer p-6 py-7 ${
              activeItem === index
                ? " rounded-l-xl text-openai-dark-blue bg-white font-main"
                : ""
            }`}
            onClick={() => setActiveItem(index)}
          >
            <h3 className="text-l">{category}</h3>
          </div>
        ))}
      </div>
  
      <div className={ `w-3/4 text-openai-dark-blue rounded-xl bg-white
        ${activeItem === 0 ? " rounded-tl-none" : ""}
        ${activeItem === Object.keys(skillsData).length - 1 ? " rounded-bl-none" : ""}`

      }
      
      
      
      
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