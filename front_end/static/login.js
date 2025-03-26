class NodeSystem {
    constructor() {
        this.nodes = [];
        this.mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.init();
    }

    init() {
        this.createNodes();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    createParticles() {
        const container = document.getElementById('particles');
        for (let i = 0; i < 60; i++) {
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

    createNodes() {
        const container = document.getElementById('nodeNetwork');
        const centerX = 50; // Center of the screen (percentage)
        const centerY = 50;
        const size = 100; // Size of the diamond

        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2; // Distribute nodes evenly
            const x = centerX + Math.sin(angle) * size;
            const y = centerY + Math.cos(angle) * size;

            const node = document.createElement('div');
            node.className = 'node';
            Object.assign(node.style, {
                left: `${x}%`,
                top: `${y}%`,
                transform: `scale(${0.4 + Math.random() * 0.6})`
            });

            container.appendChild(node);
            this.nodes.push({
                element: node,
                x: x,
                y: y,
                vx: 0,
                vy: 0,
                size: 0.5 + Math.random() * 0.7
            });
        }
    }

    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mousePos = { x: e.clientX, y: e.clientY };
        });

        document.addEventListener('touchmove', (e) => {
            this.mousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            e.preventDefault();
        }, { passive: false });
    }

    animate() {
        this.nodes.forEach(node => {
            const nodeX = window.innerWidth * node.x / 100;
            const nodeY = window.innerHeight * node.y / 100;

            const dx = this.mousePos.x - nodeX;
            const dy = this.mousePos.y - nodeY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const force = distance < 300 ? -0.0002 * (300 - distance) : 0.0005;
            node.vx += dx * force;
            node.vy += dy * force;

            node.vx *= 0.9; // Friction
            node.vy *= 0.9;

            node.x = Math.max(40, Math.min(60, node.x + node.vx)); // Keep within the diamond
            node.y = Math.max(40, Math.min(60, node.y + node.vy));

            node.element.style.left = `${node.x}%`;
            node.element.style.top = `${node.y}%`;

            const pulse = 1 + (Math.abs(node.vx) + Math.abs(node.vy)) * 5;
            node.element.style.transform = `scale(${node.size * pulse})`;
            node.element.style.opacity = 0.3 + pulse * 0.2;

            this.createConnections(node);
        });

        requestAnimationFrame(() => this.animate());
    }

    createConnections(currentNode) {
        const connections = document.createElement('div');
        connections.className = 'node-connections';

        this.nodes.forEach(node => {
            if (node === currentNode) return;

            const distance = Math.sqrt(
                Math.pow(window.innerWidth * (currentNode.x - node.x) / 100, 2) +
                Math.pow(window.innerHeight * (currentNode.y - node.y) / 100, 2)
            );

            if (distance < 100) {
                const line = document.createElement('div');
                line.className = 'node-line';
                const angle = Math.atan2(
                    window.innerHeight * (node.y - currentNode.y) / 100,
                    window.innerWidth * (node.x - currentNode.x) / 100
                );

                Object.assign(line.style, {
                    width: `${distance}px`,
                    transform: `rotate(${angle}rad)`,
                    left: `${currentNode.x}%`,
                    top: `${currentNode.y}%`,
                    opacity: 0.3 * (1 - distance / 150)
                });

                connections.appendChild(line);
            }
        });

        currentNode.element.innerHTML = '';
        currentNode.element.appendChild(connections);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NodeSystem();
});

{
    "particles": {
      "number": {"value": 100},
      "color": {"value": "#ffffff"},
      "shape": {"type": "circle"},
      "opacity": {"value": 0.5},
      "size": {"value": 3},
      "move": {"speed": 1}
    }
  }
  