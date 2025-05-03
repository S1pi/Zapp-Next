"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { set } from "zod";

type CategorySelectionNavProps = {
  views: {
    name: string; // Name of the view
    title: string; // Title of the view
    count: number; // Count of items in the view
  }[]; // Array of views to be displayed in the navigation
  setSelectedView: Dispatch<SetStateAction<string>>;
};

export const CategorySelectionNav = ({
  views,
  setSelectedView,
}: CategorySelectionNavProps) => {
  const [view, setView] = useState(views[0].name); // State to hold the current view

  useEffect(() => {
    setSelectedView(view); // Update the selected view when the view state changes
  }, [view]); // Update the selected view when the view state changes

  return (
    <div className="flex justify-between items-center mt-4 py-4">
      <div className="space-x-4 relative border-b-2 border-seperator-line w-full">
        <div className="flex">
          {views.map((viewItem) => (
            <button
              key={viewItem.name}
              onClick={() => {
                setView(viewItem.name); // Set the view to the clicked view
              }}
              className="relative py-2 px-4 text-seabed-green text-lg cursor-pointer"
            >
              {viewItem.title}{" "}
              <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
                {viewItem.count}
              </span>
              {view === viewItem.name && (
                <span className="absolute -bottom-[3px] left-0 w-full h-1 bg-aqua-gem" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// return (
//   <div className="flex justify-between items-center mt-4 py-4">
//     <div className="space-x-4 relative border-b-2 border-seperator-line w-full">
//       <div className="flex">
//         <button
//           onClick={() => {
//             setView(views[0].name); // Set the view to the first view in the array
//           }}
//           className="relative py-2 px-4 text-seabed-green text-lg cursor-pointer"
//         >
//           Kaikki{" "}
//           <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
//             {views[0].count}
//           </span>
//           {view === "all" && (
//             // bottom: calc(var(--spacing) * -0.5) /* -0.125rem = -2px */;
//             <span className="absolute -bottom-[3px] left-0 w-full h-1 bg-aqua-gem" />
//           )}
//         </button>
//         <button
//           onClick={() => {
//             setView(views[1].name); // Set the view to the second view in the array
//           }}
//           className="relative py-2 px-4 text-seabed-green text-lg cursor-pointer"
//         >
//           Odottaa hyväksyntää{" "}
//           <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
//             {views[1].count}
//           </span>
//           {view === "pending" && (
//             <span className="absolute -bottom-[3px] left-0 w-full h-1 bg-aqua-gem" />
//           )}
//         </button>
//         <button
//           onClick={() => {
//             setView(views[2].name); // Set the view to the third view in the array
//           }}
//           className="relative py-2 px-4 text-seabed-green text-lg cursor-pointer"
//         >
//           Dealers And Admins{" "}
//           <span className="ml-1 text-secondary rounded-full bg-card-background border-1 border-card-stroke px-3 py-1">
//             {views[2].count}
//           </span>
//           {view === "dealersAndAdmins" && (
//             <span className="absolute -bottom-[3px] left-0 w-full h-1 bg-aqua-gem" />
//           )}
//         </button>
//       </div>
//     </div>
//   </div>
// );
