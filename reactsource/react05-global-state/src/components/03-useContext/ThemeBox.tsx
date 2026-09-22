import React, { useContext } from 'react';
import { ThemeContext } from './CommonContext';

const ThemeBox = () => {

    // provider가 제공하는 state 가져오기
    // 4. 자식 컴포넌트에서 공유된 값 사용하는 것
    const context = useContext(ThemeContext)

    if(!context){
        throw new Error("ThemeContext is Null")
    }
    const {isDark} = context;

    // box 스타일 생성
    const boxStyle:React.CSSProperties={
        padding:"20px",
        marginTop:"10px",
        backgroundColor:isDark?"#333":"#eee",
        color:isDark?"#fff":"#000",
        textAlign:"center",
    }

    return (
        <div style={boxStyle}>
            현재 테마 : {isDark?"다크모드" : "라이트모드"}
        </div>
    );
};

export default ThemeBox;