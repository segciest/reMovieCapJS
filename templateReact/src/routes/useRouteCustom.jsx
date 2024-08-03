import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import NotFound from "../layouts/NotFound/NotFound";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import HomePage from "../pages/HomePage/HomePage";
import Detail from "../pages/Detail/Detail";
import Booking from "../pages/Booking /Booking";
import Receipt from "../pages/Receipt/Receipt";
import Login from "../pages/Login/Login";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import CreateMovie from "../pages/CreateMovie/CreateMovie";
import MovieManager from "../pages/MovieManager/MovieManager";
import UserManager from "../pages/UserManager/UserManager";
import EditMovie from "../pages/EditMovie/EditMovie";
import TimeLine from "../pages/TimeLine/TimeLine";

const useRouteCustom = () => {
  const route = useRoutes([
    {
      path: path.homePage.base,
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: path.detailMovie.base,
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <Detail />,
        },
      ],
    },
    {
      path: path.detailBooking.detail,
      element: <Booking />,
    },
    {
      path: path.receipt.base,
      element: <Receipt />,
    },
    {
      path: path.dangNhap,
      element: <Login />,
    },
    {
      path: path.admin.base, // /admin
      element: <AdminTemplate />,
      children: [
        {
          index: true,
          element: <CreateMovie />,
        },
        {
          path: path.admin.managerMovie,
          element: <MovieManager />,
        },
        {
          path: path.admin.managerUser,
          element: <UserManager />,
        },
        {
          path: path.admin.editMovie,
          element: <EditMovie />,
        },
        {
          path: path.admin.timelineset,
          element: <TimeLine />,
        },
      ],
    },
    {
      path: "*",
      index: true,
      element: <NotFound />,
    },
  ]);
  return route;
};

export default useRouteCustom;
