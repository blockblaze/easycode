import { useEffect, useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { CourseCard } from "./CourseCards";
import Course from "./Course";
import { useSelector  , useDispatch } from "react-redux";
import { changeShowType } from "../redux/showTypeSlice/showTypeSlice";


function Home() {
    const [courses , setCourses] = useState([]);
    const [courseToShow , setCourseToShow] = useState();
    const {showCourse} = useSelector((state)=>state.showType)
    const dispatch = useDispatch();
    useEffect(()=>{
        const json =  fetch("config.json").then(r => r.json())
        json.then(jsonData=>{
            jsonData.reverse();
            setCourses(jsonData)
        })
      },[])
      
    return (
      <>
 <div className="min-h-screen">
    {showCourse? <Course course={courseToShow}/> : <>        <div className='flex flex-col gap-4 p-16 px-10 w-full bg-gray-100 dark:bg-gray-800 mx-auto mb-5 h-72'>
        <h1 className='text-3xl font-bold lg:text-6xl dark:text-white'>Hey, We&apos;re EasyCode!</h1>
        <p className='dark:text-white text-sm sm:text-sm'>
        Start your journey with some helpful courses and dive into the world of coding.
        </p>
        <div className="underline text-custom-orange text-sm" to="/about">
        <div className="mx-auto flex cursor-pointer">
            <p className="font-semibold text-lg text-custom-orange hover:underline" onClick={()=>{setCourseToShow(courses[courses.length-1]); dispatch(changeShowType())}}>Lets get started</p>
            <MdOutlineDoubleArrow color="orange" className="text-2xl mt-[2.5px] "/>
          </div>
        </div>

      </div>
      {courses && courses.length > 0 && (
          <div className='flex flex-col gap-2 justify-center items-center mb-5'>
            <h1 className='text-3xl font-bold lg:text-4xl dark:text-white'>Recent Courses</h1>
            <div className='flex flex-wrap gap-7 mt-5 justify-center items-stretch'>
              {courses.map((course,i) => (
                <div key={i} onClick={()=>{setCourseToShow(course); dispatch(changeShowType())}}>
                <CourseCard cardDetails={course} />
                </div>
              ))}
            </div>

          </div>
        )}</>}


      </div>


      </>
    )
  }
  
  export default Home
  