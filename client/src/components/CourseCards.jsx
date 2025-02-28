/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";

export function CourseCard({cardDetails}){
    const clearHtml = (html)=>{
      const regex = /(<([^>]+)>)/gi;
  const result = html.replace(regex, "");
  return result;
  }
  
    return (
      <div className="max-w-80 cursor-pointer">
      <Card
        className="card hover:bg-[#f1c130] transition-all duration-150 hover:translate-y-[-1%]"
        renderImage={() => <div><img className="h-[210px] object-fill w-full rounded-t-md" src={cardDetails.thumbnailUrl} alt={cardDetails.title} /></div>}
  
      >
        <div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {cardDetails.title}
        </h5>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
          {clearHtml(cardDetails.description)}
        </p>
      </Card>
      </div>
    );
  }