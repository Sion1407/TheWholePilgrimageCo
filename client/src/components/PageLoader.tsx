import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      // Hold the loader briefly so the brand mark feels intentional
      setTimeout(() => setDone(true), 700);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
            }}
            className="flex flex-col items-center"
          >
            <div className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-foreground/60 mb-4">
              The Wholesome Pilgrims Co.
            </div>
            <div className="relative h-[1px] w-40 overflow-hidden bg-foreground/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-0 w-1/2 bg-foreground/60"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
