import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Divider, Avatar, Dropdown, Button, Menu, List, Image, Tooltip } from 'antd';
import { LikeFilled, DislikeFilled, DownloadOutlined, CheckCircleFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { getVideoInfo, newLineToBr, formatVideoViews, addToFavorite, isFavorite } from '../api/youtube';
import Loader from './Loader';
import moment from 'moment';
import Plyr from 'plyr';
import Moment from 'react-moment';

const Video = ({ match: { params } }) => {
  const videoId = params.videoId;
  const [info, setInfo] = useState(null);
  const [isFav, setIsFav] = useState(isFavorite(videoId));
  const { Title, Text } = Typography;

  // Get Video Info
  useEffect(() => {
    getVideoInfo(videoId).then((info) => {
      setInfo(info);
      new Plyr('#player');
    });
  }, [videoId, getVideoInfo]);

  const calculateVideoDuration = (duration) => {
    duration = moment.duration(duration * 1000);
    let hhmmss = '';
    const hours = duration.get('hours');
    const minutes = duration.get('minutes');
    const seconds = duration.get('seconds');

    if (hours > 0) hhmmss += (hours < 10 ? `0${hours}` : hours) + ':';
    hhmmss += (minutes < 10 ? `0${minutes}` : minutes) + ':';
    hhmmss += seconds < 10 ? `0${seconds}` : seconds;
    return hhmmss;
  };

  if (!info) return <Loader />;

  const { videoDetails, formats, related_videos } = info;
  const downloadOptions = formats.reduce((data, format, key) => {
    const mimeType2 = format.mimeType ? format.mimeType.split(';')[0] : 'Unknown';
    const itemKey = mimeType2.replace('/', '_') + (format.qualityLabel ? '_' + format.qualityLabel : '');

    const result = data.find((d) => d.itemKey === itemKey);
    if (result) return data;

    return [...data, { ...format, mimeType2, itemKey }];
  }, []);

  const menu = (
    <Menu>
      {downloadOptions.map((d) => (
        <Menu.Item key={d.itemKey}>
          <a href={d.url} download>
            {(d.qualityLabel ? d.qualityLabel : '') + ' ' + d.mimeType2}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Row gutter={[16, 0]}>
      <Col span={16}>
        <div id="player" data-plyr-provider="youtube" data-plyr-embed-id={videoId} />
        <Title level={4} style={{ marginTop: 10 }}>
          {videoDetails.title}
        </Title>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="stats">
          <div>
            <Text strong>{videoDetails.viewCount} views</Text>
            <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
            <Moment format="MMM D, YYYY">{videoDetails.publishDate}</Moment>
          </div>
          <div>
            <Tooltip title="Likes">
              <Text style={{ marginRight: 10 }}>
                <LikeFilled /> {formatVideoViews(videoDetails.likes)}
              </Text>
            </Tooltip>

            <Tooltip title="Dislikes">
              <Text style={{ marginRight: 10 }}>
                <DislikeFilled /> {formatVideoViews(videoDetails.dislikes)}
              </Text>
            </Tooltip>

            <Tooltip title={`${isFav ? 'Remove from' : 'Add to'} Favorites`}>
              <Button
                style={{ marginRight: 10 }}
                type={isFav ? 'primary' : 'default'}
                onClick={() => {
                  setIsFav(!isFav);
                  addToFavorite(videoId);
                }}
                icon={isFav ? <HeartFilled /> : <HeartOutlined />}
              >
                Save
              </Button>
            </Tooltip>

            <Dropdown overlay={menu} placement="topRight">
              <Button icon={<DownloadOutlined />}>Download</Button>
            </Dropdown>
          </div>
        </div>
        <Divider />
        <div style={{ display: 'flex' }}>
          <Avatar src={videoDetails.author.thumbnails[0].url} />
          <div style={{ marginLeft: 10, width: '100%' }}>
            <Link to={'/channel/' + videoDetails.author.id}>
              <p style={{ fontWeight: 'bold', fontSize: 16, margin: 0 }}>{videoDetails.author.name}</p>
              <Text>{formatVideoViews(videoDetails.author.subscriber_count)} Subscribers</Text>
            </Link>

            <p
              style={{ fontWeight: 'bold', marginTop: 10 }}
              dangerouslySetInnerHTML={{ __html: newLineToBr(videoDetails.description) }}
            />
          </div>
        </div>
      </Col>

      <Col span={8}>
        <List
          footer={null}
          dataSource={related_videos}
          header={<Title level={3}>Related Videos</Title>}
          renderItem={(item) => {
            return (
              <List.Item style={{ alignItems: 'flex-start', paddingTop: 0 }}>
                <Link to={`/watch/${item.id}`} style={{ position: 'relative', display: 'block' }}>
                  <Image src={item.thumbnails[0].url} />
                  <span className="rel_duration">{calculateVideoDuration(item.length_seconds)}</span>
                </Link>
                <div style={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Link to={`/watch/${item.id}`} style={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Link>
                  <Link to={'/channel/' + item.author.id} style={{ color: '#424242' }}>
                    <span style={{ marginRight: 5 }}>{item.author.name}</span> <CheckCircleFilled />
                  </Link>
                  <Text strong>
                    <span>{item.short_view_count_text} views</span>
                    <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
                    <span>{item.published}</span>
                  </Text>
                </div>
              </List.Item>
            );
          }}
        />
      </Col>
    </Row>
  );
};

export default Video;
