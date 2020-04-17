import React from 'react';
import content from '../content.json';

const About = () => (
  <div>
    <h1>About Page</h1>
    <p>{content.bio}</p>
  </div>
);

export default About;
