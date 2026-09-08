import React from 'react';

const Button = () => {
    // 버튼 클릭 시 alert('버튼 클릭')


    return (
        <div>
            <button onClick={()=> alert('버튼클릭')} className='p-4 bg-violet-400'>버튼 클릭</button>
        </div>
    );
};

export default Button;