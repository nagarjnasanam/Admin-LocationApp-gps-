export default [
  // {
  //   path: "/dashboard",
  //   name: "dashboard",
  //   component: () =>
  //     import(/* webpackChunkName: "flightInfo" */ "@/view/pages/Dashboard.vue"),
  // },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../view/pages/Home/Home.vue"),
  },
  {
    path: "/addUser",
    name: "AddUser",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Blank" */ "@/view/pages/AddUser.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "flightInfo" */ "@/view/pages/User"),
  },
  {
    path: "/users",
    name: "users",
    component: () =>
      import(/* webpackChunkName: "users" */ "@/view/pages/Users/User.vue"),
  },
  {
    path: "/addUser",
    name: "addUser",
    component: () => import("@/view/pages/Users/AddUser.vue"),
  },

  {
    path: "/user/edit/:id",
    name: "edit",
    component: () =>
      import(/* webpackChunkName: "edit" */ "@/view/pages/Users/edit.vue"),
  },
  { path: '/:pathMatch(.*)*', 
  component: () => import("../view/pages/Home/Home.vue"),
    },
 
];
