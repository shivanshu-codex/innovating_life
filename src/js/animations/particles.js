export class LuminaParticles {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animFrame = null;
    this.resize();
    this.init();
    this._resizeHandler = () => this.resize();
    window.addEventListener('resize', this._resizeHandler);
    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  init() {
    const count = Math.max(20, Math.floor(this.canvas.width / 20));
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  createParticle(randomY = false) {
    const colors = [
      'rgba(245,168,0,',
      'rgba(255,107,91,',
      'rgba(124,83,245,',
      'rgba(58,157,92,',
    ];
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : this.canvas.height + 10,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.45 + 0.08,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((p, i) => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.pulse += 0.018;
      const currentOpacity = p.opacity * (0.8 + Math.sin(p.pulse) * 0.2);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color}${currentOpacity})`;
      this.ctx.fill();

      if (p.y < -10) this.particles[i] = this.createParticle();
    });
    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    window.removeEventListener('resize', this._resizeHandler);
  }
}
