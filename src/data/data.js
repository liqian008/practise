
import audioC from "../static/audio/C.mp3";
import audioCSharp from "../static/audio/C_SHARP.mp3";
import audioD from "../static/audio/D.mp3";
import audioDSharp from "../static/audio/D_SHARP.mp3";
import audioE from "../static/audio/E.mp3";
import audioF from "../static/audio/F.mp3";
import audioFSharp from "../static/audio/F_SHARP.mp3";
import audioG from "../static/audio/G.mp3";
import audioGSharp from "../static/audio/G_SHARP.mp3";
import audioA from "../static/audio/A.mp3";
import audioASharp from "../static/audio/A_SHARP.mp3";
import audioB from "../static/audio/B.mp3";

const result = {

    audios :{
        //全音
        'C':audioC, 'D':audioD, 'E':audioE, 'F':audioF, 'G':audioG, 'A':audioA, 'B':audioB,
        //半音
        '#C':audioCSharp,
        '#D':audioDSharp,
        '#F':audioFSharp,
        '#G':audioGSharp,
        '#A':audioASharp,
    },

    //全音
    pitchArray0: ['C', 'D',  'E', 'F', 'G', 'A', 'B'],
    //半音
    pitchArray1:  ['#C', '#D', '#F', '#G', '#A'],

    // 介绍
    trainSummary:{
        "train1":{
            title: '记忆指板音阶强化练习',
            intro: '系统将在C大调下随机产生一个音阶，请您根据屏幕上显示，快速在指板上找到对应的位置并弹响。',
        }
    },

    stringsOptions: [
        {label: '1弦', value: 0,},
        {label: '2弦', value: 1,},
        {label: '3弦', value: 2,},
        {label: '4弦', value: 3,},
        {label: '5弦', value: 4,},
        {label: '6弦', value: 5,},
    ],
    
    typeOptions: [
        {label: '全音', value: 0,},
        {label: '半音', value: 1,},
    ],

    difficultyOptions: [
        {label: '初级', value: 0, speed: 8},
        {label: '中级', value: 1, speed: 4},
        {label: '高级', value: 2, speed: 2},
        {label: '自定', value: 3, speed: 2},
    ],
    
    trainSettings: "在开始前，您可以根据自身情况，设定所需的目标与难度，以便于进行针对性练习。"
}

export default result;