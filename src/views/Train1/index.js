import { useState } from "react";
import Pitch from "../../comps/Pitch"; 
import CountDown from "../../comps/Countdown";
import TrainIntro from "../../comps/TrainIntro";
import Settings from "./Settings";
import String from "../../comps/String";
import data from "../../data/data";
import storageUtil from "../../utils/storageUtil";
import cache from './cache';
import './index.less';
import {Button, Form, Input, Slider, Checkbox} from 'antd-mobile';

/**
 * 训练1
 * @param {*} props 
 * @returns 
 */
const App = (props) => {

    //是否开始倒计时
    const [isCountdown, setCountdown] = useState(false);
    //是否开始（后续还要进行ready倒计时）
    const [started, setStarted] = useState(false);
    //是否就绪（准备随时开始）
    const [isGo, setGo] = useState(false);
    //序号
    const [seq, setSeq] = useState(0);
    //用于显示的数值
    const [patchVal, setPatchVal] = useState('');
    const [stringVal, setStringVal] = useState(1);
    //定时器对象
    const [timer, setTimer] = useState('');

    //是否打开设置
    const [settingsVisible, setSettingsVisible] = useState(false);

    var  {stringsOptions, typeOptions, difficultyOptions, cachedCustomSpeed} = cache.loadConfig();
    // var speed = cache.getSpeedByDifficultyOptValue(difficultyOptions);

    const speed = !cache.isDifficultyCustom(difficultyOptions[0])? cache.getSpeedByDifficultyOptValue(difficultyOptions[0]): cachedCustomSpeed;
    // console.log("=====config===", speed, difficultyOptions);

    const timeout = speed*1000;
    console.log("=====config===", speed, timeout, difficultyOptions);

    let pitchValArray = [];
    if(typeOptions.includes(data.typeOptions[0].value)){
        //全音
        pitchValArray.push(...data.pitchArray0);
    }
    if(typeOptions.includes(data.typeOptions[1].value)){
        //半音
        pitchValArray.push(...data.pitchArray1);
    }
    


    /** 训练 */
    const genCase = ()=>{

        // console.log('=====genCase');
        setGo(true);
        setSeq((seq) => seq + 1);
        // const storageKey = "data_train_1";
        // const cachedResult = storageUtil.getItem(storageKey);
        // const stringsOptions = cachedResult && cachedResult.stringsOptions?cachedResult.stringsOptions:[data.stringsOptions[0].value];
        // const typeOptions = cachedResult && cachedResult.typeOptions?cachedResult.typeOptions:[data.typeOptions[0].value];
        // const difficultyOptions = cachedResult && cachedResult.diff?cachedResult.difficultyOptions:[data.difficultyOptions[0].value];
        

        
        //随机产生音阶
        const ranIndex = Math.floor(Math.random()*pitchValArray.length);
        setPatchVal(pitchValArray[ranIndex]);

        //随机产生音阶
        const ranStringIndex = Math.floor(Math.random()* (stringsOptions.length));
        data.stringsOptions.forEach((item)=>{
            if(item.value===stringsOptions[ranStringIndex]){
                setStringVal(item.value+1);
            }
        })
    }

    /**
     * 
     */
    const startTimer = () => {
        setTimer(setInterval(() => {
            genCase();
        }, timeout));
    }

    /**
     * 
     */
    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
        }
    }
    
    /**
     * 点击按钮
     */
    const doClick = () => {
        console.log("当前运行状态", started);
        if (started) {
            //当前已开始
            stopTimer(timer);
        } else {
            //当前未开始，先进入倒计时
            setCountdown(true);
        }
        setStarted(!started);
    }
    
    /**
     * 倒计时结束
     */
    const countdownFinish = ()=>{
        setCountdown(false);
        genCase();
        startTimer();
    };

    const onSettings = ()=>{
        setSettingsVisible(true);
    }

    const onSettingsClose = ()=>{
        setSettingsVisible(false);
    }

    return <div className='train_container'>
            {!started?
            <div className = "intro_container">
                <div className='train_intro'>
                    <TrainIntro title={data.trainSummary.train1.title} intro={data.trainSummary.train1.intro}></TrainIntro>
                </div>
                
                <div className='train_footer'>
                    <div className="action_wrapper">
                    <Button block color='primary' size='large' onClick={doClick}>
                        {!started ? "开 始" : "停 止"}
                    </Button>
                    </div>

                    <div className="settings_wrapper">
                    <Button block color='warning' size='large' onClick={onSettings}>
                        设 置
                    </Button>
                    </div>
                </div>
            </div>
            :<></>}

            {started?
            <div className='stage_container'>
                {isCountdown?<CountDown max='3' onFinish={countdownFinish}/>:null}
                {isGo?<div>
                    <div>序号：{seq}</div>
                    <div>
                        <String value={stringVal}></String>
                        <Pitch name={patchVal} audioEnable={true}></Pitch>
                    </div>
                </div>:null}
            </div>
            :<></>}
            <Settings visible={settingsVisible} onSettingsClose={onSettingsClose}></Settings>
    </div>
   
};

export default App;