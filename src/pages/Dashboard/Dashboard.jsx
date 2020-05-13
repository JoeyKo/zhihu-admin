import React from 'react'
import { Layout, Card, Row, Col } from 'antd'
import { Chart, Line, Point, Interval, Tooltip } from 'bizcharts';
import styles from './index.module.scss'
// 数据源
const data = [
    {
        month: "Jan",
        city: "Tokyo",
        temperature: 7
    },
    {
        month: "Jan",
        city: "London",
        temperature: 3.9
    },
    {
        month: "Feb",
        city: "Tokyo",
        temperature: 6.9
    },
    {
        month: "Feb",
        city: "London",
        temperature: 4.2
    },
    {
        month: "Mar",
        city: "Tokyo",
        temperature: 9.5
    },
    {
        month: "Mar",
        city: "London",
        temperature: 5.7
    },
    {
        month: "Apr",
        city: "Tokyo",
        temperature: 14.5
    },
    {
        month: "Apr",
        city: "London",
        temperature: 8.5
    },
    {
        month: "May",
        city: "Tokyo",
        temperature: 18.4
    },
    {
        month: "May",
        city: "London",
        temperature: 11.9
    },
    {
        month: "Jun",
        city: "Tokyo",
        temperature: 21.5
    },
    {
        month: "Jun",
        city: "London",
        temperature: 15.2
    },
    {
        month: "Jul",
        city: "Tokyo",
        temperature: 25.2
    },
    {
        month: "Jul",
        city: "London",
        temperature: 17
    },
    {
        month: "Aug",
        city: "Tokyo",
        temperature: 26.5
    },
    {
        month: "Aug",
        city: "London",
        temperature: 16.6
    },
    {
        month: "Sep",
        city: "Tokyo",
        temperature: 23.3
    },
    {
        month: "Sep",
        city: "London",
        temperature: 14.2
    },
    {
        month: "Oct",
        city: "Tokyo",
        temperature: 18.3
    },
    {
        month: "Oct",
        city: "London",
        temperature: 10.3
    },
    {
        month: "Nov",
        city: "Tokyo",
        temperature: 13.9
    },
    {
        month: "Nov",
        city: "London",
        temperature: 6.6
    },
    {
        month: "Dec",
        city: "Tokyo",
        temperature: 9.6
    },
    {
        month: "Dec",
        city: "London",
        temperature: 4.8
    }
];
const data1 = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
];

const Dashboard = () => {

    return (
        <Layout className={styles.container}>
            <Row gutter={24}>
                <Col span={6} className={styles.cardWrapper}>
                    <Card>1</Card>
                </Col>
                <Col span={6} className={styles.cardWrapper}>
                    <Card>2</Card>
                </Col>
                <Col span={6} className={styles.cardWrapper}>
                    <Card>3</Card>
                </Col>
                <Col span={6} className={styles.cardWrapper}>
                    <Card>4</Card>
                </Col>
            </Row>
            <Card>
                <Row>
                    <Col span={12}>
                        <Chart height={400} scale={{ temperature: { min: 0 } }} padding={[10, 20, 50, 40]} autoFit data={data} >
                            <Line shape="smooth" position="month*temperature" color="city" />
                            <Point position="month*temperature" color="city" />
                        </Chart>
                    </Col>
                    <Col span={12}>
                        <Chart height={400} padding="auto" data={data1} autoFit>
                            <Interval
                                adjust={[
                                    {
                                        type: 'dodge',
                                        marginRatio: 0,
                                    },
                                ]}
                                color="name"
                                position="月份*月均降雨量"
                            />
                            <Tooltip shared />
                        </Chart>
                    </Col>
                </Row>

            </Card>
        </Layout>
    )
}

export default Dashboard