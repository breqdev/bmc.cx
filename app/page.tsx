"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faLock,
  faRadio,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import cube from "../public/cube.png";
import { useEffect, useRef } from "react";

function Item({
  href,
  children,
  icon,
}: {
  href?: string;
  children: string;
  icon: IconDefinition;
}) {
  const items = (
    <>
      <FontAwesomeIcon icon={icon} className="aspect-square" />
      <span>{children}</span>
    </>
  );
  const className = "font-mono flex flex-row items-center gap-1";

  if (href) {
    return (
      <a href={href} className={className + " hover:underline"}>
        {items}
      </a>
    );
  } else {
    return <div className={className}>{items}</div>;
  }
}

export default function Home() {
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handler = (e: MouseEvent) => {
      if (card.current) {
        const rect = card.current.getBoundingClientRect();
        const x = -(e.clientY - rect.y - rect.height / 2) / 1000;
        const y = (e.clientX - rect.x - rect.width / 2) / 1000;

        if (!prefersReducedMotion) {
          card.current.style.transform = `perspective(100px) rotateX(${x}deg) rotateY(${y}deg)`;
        }
      }
    };

    document.addEventListener("mousemove", handler);

    return () => {
      document.removeEventListener("mousemove", handler);
    };
  }, []);

  return (
    <div className="h-full w-full grid place-items-center p-4 sm:p-16 bg-gray-700 text-white overflow-x-hidden">
      {/* Card is based on an ID-1 card (85.60mm by 53.98mm, 3mm rounded corners) */}
      <main
        className="border-2 border-black aspect-[85.60/53.98] w-full max-w-xl rounded-[calc(100%*3/85.60)/calc(100%*3/53.98)] relative overflow-clip flex min-w-0 bg-black"
        ref={card}
      >
        <Image src={cube} alt="" className="absolute inset-0 z-0" style={{}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%,rgba(0,0,0,0.00)_25%,rgba(0,0,0,1.00)_100%)] pointer-events-none" />
        <section className="relative flex flex-col h-full p-2 sm:p-4 z-10 pr-48">
          <h1 className="text-2xl sm:text-4xl z-10">Brooke Chalmers</h1>
          <div className="z-10 text-xl sm:flex hidden gap-2">
            <span>she/her</span> <span>•</span> <span>boston + maine</span>
          </div>
          <span className="flex-grow" />
          <div className="flex flex-col font-mono z-10">
            <Item href="https://breq.dev/" icon={faGlobe}>
              breq.dev
            </Item>
            <Item href="mailto:breq@breq.dev" icon={faEnvelope}>
              breq@breq.dev
            </Item>
            <Item href="https://github.com/breqdev" icon={faGithub}>
              /breqdev
            </Item>
            <Item
              href="https://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=4768613"
              icon={faRadio}
            >
              K9BRQ
            </Item>
            <Item href="https://breq.dev/keys/pgp.txt" icon={faLock}>
              EF956A1CEF9CEF5E
            </Item>
            <Item href="https://tacobelllabs.net/@breq" icon={faMastodon}>
              @breq@tacobelllabs.net
            </Item>
          </div>
        </section>
      </main>
    </div>
  );
}
