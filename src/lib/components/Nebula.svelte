<script>
  import { onMount } from 'svelte';

  /**
   * @typedef {{
   *   x: number;
   *   y: number;
   *   size: number;
   *   speedX: number;
   *   speedY: number;
   *   alpha: number;
   *   pulse: number;
   *   depth: number;
   *   color: string;
   * }} Particle
   */

  /** @type {HTMLCanvasElement | null} */
  let canvas = null;
  /** @type {CanvasRenderingContext2D | null} */
  let ctx = null;
  let width = 0;
  let height = 0;
  let animationFrame = 0;
  let reducedMotion = false;

  /** @type {Particle[]} */
  let particles = [];

  const pointer = {
    x: 0.52,
    y: 0.34,
    targetX: 0.52,
    targetY: 0.34
  };

  const colors = ['rgba(0, 229, 255, 0.9)', 'rgba(124, 157, 255, 0.78)', 'rgba(255, 255, 255, 0.65)'];

  const getParticleCount = () => {
    const area = window.innerWidth * window.innerHeight;
    return Math.max(48, Math.min(96, Math.round(area / 26000)));
  };

  /** @returns {Particle} */
  const createParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.35,
    speedX: Math.random() * 0.18 - 0.09,
    speedY: Math.random() * 0.18 - 0.09,
    alpha: Math.random() * 0.3 + 0.08,
    pulse: Math.random() * 0.01 + 0.003,
    depth: Math.random() * 1.2 + 0.4,
    color: colors[Math.floor(Math.random() * colors.length)]
  });

  const seedParticles = () => {
    particles = Array.from({ length: getParticleCount() }, createParticle);
  };

  const resize = () => {
    if (!canvas) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 1.35);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx = canvas.getContext('2d');
    ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
    seedParticles();
  };

  /** @param {number} time */
  const drawField = (time) => {
    if (!ctx) return;

    pointer.x += (pointer.targetX - pointer.x) * (reducedMotion ? 0.02 : 0.05);
    pointer.y += (pointer.targetY - pointer.y) * (reducedMotion ? 0.02 : 0.05);

    const drift = time * (reducedMotion ? 0.00003 : 0.00009);
    const offsetX = (pointer.x - 0.5) * width * 0.08;
    const offsetY = (pointer.y - 0.5) * height * 0.06;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#030008';
    ctx.fillRect(0, 0, width, height);

    const core = ctx.createRadialGradient(
      width * 0.72 + offsetX * 0.55 + Math.sin(drift) * 26,
      height * 0.18 + offsetY * 0.4,
      0,
      width * 0.72 + offsetX * 0.55,
      height * 0.18 + offsetY * 0.4,
      width * 0.62
    );
    core.addColorStop(0, 'rgba(29, 78, 216, 0.22)');
    core.addColorStop(0.42, 'rgba(7, 51, 109, 0.16)');
    core.addColorStop(1, 'rgba(2, 4, 10, 0)');
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, width, height);

    const ceruleanBloom = ctx.createRadialGradient(
      width * 0.22 + offsetX,
      height * 0.36 + offsetY * 0.6 + Math.cos(drift * 1.4) * 20,
      0,
      width * 0.22 + offsetX,
      height * 0.36 + offsetY * 0.6,
      width * 0.46
    );
    ceruleanBloom.addColorStop(0, 'rgba(0, 229, 255, 0.14)');
    ceruleanBloom.addColorStop(0.45, 'rgba(0, 229, 255, 0.05)');
    ceruleanBloom.addColorStop(1, 'rgba(0, 229, 255, 0)');
    ctx.fillStyle = ceruleanBloom;
    ctx.fillRect(0, 0, width, height);

    const crimsonEcho = ctx.createRadialGradient(
      width * 0.55 - offsetX * 0.25,
      height * 0.9 - offsetY * 0.2,
      0,
      width * 0.55 - offsetX * 0.25,
      height * 0.9 - offsetY * 0.2,
      width * 0.34
    );
    crimsonEcho.addColorStop(0, 'rgba(255, 0, 60, 0.06)');
    crimsonEcho.addColorStop(0.5, 'rgba(255, 0, 60, 0.025)');
    crimsonEcho.addColorStop(1, 'rgba(255, 0, 60, 0)');
    ctx.fillStyle = crimsonEcho;
    ctx.fillRect(0, 0, width, height);
  };

  const drawParticles = () => {
    if (!ctx) return;

    for (const particle of particles) {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.alpha += particle.pulse;

      if (particle.alpha > 0.42 || particle.alpha < 0.06) {
        particle.pulse *= -1;
      }

      if (particle.x < -8) particle.x = width + 8;
      if (particle.x > width + 8) particle.x = -8;
      if (particle.y < -8) particle.y = height + 8;
      if (particle.y > height + 8) particle.y = -8;

      const parallaxX = (pointer.x - 0.5) * particle.depth * 18;
      const parallaxY = (pointer.y - 0.5) * particle.depth * 12;

      ctx.globalAlpha = particle.alpha;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x + parallaxX, particle.y + parallaxY, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  };

  /** @param {number} time */
  const animate = (time = 0) => {
    drawField(time);
    drawParticles();
    animationFrame = window.requestAnimationFrame(animate);
  };

  onMount(() => {
    if (!canvas) return;

    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resize();
    animate();

    /** @param {PointerEvent} event */
    const handleMove = (event) => {
      pointer.targetX = event.clientX / Math.max(width, 1);
      pointer.targetY = event.clientY / Math.max(height, 1);
    };

    const resetPointer = () => {
      pointer.targetX = 0.52;
      pointer.targetY = 0.34;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerleave', resetPointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', resetPointer);
    };
  });
</script>

<canvas bind:this={canvas} class="nebula-canvas"></canvas>

<style>
  .nebula-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: -5;
    pointer-events: none;
    background: radial-gradient(circle at top right, #0a1128 0%, #030008 70%);
  }
</style>
