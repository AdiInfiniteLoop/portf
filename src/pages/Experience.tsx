import { Component } from 'solid-js';

const Experience: Component = () => {
  return (
    <section class="term-section">
      <h2 class="term-section-title">[EXPERIENCE LOG]</h2>
      <div class="term-panel">
        <ul class="term-log">
          <li>
            <span class="term-log-time">2025-06 - PRESENT</span>
            <span class="term-log-msg">
              &gt; Summer Intern @ Akamai Technologies — Automated infra backups using
              Python + Jenkins, built an API health monitoring framework with retries and
              targeted alerts, and standardized BatsAgent test execution with Gigas
              integration and run tracking.
            </span>
          </li>
          <li>
            <span class="term-log-time">2024-09 - 2024-12</span>
            <span class="term-log-msg">
              &gt; Frontend Development Engineer Intern @ Minervaa — Led development of a
              responsive Next.js platform with Tailwind and Recoil, engineered 15+ reusable
              TypeScript UI components, and improved page load times by ~40%.
            </span>
          </li>
          <li>
            <span class="term-log-time">2023-07 - PRESENT</span>
            <span class="term-log-msg">
              &gt; Technical Co-Lead @ OWASP NIE Student Chapter — Drove cybersecurity
              workshops for 200+ students with 95% positive feedback and led a 6-member
              team to run 2 major security events with 100% schedule adherence.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Experience;

