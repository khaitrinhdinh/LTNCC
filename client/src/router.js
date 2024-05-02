import React from "react";
import Home from "./HomePage/Component/Home";
import Notification from "./HomePage/Component/Notification";
import { Chat } from "./Chat/Chat";
import ListStudent from "./ListStudent/ListStudent";
import ListTeacher from "./ListTeacher/ListTeacher";
import Chart from "./Chart/Chart";
import AddForm from "./ListStudent/Components/AddForm";
import AddForm2 from "./ListTeacher/Components/AddForm";
import InfoStudent from "./ListStudent/Components/InfoStudent";
import InfoTeacher from "./ListTeacher/Components/InfoTeacher";
import Profile from "./Profile/Profile";
import ChangePassword from "./Profile/ChangePassword";
import ProfileAdmin from "./Profile/ProfileAdmin";
import ProfileTeacher from "./Profile/ProfileTeacher";
import InfoAdmin from "./ListAdmin/Components/InfoAdmin";
import AddForm3 from "./ListAdmin/Components/AddForm";
import ListAdmin from "./ListAdmin/ListAdmin";

const routes = [
  {
    path: "/home/notification",
    exact: true,
    main: () => <Notification />,
  },
  {
    path: "/home/chat",
    exact: true,
    main: () => <Chat />,
  },
  {
    path: "/home/list-students",
    exact: true,
    main: () => <ListStudent />,
  },
  {
    path: "/home/list-teachers",
    exact: true,
    main: () => <ListTeacher />,
  },
  {
    path: "/home/list-admins",
    exact: true,
    main: () => <ListAdmin />,
  },
  {
    path: "/home/chart",
    exact: true,
    main: () => <Chart />,
  },
  {
    path: "/home/list-students/add",
    exact: true,
    main: () => <AddForm />,
  },
  {
    path: "/home/list-teachers/add",
    exact: true,
    main: () => <AddForm2 />,
  },
  {
    path: "/home/list-admins/add",
    exact: true,
    main: () => <AddForm3 />,
  },
  {
    path: "/home/list-students/update/:mssv",
    exact: true,
    main: ({ match }) => <InfoStudent match={match} />,
  },
  {
    path: "/home/list-teachers/update/:id",
    exact: true,
    main: ({ match }) => <InfoTeacher match={match} />,
  },
  {
    path: "/home/list-admins/update/:id",
    exact: true,
    main: ({ match }) => <InfoAdmin match={match} />,
  },
  {
    path: "/home/profile",
    exact: true,
    main: ({ match }) => <Profile match={match} />,
  },
  {
    path: "/home/profile_admin",
    exact: true,
    main: ({ match }) => <ProfileAdmin match={match} />,
  },
  {
    path: "/home/profile_teacher",
    exact: true,
    main: ({ match }) => <ProfileTeacher match={match} />,
  },
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/home/change-password",
    exact: true,
    main: () => <ChangePassword />,
  },
];

export default routes;
