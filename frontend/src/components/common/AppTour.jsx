import { useEffect } from "react";

export default function AppTour() {
  useEffect(() => {
    let instance;
    const start = async () => {
      try {
        // Carga bajo demanda para evitar peso inicial y posibles errores en SSR
        const mod = await import("driver.js");
        await import("driver.js/dist/driver.css");

        // Esperar al próximo frame para asegurar DOM listo
        await new Promise((r) => requestAnimationFrame(r));

        // Validar elementos antes de crear pasos
        const steps = [];
        if (document.querySelector("h1")) {
          steps.push({
            element: "h1",
            popover: {
              title: "Dashboard",
              description: "Métricas clave de tu negocio.",
            },
          });
        }
        if (document.querySelector(".recharts-wrapper")) {
          steps.push({
            element: ".recharts-wrapper",
            popover: {
              title: "Gráfico de ventas",
              description: "Pasa el mouse para ver detalles.",
            },
          });
        }
        if (document.querySelector("aside")) {
          steps.push({
            element: "aside",
            popover: {
              title: "Menú",
              description: "Navega a otras secciones.",
            },
          });
        }

        if (!steps.length) return; // No iniciar si no hay pasos válidos

        instance = mod.driver({
          allowClose: true,
          showProgress: true,
          nextBtnText: "Siguiente",
          prevBtnText: "Atrás",
          doneBtnText: "Finalizar",
          steps,
        });
        instance.drive();
      } catch (e) {
        // Silenciar errores del tour para no afectar la UI
        console.warn("AppTour skipped:", e);
      }
    };
    start();
    return () => {
      try {
        instance?.destroy();
      } catch {}
    };
  }, []);

  return null;
}
