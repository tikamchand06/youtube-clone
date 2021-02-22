import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Image } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { getTrendingVideos, getChannelVideos, formatVideoDuration, formatVideoViews } from '../api/youtube';
import Loader from './Loader';
import Moment from 'react-moment';

const Channel = ({ match: { params } }) => {
  const { Text, Title } = Typography;
  const [state, setState] = useState({ isLoading: true, results: [] });
  const { isLoading, results } = state;

  useEffect(() => {
    getTrendingVideos().then((items) => setState({ ...state, results: items, isLoading: false }));
    getChannelVideos(params.id).then((r) => console.log(r));
  }, [getTrendingVideos, getChannelVideos, params]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Title level={2} style={{ color: '#2196f3' }}>
        Your Channel Videos
      </Title>

      <Row gutter={[16, 16]}>
        {results.map((item, key) => (
          <Col key={key} span={6}>
            <Link to={`/watch/${item.id}`}>
              <div style={{ position: 'relative' }}>
                <Image src={item.snippet.thumbnails.standard.url} />
                <span className="duration">{formatVideoDuration(item.contentDetails.duration)}</span>
              </div>
              <Text strong>{item.snippet.title}</Text>
            </Link>
            <Link to={'/channel/' + item.snippet.channelId} style={{ display: 'block' }}>
              <span style={{ marginRight: 5 }}>{item.snippet.channelTitle}</span> <CheckCircleFilled />
            </Link>
            <p style={{ color: '#212121' }}>
              <span>{formatVideoViews(item.statistics.viewCount)}</span>
              <span style={{ marginRight: 5, marginLeft: 5 }}> - </span>
              <Moment fromNow>{item.snippet.publishedAt}</Moment>
            </p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Channel;
