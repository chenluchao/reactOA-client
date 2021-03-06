import React, { Component } from 'react'
import { Card, Button, List, Image } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BASE_IMG_URL } from '../../../../utils/constants'
export default class Detail extends Component {
  state = {
    productDetailArr: [],
  }
  // 返回列表
  goBack = () => {
    this.props.history.goBack()
  }
  // 根据产品详情对象生成列表所需的数组
  initProductDetail = () => {
    const productDetail = this.props.location.state || {}
    console.log('产品详情', productDetail)
    let aimArr = [
      { name: '商品名称', value: 'name', flag: 'normal' },
      { name: '商品价格（元）', value: 'price', flag: 'normal' },
      { name: '商品描述', value: 'desc', flag: 'normal' },
      { name: '商品状态', value: 'status', flag: 'status' },
      { name: '商品图片', value: 'imgs', flag: 'imgs' },
      { name: '商品详情', value: 'detail', flag: 'normal' },
    ]
    let detailArr = []
    aimArr.forEach((item) => {
      let detailItem = {
        name: item.name,
        value: productDetail[item.value],
        flag: item.flag,
      }
      detailArr.push(detailItem)
    })
    this.setState({
      productDetailArr: detailArr,
    })
  }
  componentDidMount() {
    this.initProductDetail()
  }
  render() {
    const { productDetailArr } = this.state
    const title = (
      <>
        <Button
          style={{ fontSize: '18px' }}
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={this.goBack}
        >
          商品详情
        </Button>
      </>
    )
    return (
      <Card title={title} style={{ width: '100%' }}>
        <List
          size="large"
          bordered
          dataSource={productDetailArr}
          renderItem={(item) => (
            <List.Item style={{ display: 'block', fontSize: '18px' }}>
              <span
                style={{
                  fontWeight: 'bold',
                  marginRight: '10px',
                  verticalAlign: 'top',
                }}
              >
                {item.name}：
              </span>
              {item.flag === 'status' ? (
                <span
                  style={{
                    color: item.value === 1 ? '#03ccbb' : '#d9363e',
                  }}
                >
                  {item.value === 1 ? '在售' : '已下架'}
                </span>
              ) : item.flag === 'imgs' ? (
                <Image.PreviewGroup>
                  {item.value.map((imgItem) => {
                    return (
                      <span style={{marginRight:'10px'}}>
                        <Image
                          width={150}
                          key={imgItem}
                          src={BASE_IMG_URL + imgItem}
                          alt="img"
                        />
                      </span>
                    )
                  })}
                </Image.PreviewGroup>
              ) : (
                <span dangerouslySetInnerHTML={{__html: item.value}}></span>
              )}
            </List.Item>
          )}
        />
      </Card>
    )
  }
}
