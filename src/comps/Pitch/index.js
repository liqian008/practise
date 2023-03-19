import { useState } from "react";
import './index.less';

const App = (props)=>{

    // const [pitch, setPitch] = useState('');
    // const [lifting, setLifting] = useState('');

    // const {name} = props;
    // console.log("props", name, props);

    // let varLifting = '';
    // let varPitch = name;
    // if(name.length>1){
    //     varLifting = name.subStr(0, name.length-1);
    //     varPitch = name.subStr(name.length-1, name.length);

    //     console.log("varLifting, varPitch", varLifting, varPitch);
    //     setPitch(varPitch);
    // }

    const parsePitch = () =>{
        const {name} = props;

        console.log("name", name);
        
        let lifting = '';
        let pitch = name;
        if(name.length>1){
            lifting = name.substring(0, name.length-1);
            pitch = name.substring(name.length-1, name.length);
        }
        return {lifting: lifting, pitch: pitch};
    };

    return <div className="pitch-wrapper">
        {/* <span className="string">1弦</span><br/> */}
        <span className="lifting">{parsePitch().lifting}</span>
        <span className="pitch">{parsePitch().pitch}</span>
    </div>
}

export default App;