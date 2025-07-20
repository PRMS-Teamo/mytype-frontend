import { createBrowserRouter } from 'react-router-dom'
import {lazy} from "react";
import MyTeamInfo from "./pages/MyTeamInfo";


const Layout = lazy(() => import('./components/Layout/Layout'))
const Intro = lazy(() => import('./pages/Intro'))
const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search/Search'))
const MyPage = lazy(() => import('./pages/MyPage'))
const TeamList = lazy(() => import('./pages/Team/TeamList'))
const TeamDetail = lazy(() => import('./pages/Team/TeamDetail'))
const TeammateList = lazy(() => import('./pages/Teammate/TeammateList'))
const TeammateDetail = lazy(() => import('./pages/Teammate/TeammateDetail'))
const CreatePost = lazy(() => import('./pages/Post/CreatePost.tsx'))
const Makers = lazy(() => import('./pages/Maker/Makers'))


const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'myteaminfo',
        element: <MyTeamInfo/>
      },
      {
        path: 'findteam',
        children: [
          { index: true, element: <TeamList /> },
          { path: ':teamId', element: <TeamDetail /> },

        ],
      },
      {
        path: 'findteammate',
        children: [
          { index: true, element: <TeammateList /> },
          { path: ':id', element: <TeammateDetail /> },
          // { path: "write", element: <TeammateWrite /> },
        ],
      },
      {
        path: 'post', element: <CreatePost />,
      },
      { path: 'madepeople', element: <Makers /> },
    ],
  },
])

export default router