import { motion } from "framer-motion";

type Props = {};

type Project = {
  project_title: string;
  project_image: string;
  project_desc: string;
};

const myProjects: Project[] = [
  {
    project_title: "cpro95.tistory.com",
    project_image: "/project-tistory.png",
    project_desc: `Blog of Tistory.
    Early form of blog, using daum tistory service.
    When I taught myself Remix Framework, I started to host my own blog site.
    `,
  },
  {
    project_title: "mycodings.fly.dev",
    project_image: "/project-mycodings.png",
    project_desc: `Blog of myCodings.fly.dev
    This site was built with Remix Framework,
    especially with Speed Metal Stack.
    It uses github for mark down file saving,
    is serving with Fly.io.
    `,
  },
  {
    project_title: "mymovies.fly.dev",
    project_image: "/project-mymovies.png",
    project_desc: `Blog of mymovies.fly.dev.
    This site was built with Remix Framework,
    especially with Indie stack and API of TMDB movie DB,
    It was serving with Fly.io
    `,
  },
];

function Projects({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x  snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
        {myProjects.map((project, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-10"
          >
            <img src={project.project_image} className="w-56" />
            {/* <motion.img
              initial={{
                y: -300,
                opacity: 0,
              }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={project.project_image}
              className="w-56"
            /> */}

            <div className="space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-4xl font-semibold text-center">
                {project.project_title}
              </h4>

              <p className="text-lg text-center md:text-left">
                {project.project_desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
}

export default Projects;
