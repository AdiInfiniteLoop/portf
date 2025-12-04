import { Component } from 'solid-js';

const Contact: Component = () => {
  return (
    <section class="term-section">
      <h2 class="term-section-title">[CONTACT PROMPT]</h2>
      <div class="term-panel">
        <p>&gt; To get in touch, run one of the following commands:</p>
        <ul class="term-contact-list">
          <li>
            <span class="term-contact-label">echo "email"</span>
            <span class="term-contact-value">
              =&gt; adityapradhanofficial1712@gmail.com
            </span>
          </li>
          <li>
            <span class="term-contact-label">open github</span>
            <span class="term-contact-value">
              =&gt; github.com/AdiInfiniteLoop
            </span>
          </li>
          <li>
            <span class="term-contact-label">open linkedin</span>
            <span class="term-contact-value">
              =&gt; linkedin.com/in/aditya-pradhan10
            </span>
          </li>
          <li>
            <span class="term-contact-label">open leetcode</span>
            <span class="term-contact-value">
              =&gt; leetcode.com/u/mustardonthebeat
            </span>
          </li>
        </ul>
        <p class="term-contact-note">
          Or just send me a message with details about your project, and we&apos;ll start
          debugging it together.
        </p>
      </div>
    </section>
  );
};

export default Contact;

