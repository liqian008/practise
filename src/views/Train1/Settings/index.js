import { useState, useEffect, useRef, useForm } from "react";
import './index.less';
import data from '../../../data/data';
import cache from '../cache'
import storageUtil from '../../../utils/storageUtil';
import {Button, Popup, Form, Selector, Stepper, Divider} from 'antd-mobile';
// import { FormInstance } from 'antd-mobile/es/components/form'

const App = ({visible, onSettingsClose})=>{

    const [form] = Form.useForm();

    //data init 
    // const storageKey = "data_train_1";
    // const cachedResult = storageUtil.getItem(storageKey);
    // const stringsOptions = cachedResult && cachedResult.stringsOptions?cachedResult.stringsOptions:[data.stringsOptions[0].value];
    // const typeOptions = cachedResult && cachedResult.typeOptions?cachedResult.typeOptions:[data.typeOptions[0].value];
    // const difficultyOptions = cachedResult && cachedResult.difficultyOptions?cachedResult.difficultyOptions:[data.difficultyOptions[0].value];
    // const cachedCustomSpeed = cachedResult && cachedResult.customSpeed?cachedResult.customSpeed:data.difficultyOptions[0].speed;
    
    var  {stringsOptions, typeOptions, difficultyOptions, cachedCustomSpeed} = cache.loadConfig();

    const speed = !cache.isDifficultyCustom(difficultyOptions[0])? cache.getSpeedByDifficultyOptValue(difficultyOptions[0]): cachedCustomSpeed;

    // console.log("speed", speed);

    //speed相关控制
    //TODO 自定义的speed无法保存
    const [customSpeed, setCustomSpeed] = useState(cachedCustomSpeed);
    const [stepperDisable, setStepperDisable] = useState(!cache.isDifficultyCustom(difficultyOptions[0]));
    
    console.log("stepperDisable", difficultyOptions[0], stepperDisable);
    // const [stepperDisable, setStepperDisable] = useState(
    //    !(difficultyOptions[0]===data.difficultyOptions[data.difficultyOptions.length-1].value));
    


    /**
     * 确认选项
     * @param {*} param0 
     * @param {*} obj 
     */
    const onFormFinish = ({stringsOptions, typeOptions, difficultyOptions, speed}, obj)=>{
        console.log(obj, stringsOptions, typeOptions,  difficultyOptions, speed);
        //save2 local
        // if(isDifficultyCustom(difficultyOptions[0])){
        //     setCustomSpeed(speed);
        // }
        let storageKey = storageUtil.getStorageKey(1);
        storageUtil.setItem(storageKey, {stringsOptions, typeOptions, difficultyOptions, customSpeed});
        onSettingsClose(true);
    }

    /**
     * 自定义速度变化
     * @param {*} param0 
     * @param {*} obj 
     */
    const onStepperChange = (speed) => {
        setCustomSpeed(speed);
    }
    
    /**
     * 难度变化
     * @param {*} param0 
     * @param {*} obj 
     */
    const onDifficultyChange = (arr, extend)=>{
        if(arr.length===1){
            var newSpeed = extend.items[0].speed;
            var isCustom = cache.isDifficultyCustom(arr[0]);
            // var custom = arr[0]===data.difficultyOptions[data.difficultyOptions.length-1].value;
            if(isCustom){
                //获取缓存中的数值
                newSpeed = customSpeed;
                // setCustomSpeed(newSpeed);
            }
            form.setFieldValue("speed", newSpeed);
            setStepperDisable(isCustom?false:true);
        }
    }


    return <Popup
            // showCloseButton={true}
            onClose={() => {
                onSettingsClose(true);
            }}
            visible={visible} 
            >
                <div className='settings_container'>
                    <Form
                        form={form} 
                        layout='horizontal' mode='card'
                        initialValues={{stringsOptions:stringsOptions, 
                            typeOptions:typeOptions, 
                            difficultyOptions:difficultyOptions,
                            speed: speed
                        }}
                        // ref={formRef}
                        onFinish={onFormFinish}
                        footer={
                            <Button block type='submit' color='primary'>
                                确 定
                            </Button>
                        }
                    >
                        <Form.Header>请选择琴弦</Form.Header>
                        <Form.Item
                        name='stringsOptions'
                        rules={[{required:true, message:"请至少选择一项"}]}
                        >
                            <Selector
                                columns={4}
                                options={data.stringsOptions}
                                multiple={true}
                                style={{
                                '--border': 'solid transparent 1px',
                                '--checked-border': 'solid var(--adm-color-primary) 1px',
                                '--padding': '6px 8px',
                                }}
                            />
                        </Form.Item>

                        <Form.Header>请选择音阶类型</Form.Header>
                        <Form.Item
                        name='typeOptions'
                        rules={[{required:true, message:"请至少选择一项"}]}
                        >
                            <Selector
                                options={data.typeOptions}
                                columns={4}
                                multiple={true}
                            />
                        </Form.Item>

                        <Form.Header>请选择难度（计时单位: 秒）</Form.Header>
                        <Form.Item
                        name='difficultyOptions'
                        rules={[{required:true, message:"请至少选择一项"}]}
                        >
                            <Selector
                                options={data.difficultyOptions}
                                columns={4}
                                multiple={false}
                                onChange={onDifficultyChange}
                            />
                        </Form.Item>

                        {/* <Divider></Divider> */}
                        <Form.Header></Form.Header>
                        <Form.Item
                        name='speed'
                        rules={[{required:true}]}
                        >
                            <Stepper 
                                onChange={onStepperChange}
                                disabled={stepperDisable} 
                                step={0.1} 
                                min={0.1} 
                                max={20} 
                                digits={1}
                                ></Stepper>
                        </Form.Item>

                    </Form>
                </div>
            </Popup>
}

export default App;