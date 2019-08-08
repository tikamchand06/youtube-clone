import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Container, Image, Search } from 'semantic-ui-react';
import Logo from '../logo.png';
import youtube from '../api/youtube';

const Navbar = ({ history }) => {
  const [searchConfig, setState] = useState({ isLoading: false, results: [], value: '' });
  const { isLoading, results, value } = searchConfig;

  // Get Search Results
  const onSearchChange = async value => {
    setState({ ...searchConfig, value, isLoading: true });
    if (value && value.length > 2) {
      let {
        data: { items }
      } = await youtube.get('search', {
        params: { part: 'snippet', maxResults: 10, key: process.env.REACT_APP_API_KEY, q: value }
      });

      if (items.length) {
        items = items.map(item => {
          const {
            id: { videoId },
            snippet: { title }
          } = item;
          return { id: videoId, title };
        });
      }

      setState({ ...searchConfig, results: items, isLoading: false });
    }
  };

  // Redirect to watch screen
  const onResultSelect = ({ result }) => history.push(`/watch/${result.id}`);

  return (
    <Menu borderless className="navbar" fixed="top">
      <Container>
        <Menu.Item as={Link} to="/">
          <Image src={Logo} size="mini" /> YouTube Clone
        </Menu.Item>
        <Menu.Menu position="right" style={{ alignItems: 'center' }}>
          <Search
            loading={isLoading}
            onResultSelect={(e, d) => onResultSelect(d)}
            onSearchChange={(e, { value }) => onSearchChange(value)}
            results={results}
            resultRenderer={({ title }) => title}
            value={value}
            minCharacters={3}
            placeholder="Search..."
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default withRouter(Navbar);
