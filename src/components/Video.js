import React, { useState, useEffect } from 'react';
import { Container, Dimmer, Loader, Grid, Image, Header, Card, Icon, Divider } from 'semantic-ui-react';
import Plyr from 'plyr';
import moment from 'moment';

// const API_BASE_URL = 'http://localhost:4000';
const API_BASE_URL = 'https://tcmytdclone.herokuapp.com';

const Video = ({
  match: {
    params: { videoId }
  }
}) => {
  const [state, setState] = useState({ isLoading: true, info: null });
  const { isLoading, info } = state;

  useEffect(() => {
    // Get Related videos
    const getRelatedVideos = async () => {
      // let {
      //   data: { items }
      // } = await youtube.get('search', {
      //   params: { part: 'snippet', maxResults: 10, key: process.env.REACT_APP_API_KEY, relatedToVideoId: videoId, type: 'video' }
      // });

      // // Get Required Data
      // if (items.length) {
      //   items = items.map(item => {
      //     const {
      //       id: { videoId },
      //       snippet: {
      //         title,
      //         description,
      //         publishedAt,
      //         channelTitle,
      //         thumbnails: {
      //           medium: { url }
      //         }
      //       }
      //     } = item;
      //     return { id: videoId, title, description, publishedAt, channelTitle, url };
      //   });
      // }

      // setState({ ...state, relatedVideos: items, isLoading: false });

      // Enable Plyr
      new Plyr(document.getElementById('player'));

      // Get Video Info
      await fetch(`${API_BASE_URL}/info?id=${videoId}`)
        .then(response => response.json())
        .then(result => {
          const {
            author,
            description,
            formats,
            media,
            published,
            related_videos,
            timestamp,
            title,
            video_id,
            video_url,
            player_response: {
              videoDetails: { averageRating, channelId, lengthSeconds, shortDescription, thumbnail, viewCount }
            }
          } = result;

          const videoInfo = {
            author,
            description,
            formats,
            media,
            published,
            related_videos,
            timestamp,
            title,
            video_id,
            video_url,
            averageRating,
            channelId,
            lengthSeconds,
            shortDescription,
            thumbnail,
            viewCount
          };

          setState({ ...state, info: videoInfo, isLoading: false });
        })
        .catch(error => console.log('Request failed', error));
    };
    getRelatedVideos();
  }, [videoId]);

  const calculateVideoDuration = duration => {
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

  const relatedVideos = info && info.related_videos ? info.related_videos : [];

  return (
    <Container fluid>
      <Grid>
        <Grid.Row>
          <Grid.Column width="11">
            <div id="player" data-plyr-provider="youtube" data-plyr-embed-id={videoId} />
            {!info ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            ) : (
              <Container fluid style={{ padding: '1rem 0' }} textAlign="left">
                <Header as="h4">{info.title}</Header>
                <Header as="h5" color="grey">
                  {info.viewCount} Views
                </Header>
                <Divider />
                <Grid style={{ padding: 0 }}>
                  <Grid.Row>
                    <Grid.Column width="2">
                      <Image src={info.author.avatar} size="tiny" verticalAlign="middle" circular />
                    </Grid.Column>
                    <Grid.Column width="10" verticalAlign="middle">
                      <a href={info.author.channel_url} target="_blank">
                        {info.author.name}
                      </a>
                      <br />
                      Published on {new Date(parseInt(info.published)).toDateString()}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <p>{info.description}</p>
              </Container>
            )}
          </Grid.Column>
          <Grid.Column width="5">
            <Header as="h3">Related Videos</Header>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            ) : (
              <Container textAlign="left">
                {relatedVideos.slice(0, 6).map(
                  (video, key) =>
                    video.id &&
                    video.title && (
                      <Card
                        key={key}
                        fluid
                        href={`/watch/${video.id}`}
                        style={{ flexDirection: 'row', boxShadow: 'none', transform: 'none' }}
                      >
                        <Image src={video.iurlmq || video.iurlhq} inline size="small" />
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '0.5rem',
                            left: '0.5rem',
                            background: 'black',
                            color: 'white',
                            padding: '0 0.25rem',
                            opacity: 0.8
                          }}
                        >
                          {calculateVideoDuration(video.length_seconds)}
                        </span>
                        <Card.Content style={{ borderTop: 0 }}>
                          <Card.Header style={{ fontSize: '1rem' }} title={video.title}>
                            {video.title.substr(0, 50) + (video.title.length > 50 ? '...' : '')}
                          </Card.Header>
                          <Card.Meta>{video.author}</Card.Meta>
                          <Card.Description>
                            <Icon name="eye" /> {video.short_view_count_text}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    )
                )}
              </Container>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Video;
