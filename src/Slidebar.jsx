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
                        } duration-300 p-4 pt-8 h-screen bg-slate-800 relative`}
                >
                    <div className="flex gap-x-4 items-center">
                        <UnorderedListOutlined
                            onClick={() => setOpen(!open)}
                            className={`text-white cursor-pointer duration-500 font-medium text-xl  ${!open && "rotate-180"}`}
                        />
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                                }`}
                        >
                            Slidebar
                        </h1>
                    </div>
                    <ul className={`mt-6 overflow-auto h-[80vh] ${!open && "scale-0"}`}>
                        <TreeCustom className={``} />
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