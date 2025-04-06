import { PathCard } from "./CourseCards";
import { useEffect, useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentView, changeCurrentPath, changeCurrentCourse } from "../redux/userInteractions/userInteractions";

function Path() {
  const dispatch = useDispatch();
  const { currentPath } = useSelector((state) => state.userInteractions);
  const courses = currentPath.courses

  console.log(currentPath);

  // Conditionally render the component only if currentPath has a title
  if (!currentPath || !currentPath.title) {
    return dispatch(changeCurrentView("home"));
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full min-h-[100vh]">
        <div className="border-b border-gray-500 p-3 mt-5">
          <h1 className="text-3xl font-semibold mb-3">{currentPath.title}</h1>

          <div className="mx-auto mb-5 flex cursor-pointer" onClick={() => dispatch(changeCurrentView("home"))}>
            <p className="font-semibold text-lg text-custom-orange hover:underline">
              Go Back
            </p>
            <MdOutlineDoubleArrow color="orange" className="text-xl mt-[5px]" />
          </div>
          <p className="font-light text-lg text-justify">
            {currentPath.description}
          </p>
        </div>

        <div className="p-7 flex flex-wrap gap-4 justify-center">
          {courses.length > 0 && courses.map((course, i) => 
                <div key={i} onClick={()=>{dispatch(changeCurrentView("course")); dispatch(changeCurrentCourse(course))}}>
                <PathCard PathDetails={course} />
                </div>
        )
          }
        </div>
      </div>
    </div>
  );
}

export default Path;
