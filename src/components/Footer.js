import React from 'react';
import { Container, Button, Icon, Grid, Popup } from 'semantic-ui-react';

const Footer = () => {
  const socialLinks = [
    { icon: 'facebook f', color: 'facebook', href: 'https://www.facebook.com/tcmhack', title: 'Facebook' },
    { icon: 'twitter', color: 'twitter', href: 'https://www.twitter.com/tcmhack', title: 'Twitter' },
    { icon: 'linkedin', color: 'linkedin', href: 'https://www.linkedin.com/company/tcmhack', title: 'Linkedin' },
    { icon: 'whatsapp', color: 'green', href: 'https://wa.me/9571447122/?text=TCMHACK', title: 'WhatsApp' },
    { icon: 'envelope outline', color: 'teal', href: 'mailto:tikamchand06@gmail.com', title: 'Email' },
  ];

  return (
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
            {socialLinks.map((btn, key) => (
              <Popup
                key={key}
                content={btn.title}
                trigger={<Button circular color={btn.color} icon={btn.icon} href={btn.href} target="_blank" />}
                position="top center"
              />
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Footer;
