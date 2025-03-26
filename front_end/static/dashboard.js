// Mock data - would be replaced with actual API calls in production
const hunterData = {
  name: "Sung Jin-Woo",
  level: 27,
  rank: "C",
  xp: 65,
  xpToNextLevel: 100,
  gatesCleared: 12,
  stats: {
    strength: 42,
    intelligence: 35,
    agility: 47,
    endurance: 39
  },
  currentQuest: {
    title: "Defeat the High Orc Dungeon",
    rank: "C",
    description: "Clear the High Orc dungeon within the time limit to acquire new shadows.",
    progress: 45,
    rewards: {
      xp: 200,
      potential_shadows: ["High Orc Warrior", "High Orc Shaman"]
    }
  },
  shadows: [
    { name: "Iron", level: 15, icon: "⚔️" },
    { name: "Tank", level: 12, icon: "🛡️" },
    { name: "Igris", level: 30, icon: "🔥" }
  ]
};

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Check if the user is logged in
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    // Redirect to login if not logged in
    // window.location.href = '/login';
    // For demo purposes, we'll just load the data anyway
  }
  
  // Load hunter data - would be an API call in production
  loadHunterData();
  
  // Add page transition effects
  document.body.classList.add('loaded');
});

// Load hunter data and update the UI
function loadHunterData() {
  try {
    // In production, this would be an API fetch
    // const response = await fetch('/api/hunter-data');
    // const hunterData = await response.json();
    
    // For demo, use the mock data
    updateDashboard(hunterData);
  } catch (error) {
    console.error('Failed to load hunter data:', error);
    showError('Failed to load your hunter data. Please try again later.');
  }
}

// Update the dashboard UI with hunter data
function updateDashboard(data) {
  // Update hunter info
  document.getElementById('hunter-name').textContent = data.name;
  document.getElementById('hunter-level').textContent = data.level;
  document.getElementById('hunter-rank').textContent = data.rank;
  document.getElementById('gates-cleared').textContent = data.gatesCleared;
  
  // Update XP progress
  const progressPercent = (data.xp / data.xpToNextLevel) * 100;
  const progressBar = document.getElementById('level-progress');
  progressBar.style.width = `${progressPercent}%`;
  progressBar.dataset.percent = progressPercent;
  document.getElementById('xp-text').textContent = `${data.xp}/${data.xpToNextLevel} XP`;
  
  // Update stats
  document.getElementById('strength-value').textContent = data.stats.strength;
  document.getElementById('intelligence-value').textContent = data.stats.intelligence;
  document.getElementById('agility-value').textContent = data.stats.agility;
  document.getElementById('endurance-value').textContent = data.stats.endurance;
  
  // Update current quest
  if (data.currentQuest) {
    updateQuestDisplay(data.currentQuest);
  }
  
  // Update shadows list
  const shadowsList = document.getElementById('shadows-list');
  
  // Clear the current list
  shadowsList.innerHTML = '';
  
  // If no shadows, show the default message
  if (!data.shadows || data.shadows.length === 0) {
    shadowsList.innerHTML = '<p>No shadows acquired yet.</p>';
    return;
  }
  
  // Add each shadow to the list
  data.shadows.forEach(shadow => {
    const shadowItem = document.createElement('div');
    shadowItem.className = 'shadow-item';
    shadowItem.innerHTML = `
      <div class="shadow-icon">${shadow.icon}</div>
      <div class="shadow-name">${shadow.name}</div>
      <div class="shadow-level">Level ${shadow.level}</div>
    `;
    
    // Add pulse effect to higher level shadows
    if (shadow.level > 20) {
      shadowItem.classList.add('high-level');
    }
    
    shadowsList.appendChild(shadowItem);
  });
  
  // Add animation effects
  animateDashboard();
}

// Update quest display
function updateQuestDisplay(quest) {
  const questContainer = document.getElementById('current-quest');
  
  if (!quest) {
    questContainer.innerHTML = `
      <div class="quest-header">
        <div class="quest-title">No Active Quest</div>
        <div class="quest-rank">--</div>
      </div>
      <div class="quest-description">Visit a gate to begin a quest.</div>
      <div class="quest-progress-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: 0%"></div>
        </div>
        <p class="quest-progress-text">0% Complete</p>
      </div>
    `;
    return;
  }
  
  // Set quest information
  questContainer.innerHTML = `
    <div class="quest-header">
      <div class="quest-title">${quest.title}</div>
      <div class="quest-rank rank-${quest.rank}">${quest.rank}</div>
    </div>
    <div class="quest-description">${quest.description}</div>
    <div class="quest-progress-container">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${quest.progress}%"></div>
      </div>
      <p class="quest-progress-text">${quest.progress}% Complete</p>
    </div>
    <div class="quest-rewards">
      <div class="reward-title">Rewards:</div>
      <div class="reward-item">
        <span class="reward-icon">⚡</span>
        <span>${quest.rewards.xp} XP</span>
      </div>
      ${quest.rewards.potential_shadows ? `
        <div class="reward-item">
          <span class="reward-icon">👥</span>
          <span>Potential Shadows: ${quest.rewards.potential_shadows.join(', ')}</span>
        </div>
      ` : ''}
    </div>
  `;
  
  // Add special effects for different rank quests
  const questRankElement = questContainer.querySelector('.quest-rank');
  if (quest.rank === 'S') {
    questRankElement.classList.add('glow-effect');
  }
}

// Add animation effects to the dashboard
function animateDashboard() {
  // Add entry animations for dashboard elements
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
  
  // Add pulse effect to the rank badge
  const rankBadge = document.getElementById('hunter-rank');
  setTimeout(() => {
    rankBadge.classList.add('pulse');
  }, 1000);
}

// Show error message
function showError(message) {
  const container = document.querySelector('.container');
  const errorEl = document.createElement('div');
  errorEl.className = 'error-message';
  errorEl.textContent = message;
  container.prepend(errorEl);
  
  // Add shake animation
  errorEl.classList.add('shake');
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    errorEl.classList.add('fade-out');
    setTimeout(() => {
      errorEl.remove();
    }, 500);
  }, 5000);
}

// For testing: Simulate level up
function simulateLevelUp() {
  const currentLevel = parseInt(document.getElementById('hunter-level').textContent);
  document.getElementById('hunter-level').textContent = currentLevel + 1;
  
  // Reset XP bar
  document.getElementById('level-progress').style.width = '0%';
  document.getElementById('xp-text').textContent = '0/100 XP';
  
  // Show level up notification
  showLevelUpNotification(currentLevel + 1);
}

// Show level up notification
function showLevelUpNotification(newLevel) {
  const notification = document.createElement('div');
  notification.className = 'level-up-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <h3>LEVEL UP!</h3>
      <div class="level-number">${newLevel}</div>
      <p>Your hunter has reached a new level!</p>
      <button class="btn-close" onclick="this.parentNode.parentNode.remove()">Continue</button>
    </div>
  `;
  document.body.appendChild(notification);
  
  // Add dramatic entrance animation
  setTimeout(() => {
    notification.classList.add('active');
  }, 100);
}

// Add a global console message for debugging
console.log('Omi-Leveling Dashboard loaded successfully!');