import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";

import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

import bgImage from "../home-bg.jpg";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const About = () => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
      name,
      bio,
      "authorImage": image.asset->url
    }`
      )
      .then((data) => setAuthor(data[0]))
      .catch((error) => console.log(error));
  }, []);

  //console.log(author);

  if (!author)
    return (
      <div className="bg-green-100 min-h-screen pt-12">
        <h1 className="text-5xl flex justify-center cursive">Loading...</h1>
      </div>
    );
  return (
    <main className="relative">
      <img src={bgImage} alt={author.name} className="absolute w-full" />
      <div className="p-10 lg:pt-48 container mx-auto relative">
        <section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
          <img
            src={urlFor(author.authorImage).url()}
            alt={author.name}
            className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
          />
          <div className="text-lg flex flex-col justify-center">
            <h1 className="cursive text-6xl text-green-300 mb-4">
              Hey there. I'm <span className="text-white">{author.name}</span>
            </h1>
            <div className="prose lg:prose-xl text-white">
              <BlockContent
                blocks={author.bio}
                projectId="oux2q3na"
                dataset="production"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
