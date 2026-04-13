<script>
  import { onMount } from 'svelte';

  let canvas;
  let ctx;
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

  const particleCount = 120;
  const colors = ['#00e5ff', '#ff003c', '#ffffff', '#7c9dff'];

  class Particle {
    constructor() {
      this.init();
    }

    init() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.1;
      this.pulse = Math.random() * 0.02;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Pulse
      this.alpha += this.pulse;
      if (this.alpha > 0.6 || this.alpha < 0.1) this.pulse *= -1;

      // Mouse Parallax
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 200) {
        this.x -= dx * 0.01;
        this.y -= dy * 0.01;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles.forEach(p => p.init());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Gradient Background
    const grad = ctx.createRadialGradient(width * 0.7, height * 0.2, 0, width * 0.7, height * 0.2, width);
    grad.addColorStop(0, '#0a1128');
    grad.addColorStop(1, '#030008');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    resize();
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    return () => {
      window.removeEventListener('resize', resize);
    };
  });
</script>

<canvas bind:this={canvas} class="nebula-canvas"></canvas>

<style>
  .nebula-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: #030008;
  }
</style>
