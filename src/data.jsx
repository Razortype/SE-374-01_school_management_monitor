import { PiBell, PiBook, PiBookFill, PiChalkboardTeacher, PiChalkboardTeacherBold, PiUsers, PiUsersFour } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";

export const NAV_ITEMS = [
  {
    name: "Students",
    href: "students",
    Icon: PiUsers,
  },
  {
    name: "Teachers",
    href: "teachers",
    Icon: PiChalkboardTeacher
  },
  {
    name: "Courses",
    href: "courses",
    Icon: PiBook,
  },
  {
    name: "Classes",
    href: "classes",
    Icon: PiUsersFour,
  },
];
