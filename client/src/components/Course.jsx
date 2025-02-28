import { useDispatch } from "react-redux";
import { changeShowType } from "../redux/showTypeSlice/showTypeSlice";
import { MdOutlineDoubleArrow } from "react-icons/md";

function Course({ course }) {
  const dispatch = useDispatch();

  // Handle case where course is not available
  if (!course || !course.title) {
    dispatch(changeShowType());
    return null; // Prevents rendering an invalid structure
  }

  return (
    <div className="flex justify-between min-h-screen w-full md:w-[80%] m-auto">
      <main className="flex flex-col p-8 w-full bg-gray-100 dark:bg-gray-700">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {course.title}
        </h1>

        <div 
          className="mx-auto mt-10 flex cursor-pointer" 
          onClick={() => dispatch(changeShowType())}
        >
          <p className="font-semibold text-lg text-custom-orange hover:underline">
            Go Back
          </p>
          <MdOutlineDoubleArrow color="orange" className="text-2xl mt-[2.5px]" />
        </div>

        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="mt-10 p-3 max-h-[700px] w-[800px] m-auto object-cover"
        />

        <div className="p-3 max-w-2xl mx-auto w-full post-content !min-h-72 border-b border-slate-500"
          dangerouslySetInnerHTML={{ __html: course.content }}
        >
        </div>

        <a className="download-btn" href={course.link} target="_blank" rel="noopener noreferrer">
          Start The Course
        </a>
      </main>
    </div>
  );
}

export default Course;
