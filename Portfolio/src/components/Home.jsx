import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import Navbar from "./Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faXTwitter,
  faLinkedin,
  faDiscord,
  faBootstrap,
  faFontAwesome,
  faSquareJs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPaperPlane,
  faCaretRight,
  faAngleRight,
  faCaretDown,
  faUser,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const techIconMap = {
  JavaScript: faSquareJs,
  P5js: faCode,
  Bootstrap5: faBootstrap,
  FontAwesome: faFontAwesome,
};

function SectionBG({ link, classes, children }) {
  const cardRef = useRef(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const animationFrame = useRef(null);

  const animate = () => {
    const card = cardRef.current;
    const speed = 0.1;
    const delta = targetRotation.current - currentRotation.current;
    currentRotation.current += delta * speed;

    card.style.transform = `perspective(1000px) rotateY(${currentRotation.current}deg)`;

    animationFrame.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    targetRotation.current = (x / width - 0.5) * 30;
  };

  const resetRotation = () => {
    targetRotation.current = 0;
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  return (
    <Link
      to={`${link}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      className={`transition-transform ${classes}`}
    >
      {children}
    </Link>
  );
}

function ProjectCard({ image, name, description, tech }) {
  return (
    <SectionBG
      link="https://github.com/ZxsmDev/HellOrbit"
      classes="bg-indigo-900/50 shadow-md rounded-xl border-2 border-indigo-900 duration-100 will-change-transform"
      children={
        <>
          <img
            src={image}
            alt={name}
            className="w-full h-40 object-cover rounded-t-xl rounded-b-lg"
          />
          <div className="mx-6 mt-4 mb-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{name}</h3>
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
            <p className=" mt-2 text-sm text-gray-500 text-start line-clamp-3">
              {description}
            </p>
            <div className="flex gap-3 mt-4 overflow-hidden">
              {Object.entries(tech)
                .slice(0, 5)
                .map(([label, color], index) => (
                  <span
                    key={index}
                    className={`flex items-center text-s font-semibold ${color} px-1 py-1 rounded`}
                  >
                    <FontAwesomeIcon icon={techIconMap[label] || faCode} />
                  </span>
                ))}
            </div>
          </div>
        </>
      }
    />
  );
}

function Home({ pages, lastThreeProjects }) {
  return (
    <>
      <Navbar pages={pages} />
      <div className="flex flex-col items-center text-center gap-16 py-8 px-128 max-w-full bg-bg/50">
        <section className="space-y-2">
          <h1 className="text-5xl text-text font-bold text-shadow-lg/30">
            Hi, I'm Zxsm
          </h1>
          <h2 className="text-xl text-text text-shadow-lg/30">
            Game and Web Developer
          </h2>
        </section>

        {/* About Me */}
        <SectionBG
          link="/About Me"
          classes="w-full bg-fg/80 rounded-2xl px-6 py-12 flex flex-col items-center gap-4 shadow-md backdrop-blur-[2px] border-2 border-indigo-900 duration-200 will-change-transform"
          children={
            <div className="flex flex-row items-center gap-6">
              <FontAwesomeIcon
                icon={faUser}
                className="w-32 h-32 rounded-full text-header/75 bg-indigo-900/90 text-[80px] px-0 py-6"
              />
              <div>
                <div className="flex items-center text-center gap-2">
                  <h2 className="text-2xl font-semibold text-header">
                    About Me
                  </h2>
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-header"
                  />
                </div>
                <p className="text-sm text-text-2 max-w-xl text-start">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  molestiae voluptatem suscipit corrupti libero quae deserunt,
                  assumenda molestias nihil modi similique fuga tempora aut
                  facere voluptatum. Deleniti maxime explicabo, voluptates,
                  magni quibusdam quos ex tempore deserunt atque alias eveniet
                  vel.
                </p>
              </div>
            </div>
          }
        />

        {/* Projects */}
        <section className="w-full bg-fg/80 rounded-2xl p-10 flex flex-col gap-4 shadow-md backdrop-blur-[2px] border-2 border-indigo-900">
          <div className="flex items-center gap-2">
            <Link to="/projects" className="text-2xl font-semibold text-header">
              Projects <FontAwesomeIcon icon={faCaretRight} />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <h4>Recent</h4>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lastThreeProjects.map((project) => {
              return (
                <ProjectCard
                  image={project.image}
                  name={project.name}
                  description={project.description}
                  tech={project.tech}
                />
              );
            })}
          </div>
        </section>

        {/* Dev Logs */}
        <section className="w-full bg-fg/80 rounded-2xl p-10 flex flex-col gap-4 shadow-md backdrop-blur-[2px] border-2 border-indigo-900">
          <div className="flex items-center gap-2">
            <Link to="/devlogs" className="text-2xl font-semibold text-header">
              Devlogs <FontAwesomeIcon icon={faCaretRight} />
            </Link>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lastFiveDevlogs.map((devlog) => {
              return (
                <Devlog
                  name={devlog.name}
                  content={devlog.content}
                  date={devlog.date}
                />
              );
            })}
          </div> */}
        </section>

        {/* Contact */}
        <section className="w-full bg-fg/80 rounded-2xl p-10 flex flex-col gap-1 shadow-md backdrop-blur-[2px] border-2 border-indigo-900">
          <div className="flex items-center gap-2">
            <span to="/resume" className="text-2xl font-semibold text-header">
              Contact
            </span>
          </div>
          <div className="flex flex-row">
            <form className="flex flex-col gap-4 p-6 shadow-md rounded-lg w-3/4">
              <input
                type="text"
                placeholder="Name"
                className="p-2 border rounded-lg border-indigo-900"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded-lg border-indigo-900"
              />
              <textarea
                placeholder="Message"
                className="p-2 border rounded-lg resize-none border-indigo-900"
              />
              <button
                type="submit"
                className="flex font-bold justify-center items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-800 hover:cursor-pointer shadow-md transition-colors"
              >
                <h4>Send</h4>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
            <div className="flex flex-col justify-center items-center gap-6 text-3xl w-1/4">
              <a
                href="https://github.com/ZxsmDev"
                target="_blank"
                className="hover:text-purple-500 transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://ca.linkedin.com/"
                target="_blank"
                className="hover:text-purple-500 transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://discord.com/"
                target="_blank"
                className="hover:text-purple-500 transition-colors"
              >
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                className="hover:text-purple-500 transition-colors"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>
        </section>

        <footer></footer>
      </div>
    </>
  );
}

export default Home;
