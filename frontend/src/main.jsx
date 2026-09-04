import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import "./style.css";

function P({ room, go }) {
  const t = useTexture(room.panoramaUrl);

  t.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      {/* 360° Panorama */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[100, 64, 40]} />
        <meshBasicMaterial map={t} side={THREE.BackSide} />
      </mesh>

      {/* Navigation Hotspots */}
      {room.hotspots.map((h) => (
        <group key={h.id} position={[h.x, h.y, h.z]}>
          <mesh
            onClick={() => h.targetRoomId && go(h.targetRoomId)}
          >
            <sphereGeometry args={[0.4, 24, 24]} />
            <meshBasicMaterial color="#f3b33d" />
          </mesh>

          <Html distanceFactor={10}>
            <button
              onClick={() => h.targetRoomId && go(h.targetRoomId)}
            >
              {h.label}
            </button>
          </Html>
        </group>
      ))}

      {/* Google Maps Style 360° Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableDamping={true}
        dampingFactor={0.08}
        rotateSpeed={-0.35}
        zoomSpeed={0.5}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI - 0.1}
      />
    </>
  );
}

function App() {
  const [t, setT] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/api/tours/heritage-demo")
      .then((r) => r.json())
      .then((x) => {
        setT(x);
        setId(x.rooms[0].id);
      })
      .catch(() => {});
  }, []);

  if (!t) {
    return (
      <div className="load">
        <h1>VirtualTour Pro</h1>
        <p>
          Backend demo API is not running. Start backend, then refresh.
        </p>
      </div>
    );
  }

  const room = t.rooms.find((r) => r.id === id);

  return (
    <main>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <P room={room} go={setId} />
      </Canvas>

      <header>
        <b>{t.title}</b>
        <small>360° Interactive Experience</small>
      </header>

      <aside>
        <h2>Explore Rooms</h2>

        {t.rooms.map((r) => (
          <button
            key={r.id}
            className={r.id === id ? "active" : ""}
            onClick={() => setId(r.id)}
          >
            {r.name}
          </button>
        ))}
      </aside>

      <section>
        <small>CURRENT LOCATION</small>
        <h1>{room.name}</h1>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);