

const result = {

    getItem: (key, defaultVal)=>{
        const result = window.localStorage.getItem(key);
        if(!result){
            return defaultVal;
        }
        return JSON.parse(result);
    },

    setItem: (key, obj)=>{
        window.localStorage.setItem(key, JSON.stringify(obj));
    },

    clear: (key)=>{
        window.localStorage.clear(key);
    },

    clearAll: ()=>{
       window.localStorage.clearAll();
    },

}

export default result;