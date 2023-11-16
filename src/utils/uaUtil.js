
/**
 * 判断是否是微信环境
 */
const isWeichat = ()=>{
    const UA = window.navigator.userAgent;
    const wechat = UA.includes('MicroMessenger') && !UA.includes('miniProgram');
    return wechat;
}

export default {isWeichat};