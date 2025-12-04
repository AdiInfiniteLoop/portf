import { Component } from 'solid-js';

const Achievements: Component = () => {
  return (
    <section class="term-section">
      <h2 class="term-section-title">[ACHIEVEMENTS]</h2>
      <div class="term-panel">
        <ul class="term-log">
          <li>
            <span class="term-log-time">LEETCODE // BIWEEKLY 137</span>
            <span class="term-log-msg">
              &gt; Secured a global ranking of 839 out of 36,341 participants.
            </span>
          </li>
          <li>
            <span class="term-log-time">LEETCODE // RANK</span>
            <span class="term-log-msg">
              &gt; Achieved Knight rank, placing within the top 5.81% of global users.
            </span>
          </li>
          <li>
            <span class="term-log-time">COMPETITIVE PROGRAMMING</span>
            <span class="term-log-msg">
              &gt; Regularly solving algorithmic problems to sharpen data structures and
              problem-solving skills.
            </span>
          </li>
        </ul>
        <p class="term-contact-note" style={{ 'margin-top': '0.6rem' }}>
          Track record of consistent practice and measurable progress in algorithmic
          problem solving and programming contests.
        </p>
      </div>
    </section>
  );
};

export default Achievements;

