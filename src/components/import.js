import React, { useState } from "react";
import { CaretLeftOutlined, UnorderedListOutlined } from "@ant-design/icons";

const Slidebar = (props) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];
  return (
    <>
      <div className="flex">
        {/* <Calculator></Calculator> */}
        {/* <Slidebar /> */}
        <div
          className={`${
            open ? "w-72" : "w-32"
          } duration-300 p-4 pt-8 h-screen bg-slate-800 relative`}
        >
          <CaretLeftOutlined
            onClick={() => setOpen(!open)}
            className={`
                  ${!open && "rotate-180"}
               absolute cursor-pointer right-0 top-8 w-10 text-3xl text-cyan-50 `}
          />
          <div className="flex gap-x-4 items-center">
            <UnorderedListOutlined
              className={`text-white cursor-pointer duration-500 font-medium text-xl`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Slidebar
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-7 text-2xl font-semibold flex-1 h-screen">
          <h1>Home page</h1>
        </div>
      </div>
    </>
  );
};

export default Slidebar;
