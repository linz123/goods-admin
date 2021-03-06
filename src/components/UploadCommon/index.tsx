import { useState, useEffect } from 'react';
import { Upload, Modal } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { deleteImgById, getImagesByIds } from '@/services/api/index';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

export default function UploadCommon(props: API.UploadProps) {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewVisible(false);

    useEffect(() => {
        if (props.defaultPropsVal == '') return;
        getImagesByIds({ ids: props.defaultPropsVal }).then(res => {
            console.log(res)
            if (res.code === 200 && res.data.length) {
                const defaultImgs = res.data.map((ele: any) => {
                    const { ImgRelativeUrl, imgId } = ele
                    return {
                        uid: imgId,
                        name: `image${imgId}`,
                        status: 'done',
                        url: `http://192.168.20.254:8080${ImgRelativeUrl}`,
                        response: {
                            data: ele
                        }
                    }
                });
                setFileList(defaultImgs)
            }
        })
    }, [])

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        setFileList([...newFileList]);
        console.log(newFileList)
        // ???????????????????????????????????????????????????
        // newFileList.length === 0  => ???????????????????????????
        if (!newFileList.length || newFileList[newFileList.length - 1]?.status === "done") {
            const idArr = new Set();
            console.log(newFileList)
            newFileList.forEach((ele: any) => {
                idArr.add(ele.response.data.imgId)
            })
            props.onChange(props.type, [...idArr].join(','))
        }
    }

    const handelRemove = (file: UploadFile) => {
        const { response: { data: { imgId } } } = file
        deleteImgById({
            imgId,
            type: 0
        })
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                action="/admin/uploadImg"
                onRemove={handelRemove}
                name="img"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}
