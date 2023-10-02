import React from "react";
/* This example requires Tailwind CSS v2.0+ */
const stats = [
  { label: "Founded", value: "2021" },
  { label: "Employees", value: "5" },
  { label: "Beta Users", value: "521" },
  { label: "Raised", value: "$25M" },
];

export default function SectionComponent(props) {
  return (
    <div className="relative bg-white py-16 sm:py-2">
      <div className="lg:mx-auto lg:max-w-7xl">
        <div className="relative sm:py-16 lg:py-0">
          <div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
          >
          </div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            {/* Testimonial card*/}
            {props.content}
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-0">
            <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
             {props.projectTitle}
            </h2>
            <div className="mt-6 text-gray-500 space-y-6">
              <p className="text-lg">
                {props.projectDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
