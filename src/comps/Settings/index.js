import { useState, useEffect } from "react";
import './index.less';
import data from '../../data/data';

import storageUtil from '../../utils/storageUtil';
import {Button, Popup, Form, Selector, Stepper, Divider} from 'antd-mobile';

const App = ({visible, onSettingsClose})=>{

    const storageKey = "data_train_1";

    const cachedResult = storageUtil.getItem(storageKey); 
    const stringsOptions = cachedResult && cachedResult.stringsOptions?cachedResult.stringsOptions:[data.stringsOptions[0].value];
    const typeOptions = cachedResult && cachedResult.typeOptions?cachedResult.typeOptions:[data.typeOptions[0].value];
    const speedOptions = cachedResult && cachedResult.speedOptions?cachedResult.speedOptions:[data.speedOptions[0].value];

    // const [stringsOptions, setStringOptions] = useState([1,2,3,4,5,6]);
    // const [typeOptions, setTypeOptions] = useState([0]);
    // const [speedOptions, setSpeedOptions] = useState([0]);
    // const [speed, setSpeed] = useState([3000]);
    
    // console.log("visible0", visible);
    // useEffect(()=>{
    //     //从storage中获取配置
    //     // console.log("visible", visible);
        
    // },[visible]);

    //form提交
    const onFormFinish = ({stringsOptions, typeOptions, speedOptions}, obj)=>{
        console.log(obj, stringsOptions, typeOptions,  speedOptions);
        //TODO save2 local
        storageUtil.setItem(storageKey, {stringsOptions, typeOptions, speedOptions});
        onSettingsClose(true);
    }

    return <Popup
            // showCloseButton={true}
            onClose={() => {
                onSettingsClose(true);
            }}
            visible={visible} 
            >
                <div className='settings_container'>
                    <Form layout='horizontal' mode='card'
                    initialValues={{stringsOptions:stringsOptions, 
                        typeOptions:typeOptions, 
                        speedOptions:speedOptions,
                        speed: 4
                    }}
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
                        rules={[{required:true}]}
                        >
                            <Selector
                                options={data.typeOptions}
                                columns={4}
                                multiple={true}
                            />
                        </Form.Item>

                        <Form.Header>请选择速度类型</Form.Header>
                        <Form.Item
                        name='speedOptions' 
                        rules={[{required:true}]}
                        >
                            <Selector
                                options={data.speedOptions}
                                columns={4}
                                multiple={false}
                            />
                        </Form.Item>

                        {/* <Divider></Divider> */}
                        <Form.Header></Form.Header>
                        <Form.Item
                        name='speed'
                        rules={[{required:true}]}
                        >
                            <Stepper step={1}></Stepper>
                        </Form.Item>

                    </Form>
                </div>
            </Popup>
}

export default App;