import styles from './index.less';
import { Select, Button, Radio, Form, Input, InputNumber, notification } from 'antd';
import { FormattedMessage } from 'umi';
import { addMenu, updateMenuById } from '@/services/api';
const { TextArea } = Input;
const { Option } = Select;

export default function AddMenuList(props: { allClass: any[]; initialVal: API.MenuInital; submit: any }) {

    const { allClass, initialVal, submit } = props

    const onFinish = (values: any) => {
        const params = { ...values, classIds: values.classIds.join(",") }
        let promise = null
        if (initialVal.menuId === null) {
            //新增
            promise = addMenu(params)
        } else {
            //编辑
            promise = updateMenuById({ ...params, menuId: initialVal.menuId })
        }
        promise.then(res => {
            if (res.code === 200) {
                notification.success({
                    message: "提示",
                    description: res.message
                })
                submit()
            }
        })
    };

    return (
        <>
            <h3 className={`${styles.title} ${styles.mB30}`}>{!initialVal.menuId === null ? '新增菜单' : '编辑菜单'}</h3>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{ ...initialVal }}
            >
                <Form.Item
                    label="菜单名称"
                    name="name"
                    rules={[{ required: true, message: '请输入菜单名称！' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="父级ID"
                    name="pid"
                    rules={[{ required: true, message: '请输入父级ID！' }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="菜单路由"
                    name="url"
                    rules={[{ required: true, message: '请输入菜单路由！' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="菜单分类"
                    name="classIds"
                >
                    <Select mode="multiple" allowClear showArrow placeholder="请选择分类">
                        {
                            allClass.map(item => <Option key={item.classId} value={item.classId}>{item.className}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="菜单状态"
                    name="status"
                >
                    <Radio.Group>
                        <Radio value={0}>关闭</Radio>
                        <Radio value={1}>开启</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="菜单描述"
                    name="description"
                >
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        <FormattedMessage id="pages.goodlist.sub" defaultMessage="sub" />
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
