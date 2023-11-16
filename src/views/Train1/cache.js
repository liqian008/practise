
import storageUtil from "../../utils/storageUtil";
import data from "../../data/data";

/**
 * 读取缓存数据
 */
const loadConfig = ()=>{
    //data init 
    const storageKey = storageUtil.getStorageKey(1);
    
    const cachedResult = storageUtil.getItem(storageKey);
    const stringsOptions = cachedResult && cachedResult.stringsOptions?cachedResult.stringsOptions:[data.stringsOptions[0].value];
    const typeOptions = cachedResult && cachedResult.typeOptions?cachedResult.typeOptions:[data.typeOptions[0].value];
    const difficultyOptions = cachedResult && cachedResult.difficultyOptions?cachedResult.difficultyOptions:[data.difficultyOptions[0].value];
    const cachedCustomSpeed = cachedResult && cachedResult.customSpeed?cachedResult.customSpeed:data.difficultyOptions[0].speed;

    var result = {stringsOptions, typeOptions, difficultyOptions, cachedCustomSpeed};
    console.log('==loadConfig==', result);
    return result;
    
}

/**
 * 判断是否是自定义的难度类型
 * @param {*} difficultyOptionVal 
 * @returns 
 */
const isDifficultyCustom = (difficultyOptionVal)=>{
    return difficultyOptionVal===data.difficultyOptions[data.difficultyOptions.length-1].value;
}


/**
 * 根据难度对应的speed
 * @param {*} optinoValue 
 * @returns 
 */
const getSpeedByDifficultyOptValue = (optinoValue)=>{
    var {cachedCustomSpeed} = loadConfig;
    console.log("--optinoValue", optinoValue);
    if(isDifficultyCustom(optinoValue)){
        return cachedCustomSpeed;
    }else{
        for(var i=0;i<data.difficultyOptions.length;i++){
            var item = data.difficultyOptions[i];
            if(item.value===optinoValue){
                console.log("--item.speed", item.speed);
                return item.speed;
            }
        }
    }
}

export default {loadConfig, isDifficultyCustom, getSpeedByDifficultyOptValue};