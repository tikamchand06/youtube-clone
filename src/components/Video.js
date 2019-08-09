import React, { useState, useEffect } from 'react';
import { Container, Dimmer, Loader, Grid, Image, Header, Card, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';
import youtube from '../api/youtube';

const Video = ({
  match: {
    params: { videoId }
  }
}) => {
  const [state, setState] = useState({ isLoading: true, relatedVideos: [] });

  // Get Related videos
  const getRelatedVideos = async () => {
    let {
      data: { items }
    } = await youtube.get('search', {
      params: { part: 'snippet', maxResults: 10, key: process.env.REACT_APP_API_KEY, relatedToVideoId: videoId, type: 'video' }
    });

    // Get Required Data
    if (items.length) {
      items = items.map(item => {
        const {
          id: { videoId },
          snippet: {
            title,
            description,
            publishedAt,
            channelTitle,
            thumbnails: {
              medium: { url }
            }
          }
        } = item;
        return { id: videoId, title, description, publishedAt, channelTitle, url };
      });
    }

    setState({ ...state, relatedVideos: items, isLoading: false });
  };

  useEffect(() => {
    getRelatedVideos();
  }, []);

  const { isLoading, relatedVideos } = state;

  return (
    <Container fluid>
      <Grid>
        <Grid.Row>
          <Grid.Column width="11">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              style={{ border: 0, minHeight: '70vh' }}
              title="Playing Youtube videos"
            />
          </Grid.Column>
          <Grid.Column width="5">
            <Header as="h3">Related Videos</Header>
            {isLoading ? (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            ) : (
              <Container style={{ maxHeight: '65vh', overflow: 'hidden auto' }}>
                {relatedVideos.map((video, key) => (
                  <Card
                    key={key}
                    fluid
                    href={`/watch/${video.id}`}
                    style={{ flexDirection: 'row', boxShadow: 'none', transform: 'none' }}
                  >
                    <Image src={video.url} inline size="small" />
                    <Card.Content style={{ borderTop: 0 }}>
                      <Card.Header style={{ fontSize: '1rem' }}>{video.title}</Card.Header>
                      <Card.Meta>
                        <Icon name="time" /> <Moment parse="YYYY-MM-DD HH:mm">{video.publishedAt}</Moment>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                ))}
              </Container>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Video;
