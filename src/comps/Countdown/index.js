import { useState, useEffect } from "react";
import './index.less';

/**
 * 倒计时
 * @param {*} props 
 * @returns 
 */
const App = ({max=3, min=0, onFinish})=>{

    const [countNum, setCountNum] = useState(max);

    useEffect(()=>{
        let countdownVal = countNum;
        const countdownTimer = setInterval(()=>{
            if(countdownVal - min === 0){
                clearInterval(countdownTimer);
                onFinish();
            }else{
                countdownVal = countdownVal-1;
            }
            setCountNum(countdownVal);
        }, 1000);
    }, []);


    const displayCountTitle = (val)=>{
        return val===min?null:'READY?';
    }
    const displayCountNum = (val)=>{
        return val===min?"GO!":val;
    }

    return <div className='countdown-wrapper'>
        <div className="countdown-title">{displayCountTitle(countNum)}</div>
        <div className='countdown-num'>{displayCountNum(countNum)}</div>
    </div>
}

export default App;