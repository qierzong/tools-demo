import React from 'react'
import ReactDOM from 'react-dom/client'
import ImageComp from './tool-image/app'
import VideoComp from './tool-video/app';
import { AnnotationType } from './types';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ul>
      {Object.values(AnnotationType).map((tool) => (
        <li key={tool}><a href={`/${tool}`}>{tool}</a></li>
      ))}
    </ul>,
  },
  {
    path: `/${AnnotationType.IMAGE}`,
    element: <ImageComp />,
  },
  {
    path: `/${AnnotationType.VIDEO}`,
    element: <VideoComp />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
