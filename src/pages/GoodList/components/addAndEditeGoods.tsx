import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, notification } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import SelectList from '@/components/SelectList';
import UploadCommon from '@/components/UploadCommon';
import styles from '../css/index.less';
import { addGood, updateGoodById } from '@/services/api';

const { TextArea } = Input;

const AddAndEditeGoods: React.FC<API.addAndEditFormProps> = ({ type, currentInfo, onClose }) => {
  console.log(currentInfo);
  const { goodId, title, goodsName, price, tipId, classId, labelId, thumbId, imgId, describe, remark , welfare, pay, weight,link } =
    currentInfo;

  const intl = useIntl();
  const [tip, setTip] = useState<string | number>(tipId);
  const [classes, setClasses] = useState<string | number>(classId);
  const [labels, setLabels] = useState<string | number>(labelId);
  const [thumb, setThumb] = useState<string>(thumbId);
  const [img, setImg] = useState<string>(imgId);

  const onFinish = (values: any) => {
    const params = Object.assign(values, {
      tipId: tip,
      classId: classes || ' ',
      labelId: labels || ' ',
      thumbId: thumb || ' ',
      imgId: img || ' ',
    });
    console.log(params);
    const promise = type === 'add' ? addGood({ ...params }) : updateGoodById({ ...params, goodId });
    promise.then((res) => {
      if (res.code === 200) {
        notification.success({
          message: intl.formatMessage({ id: 'pages.listcommon.tips', defaultMessage: 'tips' }),
          description: res.message,
        });
        onClose();
      }
    });
  };

  const onSeletChange = (type: string, val: string | number) => {
    console.log(type, val);
    type === 'tips'
      ? setTip(val)
      : type === 'class'
      ? setClasses(val)
      : type === 'label'
      ? setLabels(val)
      : null;
  };

  const onUploadChange = (type: string, val: string) => {
    console.log(type, val);
    type === 'thumbId' ? setThumb(val) : setImg(val);
  };

  return (
    <>
      <h3 className={styles.title}>
        {type === 'add' ? (
          <FormattedMessage id="pages.goodlist.add" defaultMessage="add" />
        ) : (
          <FormattedMessage id="pages.goodlist.eidt" defaultMessage="eidt" />
        )}
      </h3>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ padding: '20px 50px 0 50px' }}
        initialValues={{
          title,
          goodsName,
          price,
          describe,
          remark,
          welfare,
          pay,
          weight,
          link
        }}
      >
        <Form.Item
          name="title"
          label={intl.formatMessage({ id: 'pages.goodlist.title', defaultMessage: 'title' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.goodlist.inputTitle',
                defaultMessage: 'inputTitle',
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="goodsName"
          label={intl.formatMessage({
            id: 'pages.goodlist.goodsName',
            defaultMessage: 'goodsName',
          })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.classlist.inputName',
                defaultMessage: 'inputName',
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label={intl.formatMessage({ id: 'pages.goodlist.price', defaultMessage: 'price' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'pages.tipslist.inputMount',
                defaultMessage: 'inputMount',
              }),
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="link"
          label={intl.formatMessage({ id: 'pages.goodlist.link', defaultMessage: 'link' })}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="weight"
          label={intl.formatMessage({ id: 'pages.goodlist.weight', defaultMessage: 'weight' })}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="tipId"
          label={intl.formatMessage({ id: 'pages.goodlist.tips', defaultMessage: 'tips' })}
        >
          <SelectList
            type="tips"
            nameStr="priceName"
            idStr="tipId"
            defaultPropsVal={tipId}
            onChange={(type: string, val: number) => onSeletChange(type, val)}
          />
        </Form.Item>
        <Form.Item
          name="classId"
          label={intl.formatMessage({ id: 'pages.goodlist.class', defaultMessage: 'class' })}
        >
          <SelectList
            type="class"
            nameStr="className"
            idStr="classId"
            defaultPropsVal={classId}
            onChange={(type: string, val: string) => onSeletChange(type, val)}
          />
        </Form.Item>
        <Form.Item
          name="labelId"
          label={intl.formatMessage({ id: 'pages.goodlist.label', defaultMessage: 'label' })}
        >
          <SelectList
            type="label"
            nameStr="labelName"
            idStr="labelId"
            defaultPropsVal={labelId}
            onChange={(type: string, val: string) => onSeletChange(type, val)}
          />
        </Form.Item>
        <Form.Item
          name="thumbId"
          label={intl.formatMessage({ id: 'pages.goodlist.thumbId', defaultMessage: 'thumbId' })}
        >
          <UploadCommon
            type="thumbId"
            defaultPropsVal={thumbId}
            onChange={(type: string, val: string) => onUploadChange(type, val)}
          />
        </Form.Item>
        <Form.Item
          name="imgId"
          label={intl.formatMessage({ id: 'pages.goodlist.imgId', defaultMessage: 'imgId' })}
        >
          <UploadCommon
            type="imgId"
            defaultPropsVal={imgId}
            onChange={(type: string, val: string) => onUploadChange(type, val)}
          />
        </Form.Item>
        <Form.Item
          name="pay"
          label={intl.formatMessage({ id: 'pages.goodlist.pay', defaultMessage: 'pay' })}
        >
          <TextArea rows={1}   />
        </Form.Item>
        <Form.Item
          name="describe"
          label={intl.formatMessage({ id: 'pages.goodlist.describe', defaultMessage: 'describe' })}
        >
          <TextArea rows={3} placeholder="如需分条逗号隔开"  />
        </Form.Item>
        <Form.Item
          name="remark"
          label={intl.formatMessage({ id: 'pages.goodlist.remark', defaultMessage: 'remark' })}
        >
          <TextArea rows={3}  placeholder="如需分条逗号隔开" />
        </Form.Item>
        <Form.Item
          name="welfare"
          label={intl.formatMessage({ id: 'pages.goodlist.welfare', defaultMessage: 'welfare' })}
        >
          <TextArea rows={3} placeholder="如需分条逗号隔开" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="pages.goodlist.sub" defaultMessage="submit" />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAndEditeGoods;
