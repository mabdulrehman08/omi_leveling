// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create background particles
    createParticles();
    
    // Create node network
    createNodeNetwork();
    
    // Add form submission handler
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Get form values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simulate login process
        if (username && password) {
            // Add a loading effect to the button
            const loginButton = document.querySelector('.login-button');
            loginButton.textContent = 'ACCESSING SYSTEM...';
            loginButton.disabled = true;
            
            // Create a flash effect
            const flashEffect = document.createElement('div');
            flashEffect.style.position = 'fixed';
            flashEffect.style.top = '0';
            flashEffect.style.left = '0';
            flashEffect.style.width = '100%';
            
