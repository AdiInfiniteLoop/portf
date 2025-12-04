import { Component } from 'solid-js';

const SkillBar: Component<{ label: string; value: number }> = (props) => {
  return (
    <div class="term-skill-item">
      <div class="term-skill-header">
        <span>{props.label}</span>
        <span>{props.value}%</span>
      </div>
      <div class="term-skill-bar">
        <div
          class="term-skill-fill"
          style={{ width: `${props.value}%` }}
        />
      </div>
    </div>
  );
};

const Skills: Component = () => {
  return (
    <section class="term-section">
      <h2 class="term-section-title">[SKILLS DIAGNOSTICS]</h2>
      <div class="term-panel">
        <div class="term-scanline-label">&gt; running diag --skills</div>
        <div class="term-skill-list">
          <SkillBar label="TypeScript / JavaScript / C++ / Java / Go / Python" value={92} />
          <SkillBar label="React / Next.js / Frontend Engineering" value={90} />
          <SkillBar label="Node.js / Express / REST & WebSocket APIs" value={88} />
          <SkillBar label="Databases / MongoDB / PostgreSQL / Redis" value={86} />
          <SkillBar label="Tooling / Git / Docker / Jenkins / Neovim" value={84} />
          <SkillBar label="System Design / Auth / API Design" value={82} />
        </div>
      </div>
    </section>
  );
};

export default Skills;

