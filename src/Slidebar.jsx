import React, { useState } from 'react'
import { CaretLeftOutlined, UnorderedListOutlined } from "@ant-design/icons";
import TreeCustom from "./treeloading/TreeCustom_khanh";

const Slidebar = (props) => {
    const [open, setOpen] = useState(true);
    return (
        <>
            <div className="flex">
                <div
                    className={`${open ? "w-72" : "w-32"
                        } duration-300 h-auto p-4 pt-8 h-screen bg-slate-800 relative`}
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
                            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                                }`}
                        >
                            Slidebar
                        </h1>
                    </div>
                    <ul className={`pt-6 overflow-y-auto h-[100vh] ${!open && "scale-0"}`}>
                        <TreeCustom className={``}/>
                    </ul>
                </div>

                <div className="p-7 text-2xl font-semibold flex-1 h-screen">
                    <h1>Home page</h1>
                </div>
            </div>
        </>
    )
}

export default Slidebar