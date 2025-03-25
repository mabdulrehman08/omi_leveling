// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Fetch user data
  fetchUserData();

  // Set up level progress bar
  updateProgressBar();
});

// Function to fetch user data from the backend
function fetchUserData() {
  const sessionId = localStorage.getItem('sessionId');
  
  if (!sessionId) {
    window.location.href = '/login';
    return;
  }
  
  fetch(`/api/user/${sessionId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then(data => {
      updateDashboard(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error loading user data. Please try again.');
    });
}

// Function to update the dashboard with user data
function updateDashboard(user) {
  // Update hunter info
  document.getElementById('hunter-name').textContent = user.name;
  document.getElementById('hunter-level').textContent = user.level;
  document.getElementById('hunter-rank').textContent = user.rank;
  
  // Update progress bar
  const progressPercent = (user.xp / user.xp_to_next_level) * 100;
  document.getElementById('level-progress').style.width = `${progressPercent}%`;
  document.getElementById('xp-text').textContent = `${user.xp}/${user.xp_to_next_level} XP`;
  
  // Update stats
  document.getElementById('strength-value').textContent = user.stats.strength;
  document.getElementById('intelligence-value').textContent = user.stats.intelligence;
  document.getElementById('agility-value').textContent = user.stats.agility;
  document.getElementById('endurance-value').textContent = user.stats.endurance;
  
  // Update shadows
  const shadowsList = document.getElementById('shadows-list');
  shadowsList.innerHTML = '';
  
  if (user.shadows.length === 0) {
    shadowsList.innerHTML = '<p>No shadows acquired yet.</p>';
  } else {
    user.shadows.forEach(shadow => {
      const shadowItem = document.createElement('div');
      shadowItem.className = 'shadow-item';
      shadowItem.textContent = shadow;
      shadowsList.appendChild(shadowItem);
    });
  }
  
  // Update gates cleared
  document.getElementById('gates-cleared').textContent = user.gates_cleared;
}

// Function to update the progress bar animation
function updateProgressBar() {
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach(bar => {
    setTimeout(() => {
      bar.style.width = bar.getAttribute('data-percent') + '%';
    }, 100);
  });
}