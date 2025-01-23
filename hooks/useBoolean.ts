import { useState } from "react";


export default function useBoolean(initBool: boolean) {
    const [bool, setBool] = useState(initBool);

    const setTrue = () => setBool(true);
    const setFalse = () => setBool(false);
    const setToggle = () => setBool(!bool);

    return {
        boolToTrue: setTrue,
        boolToFalse: setFalse,
        boolToggle: setToggle,
        bool
    };
}