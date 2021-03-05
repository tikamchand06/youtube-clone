import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Image, Result, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { getTrendingVideos, getFavoriteVideos, formatVideoDuration, formatVideoViews, getVideoThubmnailURL } from '../api/youtube';
import Loader from './Loader';
import Moment from 'react-moment';

const Home = ({ match: { params } }) => {
  const { Text, Title } = Typography;
  const isFavorite = params.type && params.type === 'favorites';
  const [state, setState] = useState({ isLoading: true, results: null });
  const { isLoading, results } = state;

  useEffect(() => {
    const result = isFavorite ? getFavoriteVideos() : getTrendingVideos();
    result.then((items) => setState({ ...state, results: items, isLoading: false }));
  }, [getTrendingVideos, getFavoriteVideos, isFavorite]);

  if (isLoading) return <Loader />;

  return (
    <div>
      {isFavorite && results.length > 0 && (
        <Title level={3} style={{ color: '#2196f3' }}>
          Your Favorite Videos
        </Title>
      )}

      {results.length === 0 && (
        <Result
          status="403"
          title="No videos found."
          subTitle="Sorry, There are no videos available to show."
          extra={
            <Button type="primary" href="/">
              Back Home
            </Button>
          }
        />
      )}

      <Row gutter={[16, 16]}>
        {results.map((item, key) => (
          <Col key={key} span={6}>
            <Link to={`/watch/${item.id}`}>
              <div style={{ position: 'relative' }}>
                <Image src={getVideoThubmnailURL(item.snippet.thumbnails)} />
                <span className="duration">{formatVideoDuration(item.contentDetails.duration)}</span>
              </div>
              <Text strong>{item.snippet.title}</Text>
            </Link>
            <Link to={'/channel/' + item.snippet.channelId} style={{ display: 'block' }}>
              <span style={{ marginRight: 5 }}>{item.snippet.channelTitle}</span> <CheckCircleFilled style={{ fontSize: '0.8rem' }} />
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

export default Home;
