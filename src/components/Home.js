import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Dimmer, Loader, Grid, Image, Header } from 'semantic-ui-react';
import youtube from '../api/youtube';

const Home = () => {
  const [state, setState] = useState({ isLoading: true, results: [] });
  const { isLoading, results } = state;

  useEffect(() => {
    // Get Trending Videos
    const getTrendingVideos = async () => {
      let {
        data: { items }
      } = await youtube.get('videos', {
        params: {
          part: 'snippet, contentDetails, statistics',
          maxResults: 25,
          key: process.env.REACT_APP_API_KEY,
          chart: 'mostPopular',
          regionCode: 'IN'
        }
      });

      // Get Required Data
      if (items.length) {
        items = items.map(item => {
          const {
            id,
            snippet: {
              title,
              description,
              publishedAt,
              channelId,
              channelTitle,
              thumbnails: { standard, high }
            }
          } = item;

          const url = standard ? standard.url : high.url;
          return { id, title, description, publishedAt, channelId, channelTitle, url: url };
        });
      }

      setState({ ...state, results: items, isLoading: false });
    };
    getTrendingVideos();
  }, []);

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }

  return (
    <Container fluid>
      <Grid columns={5} stackable>
        {results.map((item, key) => (
          <Grid.Column key={key}>
            <Link to={`/watch/${item.id}`}>
              <Image src={item.url} fluid />
              <Header as="h5">{item.title}</Header>
            </Link>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
