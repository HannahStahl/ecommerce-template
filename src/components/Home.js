import React from 'react';
import Button from 'react-bootstrap/Button';
import config from '../config';

const Home = () => (
  <>
    <img src={`${config.publicCloudfrontURL}/template-home.jpg`} alt={config.businessName} className="home-page-image" />
    <div>
      <h1>Awesome Website Title</h1>
      <p>Time to create an awesome website.</p>
      <a href="/items"><Button size="lg" variant="outline-dark">{'Let\'s go'}</Button></a>
    </div>
  </>
);

export default Home;
