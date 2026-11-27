"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Matter from "matter-js";

import { useAnimationSettings } from "@/components/providers/animation-provider";
import { skillsData } from "@/data/skills";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type PillVariant = "lime" | "black" | "outline";

interface TechPillItem {
  id: string;
  name: string;
  variant: PillVariant;
}

// 26 verified core production technologies across frontend, backend, databases, APIs, and AI automation
const PLAYGROUND_TECHS: TechPillItem[] = [
  { id: "react", name: "React", variant: "lime" },
  { id: "nextjs", name: "Next.js", variant: "black" },
  { id: "typescript", name: "TypeScript", variant: "outline" },
  { id: "javascript", name: "JavaScript", variant: "lime" },
  { id: "python", name: "Python", variant: "black" },
  { id: "django", name: "Django", variant: "outline" },
  { id: "nodejs", name: "Node.js", variant: "lime" },
  { id: "fastapi", name: "FastAPI", variant: "outline" },
  { id: "express", name: "Express.js", variant: "black" },
  { id: "tailwind", name: "Tailwind CSS", variant: "outline" },
  { id: "postgresql", name: "PostgreSQL", variant: "black" },
  { id: "mongodb", name: "MongoDB", variant: "lime" },
  { id: "redis", name: "Redis", variant: "outline" },
  { id: "graphql", name: "GraphQL", variant: "lime" },
  { id: "rest-apis", name: "REST APIs", variant: "black" },
  { id: "webhooks", name: "Webhooks", variant: "outline" },
  { id: "openai-api", name: "OpenAI API", variant: "black" },
  { id: "ai-integration", name: "AI Integration", variant: "lime" },
  { id: "playwright", name: "Playwright", variant: "outline" },
  { id: "web-automation", name: "Web Automation", variant: "lime" },
  { id: "claude", name: "Claude", variant: "black" },
  { id: "gemini", name: "Gemini", variant: "outline" },
  { id: "docker", name: "Docker", variant: "outline" },
  { id: "git", name: "Git", variant: "black" },
  { id: "redux", name: "Redux", variant: "lime" },
  { id: "oauth", name: "OAuth", variant: "outline" },
];

export function TechStackPlayground() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const isRunningRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);
  const activeConstraintRef = useRef<Matter.Constraint | null>(null);
  const activeDraggedBodyRef = useRef<Matter.Body | null>(null);
  const lastPointerPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const pointerVelocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });

  const [isInitialized, setIsInitialized] = useState(false);
  const { shouldReduceMotion } = useAnimationSettings();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = canvasContainerRef.current;
    if (!container) return;

    const { Engine, World, Bodies, Body, Constraint, Sleeping } = Matter;

    // Create Matter.js 2D physics engine
    const engine = Engine.create({
      gravity: { x: 0, y: 1.15, scale: 0.001 },
      enableSleeping: true,
    });
    engineRef.current = engine;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Boundary walls to contain pills securely
    const wallThickness = 100;
    const floor = Bodies.rectangle(
      containerWidth / 2,
      containerHeight + wallThickness / 2,
      containerWidth * 3,
      wallThickness,
      { isStatic: true, friction: 0.85, restitution: 0.2 }
    );
    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      containerHeight / 2,
      wallThickness,
      containerHeight * 4,
      { isStatic: true, friction: 0.1, restitution: 0.3 }
    );
    const rightWall = Bodies.rectangle(
      containerWidth + wallThickness / 2,
      containerHeight / 2,
      wallThickness,
      containerHeight * 4,
      { isStatic: true, friction: 0.1, restitution: 0.3 }
    );
    const ceiling = Bodies.rectangle(
      containerWidth / 2,
      -1200,
      containerWidth * 3,
      wallThickness,
      { isStatic: true }
    );

    World.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // Measure each pill's rendered DOM bounds and create matching rounded physics bodies
    const pillBodies: Matter.Body[] = [];
    PLAYGROUND_TECHS.forEach((_, index) => {
      const el = pillRefs.current[index];
      const width = el ? el.offsetWidth : 140;
      const height = el ? el.offsetHeight : 64;

      // Stagger initial drop positions horizontally and vertically above playground
      const spawnX =
        width / 2 +
        Math.random() * Math.max(10, containerWidth - width - 20) +
        10;
      const spawnY = -60 - index * 42 - Math.random() * 60;
      const initialAngle = (Math.random() - 0.5) * 0.7;

      const body = Bodies.rectangle(spawnX, spawnY, width, height, {
        chamfer: { radius: height / 2 },
        restitution: 0.32,
        friction: 0.25,
        frictionAir: 0.012,
        density: 0.0012,
      });

      Body.setAngle(body, initialAngle);
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.035);

      pillBodies.push(body);
    });

    bodiesRef.current = pillBodies;
    World.add(engine.world, pillBodies);
    setIsInitialized(true);

    // Physics Animation Frame Loop
    const updatePhysics = () => {
      if (!isRunningRef.current) return;

      Engine.update(engine, 1000 / 60);

      // Synchronize DOM pill positions & rotations with physics bodies
      pillBodies.forEach((body, idx) => {
        const el = pillRefs.current[idx];
        if (!el) return;

        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const { x, y } = body.position;
        const angle = body.angle;

        // Prevent tunneling past bounds
        if (y > containerHeight - h / 2) {
          Body.setPosition(body, { x, y: containerHeight - h / 2 });
          Body.setVelocity(body, { x: body.velocity.x * 0.8, y: 0 });
        }

        el.style.transform = `translate3d(${(x - w / 2).toFixed(1)}px, ${(y - h / 2).toFixed(1)}px, 0) rotate(${angle.toFixed(3)}rad)`;
      });

      animFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    const startSimulation = () => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;
      // Wake up all bodies when entering viewport
      pillBodies.forEach((b) => Sleeping.set(b, false));
      animFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    const pauseSimulation = () => {
      isRunningRef.current = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };

    // ScrollTrigger viewport lifecycle: pause when offscreen to preserve battery & CPU
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 78%",
      end: "bottom top",
      onEnter: startSimulation,
      onLeave: pauseSimulation,
      onEnterBack: startSimulation,
      onLeaveBack: pauseSimulation,
    });

    // Pointer-based Drag & Throw Interaction Handler
    const handlePointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-pill-idx]");
      if (!target) return;

      const idxStr = target.dataset.pillIdx;
      if (idxStr === undefined) return;
      const idx = parseInt(idxStr, 10);
      const body = pillBodies[idx];
      if (!body) return;

      e.preventDefault();
      target.setPointerCapture(e.pointerId);

      const rect = container.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      Sleeping.set(body, false);
      activeDraggedBodyRef.current = body;
      lastPointerPosRef.current = { x: pointerX, y: pointerY, time: performance.now() };

      const constraint = Constraint.create({
        pointA: { x: pointerX, y: pointerY },
        bodyB: body,
        pointB: { x: pointerX - body.position.x, y: pointerY - body.position.y },
        stiffness: 0.28,
        damping: 0.08,
      });

      activeConstraintRef.current = constraint;
      World.add(engine.world, constraint);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!activeConstraintRef.current || !activeDraggedBodyRef.current) return;

      const rect = container.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;
      const now = performance.now();

      activeConstraintRef.current.pointA = { x: pointerX, y: pointerY };

      if (lastPointerPosRef.current) {
        const dt = Math.max(1, now - lastPointerPosRef.current.time);
        const vx = ((pointerX - lastPointerPosRef.current.x) / dt) * 16;
        const vy = ((pointerY - lastPointerPosRef.current.y) / dt) * 16;
        pointerVelocityRef.current = { vx, vy };
      }

      lastPointerPosRef.current = { x: pointerX, y: pointerY, time: now };
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (activeConstraintRef.current) {
        World.remove(engine.world, activeConstraintRef.current);
        activeConstraintRef.current = null;
      }

      if (activeDraggedBodyRef.current) {
        const body = activeDraggedBodyRef.current;
        const { vx, vy } = pointerVelocityRef.current;

        // Apply realistic throw velocity and spin upon release
        const clampedVx = Math.max(-28, Math.min(28, vx * 0.9));
        const clampedVy = Math.max(-28, Math.min(28, vy * 0.9));
        Body.setVelocity(body, { x: clampedVx, y: clampedVy });
        Body.setAngularVelocity(body, clampedVx * 0.015);

        activeDraggedBodyRef.current = null;
      }

      try {
        const target = e.target as HTMLElement;
        if (target && target.hasPointerCapture(e.pointerId)) {
          target.releasePointerCapture(e.pointerId);
        }
      } catch {}
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    // Responsive resize recalculation
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        Body.setPosition(floor, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
        Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
        Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });

        pillBodies.forEach((body) => {
          Sleeping.set(body, false);
        });

        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      pauseSimulation();
      st.kill();
      clearTimeout(resizeTimer);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="tech-stack-heading"
      onPointerLeave={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cursor:reset"));
        }
      }}
      className="relative w-full overflow-hidden bg-[#F4F4F0] text-[#0C0C0C] py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-[2.5vw] selection:bg-[#0C0C0C] selection:text-[#D0FF35] border-t border-black/10"
    >
      {/* Top Header: Editorial Layout matching Raglic reference */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 w-full select-none">
        <div className="max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0C0C0C]/50 font-semibold">
            06 {"//"} TECHNOLOGY STACK
          </span>
          <h2
            id="tech-stack-heading"
            className="mt-4 font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold tracking-[-0.04em] text-[#0C0C0C] leading-[0.98]"
          >
            Core Engineering Capabilities
          </h2>
          <p className="mt-5 font-body text-base sm:text-lg lg:text-xl text-[#0C0C0C]/70 leading-relaxed max-w-2xl">
            Production technologies spanning React/Next.js frontends, Node.js and Python/Django
            backends, databases, APIs, and AI automation.
          </p>
        </div>

        {/* Right Header: Monospace Instruction and Link to Full Skills Matrix */}
        <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
          <div className="font-mono text-[11px] sm:text-xs tracking-widest text-[#0C0C0C]/50 uppercase select-none">
            GO ON — THROW THEM AROUND.
          </div>
          <Link
            href="/skills"
            className="group inline-flex items-center gap-2 rounded-full border border-[#0C0C0C]/20 bg-white/70 hover:bg-[#D0FF35] hover:border-[#D0FF35] hover:text-[#0C0C0C] px-5 py-2.5 font-mono text-xs font-medium text-[#0C0C0C] transition-all duration-300 shadow-xs active:scale-95"
            aria-label="View Complete Skills Matrix"
          >
            <span className="tracking-wide">View Complete Skills Matrix</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Physics Playground Viewport */}
      {shouldReduceMotion ? (
        /* Accessible Static Pill Layout for Users Preferring Reduced Motion */
        <div className="mt-14 flex flex-wrap gap-3 max-w-5xl">
          {PLAYGROUND_TECHS.map((tech) => (
            <div
              key={tech.id}
              className={cn(
                "inline-flex items-center rounded-full px-6 py-3 font-display text-lg sm:text-xl font-medium tracking-tight",
                tech.variant === "lime" && "bg-[#D0FF35] text-[#0C0C0C]",
                tech.variant === "black" && "bg-[#0C0C0C] text-[#FAF8F5]",
                tech.variant === "outline" && "border border-[#0C0C0C]/25 bg-[#FAF8F5] text-[#0C0C0C]"
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full mr-2.5",
                  tech.variant === "lime" && "bg-[#0C0C0C]",
                  tech.variant === "black" && "bg-[#FAF8F5]",
                  tech.variant === "outline" && "bg-[#0C0C0C]"
                )}
              />
              {tech.name}
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Matter.js Physics Canvas Container */
        <div
          ref={canvasContainerRef}
          data-cursor="drag"
          className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] mt-10 sm:mt-14 lg:mt-16 overflow-hidden select-none touch-none rounded-2xl"
          tabIndex={0}
          role="region"
          aria-label="Interactive technology physics playground. Use mouse or touch to grab, throw, and collide technology capsules."
        >
          {PLAYGROUND_TECHS.map((tech, index) => (
            <div
              key={tech.id}
              ref={(el) => {
                pillRefs.current[index] = el;
              }}
              data-pill-idx={index}
              className={cn(
                "absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none will-change-transform z-10",
                "inline-flex items-center rounded-full whitespace-nowrap shadow-sm transition-shadow hover:shadow-md",
                // Responsive pill sizing: large and readable matching desktop reference
                "px-5 py-2.5 sm:px-6 sm:py-3.5 lg:px-7 lg:py-4",
                "font-display text-base sm:text-xl lg:text-2xl font-medium tracking-tight",
                // Visual Variants
                tech.variant === "lime" && "bg-[#D0FF35] text-[#0C0C0C] border border-[#D0FF35]",
                tech.variant === "black" && "bg-[#0C0C0C] text-[#FAF8F5] border border-[#0C0C0C]",
                tech.variant === "outline" &&
                  "bg-[#FAF8F5] text-[#0C0C0C] border border-[#0C0C0C]/25 shadow-xs",
                // Initial placement before physics init
                !isInitialized && "opacity-0 pointer-events-none"
              )}
              style={{
                touchAction: "none",
              }}
            >
              {/* Leading bullet dot */}
              <span
                className={cn(
                  "size-2 sm:size-2.5 rounded-full mr-2.5 sm:mr-3 shrink-0",
                  tech.variant === "lime" && "bg-[#0C0C0C]",
                  tech.variant === "black" && "bg-[#FAF8F5]",
                  tech.variant === "outline" && "bg-[#0C0C0C]"
                )}
                aria-hidden="true"
              />
              <span className="leading-none">{tech.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Semantic Accessible Technology Listing for Screen Readers & SEO */}
      <div className="sr-only">
        <h3>All Verified Technical Skills by Category</h3>
        {skillsData.map((category) => (
          <div key={category.id}>
            <h4>{category.title}</h4>
            <p>{category.description}</p>
            <ul>
              {category.items.map((item) => (
                <li key={item.name}>
                  {item.name} ({item.proficiency})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
