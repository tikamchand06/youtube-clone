import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';
import '../error404.css';

const NotFound = () => {
  return (
    <Container textAlign="center" className="error-404">
      <Header as="h1">Oops!</Header>
      <Header as="h2" color="black">
        404 - Page not found
      </Header>
      <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
      <Button as={Link} to="/" primary>
        Go To Homepage
      </Button>
    </Container>
  );
};

export default NotFound;
