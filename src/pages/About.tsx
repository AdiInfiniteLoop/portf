import { Component } from 'solid-js';

const About: Component = () => {
  return (
    <section class="term-section">
      <h2 class="term-section-title">[SYSTEM INFO]</h2>
      <div class="term-panel">
        <div class="term-grid">
          <div>
            <p>&gt; USERNAME: aditya_pradhan</p>
            <p>&gt; ROLE: full-stack / frontend engineer</p>
            <p>&gt; LOCATION: /india/karnataka/mysuru</p>
          </div>
          <div>
            <p>&gt; STATUS: AVAILABLE_FOR_INTERNSHIPS = true</p>
            <p>&gt; EDUCATION: B.E CSE @ NIE Mysore (2022 - 2026)</p>
            <p>&gt; CGPA: 9.43 / 10.0</p>
          </div>
        </div>
        <p class="term-about-text">
          I am a computer science undergrad and developer who enjoys building performant,
          reliable systems across the stack. From real-time chat platforms to auth
          backends and cybersecurity CTFs, I focus on writing clean, production-ready code
          and creating experiences that feel fast and intuitive.
        </p>
      </div>
    </section>
  );
};

export default About;

