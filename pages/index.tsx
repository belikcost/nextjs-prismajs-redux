import React, { useEffect, useState } from "react";

import Field from "../components/Field";
import Layout from "../primitives/Layout";
import { ColorType } from "../types";
import { COLORS } from "../constants";


const Home = () => {
    const [siteColor, setSiteColor] = useState<ColorType>(COLORS[0]);
    const [storageChecked, setStorageChecked] = useState(true);

    useEffect(() => {
        const colorFromStorage = localStorage.getItem('siteColor');

        if (colorFromStorage) {
            setSiteColor(colorFromStorage as ColorType);
        }

        setStorageChecked(true);
    }, []);

    useEffect(() => {
        localStorage.setItem('siteColor', siteColor);
    }, [siteColor]);

    if (storageChecked) {
        return (
            <Layout siteColor={siteColor}>
                <Field siteColor={siteColor} setSiteColor={setSiteColor} />
            </Layout>
        );
    } else {
        return null;
    }
};

export default Home;
