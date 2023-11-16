import { useState, useEffect } from "react";
import './index.less';

/**
 * 倒计时
 * @param {*} param0 
 * @returns 
 */
const App = ({min=0, max=3, interval=1000, readyText='READY?', goText='GO!', onFinish})=>{

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
        }, interval);
    }, []);


    const displayCountTitle = (val)=>{
        return val===min?null:readyText;
    }
    const displayCountNum = (val)=>{
        return val===min?goText:val;
    }

    return <div className='countdown-wrapper'>
        <div className="countdown-title">{displayCountTitle(countNum)}</div>
        <div className='countdown-num'>{displayCountNum(countNum)}</div>
    </div>
}

export default App;