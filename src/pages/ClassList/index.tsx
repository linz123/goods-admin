import ListCommon from "@/components/ListCommon"
import { classList, updateClassById, deleteClassById, addClass } from '@/services/api/index';
import { useIntl, FormattedMessage } from 'umi';

export default function ClassList() {

    const intl = useIntl();

    const listProps: API.ListCommonProps = {
        addText: <FormattedMessage id="pages.classlist.add" defaultMessage="addClass" />,
        rowKey: 'classId',
        column: [
            { title: <FormattedMessage id="pages.classlist.classId" defaultMessage="classId" />, dataIndex: 'classId', editable: false },
            { title: <FormattedMessage id="pages.classlist.className" defaultMessage="className" />, dataIndex: 'className' },
            { title: <FormattedMessage id="pages.classlist.classDescribe" defaultMessage="classDescribe" />, dataIndex: 'classDescribe', colSize: 3, ellipsis: true },
            { title: <FormattedMessage id="pages.classlist.hot" defaultMessage="hot" />, dataIndex: 'hot' },
        ],
        addFormItems: [
            { type: 'Input', label: intl.formatMessage({ id: 'pages.classlist.className', defaultMessage: 'className' }), name: 'className', rules: [{ required: true, message: intl.formatMessage({ id: 'pages.classlist.inputName', defaultMessage: 'place inputName！' }) }] },
            { type: 'InputNumber', label: intl.formatMessage({ id: 'pages.classlist.hot', defaultMessage: 'hot' }), name: 'hot', rules: null },
            { type: 'TextArea', label: intl.formatMessage({ id: 'pages.classlist.classDescribe', defaultMessage: 'classDescribe' }), name: 'classDescribe', rules: null },
        ],
        operator: {
            get: classList,
            add: addClass,
            update: updateClassById,
            delete: deleteClassById
        }
    }

    return <ListCommon {...listProps} />

}
