import React from 'react';
import content from '../content.json';

const About = () => (
  <div>
    <h1>About</h1>
    {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
  </div>
);

export default About;
