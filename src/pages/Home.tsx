import { Component } from 'solid-js';

const Home: Component = () => {
  return (
    <section class="term-section">
      <h2 class="term-section-title">[WELCOME]</h2>
      <div class="term-panel">
        <div class="term-grid">
          <div>
            <p>&gt; USERNAME: aditya_pradhan</p>
            <p>&gt; ROLE: engineer</p>
            <p>&gt; LOCATION: india</p>
          </div>
          <div>
            <p>&gt; EDUCATION: B.E CSE @ NIE Mysore (2022 - 2026)</p>
            <p>&gt; CGPA: 9.33 / 10.00</p>
          </div>
        </div>
        <p class="term-about-text">
          Welcome to my retro terminal portfolio! Navigate using the menu above or type commands
          in the terminal below. Try <code>help</code> to see all available commands, or explore
          different sections using navigation links.
        </p>
        <p class="term-about-text" style={{ 'margin-top': '1rem' }}>
          I am a computer science undergrad and developer who enjoys building performant,
          reliable systems across the stack. From real-time chat platforms to auth
          backends and cybersecurity CTFs, I focus on writing clean, production-ready code
          and creating experiences that feel fast and intuitive.
        </p>
      </div>
    </section>
  );
};

export default Home;

