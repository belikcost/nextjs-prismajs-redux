import React, { ReactNode } from "react";

import { ColorType } from "../../types";


interface LayoutPropsInterface {
    children: ReactNode,
    siteColor: ColorType,
}

const Layout = ({ children, siteColor }: LayoutPropsInterface) => {

    return (
        <div
            className="w-100 h-100 position-fixed d-flex justify-content-center align-items-center"
            style={{ backgroundColor: siteColor }}
        >
            {children}
        </div>
    );
};

export default Layout;