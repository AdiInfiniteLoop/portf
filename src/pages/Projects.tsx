import { Component } from 'solid-js';

const Projects: Component = () => {
  return (
    <section class="term-section">
      <h2 class="term-section-title">[PROJECTS /]</h2>
      <div class="term-panel">
        <div class="term-dir-header">&gt; ls ./projects</div>
        <ul class="term-dir-list">
          <li>
            <span class="term-dir-icon">📁</span>
            <span class="term-dir-name">kizuna-realtime-chat/</span>
            <span class="term-dir-meta">
              MERN · Redis · Socket.io · WebSocket · Tailwind
            </span>
          </li>
          <li>
            <span class="term-dir-icon">📁</span>
            <span class="term-dir-name">land-of-eldoria-ctf/</span>
            <span class="term-dir-meta">CTF · security · infra · 200+ users</span>
          </li>
          <li>
            <span class="term-dir-icon">📁</span>
            <span class="term-dir-name">authora-auth-service/</span>
            <span class="term-dir-meta">Go · Gin · PostgreSQL · Redis · JWT</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Projects;

