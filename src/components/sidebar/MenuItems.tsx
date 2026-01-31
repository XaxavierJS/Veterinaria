import { IconCalendar, IconUser, IconPaw, IconLayoutDashboard } from "@tabler/icons-react";
import { uniqueId } from "lodash";

// Define los elementos del menú lateral
const MenuItems = [
  {
    navlabel: true,
    subheader: "Principal",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Calendario",
  },
  {
    id: uniqueId(),
    title: "Citas",
    icon: IconCalendar,
    href: "/citas",
  },
  {
    navlabel: true,
    subheader: "Fichas",
  },
  {
    id: uniqueId(),
    title: "Tutores",
    icon: IconUser,
    href: "/tutores",
  },
  {
    id: uniqueId(),
    title: "Mascotas",
    icon: IconPaw,
    href: "/mascotas",
  },
];

export default MenuItems;
