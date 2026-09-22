import React, { useState, type ReactNode } from 'react';
import { OnContext } from './CommonContext';

const OnProvider = ({children}:{children:ReactNode}) => {

    const [isOn, setIsOn] = useState(false)
    const onToggle = () => setIsOn((prev)=> !prev)

    return (
        <div>
            <OnContext.Provider value={{isOn, onToggle}}>{children}</OnContext.Provider>
        </div>
    );
};

export default OnProvider;