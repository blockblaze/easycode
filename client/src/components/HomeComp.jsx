import { useEffect, useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { PathCard } from "./CourseCards";
import { useSelector  , useDispatch } from "react-redux";
import { changeCurrentView , changeCurrentPath } from "../redux/userInteractions/userInteractions";


function HomeComp() {
    const [paths , setPaths] = useState([]);
    const [pathToShow , setpathToShow] = useState();
    const configUrl = "https://gist.githubusercontent.com/blockblaze/d0b44295e8c4333f61c0c42e6e6c7549/raw/config.json";
    const dispatch = useDispatch();
    useEffect(()=>{
        const json =  fetch(configUrl).then(r => r.json())
        json.then(jsonData=>{
            jsonData.reverse();
            setPaths(jsonData)
        })
      },[])
      
    return (
      <>
 <div className="min-h-screen">
      <div className='flex flex-col gap-4 p-16 px-10 w-full bg-gray-100 dark:bg-gray-800 mx-auto mb-5 h-72'>
        <h1 className='text-3xl font-bold lg:text-6xl dark:text-white'>Hey, We&apos;re EasyCode!</h1>
        <p className='dark:text-white text-sm sm:text-sm'>
        Start your journey with some helpful paths and dive into the world of coding.
        </p>
        <div className="underline text-custom-orange text-sm" to="/about">
        <div className="mx-auto flex cursor-pointer">
            <p className="font-semibold text-lg text-custom-orange hover:underline" onClick={()=>{dispatch(changeCurrentView("path")); dispatch(changeCurrentPath(paths[0]))}}>Let's get started</p>
            <MdOutlineDoubleArrow color="orange" className="text-2xl mt-[2.5px] "/>
          </div>
        </div>

      </div>
      {paths && paths.length > 0 && (
          <div className='flex flex-col gap-2 justify-center items-center mb-5'>
            <h1 className='text-3xl font-bold lg:text-4xl dark:text-white'>Explore Paths</h1>
            <div className='flex flex-wrap gap-7 mt-5 justify-center items-stretch'>
              {paths.map((path,i) => (
                <div key={i} onClick={()=>{dispatch(changeCurrentView("path")); dispatch(changeCurrentPath(path))}}>
                <PathCard PathDetails={path} />
                </div>
              ))}
            </div>

          </div>
        )}


      </div>


      </>
    )
  }
  
  export default HomeComp
  