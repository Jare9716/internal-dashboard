"use client";

import React, { useEffect } from "react";

interface UseAnimatedNumberOptions {
    duration?: number;
}

export function useAnimatedNumber(target: number, options?: UseAnimatedNumberOptions) {
    const { duration = 800 } = options || {};
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        const startTime = performance.now();
        const start = 0;
        const end = target;

        const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            setValue(current);

            if (progress < 1) requestAnimationFrame(animate);
        };

        const id = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(id);
    }, [target, duration]);

    return value;
}