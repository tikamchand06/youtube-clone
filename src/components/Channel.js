import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Image, Divider } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, VideoCameraOutlined, EyeOutlined } from '@ant-design/icons';
import { getChannelVideos, formatVideoViews } from '../api/youtube';
import Loader from './Loader';
import Moment from 'react-moment';

const Channel = ({ match: { params } }) => {
  const { Text, Title } = Typography;
  const [state, setState] = useState({ isLoading: true, result: null });
  const { isLoading, result } = state;

  useEffect(() => {
    getChannelVideos(params.id).then((result) => setState({ ...state, result, isLoading: false }));
  }, [getChannelVideos, params]);

  if (isLoading || !result) return <Loader />;

  const { channel, videos } = result;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Image src={channel.snippet.thumbnails.medium.url} style={{ maxWidth: 125 }} />
        <div>
          <Title level={4} style={{ color: '#2196f3', margin: 0 }}>
            <span style={{ marginRight: 5 }}>{channel.snippet.title}</span> <CheckCircleFilled style={{ fontSize: '1rem' }} />
          </Title>
          <Text strong>{channel.snippet.description}</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 'bold' }}>
            <Text style={{ color: '#03a9f4' }}>
              <CheckCircleOutlined /> {formatVideoViews(channel.statistics.subscriberCount)} Subscribers
            </Text>
            <Text style={{ color: '#03a9f4' }}>
              <VideoCameraOutlined /> {channel.statistics.videoCount} Videos
            </Text>
            <Text style={{ color: '#03a9f4' }}>
              <EyeOutlined /> {formatVideoViews(channel.statistics.viewCount)} Views
            </Text>
          </div>
        </div>
      </div>
      <Divider />
      <Row gutter={[16, 16]}>
        {videos.map((item, key) => (
          <Col key={key} span={6}>
            <Link to={`/watch/${item.id.videoId}`}>
              <div style={{ position: 'relative' }}>
                <Image src={item.snippet.thumbnails.high.url} />
                {/* <span className="duration">{formatVideoDuration(item.contentDetails.duration)}</span> */}
              </div>
              <Text strong>{item.snippet.title}</Text>
            </Link>
            <p style={{ color: '#212121' }}>
              {/* <span>{formatVideoViews(item.statistics.viewCount)}</span>
              <span style={{ marginRight: 5, marginLeft: 5 }}> - </span> */}
              <Moment fromNow>{item.snippet.publishedAt}</Moment>
            </p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Channel;
