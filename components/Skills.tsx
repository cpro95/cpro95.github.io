import { motion } from "framer-motion";
import Skill from "./Skill";

type Props = {};

// type skillType = {
//   skillImage: string;
//   skillEffiency: string;
// };

const mySkills = [
  {
    skillImage: "/html5.png",
    skillEffiency: "95%",
  },
  {
    skillImage: "/css.png",
    skillEffiency: "80%",
  },
  {
    skillImage: "/javascript.png",
    skillEffiency: "95%",
  },
  {
    skillImage: "/typescript.webp",
    skillEffiency: "80%",
  },
  {
    skillImage: "/nodejs.png",
    skillEffiency: "90%",
  },
  {
    skillImage: "/react.png",
    skillEffiency: "90%",
  },
  {
    skillImage: "/nextjs.png",
    skillEffiency: "85%",
  },
  {
    skillImage: "/remix.png",
    skillEffiency: "90%",
  },
  {
    skillImage: "/svelte.png",
    skillEffiency: "85%",
  },
  {
    skillImage: "/c-lang.png",
    skillEffiency: "85%",
  },
  {
    skillImage: "/cplusplus.webp",
    skillEffiency: "85%",
  },
  {
    skillImage: "/golang.png",
    skillEffiency: "75%",
  },
  {
    skillImage: "/rust.png",
    skillEffiency: "35%",
  },
];

function Skills({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Skills
      </h3>

      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        Hover over a skills
      </h3>

      <div className="grid grid-cols-4 gap-5">
        {mySkills.map((skill, i) => (
          <Skill
            key={i}
            directionLeft={i < 8 ? true : false}
            skillImage={skill.skillImage}
            skillEffiency={skill.skillEffiency}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Skills;
