import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * WaveGridBg – Three.js animated wireframe grid for the Auth page.
 *
 * Renders a tilted grid plane whose vertices undulate with sine waves,
 * creating a "notebook paper coming alive" effect. Uses the navy/cream
 * palette at low opacity.
 */
export default function WaveGridBg() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        /* ── Scene setup ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            55,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.set(0, 8, 18);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        /* ── Grid plane ── */
        const gridWidth = 40;
        const gridHeight = 30;
        const segW = 60;
        const segH = 45;
        const geometry = new THREE.PlaneGeometry(gridWidth, gridHeight, segW, segH);
        geometry.rotateX(-Math.PI * 0.45);

        // Primary wireframe grid (navy)
        const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0x1a3a5c,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
        });
        const wireMesh = new THREE.Mesh(geometry, wireMaterial);
        scene.add(wireMesh);

        // Second overlay grid (softened, slightly offset)
        const geometry2 = geometry.clone();
        const wireMaterial2 = new THREE.MeshBasicMaterial({
            color: 0xb3e5fc,
            wireframe: true,
            transparent: true,
            opacity: 0.06,
        });
        const wireMesh2 = new THREE.Mesh(geometry2, wireMaterial2);
        wireMesh2.position.y = 0.05;
        scene.add(wireMesh2);

        // Store original positions
        const posAttr = geometry.attributes.position;
        const posAttr2 = geometry2.attributes.position;
        const originalY = new Float32Array(posAttr.count);
        for (let i = 0; i < posAttr.count; i++) {
            originalY[i] = posAttr.getY(i);
        }

        /* ── Mouse tracking ── */
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        /* ── Animation loop ── */
        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
            animId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            // Wave deformation
            for (let i = 0; i < posAttr.count; i++) {
                const x = posAttr.getX(i);
                const z = posAttr.getZ(i);

                const wave1 = Math.sin(x * 0.3 + elapsed * 0.8) * 0.5;
                const wave2 = Math.cos(z * 0.4 + elapsed * 0.6) * 0.3;
                const wave3 = Math.sin((x + z) * 0.2 + elapsed * 0.4) * 0.2;

                const newY = originalY[i] + wave1 + wave2 + wave3;

                posAttr.setY(i, newY);
                posAttr2.setY(i, newY + 0.05);
            }

            posAttr.needsUpdate = true;
            posAttr2.needsUpdate = true;

            // Subtle camera sway based on mouse position
            camera.position.x += (mouse.x * 2 - camera.position.x) * 0.01;
            camera.position.y += (8 + mouse.y * 1.5 - camera.position.y) * 0.01;
            camera.lookAt(0, 0, 0);

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
            geometry.dispose();
            geometry2.dispose();
            wireMaterial.dispose();
            wireMaterial2.dispose();
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
