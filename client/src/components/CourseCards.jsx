/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";

export function PathCard({PathDetails}){
    const clearHtml = (html)=>{
      const regex = /(<([^>]+)>)/gi;
  const result = html.replace(regex, "");
  return result;
  }
  
    return (
      <div className="max-w-80 cursor-pointer">
      <Card
        className="card hover:bg-[#f1c130] transition-all duration-150 hover:translate-y-[-1%]"
        renderImage={() => <div><img className="h-[210px] object-fill w-full rounded-t-md" src={PathDetails.thumbnailUrl} alt={PathDetails .title} /></div>}
  
      >
        <div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {PathDetails.title}
        </h5>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
          {clearHtml(PathDetails.description)}
        </p>
      </Card>
      </div>
    );
  }

  export function CourseCard({ cardDetails , isWatched , order }) {
    const watchedClass = isWatched ? '!bg-[#f1c130]' : '';
    const baseClass = 'hover:bg-[#f1c130] transition-all duration-150 hover:translate-y-[-1%]';
  
    return (
      <div className="max-w-80 cursor-pointer">
        <Card
          className={`${watchedClass} ${baseClass}`}
          renderImage={() => (
            <img
              className="h-[100px] object-cover w-full rounded-t-md"
              src={cardDetails.thumbnails?.standard.url}
              alt={cardDetails.title}
            />
          )}
        >
          <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {cardDetails.title}
          </h5>
          <p className="font-normal text-xs text-gray-700 dark:text-gray-400 line-clamp-3">
            {order}
          </p>
        </Card>
      </div>
    );
  }
  