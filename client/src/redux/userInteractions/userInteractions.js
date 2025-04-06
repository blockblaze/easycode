import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  currentView: "home",
  currentPath: {},
  currentCourse: {},
  courseVideos: [],
  watchedVideos: [],
};

const userInteractions = createSlice({
  name: 'userInteractions',
  initialState,
  reducers: {
    changeCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    changeCurrentPath: (state, action) => {
        state.currentPath = action.payload;
      },
      changeCurrentCourse: (state, action) => {
        state.currentCourse = action.payload;
      },setCourseVideos: (state, action) => {
        const { courseId, videos } = action.payload;
        const existing = state.courseVideos.find(course => course.courseId === courseId);
        if (existing) {
          existing.videos = videos;
        } else {
          state.courseVideos.push({ courseId, videos });
        }
      },setWatchedVideos: (state, action) => {
        if (state.watchedVideos.includes(action.payload)) {
        return;
        } else {
          console.log("TTTTT")
          state.watchedVideos.push(action.payload);
        }
      }
  },
});

export const { changeCurrentView , changeCurrentPath , changeCurrentCourse , setCourseVideos , setWatchedVideos } = userInteractions.actions;

export default userInteractions.reducer;
