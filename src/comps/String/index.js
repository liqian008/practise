import { useState } from "react";
import './index.less';

/**
 * 弦-组件
 * @param {*} param0 
 * @returns 
 */
const App = ({value})=>{
    return <div>
        <span className="string">{value}弦</span>
    </div>
}

export default App;