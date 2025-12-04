import { Component, JSX, createSignal, onMount, For, Show, createEffect } from 'solid-js';
import { A, useNavigate, useLocation } from '@solidjs/router';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Achievements from '../pages/Achievements';
import Experience from '../pages/Experience';
import Contact from '../pages/Contact';

const ASCII_ART_NAME = `
 █████╗ ██████╗ ██╗████████╗██╗   ██╗ █████╗ 
██╔══██╗██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝██╔══██╗
███████║██║  ██║██║   ██║    ╚████╔╝ ███████║
██╔══██║██║  ██║██║   ██║     ╚██╔╝  ██╔══██║
██║  ██║██████╔╝██║   ██║      ██║   ██║  ██║
╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝
                                             
██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔══██╗████╗  ██║
██████╔╝██████╔╝███████║██║  ██║███████║███████║██╔██╗ ██║
██╔═══╝ ██╔══██╗██╔══██║██║  ██║██╔══██║██╔══██║██║╚██╗██║
██║     ██║  ██║██║  ██║██████╔╝██║  ██║██║  ██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
`;


interface TerminalLayoutProps {
  children?: JSX.Element;
}

export const TerminalLayout: Component<TerminalLayoutProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [typedTitle, setTypedTitle] = createSignal('');
  
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/about') return <About />;
    if (path === '/projects') return <Projects />;
    if (path === '/skills') return <Skills />;
    if (path === '/achievements') return <Achievements />;
    if (path === '/experience') return <Experience />;
    if (path === '/contact') return <Contact />;
    return <Home />;
  };
  const [cursorVisible, setCursorVisible] = createSignal(true);
  const [input, setInput] = createSignal('');
  const [commandHistory, setCommandHistory] = createSignal<string[]>([]);
  const [historyIndex, setHistoryIndex] = createSignal(-1);
  const [suggestions, setSuggestions] = createSignal<string[]>([]);
  const [history, setHistory] = createSignal<string[]>([
    '[BOOT] Initializing Aditya Pradhan // portfolio v2.0.0...',
    '[OK] Video adapter: Retro-CRT-9000',
    '[OK] Loading system profile...',
    '[OK] Terminal ready. Type "help" for commands.',
  ]);

  const availableCommands = [
    'help', 'home', 'about', 'projects', 'skills', 'achievements', 
    'experience', 'contact', 'whoami', 'date', 'ls', 'cat', 
    'github', 'linkedin', 'leetcode', 'resume', 'clear',
    'matrix', 'hack', 'sudo', 'neofetch', 'fortune', 'banner',
    'uptime', 'uname', 'pwd', 'echo', 'cal'
  ];

  const quickCommands = [
    { cmd: 'help', label: 'help', category: 'info' },
    { cmd: 'about', label: 'about', category: 'nav' },
    { cmd: 'projects', label: 'projects', category: 'nav' },
    { cmd: 'skills', label: 'skills', category: 'nav' },
    { cmd: 'experience', label: 'experience', category: 'nav' },
    { cmd: 'contact', label: 'contact', category: 'nav' },
    { cmd: 'whoami', label: 'whoami', category: 'info' },
    { cmd: 'ls', label: 'ls', category: 'files' },
    { cmd: 'cat resume.txt', label: 'cat resume.txt', category: 'files' },
    { cmd: 'github', label: 'github', category: 'social' },
    { cmd: 'linkedin', label: 'linkedin', category: 'social' },
    { cmd: 'leetcode', label: 'leetcode', category: 'social' },
    { cmd: 'neofetch', label: 'neofetch', category: 'fun' },
    { cmd: 'fortune', label: 'fortune', category: 'fun' },
    { cmd: 'clear', label: 'clear', category: 'info' },
  ];

  const executeCommand = (cmd: string) => {
    setInput(cmd);
    handleCommand(cmd);
    setInput('');
  };

  onMount(() => {
    const fullTitle = 'aditya@portfolio:~$';
    let i = 0;
    const typeInterval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, i));
      i++;
      if (i > fullTitle.length) {
        clearInterval(typeInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 600);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  });

  const handleCommand = (raw: string) => {
    const value = raw.trim();
    const lowerValue = value.toLowerCase();
    if (!value) return;

    setHistory((prev) => [...prev, `> ${value}`]);

    if (lowerValue === 'clear') {
      setHistory([]);
      return;
    }

    if (lowerValue === 'help') {
      setHistory((prev) => [
        ...prev,
        'Available commands:',
        '  help              - Show available commands',
        '  home              - Navigate to home page',
        '  about             - Navigate to About page',
        '  projects          - Navigate to Projects page',
        '  skills            - Navigate to Skills page',
        '  achievements     - Navigate to Achievements page',
        '  experience       - Navigate to Experience page',
        '  contact           - Navigate to Contact page',
        '  whoami            - Display user information',
        '  date              - Show current date and time',
        '  ls                - List available files/directories',
        '  cat <file>        - Display file contents',
        '  github            - Open GitHub profile',
        '  linkedin          - Open LinkedIn profile',
        '  leetcode          - Open LeetCode profile',
        '  resume            - Open resume PDF in new tab',
        '  clear             - Clear terminal output',
        '',
        'System commands:',
        '  uptime            - Show system uptime',
        '  uname             - Display system information',
        '  pwd               - Print working directory',
        '  echo <text>       - Echo text to terminal',
        '  cal               - Display calendar',
        '',
        'Easter eggs: Try "matrix", "hack", "sudo", "neofetch", "fortune", "banner"',
        '',
        'Tips:',
        '  - Use ↑/↓ arrow keys to navigate command history',
        '  - Press TAB for auto-complete',
        '  - Type partial commands to see suggestions',
      ]);
      return;
    }

    if (lowerValue === 'whoami') {
      setHistory((prev) => [
        ...prev,
        'aditya_pradhan',
        'Full-stack Developer | B.E CSE @ NIE Mysore',
        'Summer Intern @ Akamai Technologies',
        'Knight on LeetCode (top 5.81% globally)',
      ]);
      return;
    }

    if (lowerValue === 'date') {
      const now = new Date();
      setHistory((prev) => [
        ...prev,
        now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        }),
      ]);
      return;
    }

    if (lowerValue === 'ls' || lowerValue.startsWith('ls ')) {
      setHistory((prev) => [
        ...prev,
        'Available files:',
        '  📄 resume.txt',
        '  📄 about.txt',
        '  📄 projects.txt',
        '',
        'Use "cat <filename>" to read a file',
      ]);
      return;
    }

    if (lowerValue.startsWith('cat ')) {
      const fileName = value.split(' ').slice(1).join(' ').trim();
      const virtualFiles: Record<string, string> = {
        'resume.txt': `ADITYA PRADHAN - RESUME
================================

CONTACT INFORMATION
-------------------
Email: adityapradhanofficial1712@gmail.com
Phone: +91-8159988129
LinkedIn: linkedin.com/in/aditya-pradhan10
GitHub: github.com/AdiInfiniteLoop
LeetCode: leetcode.com/u/mustardonthebeat/

EDUCATION
---------
The National Institute of Engineering, Mysore
B.E in Computer Science & Engineering
12/2022 – 07/2026
CGPA: 9.43/10.0

EXPERIENCE
----------
Summer Intern @ Akamai Technologies (06/2025 – Present)
- Automated infrastructure backups using Python + Jenkins
- Built API health monitoring framework with retry logic
- Standardized BatsAgent test execution

Frontend Development Engineer Intern @ Minervaa (09/2024 – 12/2024)
- Led responsive web platform development (Next.js, Tailwind)
- Engineered 15+ reusable TypeScript UI components
- Improved page load times by 40%

Technical Co-Lead @ OWASP NIE Student Chapter (07/2023 – Present)
- Spearheaded cybersecurity workshops for 200+ students
- Led team of 6 members organizing security events

PROJECTS
--------
Kizuna - Real-Time Chat Platform
- MERN stack, Redis, Socket.io, WebSocket protocol

Land Of Eldoria - Cybersecurity CTF
- CTF platform serving 200+ users, 14+ custom levels

Authora - Authentication Service
- Go, Gin, PostgreSQL, Redis, JWT

SKILLS
------
Languages: TypeScript, C++, Java, Golang, Python
Frameworks: React.js, Next.js, Node.js, Express.js
Tools: Git, Docker, Jenkins, Neovim, MongoDB, PostgreSQL

ACHIEVEMENTS
------------
- LeetCode Biweekly Contest 137: Rank 839/36,341
- LeetCode Knight rank (top 5.81% globally)
`,
        'about.txt': `ABOUT ADITYA PRADHAN
===================

I am a computer science undergraduate at The National Institute 
of Engineering, Mysore, passionate about building scalable and 
reliable software systems.

Currently working as a Summer Intern at Akamai Technologies, 
where I focus on infrastructure automation and API monitoring. 
Previously interned at Minervaa as a Frontend Development Engineer, 
leading the development of responsive web platforms.

I enjoy solving algorithmic problems and have achieved Knight rank 
on LeetCode, placing in the top 5.81% globally. I'm also actively 
involved in cybersecurity education as Technical Co-Lead at OWASP 
NIE Student Chapter.

My interests span full-stack development, real-time systems, 
authentication/authorization, and cybersecurity.
`,
        'projects.txt': `PROJECTS DIRECTORY
==================

kizuna-realtime-chat/
  - Real-time chat application
  - Tech: MongoDB, Express.js, React, Redis, Socket.io, Node.js
  - Features: WebSocket protocol, real-time communication
  - Status: Active

land-of-eldoria-ctf/
  - Cybersecurity Capture The Flag platform
  - Tech: Custom CTF framework
  - Features: 14+ custom levels, vulnerability assessment tools
  - Users: 200+ participants
  - Status: Active

authora-auth-service/
  - Authentication service with complete flows
  - Tech: Go, Gin, SQLC, Redis, JWT, PostgreSQL
  - Features: Sign-up, login, session management, token auth
  - Status: Active
`,
      };

      if (virtualFiles[fileName]) {
        const lines = virtualFiles[fileName].split('\n');
        setHistory((prev) => [...prev, ...lines]);
      } else {
        setHistory((prev) => [
          ...prev,
          `[ERR] File not found: "${fileName}"`,
          'Available files: resume.txt, about.txt, projects.txt',
        ]);
      }
      return;
    }

    if (lowerValue === 'github') {
      window.open('https://github.com/AdiInfiniteLoop', '_blank');
      setHistory((prev) => [...prev, '[EXEC] Opening GitHub profile...']);
      return;
    }

    if (lowerValue === 'linkedin') {
      window.open('https://linkedin.com/in/aditya-pradhan10', '_blank');
      setHistory((prev) => [...prev, '[EXEC] Opening LinkedIn profile...']);
      return;
    }

    if (lowerValue === 'leetcode') {
      window.open('https://leetcode.com/u/mustardonthebeat/', '_blank');
      setHistory((prev) => [...prev, '[EXEC] Opening LeetCode profile...']);
      return;
    }

    if (lowerValue === 'resume') {
      window.open('https://drive.google.com/file/d/1crBINzhqsJycLSrJFcM2eUJi5oiM4qGH/view?usp=sharing', '_blank');
      setHistory((prev) => [
        ...prev,
        '[EXEC] Opening resume in new tab...',
        '[INFO] Resume PDF is now available in your browser.',
      ]);
      return;
    }

    // Navigation commands
    const routes: Record<string, string> = {
      home: '/',
      about: '/about',
      projects: '/projects',
      skills: '/skills',
      achievements: '/achievements',
      experience: '/experience',
      contact: '/contact',
    };

    if (routes[lowerValue]) {
      navigate(routes[lowerValue]);
      setHistory((prev) => [...prev, `[EXEC] Navigating to ${lowerValue}...`]);
      return;
    }

    // Easter eggs
    if (lowerValue === 'matrix') {
      setHistory((prev) => [
        ...prev,
        '[MATRIX MODE ACTIVATED]',
        'Wake up, Neo...',
        'The Matrix has you...',
        'Follow the white rabbit.',
        '',
        '[INFO] This is just a portfolio, not The Matrix. But you can still explore!',
      ]);
      return;
    }

    if (lowerValue === 'hack') {
      setHistory((prev) => [
        ...prev,
        '[HACK ATTEMPT DETECTED]',
        '> Scanning for vulnerabilities...',
        '> Firewall: ACTIVE',
        '> Intrusion detection: ENABLED',
        '[OK] System secure. Nice try though! 😄',
      ]);
      return;
    }

    if (lowerValue === 'sudo') {
      setHistory((prev) => [
        ...prev,
        '[sudo] password for aditya:',
        '[AUTH] Authentication failed. This is a read-only terminal.',
        '[INFO] Try "help" to see available commands.',
      ]);
      return;
    }

    if (lowerValue === 'neofetch') {
      setHistory((prev) => [
        ...prev,
        ASCII_ART_NAME,
        '',
        'OS: Portfolio Terminal v2.0',
        'Host: aditya@portfolio',
        'Kernel: Retro-CRT-9000',
        'Uptime: Since 2022',
        'Shell: /bin/portfolio',
        'Editor: Neovim',
        'Theme: Retro Green',
        '',
        'Skills: ████████████████░░░░ 85%',
        'Projects: ██████████████░░░░ 75%',
        'Experience: ████████████████░░ 90%',
      ]);
      return;
    }

    // More easter eggs
    if (lowerValue === 'fortune') {
      const fortunes = [
        'The best code is no code at all.',
        'Premature optimization is the root of all evil.',
        'Code is like humor. When you have to explain it, it\'s bad.',
        'First, solve the problem. Then, write the code.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Programs must be written for people to read, and only incidentally for machines to execute.',
        'The most disastrous thing that you can ever learn is your first programming language.',
      ];
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setHistory((prev) => [...prev, `"${randomFortune}"`]);
      return;
    }

    if (lowerValue === 'banner') {
      setHistory((prev) => [
        ...prev,
        ASCII_ART_NAME,
        '',
        'Welcome to the Retro Terminal Portfolio!',
        'Type "help" to see all available commands.',
      ]);
      return;
    }

    if (lowerValue === 'uptime') {
      const startDate = new Date('2022-01-01');
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHistory((prev) => [
        ...prev,
        `System uptime: ${days} days, ${hours} hours`,
        `Since: ${startDate.toLocaleDateString()}`,
      ]);
      return;
    }

    if (lowerValue === 'uname') {
      setHistory((prev) => [
        ...prev,
        'Portfolio Terminal v2.0',
        'Kernel: Retro-CRT-9000',
        'Architecture: Web-based',
        'Platform: Browser',
      ]);
      return;
    }

    if (lowerValue === 'pwd') {
      setHistory((prev) => [
        ...prev,
        location.pathname || '/',
      ]);
      return;
    }

    if (lowerValue.startsWith('echo ')) {
      const text = value.substring(5).trim();
      setHistory((prev) => [...prev, text]);
      return;
    }

    if (lowerValue === 'cal') {
      const now = new Date();
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear();
      setHistory((prev) => [
        ...prev,
        `    ${month} ${year}`,
        'Su Mo Tu We Th Fr Sa',
        '                   1  2',
        ' 3  4  5  6  7  8  9',
        '10 11 12 13 14 15 16',
        '17 18 19 20 21 22 23',
        '24 25 26 27 28 29 30',
        '31',
      ]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      `[ERR] Unknown command: "${value}". Type "help" for a list of commands.`,
    ]);
  };

  // Auto-complete suggestions
  createEffect(() => {
    const currentInput = input().toLowerCase().trim();
    if (currentInput) {
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(currentInput) && cmd !== currentInput
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    const hist = commandHistory();
    const idx = historyIndex();
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hist.length > 0) {
        const newIdx = idx < 0 ? hist.length - 1 : Math.max(0, idx - 1);
        setHistoryIndex(newIdx);
        setInput(hist[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (idx >= 0) {
        const newIdx = idx + 1;
        if (newIdx >= hist.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIdx);
          setInput(hist[newIdx]);
        }
      }
    } else if (e.key === 'Tab' && suggestions().length > 0) {
      e.preventDefault();
      setInput(suggestions()[0]);
      setSuggestions([]);
    }
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const current = input();
    if (current.trim()) {
      handleCommand(current);
      setCommandHistory(prev => [...prev, current].slice(-50)); // Keep last 50 commands
      setHistoryIndex(-1);
    }
    setInput('');
    setSuggestions([]);
  };

  return (
    <div class="term-page">
      <div class="term-frame">
        <div class="term-scanlines" />
        <div class="term-inner">
          {/* Header */}
          <header class="term-header">
            <div class="term-header-bar">
              <span class="term-dot term-dot-red" />
              <span class="term-dot term-dot-yellow" />
              <span class="term-dot term-dot-green" />
              <span class="term-header-title">RETRO-PORTFOLIO v2.0</span>
            </div>
            <div class="term-banner">
              <pre class="term-ascii-name">{ASCII_ART_NAME}</pre>
              <div class="term-banner-text">
                <div class="term-typing-line">
                  <span>{typedTitle()}</span>
                  <span class={`term-cursor ${cursorVisible() ? 'visible' : ''}`}>█</span>
                </div>
                <p class="term-subtitle">
                  B.E CSE @ NIE Mysore // Full-stack developer // Knight on LeetCode.
                </p>
                <nav class="term-nav">
                  <span class="term-nav-label">&gt; NAVIGATE</span>
                  <A href="/" class="term-nav-link">home</A>
                  <A href="/about" class="term-nav-link">about</A>
                  <A href="/projects" class="term-nav-link">projects</A>
                  <A href="/skills" class="term-nav-link">skills</A>
                  <A href="/achievements" class="term-nav-link">achievements</A>
                  <A href="/experience" class="term-nav-link">experience</A>
                  <A href="/contact" class="term-nav-link">contact</A>
                </nav>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main class="term-main">
            {getCurrentPage()}

            {/* Interactive terminal */}
            <section class="term-section term-section-terminal">
              <h2 class="term-section-title">[INTERACTIVE TERMINAL]</h2>
              <div class="term-panel term-panel-terminal">
                {/* Quick Command Palette */}
                <div class="term-command-palette">
                  <div class="term-palette-header">
                    <span class="term-palette-label">&gt; QUICK COMMANDS</span>
                    <span class="term-palette-hint">Click to execute</span>
                  </div>
                  <div class="term-palette-categories">
                    <div class="term-palette-category">
                      <span class="term-category-label">NAV:</span>
                      <div class="term-command-buttons">
                        <For each={quickCommands.filter(c => c.category === 'nav')}>
                          {(cmd) => (
                            <button
                              class="term-command-btn"
                              onClick={() => executeCommand(cmd.cmd)}
                              title={`Execute: ${cmd.cmd}`}
                            >
                              {cmd.label}
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                    <div class="term-palette-category">
                      <span class="term-category-label">INFO:</span>
                      <div class="term-command-buttons">
                        <For each={quickCommands.filter(c => c.category === 'info')}>
                          {(cmd) => (
                            <button
                              class="term-command-btn"
                              onClick={() => executeCommand(cmd.cmd)}
                              title={`Execute: ${cmd.cmd}`}
                            >
                              {cmd.label}
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                    <div class="term-palette-category">
                      <span class="term-category-label">FILES:</span>
                      <div class="term-command-buttons">
                        <For each={quickCommands.filter(c => c.category === 'files')}>
                          {(cmd) => (
                            <button
                              class="term-command-btn"
                              onClick={() => executeCommand(cmd.cmd)}
                              title={`Execute: ${cmd.cmd}`}
                            >
                              {cmd.label}
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                    <div class="term-palette-category">
                      <span class="term-category-label">SOCIAL:</span>
                      <div class="term-command-buttons">
                        <For each={quickCommands.filter(c => c.category === 'social')}>
                          {(cmd) => (
                            <button
                              class="term-command-btn"
                              onClick={() => executeCommand(cmd.cmd)}
                              title={`Execute: ${cmd.cmd}`}
                            >
                              {cmd.label}
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                    <div class="term-palette-category">
                      <span class="term-category-label">FUN:</span>
                      <div class="term-command-buttons">
                        <For each={quickCommands.filter(c => c.category === 'fun')}>
                          {(cmd) => (
                            <button
                              class="term-command-btn"
                              onClick={() => executeCommand(cmd.cmd)}
                              title={`Execute: ${cmd.cmd}`}
                            >
                              {cmd.label}
                            </button>
                          )}
                        </For>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="term-terminal-output">
                  <For each={history()}>
                    {(line) => <div class="term-line">{line}</div>}
                  </For>
                  <Show when={history().length === 0}>
                    <div class="term-line term-line-muted">
                      [INFO] History cleared. Type &quot;help&quot; to begin.
                    </div>
                  </Show>
                </div>
                <Show when={suggestions().length > 0}>
                  <div class="term-suggestions">
                    <For each={suggestions()}>
                      {(suggestion) => (
                        <span class="term-suggestion">{suggestion}</span>
                      )}
                    </For>
                  </div>
                </Show>
                <form class="term-terminal-input" onSubmit={onSubmit}>
                  <span class="term-prompt">aditya@portfolio:~$</span>
                  <input
                    type="text"
                    value={input()}
                    onInput={(e) => setInput(e.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    class="term-input"
                    placeholder='Type "help" for commands or click above...'
                    autocomplete="off"
                  />
                </form>
                <p class="term-easter-egg">
                  Click commands above or type manually. Try <code>help</code> for full list!
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

