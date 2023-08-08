export default function SectionHeaderImage() {
    return (
      <div className="relative bg-indigo-200">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://www.icelandtours.is/wp-content/uploads/2020/01/Northern-Lights-in-Iceland-1.jpg.webp"
            alt=""
          />
          <div className="absolute inset-0 bg-indigo-200 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-15 sm:px-6 lg:px-7">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Aspiring Software Engineer</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-5xl">
            I'm a 2023 new grad from UCSC with a bachelors of science in computer science. I'm currently looking for any entry-level roles in software engineering. My drea is to become a graphics engineer, but I'm open to anything.
            I have experience with full-stack development through previous jobs and undergraduate courses. I'm a very self-reliant engineer, but enjoy to collaborate in teams and ask for help.
          </p>
        </div>
      </div>
    )
  }