import React, { useState, useEffect } from 'react';
import { Input, Space, Divider, Select, Typography, Tag, InputNumber } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { PlusOutlined } from '@ant-design/icons';
import { getAllClasses, getAllLabels, addClass, getAllTips, addPrice, addLabel } from '@/services/api';
const { Option } = Select;

const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color='blue'
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
        >
            {label}
        </Tag>
    );
};


export default function SelectList(props: API.SelectListProps) {

    const [options, setOptions] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [Amount, setAmount] = useState<number>();

    const { type, defaultPropsVal, nameStr, idStr } = props

    useEffect(() => {
        const promise = type === 'tips' ? getAllTips() : type === 'class' ? getAllClasses() : type === 'label' ? getAllLabels() : Promise.resolve();
        promise.then(res => {
            if (res.code === 200) {
                setOptions(res.data)
            }
        })
    }, []);

    // 将字符的id, 转换为数组
    const strToArr = (str: any): string[] => {
        if (str.trim() === '') return []
        return str.split(',').map((item: any) => Number(item))
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onAmountChange = (value: number) => {
        console.log(value)
        setAmount(value)
    }

    const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (name === '') return;
        if (type === 'tips' && Amount === undefined) return;
        const promise = type === 'tips' ? addPrice({ priceName: name, priceAmount: Amount }) : type === 'class' ? addClass({ className: name }) : type === 'label' ? addLabel({ labelName: name }) : Promise.resolve();
        promise.then(res => {
            if (res.code === 200) {
                const newOptions = type === 'tips' ? [{ [idStr]: res.data.priceId, [nameStr]: name, priceAmount: Amount }, ...options] : [{ [idStr]: res.data[idStr], [nameStr]: name }, ...options]
                setOptions(newOptions);
                setName('');
                (type === 'tips') && setAmount(undefined)
            }
        })
    };

    const onChangeVal = (value: any) => {
        const val = type === 'tips' ? value : value.join(',');
        props.onChange(props.type, val)
    }

    return (
        <>
            {

                type === 'tips' ? <Select
                    tagRender={tagRender}
                    showArrow
                    style={{ width: '100%' }}
                    onChange={onChangeVal}
                    defaultValue={defaultPropsVal}
                    dropdownRender={menu => (
                        <>
                            {menu}
                            <Divider style={{ margin: '8px 0' }} />
                            <Space align="center" style={{ padding: '0 8px 4px' }}>
                                <Input placeholder="priceName" style={{ width: '100%' }} value={name} onChange={onNameChange} />
                                <InputNumber placeholder="priceMount" style={{ width: '100%' }} value={Amount} onChange={onAmountChange} />
                                <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
                                    <PlusOutlined /> Add item
                                </Typography.Link>
                            </Space>
                        </>
                    )}
                >
                    {
                        options.map(item => <Option key={item[idStr]} value={item[idStr]}>{item[nameStr] + ': ' + item['priceAmount']}</Option>)
                    }
                </Select> :
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={tagRender}
                        style={{ width: '100%' }}
                        onChange={onChangeVal}
                        defaultValue={strToArr(defaultPropsVal)}
                        dropdownRender={menu => (
                            <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <Space align="center" style={{ padding: '0 8px 4px' }}>
                                    <Input placeholder={nameStr} value={name} onChange={onNameChange} />
                                    <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
                                        <PlusOutlined /> Add item
                                    </Typography.Link>
                                </Space>
                            </>
                        )}
                    >
                        {
                            options.map(item => <Option key={item[idStr]} value={item[idStr]}>{item[nameStr]}</Option>)
                        }
                    </Select>
            }

        </>
    )
}
