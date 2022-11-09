import {Button, Card, Col, Divider, message, Row, Statistic, Table} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {LogData, StaticsData} from "@/util";
import {Line} from '@ant-design/charts';
import {get15DaysStatics, getLogByPage, getStatics} from "@/services/api";
import moment from "moment";

export default function DashBoard() {
  const formatterTime = (val: string) => {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
  }
  const actionColumns = [
    {
      title: 'id',
      dataIndex: 'accessId',
      key: 'accessId',
    },
    {
      title: '地理位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '客户端Ip',
      dataIndex: 'clientIp',
      key: 'clientIp',
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      title: '客户端类型',
      dataIndex: 'clientType',
      key: 'clientType',
    },
    {
      title: '源链接',
      dataIndex: 'fromUrl',
      key: 'fromUrl',
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '操作内容',
      dataIndex: 'typeContent',
      key: 'typeContent',
    },
    {
      title: '访问时间',
      dataIndex: 'time',
      key: 'time',
      render: formatterTime
    },

  ]


  const [statistics, setStatistics] = useState({...StaticsData});
  const [record, setRecord] = useState({...LogData})
  const [DaysStatics, setDaysStatics] = useState([])

  let [pageConfig, setPageConfig] = useState({
    pageSize: 10, pageNumber: 1
  });

  function refresh() {
    GetAllStatics()
    message.info('已更新');
  }

  function onPageChange(current: number, size: number) {
    getLogByPage({
      ...{
        pageSize: size,
        pageNumber: current,
      }
    }).then(resp => {
      setRecord(resp.data);
    })
  }


  useEffect(() => {
    GetAllStatics();
  }, [])

  function GetAllStatics() {
    getStatics({}).then(resp => {
      setStatistics(resp.data);
    })
    get15DaysStatics({}).then(resp => {
      console.log(resp.data.ip.concat(resp.data.click))
      setDaysStatics(resp.data.ip.concat(resp.data.click))
    })
    page();
  }

  function page() {
    getLogByPage({...pageConfig}).then(resp => {
      setRecord(resp.data);
    })
  }

  const RecordConfig = {
    data: DaysStatics,
    height: 400,
    xField: 'create_time',
    yField: 'value',
    seriesField: 'class',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    meta: {
      create_time: {alias: '日期'},
      value: {alias: '使用人次'},
    },
  };

  return (
    <div className="dashboard">
      <Button style={{'marginBottom': '10px'}} type="primary" onClick={refresh}>刷新</Button>
      <Row gutter={30} style={{'marginBottom': '10px'}}>
        <Col span={8}>
          <Card>
            <Statistic title="今日点击量" value={statistics?.todayClick}/>
            <Divider/>
            <span style={{'color': 'grey'}}>昨日点击量</span>
            <span>{statistics?.yesClick - statistics.todayClick}</span>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="今日ip数" value={statistics?.todayIP} valueStyle={{color: '#3f8600'}}
                       prefix={<ArrowUpOutlined/>}/>
            <Divider/>
            <span style={{'color': 'grey'}}>昨日ip数</span> <span>{statistics?.yesIP - statistics?.todayIP}</span>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="七日点击量" value={statistics?.sevenDayClick}/>
            <Divider/>
            <span style={{'color': 'grey'}}>总点击次数</span> <span>{statistics?.historyClick}</span>
          </Card>
        </Col>
      </Row>


      <Line style={{'marginBottom': '10px'}} {...RecordConfig} />

      <div style={{'marginTop': '30px'}} className="user-action">
        <Table dataSource={record.list} columns={actionColumns} pagination={{
          position: 'bottomRight',
          total: record.total,
          pageSize: pageConfig.pageSize,
          onChange: (current, size) => onPageChange(current, size)
        }}/>
      </div>


    </div>
  )

}
