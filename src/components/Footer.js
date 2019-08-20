import React from 'react';
import { Container, Button, Icon, Grid } from 'semantic-ui-react';

const Footer = () => (
  <Container fluid style={{ background: '#F5F5F5', padding: '1rem' }}>
    <Grid className="footer">
      <Grid.Row verticalAlign="middle">
        <Grid.Column width="8" textAlign="left">
          <Icon name="copyright outline" /> {new Date().getFullYear()}{' '}
          <a href="http://www.tcmhack.in" target="_blank" rel="noopener noreferrer">
            TCMHACK
          </a>{' '}
          All Rights Reserved.
        </Grid.Column>
        <Grid.Column width="8" textAlign="right">
          Follow us on:{' '}
          <a href="https://www.facebook.com/tcmhack" target="_blank" rel="noopener noreferrer">
            <Button color="facebook" icon circular>
              <Icon name="facebook f" />
            </Button>
          </a>
          <a href="https://twitter.com/tcmhack/" target="_blank" rel="noopener noreferrer">
            <Button color="twitter" icon circular>
              <Icon name="twitter" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/company/tcmhack/" target="_blank" rel="noopener noreferrer">
            <Button color="linkedin" icon circular>
              <Icon name="linkedin" />
            </Button>
          </a>
          <a href="https://wa.me/9571447122/?text=TCMHACK" target="_blank" rel="noopener noreferrer">
            <Button color="green" icon circular>
              <Icon name="whatsapp" />
            </Button>
          </a>
          <a href="mailto:tikamchand06@gmail.com" target="_blank" rel="noopener noreferrer">
            <Button color="teal" icon circular>
              <Icon name="envelope outline" />
            </Button>
          </a>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

export default Footer;
