import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBootstrap,
  faFontAwesome,
  faSquareJs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPaperPlane,
  faCaretRight,
  faCaretDown,
  faUser,
  faCode,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const techIconMap = {
  "JavaScript": faSquareJs,
  "P5.js": faCode,
  "Bootstrap 5": faBootstrap,
  "FontAwesome": faFontAwesome,
};

function useCardAnimation() {
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

    targetRotation.current = (x / width - 0.5) * 20;
  };

  const resetRotation = () => {
    targetRotation.current = 0;
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  return { cardRef, handleMouseMove, resetRotation };
}

function SectionBG({ link, classes, children }) {
  const { cardRef, handleMouseMove, resetRotation } = useCardAnimation();

  return (
    <Link
      to={link}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      className={`transition-transform ${classes}`}
      children={children}
    />
  );
}

function ProjectCard({ image, name, description, tech, link }) {
  return (
    <SectionBG
      link={link}
      classes="bg-indigo-900/50 shadow-md rounded-xl border-2 border-indigo-900 duration-100 will-change-transform hover:border-purple-500"
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
            <div className="flex gap-2 mt-4 overflow-visible">
              {Object.entries(tech)
                .slice(0, 6)
                .map(([label, color], index) => (
                  <span
                    key={`${label}-${index}`}
                    className={`flex items-center text-[18px] ${color} px-1`}
                  >
                    <span className="tooltip">
                      <FontAwesomeIcon icon={techIconMap[label] || faCode} />
                      <span className="tooltiptext">{label}</span>
                    </span>
                  </span>
                ))}
            </div>
          </div>
        </>
      }
    />
  );
}

function Devlog({ project, logNumber, content, date }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <button
      className="bg-indigo-900/50 shadow-md rounded-xl border-2 border-indigo-900 px-6 py-4 hover:border-purple-500 hover:cursor-pointer"
      onClick={toggleOpen}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <FontAwesomeIcon icon={isOpen ? faCaretDown : faCaretRight} />
          <h3 className="font-bold">
            {project} Devlog #{logNumber}
          </h3>
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        <div
          className={`transition-all duration-400 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 text-sm text-gray-500 text-start">{content}</div>
        </div>
      </div>
    </button>
  );
}

function ContactLink({ icon, link }) {
  return (
    <a
      href={link}
      target="_blank"
      className="hover:text-purple-500 hover:cursor-pointer transition-all duration-500"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}

function InputField({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="p-2 border rounded-lg border-indigo-900 focus:outline-2 focus:outline-offset-2 focus:outline-purple-500"
    />
  );
}

function Home({ pages, lastThreeProjects, links, lastFiveDevlogs }) {
  return (
    <>
      <div className="flex flex-col items-center bg-bg/50 scroll-smooth">
        <div className="w-full sticky top-0 z-50 pt-6">
          <Navbar pages={pages} />
        </div>

        <div className="flex flex-col items-center text-center gap-16 px-4 max-w-screen-lg w-full mt-16">
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
            classes="w-full bg-fg/80 rounded-2xl px-6 py-12 flex flex-col items-center gap-4 shadow-md backdrop-blur-[2px] border-2 border-indigo-900 duration-200 will-change-transform hover:border-purple-500"
            children={
              <div className="flex flex-row items-center gap-6">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-32 h-32 rounded-full text-header/75 bg-indigo-900/90 text-[80px] px-0 py-6"
                />
                <div>
                  <div className="flex items-center text-center gap-2">
                    <h2 className="text-2xl font-semibold text-header hover:underline">
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
              <Link
                to="/projects"
                className="text-2xl font-semibold text-header hover:underline"
              >
                Projects <FontAwesomeIcon icon={faCaretRight} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {lastThreeProjects.map((project) => {
                return (
                  <ProjectCard
                    image={project.image}
                    name={project.name}
                    description={project.description}
                    tech={project.tech}
                    link={project.repo}
                  />
                );
              })}
            </div>
          </section>

          {/* Dev Logs */}
          <section className="w-full bg-fg/80 rounded-2xl p-10 flex flex-col gap-4 shadow-md backdrop-blur-[2px] border-2 border-indigo-900">
            <div className="flex items-center gap-2">
              <Link
                to="/devlogs"
                className="text-2xl font-semibold text-header hover:underline"
              >
                Devlogs <FontAwesomeIcon icon={faCaretRight} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
              {lastFiveDevlogs.map((project) =>
                project.devlogs.map((log) => (
                  <Devlog
                    key={`${project.name}-${log.logNumber}`}
                    project={project.name}
                    logNumber={log.logNumber}
                    content={log.content}
                    date={log.date}
                  />
                ))
              )}
            </div>
          </section>

          {/* Contact */}
          <section className="w-full bg-fg/80 rounded-2xl p-10 flex flex-col gap-1 shadow-md mb-16 backdrop-blur-[2px] border-2 border-indigo-900">
            <div className="flex items-center gap-2">
              <span to="/resume" className="text-2xl font-semibold text-header">
                Contact
              </span>
            </div>
            <div className="flex flex-row">
              <form className="flex flex-col gap-4 p-6 shadow-md rounded-lg w-3/4">
                <InputField type="text" placeholder="Name" />
                <InputField type="email" placeholder="Email" />
                <textarea
                  placeholder="Message"
                  className="p-2 border rounded-lg resize-none border-indigo-900 focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 overscroll-contain"
                />
                <button
                  type="submit"
                  className="flex font-bold justify-center items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-900 hover:cursor-pointer shadow-md transition-colors duration-500"
                >
                  <h4>Send</h4>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
              <div className="flex flex-col justify-center items-center gap-6 text-3xl w-1/4">
                {links.map((link) => (
                  <ContactLink
                    icon={link.icon}
                    link={link.link}
                    key={link.name}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        <footer className="w-full bg-fg/80 py-10 mt-10 border-t-2 border-indigo-900 shadow-md flex flex-row items-center justify-center gap-8 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-2 text-sm text-text-2 text-[15px]">
            <h4 className="text-center">
              © 2025 <span className="text-header font-semibold">ZxsmDev</span>.
              All rights reserved.
            </h4>
            <h4 className="text-center">
              <span>Built Using </span>
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline"
              >
                React <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
              <span> and </span>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline"
              >
                Tailwind <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </h4>
          </div>
          <a href="https://vercel.com/" target="_blank">
            <img
              src="/assets/powered-by-vercel.svg"
              alt="Powered by Vercel"
            ></img>
          </a>
        </footer>
      </div>
    </>
  );
}

export default Home;