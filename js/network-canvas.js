/**
 * Network Topology Interactive Canvas
 * High-performance background simulation of network nodes, links, and packet flows.
 */

(function () {
  'use strict';

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return; // Keep background static
  }

  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;
  let isVisible = true;

  // Configuration
  const CONFIG = {
    nodeCountFactor: 0.000045, // nodes per pixel area
    maxNodes: 65,
    minNodes: 24,
    connectionDistance: 155,
    mouseRadius: 180,
    nodeSpeed: 0.35,
    packetChance: 0.004,
    nodeColor: 'rgba(56, 189, 248, 0.45)',
    coreNodeColor: 'rgba(56, 189, 248, 0.85)',
    linkColor: 'rgba(56, 189, 248, 0.08)',
    activeLinkColor: 'rgba(56, 189, 248, 0.28)',
    packetColor: '#38bdf8'
  };

  const mouse = {
    x: null,
    y: null,
    active: false
  };

  const nodes = [];
  const packets = [];

  class Node {
    constructor(x, y, isCore = false) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * CONFIG.nodeSpeed * 2;
      this.vy = (Math.random() - 0.5) * CONFIG.nodeSpeed * 2;
      this.radius = isCore ? 3.5 : (Math.random() * 1.5 + 1.8);
      this.isCore = isCore;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update(w, h) {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off borders
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;

      // Pulse rhythm
      this.pulse += 0.03;
    }

    draw(ctx) {
      ctx.beginPath();
      const currentRadius = this.isCore 
        ? this.radius + Math.sin(this.pulse) * 0.8 
        : this.radius;

      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.isCore ? CONFIG.coreNodeColor : CONFIG.nodeColor;
      ctx.fill();

      // Outer glow ring for core nodes
      if (this.isCore) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  class Packet {
    constructor(startNode, endNode) {
      this.start = startNode;
      this.end = endNode;
      this.progress = 0;
      this.speed = 0.008 + Math.random() * 0.008;
    }

    update() {
      this.progress += this.speed;
      return this.progress >= 1;
    }

    draw(ctx) {
      const currentX = this.start.x + (this.end.x - this.start.x) * this.progress;
      const currentY = this.start.y + (this.end.y - this.start.y) * this.progress;

      ctx.beginPath();
      ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.packetColor;
      ctx.shadowBlur = 6;
      ctx.shadowColor = CONFIG.packetColor;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initNodes();
  }

  function initNodes() {
    nodes.length = 0;
    packets.length = 0;

    const area = width * height;
    let targetCount = Math.floor(area * CONFIG.nodeCountFactor);
    targetCount = Math.max(CONFIG.minNodes, Math.min(CONFIG.maxNodes, targetCount));

    for (let i = 0; i < targetCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const isCore = i % 8 === 0; // 1 in 8 is a core routing node
      nodes.push(new Node(x, y, isCore));
    }
  }

  function animate() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update(width, height);
      nodes[i].draw(ctx);
    }

    // Draw links between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectionDistance) {
          const alpha = (1 - dist / CONFIG.connectionDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Spontaneously transmit packet along active links
          if (Math.random() < CONFIG.packetChance && packets.length < 12) {
            packets.push(new Packet(nodes[i], nodes[j]));
          }
        }
      }

      // Link to cursor if nearby
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseRadius) {
          const alpha = (1 - dist / CONFIG.mouseRadius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Update and draw packets
    for (let p = packets.length - 1; p >= 0; p--) {
      const isDone = packets[p].update();
      if (isDone) {
        packets.splice(p, 1);
      } else {
        packets[p].draw(ctx);
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', debounce(resize, 200));

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', function () {
    mouse.active = false;
  });

  // Handle visibility to save battery and CPU cycles
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      isVisible = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      isVisible = true;
      animate();
    }
  });

  function debounce(fn, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Initialize
  resize();
  animate();
})();
