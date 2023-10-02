import React from "react"
/* This example requires Tailwind CSS v2.0+ */
export default function SectionLabel(props) {
  return (
    <div className="py-8 relative dark:bg-black">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-start">
        <span className="px-3 dark:bg-black text-lg font-medium dark:text-white">{props.content}</span>
      </div>
    </div>
  )
}