/* This example requires Tailwind CSS v2.0+ */
const assignment = [
  {
    name: "Asgn 0",
    description: "Vector Drawer",
    url: "https://people.ucsc.edu/~elfvasqu/CSE160/asgn0/asg0.html",
  },
  {
    name: "Asgn 1",
    description: "MS Paint",
    url: "https://people.ucsc.edu/~elfvasqu/CSE160/asgn1/asgn1.html",
  },
  {
    name: "Asgn 2",
    description: "Blocky Animal",
    url: "https://people.ucsc.edu/~elfvasqu/CSE160/asgn2/BlockyAnimal.html",
  },
  {
    name: "Asgn 3",
    description:
      "Creating an environment. NOTE: The performance is bad, but was fix on asgn4.",
    url: "https://people.ucsc.edu/~elfvasqu/CSE160/asgn3/Asgn3.html",
  },
  {
    name: "Asgn 4",
    description: "Implementing phong, specular, and ambient lighting",
    url: "https://people.ucsc.edu/~elfvasqu/CSE160/asgn4/BlockyAnimal.html",
  }
];

export default function SectionCGHw() {
  return (
    <>
      <h1 className="py-8 px-3 text-sm font-medium dark:bg-black text-white ">
        Technologies used: WebGL and Shaders (GLSL)
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 dark:bg-black shadow-xl">
        {assignment.map((asgn) => (
          <div className="relative rounded-lg dark:bg-slate-800 px-6 py-10 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <div className="flex-1 min-w-0">
              <a href={asgn.url} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-white">{asgn.name}</p>
                <p className="text-sm dark:text-slate-400 truncate">
                  {asgn.description}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
