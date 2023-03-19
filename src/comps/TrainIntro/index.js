import { useState, useEffect } from "react";
import './index.less';
import { Card, Toast, Button, Divider } from 'antd-mobile';
// import {trainSettings} from '../../Data';
import Data from "../../data/data";

/**
 * 介绍组件
 * @param {*} props 
 * @returns 
 */
const App = ({title='标题', intro='介绍'})=>{

    return  <div>
        <Card title={title}>
          {intro}
          <Divider></Divider>
          {Data.trainSettings}
        </Card>
    </div>
}

export default App;