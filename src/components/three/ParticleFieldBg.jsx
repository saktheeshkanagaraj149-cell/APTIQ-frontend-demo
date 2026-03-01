import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ParticleFieldBg – Three.js particle background for the Dashboard.
 *
 * Renders a field of soft-glowing pastel particles that drift upward
 * like notebook sparkles / dust motes. Mouse interaction causes gentle
 * repulsion near the cursor.
 */
export default function ParticleFieldBg() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        /* ── Scene ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        /* ── Create circular particle texture ── */
        const makeCircleTexture = (color) => {
            const size = 64;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Radial gradient for glow effect
            const gradient = ctx.createRadialGradient(
                size / 2, size / 2, 0,
                size / 2, size / 2, size / 2
            );
            gradient.addColorStop(0, color);
            gradient.addColorStop(0.4, color);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);

            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };

        /* ── Particle groups (one per color) ── */
        const particleGroups = [];
        const colorConfigs = [
            { hex: '#fff176', count: 60 },  // yellow
            { hex: '#f8bbd9', count: 50 },  // pink
            { hex: '#b9f6ca', count: 50 },  // green
            { hex: '#b3e5fc', count: 40 },  // sky-blue
        ];

        colorConfigs.forEach(({ hex, count }) => {
            const positions = new Float32Array(count * 3);
            const velocities = [];
            const basePositions = [];

            for (let i = 0; i < count; i++) {
                const x = (Math.random() - 0.5) * 50;
                const y = (Math.random() - 0.5) * 35;
                const z = (Math.random() - 0.5) * 15;

                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                velocities.push({
                    x: (Math.random() - 0.5) * 0.005,
                    y: 0.008 + Math.random() * 0.015,
                    oscillation: Math.random() * Math.PI * 2,
                    oscSpeed: 0.3 + Math.random() * 0.5,
                });

                basePositions.push({ x, y, z });
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const texture = makeCircleTexture(hex);
            const material = new THREE.PointsMaterial({
                map: texture,
                size: 0.3 + Math.random() * 0.4,
                transparent: true,
                opacity: 0.5 + Math.random() * 0.3,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);

            particleGroups.push({
                points,
                geometry,
                velocities,
                count,
            });
        });

        /* ── Mouse tracking ── */
        const mouse = { x: 9999, y: 9999 };
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            // Convert to NDC
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        const handleMouseLeave = () => {
            mouse.x = 9999;
            mouse.y = 9999;
        };
        window.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        /* ── Animation loop ── */
        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            // Compute mouse world position (approximate)
            const mouseWorld = new THREE.Vector3(mouse.x * 25, mouse.y * 17, 0);

            particleGroups.forEach(({ geometry, velocities, count }) => {
                const pos = geometry.attributes.position.array;

                for (let i = 0; i < count; i++) {
                    const idx = i * 3;
                    const vel = velocities[i];

                    // Upward drift
                    pos[idx + 1] += vel.y;
                    // Horizontal oscillation
                    pos[idx] += Math.sin(elapsed * vel.oscSpeed + vel.oscillation) * 0.008;

                    // Mouse repulsion
                    const dx = pos[idx] - mouseWorld.x;
                    const dy = pos[idx + 1] - mouseWorld.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 5) {
                        const force = (5 - dist) * 0.003;
                        pos[idx] += (dx / dist) * force;
                        pos[idx + 1] += (dy / dist) * force;
                    }

                    // Wrap around when particle goes too high
                    if (pos[idx + 1] > 20) {
                        pos[idx + 1] = -20;
                        pos[idx] = (Math.random() - 0.5) * 50;
                    }
                }

                geometry.attributes.position.needsUpdate = true;
            });

            renderer.render(scene, camera);
        };
        animate();

        /* ── Resize ── */
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        /* ── Cleanup ── */
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mouseleave', handleMouseLeave);
            particleGroups.forEach(({ geometry, points }) => {
                geometry.dispose();
                points.material.map?.dispose();
                points.material.dispose();
            });
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
            aria-hidden="true"
        />
    );
}
