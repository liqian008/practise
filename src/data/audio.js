
import resAudioC from '../static/audio/C.mp3';
import resAudioCSharp from '../static/audio/C_SHARP.mp3';
import resAudioD from '../static/audio/D.mp3';
import resAudioDSharp from '../static/audio/D_SHARP.mp3';
import resAudioE from '../static/audio/E.mp3';
import resAudioF from '../static/audio/F.mp3';
import resAudioFSharp from '../static/audio/F_SHARP.mp3';
import resAudioG from '../static/audio/G.mp3';
import resAudioGSharp from '../static/audio/G_SHARP.mp3';
import resAudioA from '../static/audio/A.mp3';
import resAudioASharp from '../static/audio/A_SHARP.mp3';
import resAudioB from '../static/audio/B.mp3';

//缓存audio，避免网络无法读取的情况，影响体验
const audioes = {
    'C' : new Audio(resAudioC),
    'D' : new Audio(resAudioD),
    'E' : new Audio(resAudioE),
    'F' : new Audio(resAudioF),
    'G' : new Audio(resAudioG),
    'A' : new Audio(resAudioA),
    'B' : new Audio(resAudioB),

    '#C' : new Audio(resAudioCSharp),
    '#D' : new Audio(resAudioDSharp),
    '#F' : new Audio(resAudioFSharp),
    '#G' : new Audio(resAudioGSharp),
    '#A' : new Audio(resAudioASharp),
};

Object.keys(audioes).forEach((item)=>{
    //循环播放
    audioes[item].loop=false;
    //预加载
    audioes[item].preload=true;
});

// console.log("audios", result);
export default audioes;