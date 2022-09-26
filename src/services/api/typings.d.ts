// @ts-ignore
/* eslint-disable */

declare namespace API {

    type LoginParams = {
        username: string;
        password: string;
    };

    type CurrentUser = {
        username: string;
        token: string;
    }

    type PageParams = {
        current?: number;
        pageSize?: number;
    };

    type GoodsListItem = {
        valueType?: number;
        title?: string;
        dataIndex?: string;
    };

    type GoodListItem = {
        key?: number | null;
        title: string;
        classId: string;
        describe: string;
        remark: string;
        welfare:string;
        link:string;
        goodId: number | null;
        goodsName: string;
        imgId: string;
        labelId: string;
        price: number | null;
        pay: string;
        weight:number |null;
        serialNumber: string;
        thumbId: string;
        tipId: any;
        createTime: string;
        updateTime: string;
        classShowArr?: Array;
        labelShowArr?: Array;
        tipsShow?: any;
    };

    type addAndEditFormProps = {
        onClose: func;
        type: string;
        currentInfo: GoodListItem;
    }

    type TableResult = {
        data: Array;
        message: string;
        code: number;
    };

    type ListCommonProps = {
        column: ProColumns[];
        rowKey: string;
        addText: any;
        addFormItems: Array<any>;
        hideHeader?: boolean;
        operator: {
            get: any;
            add: any;
            update: any;
            delete: any;
        }
    };

    type SelectListProps = {
        defaultPropsVal: string | number;
        nameStr: string;
        idStr: string;
        type: string;
        onChange: func;
    };

    type UploadProps = {
        defaultPropsVal: string;
        type: string;
        onChange: func;
    };

    type ClassListItem = {
        key?: number;
        classDescribe: string;
        classId: number;
        className: string;
        hot: number;
    };

    type addClassFormProps = {
        list: Array<any>;
        submit: func;
    }

    type AddClass = {
        className: string;
        classDescribe: string;
        hot: number;
    };

    type ClassI = {
        id: number | null;
        value: string;
    }

    type LabelListItem = {
        key?: number;
        hot: number;
        labelDescribe: string;
        labelId: number;
        labelName: string;
    };

    type PriceListItem = {
        key?: number;
        priceAmount: number;
        priceId: number;
        priceName: string;
        updateTime: string;
    };

    type AddLabel = {
        labelName: string;
        labelDescribe: string;
        hot: number;
    };

    type RecommendCardProps = {
        currentKey: string;
    }

    type MenuInital = {
        classIds: Array;
        description: string;
        name: string;
        pid: number | null;
        status: number | null;
        url: string;
        menuId: number | null;
        createTime?: string;
        updateTime?: string;
    }

}
