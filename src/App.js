import React, { useState } from 'react';
import { Layout, Image, Input, AutoComplete, Row, Col, Tooltip, Button } from 'antd';
import {
  HeartFilled,
  YoutubeOutlined,
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { searchVideo } from './api/youtube';
import YT_LOGO from './logo.png';
import Home from './components/Home';
import Video from './components/Video';
import Channel from './components/Channel';
import NotFound from './components/NotFound';

const App = () => {
  const [options, setOptions] = useState([]);
  const { Header, Content, Footer } = Layout;

  const onSelect = (title, obj) => (window.location.href = window.location.origin + '/watch/' + obj.videoid);
  const onSearch = async (str) => {
    const results = await searchVideo(str);
    const options = results.map((r) => ({ videoid: r.id.videoId, label: r.snippet.title, value: r.snippet.title }));
    setOptions(options);
  };

  const socialLinks = [
    { icon: <FacebookOutlined />, color: 'facebook', href: 'https://www.facebook.com/tcmhack', title: 'Facebook' },
    { icon: <TwitterOutlined />, color: 'twitter', href: 'https://www.twitter.com/tcmhack', title: 'Twitter' },
    { icon: <LinkedinOutlined />, color: 'linkedin', href: 'https://www.linkedin.com/company/tcmhack', title: 'Linkedin' },
    { icon: <WhatsAppOutlined />, color: 'green', href: 'https://wa.me/9571447122/?text=TCMHACK', title: 'WhatsApp' },
    { icon: <InstagramOutlined />, color: 'green', href: 'https://www.instagram.com/tikamchand06', title: 'Instagram' },
    { icon: <YoutubeOutlined />, color: 'green', href: 'https://www.youtube.com/channel/UCpY9VENVRatYQIcLGI0IXWA', title: 'YouTube' },
    { icon: <MailOutlined />, color: 'teal', href: 'mailto:tikamchand06@gmail.com', title: 'Email' },
  ];

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Link to="/" className="logo">
            <Image src={YT_LOGO} preview={false} wrapperStyle={{ marginRight: 10 }} /> {process.env.REACT_APP_NAME}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AutoComplete allowClear options={options} onSelect={onSelect} onSearch={onSearch}>
              <Input.Search size="large" placeholder="Search..." />
            </AutoComplete>

            <Link to="/favorites" style={{ color: 'white', fontSize: 22, marginLeft: 15 }}>
              <HeartFilled />
            </Link>
          </div>
        </Header>
        <Content style={{ padding: '1.25rem' }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:type" component={Home} />
              <Route exact path="/channel/:id" component={Channel} />
              <Route exact path="/watch/:videoId" component={Video} />
              <Route path="" component={NotFound} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Col>
              {process.env.REACT_APP_NAME} &copy; {new Date().getFullYear()} Created by{' '}
              <a href="https://www.tcmhack.in" target="_blank" rel="noopener noreferrer">
                TCMHACK
              </a>
            </Col>
            <Col>
              Follow us on:{' '}
              {socialLinks.map((btn, key) => (
                <Tooltip key={key} title={btn.title}>
                  <Button type="link" href={btn.href} icon={btn.icon} shape="circle" target="_blank" />
                </Tooltip>
              ))}
            </Col>
          </Row>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
