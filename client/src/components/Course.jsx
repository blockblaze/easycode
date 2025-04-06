import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CourseCard } from "./CourseCards";
import { MdOndemandVideo, MdAssignment, MdOutlineDoubleArrow } from "react-icons/md";
import {
  changeCurrentView,
  setCourseVideos,
  setWatchedVideos,
} from "../redux/userInteractions/userInteractions";
import ReactPlayer from "react-player";

const MAX_RESULTS_PER_CALL = 50;

function Course() {
  const dispatch = useDispatch();
  const { currentCourse, watchedVideos , currentPath } = useSelector(state => state.userInteractions);
  const courseId = currentCourse.id;

  const courseVideoData = useSelector(state =>
    state.userInteractions.courseVideos.find(course => course.courseId === courseId)
  );

  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [remainingVideos, setRemainingVideos] = useState(currentCourse.maxVideosCount);
  const [activeTab, setActiveTab] = useState(0); // Manage the active tab (0 for videos, 1 for assignments)
  const [ assignments , setAssignments] = useState([]);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const playlistId = currentCourse.playlistID;

  const fetchVideos = useCallback(async (pageToken = "") => {
    try {
      setLoading(true);
      const limit = Math.min(MAX_RESULTS_PER_CALL, remainingVideos);

      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${limit}&key=${apiKey}${
        pageToken ? `&pageToken=${pageToken}` : ""
      }`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || !data.items) throw new Error("Failed to fetch playlist data.");

      const newVideos = data.items.map((item, i) => ({
        ...item,
        snippet: { ...item.snippet, order: (courseVideoData?.videos?.length || 0) + i + 1 },
      }));

      const updatedVideos = pageToken
        ? [...(courseVideoData?.videos || []), ...newVideos]
        : newVideos;

      dispatch(setCourseVideos({ courseId, videos: updatedVideos }));

      const newRemaining = remainingVideos - newVideos.length;
      setRemainingVideos(newRemaining);
      setNextPageToken(data.nextPageToken);
      setShowMore(newRemaining > 0 && !!data.nextPageToken);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [apiKey, playlistId, courseVideoData?.videos, courseId, remainingVideos, dispatch]);

  const fetchAssignments = async ()=>{
    const configUrl = "https://gist.githubusercontent.com/blockblaze/d0b44295e8c4333f61c0c42e6e6c7549/raw/config.json";
    const res = await fetch(configUrl);
    const data = await res.json();
    const mainPath = data.find(path => path.id === currentPath.id);
    const mainCourse = mainPath.courses.find(course=> course.id === currentCourse.id);
    setAssignments(mainCourse.assignments);
    console.log(data)
  };

  useEffect(() => {
    if (!courseVideoData || (courseVideoData.videos.length < currentCourse.maxVideosCount)) {
      dispatch(setCourseVideos({ courseId, videos: [] }));
      setRemainingVideos(currentCourse.maxVideosCount);
      fetchVideos();
    }
    fetchAssignments();
  }, [courseId]);

  const handleShowMore = () => {
    if (nextPageToken) fetchVideos(nextPageToken);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full min-h-[100vh]">
        <div className="border-b border-gray-500 p-3 mt-5">
          <h1 className="text-3xl font-semibold mb-3">{currentCourse.title}</h1>

          <div
            className="mx-auto mb-5 flex cursor-pointer"
            onClick={() => dispatch(changeCurrentView("path"))}
          >
            <p className="font-semibold text-lg text-custom-orange hover:underline">
              Go Back
            </p>
            <MdOutlineDoubleArrow color="orange" className="text-xl mt-[5px]" />
          </div>

          <div className="overflow-x-auto">
            <div className="flex justify-around">
              <button
                onClick={() => setActiveTab(0)}
                className={`p-4 ${activeTab === 0 ? 'bg-gray-700' : ''} flex items-center`}
              >
                <MdOndemandVideo className="mr-2" />
                Videos
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`p-4 ${activeTab === 1 ? 'bg-gray-700' : ''} flex items-center`}
              >
                <MdAssignment className="mr-2" />
                Assignments
              </button>
            </div>
          </div>
        </div>

        {/* Video Player */}
        {selectedVideoId && (
          <div className="p-5">
            <ReactPlayer
              url={`https://www.youtube.com/embed/${selectedVideoId}?rel=0`}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    controls: 1,
                    iv_load_policy: 3,
                    fs: 0,
                    autoplay: 1,
                  },
                },
              }}
              controls
              width="100%"
              height="500px"
            />
          </div>
        )}

        {/* Conditional Rendering based on active tab */}
        {activeTab === 0 && (
          <div className="p-7 flex flex-wrap gap-4 justify-center">
            {!loading &&
              courseVideoData?.videos?.map((video, i) => {
                const videoId = video.snippet.resourceId.videoId;
                return (
                  <div key={videoId} onClick={() =>{setSelectedVideoId(videoId);
                    dispatch(setWatchedVideos(videoId));}}>
                    <CourseCard
                      cardDetails={video.snippet}
                      isWatched={watchedVideos.includes(videoId)}
                      order={i + 1}
                    />
                  </div>
                );
              })}

            {showMore && (
              <button
                onClick={handleShowMore}
                className="w-full text-custom-dark-orange self-center text-sm py-7"
              >
                Show more
              </button>
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div className="p-7">
            {assignments.length > 0 ? (
              <div>
                {assignments.map((assignment, index) => (
                  <a href={assignment.link} target="_blank" key={index}>
                   <CourseCard
                   cardDetails={assignment}
                 />
                 </a>
                ))}
              </div>
            ) : (
              <p>No assignments available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
