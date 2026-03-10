export const SIDEBAR_SECTIONS = [
  {
    key: "main",
    items: [
      { key: "dashboard", label: "Dashboard", path: "/dashboard" },
      { key: "products", label: "Products", path: "/products" },
      { key: "favourites", label: "Favourites", path: "/favourites" },
      { key: "inbox", label: "Inbox", path: "/inbox" },
      { key: "order-lists", label: "Order Lists", path: "/order-lists" },
      { key: "product-stock", label: "Product Stock", path: "/product-stock" },
    ],
  },
  {
    key: "pages",
    heading: "Pages",
    items: [
      { key: "pricing", label: "Pricing", path: "/pricing" },
      { key: "calendar", label: "Calendar", path: "/calendar" },
      { key: "to-do", label: "To-Do", path: "/to-do" },
      { key: "contact", label: "Contact", path: "/contact" },
      { key: "invoice", label: "Invoice", path: "/invoice" },
      { key: "ui-elements", label: "UI Elements", path: "/ui-elements" },
      { key: "team", label: "Team", path: "/team" },
      { key: "table", label: "Table", path: "/table" },
    ],
  },
  {
    key: "account",
    items: [
      { key: "settings", label: "Settings", path: "/settings" },
      { key: "logout", label: "Logout", path: "/logout" },
    ],
  },
];

export const monthOptions = [
  { name: "January" },
  { name: "February" },
  { name: "March" },
  { name: "April" },
  { name: "May" },
  { name: "June" },
  { name: "July" },
  { name: "August" },
  { name: "September" },
  { name: "October" },
  { name: "November" },
  { name: "December" },
];

export const dashboardCard = [
  {
    heading: "total user",
    icon: "users",
    iconColor: "",
    iconBgColor: "rgba(130, 128, 255, 0.3)",
    count: "40,689",
    up: true,
    percent: "8.5",
    footer: "Up from yesterday",
  },
  {
    heading: "total order",
    icon: "box",
    iconColor: "",
    iconBgColor: "rgba(254, 197, 61, 0.3)",
    count: "10,293",
    up: true,
    percent: "1.3",
    footer: "Up from past week",
  },
  {
    heading: "total sales",
    icon: "graph",
    iconColor: "",
    iconBgColor: "rgba(74, 217, 145, 0.3)",
    count: "$89,000",
    up: false,
    percent: "4.3",
    footer: "Down from yesterday",
  },
  {
    heading: "total pending",
    icon: "timer",
    iconColor: "",
    iconBgColor: "rgba(255, 144, 102, 0.3)",
    count: "2,040",
    up: false,
    percent: "1.8",
    footer: "Up from yesterday",
  },
];

export const AUTH_SESSION_KEY = "auth_session";
export const DARK_MODE_KEY = "dark_mode_enabled";
