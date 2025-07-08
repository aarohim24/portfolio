const input = document.getElementById('commandInput');
const terminal = document.querySelector('.output');
const modal = document.getElementById('terminalModal');

// Command responses
const commands = {
  help: `Available commands:
  whoami       - About me
  projects     - List of projects
  resume       - Download resume
  design       - My design work
  socials      - My social links
  clear        - Clear terminal`,

  whoami: `I'm Aarohi Mathur, a B.Tech Computer Science student specializing in AI & ML.
I’m passionate about building tech that’s intuitive, data-driven, and beautifully designed.`,

  projects: `📁 Projects:
- AI Chatbot      → https://github.com/aarohimathur/ai-chatbot
- Portfolio Site  → https://github.com/aarohimathur/portfolio`,

  resume: `Download here → https://yourdomain.com/resume.pdf`,

  design: `🎨 Design work:
- Behance → https://behance.net/aarohimathur
- Figma   → https://figma.com/@aarohimathur`,

  socials: `🌐 Socials:
- GitHub   → https://github.com/aarohimathur
- LinkedIn → https://linkedin.com/in/aarohimathur
- Twitter  → https://twitter.com/aarohimathur`,

  clear: 'clear',
};

// Typing effect for name
function typeName() {
  const name = "Aarohi Mathur";
  const nameElement = document.getElementById("typedName");
  let i = 0;
  const speed = 100;

  function type() {
    if (i < name.length) {
      nameElement.textContent += name.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.onload = () => {
  typeName();
};

// Command input logic
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const cmd = input.value.trim();
    const outputLine = document.createElement('pre');
    outputLine.textContent = `aarohi@portfolio:~$ ${cmd}`;
    terminal.appendChild(outputLine);

    if (cmd in commands) {
      if (cmd === 'clear') {
        terminal.innerHTML = '';
      } else {
        const result = document.createElement('pre');
        result.textContent = commands[cmd];
        terminal.appendChild(result);
      }
    } else {
      const error = document.createElement('pre');
      error.textContent = `Command not found: ${cmd}`;
      terminal.appendChild(error);
    }

    input.value = '';
    terminal.scrollTop = terminal.scrollHeight;
  }
});

function openTerminal() {
  modal.classList.remove('hidden');
  document.getElementById('commandInput').focus();
}
