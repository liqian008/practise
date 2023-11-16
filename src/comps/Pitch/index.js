import { useState, useEffect } from "react";
import './index.less';
import data from '../../data/data';
import audios from '../../data/audio';


/**
 * 音符组件
 * @param {*} param0 
 * @returns 
 */
const App = ({name, audioEnable=true})=>{
    console.log(name, audioEnable);
    if(audioEnable){
        const audio = new Audio(data.audios[name]);
        audio.currentTime=0;
        audio.play();
    }

    useEffect(()=>{
        console.log('mount');
    }, []);

    // lifting = name.substring(0, name.length-1);

    const [lifting, setLifting] = useState('');
    const [pitch, setPitch] = useState('');

    if(name.length>1){
        // setLifting(name.substring(0, name.length-1));
        // setPitch(name.substring(name.length-1, name.length));
        let xxx = name.substring(0, name.length-1);
        let yyy = name.substring(name.length-1, name.length);
    }

    // const parsePitch = () =>{
    //     let lifting = '';
    //     let pitch = name;
    //     if(name.length>1){
    //         lifting = name.substring(0, name.length-1);
    //         pitch = name.substring(name.length-1, name.length);
    //     }
    //     return {lifting: lifting, pitch: pitch};
    // };

    return <div className="pitch-wrapper">
        <span className="pitch">{name}</span>

        {/* <span className="lifting">{lifting}</span>
        <span className="pitch">{pitch}</span> */}
    </div>
}

export default App;