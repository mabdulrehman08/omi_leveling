// Initialize particles
function initParticles() {
  const container = document.getElementById('particles');
  for(let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    Object.assign(particle.style, {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      opacity: 0.2 + Math.random() * 0.3
    });
    container.appendChild(particle);
  }
}

// Update progress bars with animation
function updateProgress() {
  const progress = document.getElementById('level-progress');
  const xpText = document.getElementById('xp-text');
  
  // Simulate XP gain (replace with real data)
  let xp = 0;
  const maxXp = 100;
  const interval = setInterval(() => {
    xp += 1;
    const percent = Math.min((xp / maxXp) * 100, 100);
    progress.style.width = `${percent}%`;
    xpText.textContent = `${xp}/${maxXp} XP`;
    
    if (xp >= maxXp) {
      clearInterval(interval);
      // Level up animation
      progress.style.background = 'linear-gradient(90deg, var(--secondary), var(--primary))';
      setTimeout(() => {
        document.getElementById('hunter-level').textContent = '2';
        progress.style.width = '0%';
        xpText.textContent = `0/${maxXp + 50} XP`;
        progress.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary))';
      }, 1000);
    }
  }, 50);
}

// Simulate stat increases
function simulateStats() {
  const stats = ['strength', 'intelligence', 'agility', 'endurance'];
  stats.forEach(stat => {
    const element = document.getElementById(`${stat}-value`);
    let value = 10;
    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 2);
      element.textContent = value;
      if (value >= 15) clearInterval(interval);
    }, 1000);
  });
}

// Logout function
function logout() {
  // Add logout animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s';
  
  setTimeout(() => {
    localStorage.removeItem('sessionId');
    window.location.href = '/login';
  }, 500);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  updateProgress();
  simulateStats();
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 5px 25px rgba(106, 0, 255, 0.4)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '0 0 20px rgba(106, 0, 255, 0.1)';
    });
  });
  
  // Load hunter data (simulated)
  setTimeout(() => {
    document.getElementById('hunter-name').textContent = 'Jin-Woo';
    document.getElementById('gates-cleared').textContent = '3';
  }, 1500);
  
  // Simulate quest assignment
  setTimeout(() => {
    const questContainer = document.getElementById('current-quest');
    questContainer.innerHTML = `
      <div class="quest-header">
        <div class="quest-title">Clear the Cartenon Temple</div>
        <div class="quest-rank">C</div>
      </div>
      <div class="quest-description">
        Defeat all monsters in the Cartenon Temple dungeon and retrieve the artifact.
      </div>
      <div class="quest-progress-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: 25%"></div>
        </div>
        <p class="quest-progress-text">25% Complete</p>
      </div>
    `;
  }, 2000);
});