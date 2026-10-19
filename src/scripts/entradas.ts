// entradas.ts
// Animación de entrada individual: cada elemento con data-entrada="..." entra
// desde su lado cuando aparece en pantalla. Lo usan todas las secciones, para
// que se muevan igual en toda la invitación.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const desde: Record<string, gsap.TweenVars> = {
    arriba: { y: -40, rotation: -8, scale: 0.85 },
    abajo: { y: 30 },
    izq: { x: -50 },
    der: { x: 50 },
    giro: { scale: 0.6, rotation: -20 },
    centro: { scaleX: 0 },
    vertical: { scaleY: 0 },
    desenfoque: { y: 16, filter: "blur(6px)" },
};

// Valor normal de cada propiedad: solo se animan las que cambian, así no
// pisan otros movimientos (por ejemplo, el vaivén de una flor)
const normal: Record<string, gsap.TweenValue> = {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    filter: "blur(0px)",
};

export function animarEntradas(raiz: ParentNode) {
    raiz.querySelectorAll<HTMLElement>("[data-entrada]").forEach((el) => {
        const inicio = desde[el.dataset.entrada ?? "abajo"] ?? desde.abajo;
        const final = Object.fromEntries(
            Object.keys(inicio).map((k) => [k, normal[k]]),
        );
        gsap.fromTo(
            el,
            { opacity: 0, ...inicio },
            {
                opacity: 1,
                ...final,
                duration: 1.2,
                ease: "power3.out",
                delay: Number(el.dataset.retraso ?? 0),
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none reset",
                },
                onComplete: () => gsap.set(el, { clearProps: "filter" }),
            },
        );
    });
}

export const sinMovimiento = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
