import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * FloatingNotebookBg – Three.js animated background for the Landing Page hero.
 *
 * Renders floating 3D wireframe + semi-transparent geometric shapes that
 * drift and rotate gently. Mouse position drives a subtle parallax effect.
 *
 * The canvas is absolutely positioned (z-index 0) so page content floats above.
 */
export default function FloatingNotebookBg() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        /* ── Scene setup ── */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        /* ── Palette (matches AptIQ design tokens) ── */
        const palette = [
            0xfff176, // yellow-accent
            0xf8bbd9, // pink-light
            0xb9f6ca, // green-soft
            0xb3e5fc, // sky-soft
            0x1a3a5c, // navy
            0xfff9c4, // yellow-light
        ];

        /* ── Soft ambient + directional light ── */
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        /* ── Create floating shapes ── */
        const shapes = [];
        const geometries = [
            new THREE.IcosahedronGeometry(0.6, 0),
            new THREE.OctahedronGeometry(0.5, 0),
            new THREE.TorusKnotGeometry(0.35, 0.12, 64, 8),
            new THREE.TetrahedronGeometry(0.5, 0),
            new THREE.DodecahedronGeometry(0.45, 0),
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.TorusGeometry(0.4, 0.15, 16, 32),
        ];

        const shapeCount = 25;
        for (let i = 0; i < shapeCount; i++) {
            const geom = geometries[i % geometries.length];
            const color = palette[i % palette.length];

            const group = new THREE.Group();

            // Wireframe layer
            const wireMat = new THREE.MeshBasicMaterial({
                color,
                wireframe: true,
                transparent: true,
                opacity: 0.35,
            });
            const wireMesh = new THREE.Mesh(geom, wireMat);
            group.add(wireMesh);

            // Solid transparent layer
            const solidMat = new THREE.MeshPhongMaterial({
                color,
                transparent: true,
                opacity: 0.12,
                shininess: 80,
            });
            const solidMesh = new THREE.Mesh(geom, solidMat);
            group.add(solidMesh);

            // Random position spread
            group.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 18,
                (Math.random() - 0.5) * 12
            );

            // Random scale variation
            const scale = 0.5 + Math.random() * 1.2;
            group.scale.setScalar(scale);

            // Store animation data
            group.userData = {
                floatSpeed: 0.3 + Math.random() * 0.5,
                floatOffset: Math.random() * Math.PI * 2,
                rotSpeed: {
                    x: (Math.random() - 0.5) * 0.008,
                    y: (Math.random() - 0.5) * 0.008,
                    z: (Math.random() - 0.5) * 0.005,
                },
                baseY: group.position.y,
            };

            scene.add(group);
            shapes.push(group);
        }

        /* ── Mouse tracking for parallax ── */
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

            shapes.forEach((shape) => {
                const { floatSpeed, floatOffset, rotSpeed, baseY } = shape.userData;

                // Gentle floating
                shape.position.y = baseY + Math.sin(elapsed * floatSpeed + floatOffset) * 0.8;

                // Slow rotation
                shape.rotation.x += rotSpeed.x;
                shape.rotation.y += rotSpeed.y;
                shape.rotation.z += rotSpeed.z;
            });

            // Subtle camera parallax
            camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.02;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };
        animate();

        /* ── Resize handler ── */
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
            renderer.dispose();
            geometries.forEach((g) => g.dispose());
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
            aria-hidden="true"
        />
    );
}
