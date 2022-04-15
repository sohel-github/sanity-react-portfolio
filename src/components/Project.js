import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";

const Project = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
      title,
      date,
      place,
      description,
      projectType,
      link,
      tags
    }`
      )
      .then((data) => setProjects(data))
      .catch((error) => console.log(error));
  }, []);

  //console.log(projects);

  if (!projects)
    return (
      <div className="bg-green-100 min-h-screen pt-12">
        <h1 className="text-5xl flex justify-center cursive">Loading...</h1>
      </div>
    );

  return (
    <main className="bg-green-100 min-h-screen pt-12">
      <section className="container mx-auto">
        <h1 className="text-5xl flex justify-center cursive">My Projects</h1>
        <h2 className="text-lg text-grey-600 flex justify-center mb-12">
          Welcome to my projects page
        </h2>
        <section className="grid grid-cols-2 gap-8">
          {projects &&
            projects.map((project, index) => (
              <article className="relative rounded-lg shadow-xl bg-white p-16">
                <h3 className="text-grey-800 text-3xl font-bold mb-2 hover:text-red-700">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                <div className="text-grey-500 text-xs space-x-4">
                  <span>
                    <strong className="font-bold">Finished on </strong>:{" "}
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                  <span>
                    <strong className="font-bold">Company </strong>:{" "}
                    {project.place}
                  </span>
                  <span>
                    <strong className="font-bold">Type </strong>:{" "}
                    {project.projectType}
                  </span>
                  <p className="my-6 text-lg text-grey-700 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 font-bold hover:underline hover:text-red-400"
                  >
                    <span role="img" aria-label="right pointer">
                      See Demo
                    </span>
                  </a>
                </div>
              </article>
            ))}
        </section>
      </section>
    </main>
  );
};

export default Project;
