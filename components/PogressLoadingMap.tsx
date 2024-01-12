"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressLoadingMap({ ...props }) {
  const [progress, setProgress] = React.useState(33);

  React.useEffect(() => {
    const loading = { props };
    let timer: NodeJS.Timeout;
    if (loading) {
      // Increment progress while loading
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          }
          clearInterval(timer);
          return 100;
        });
      }, 100);
    } else {
      setProgress(100);
    }

    return () => clearInterval(timer); // Cleanup
  }, []);

  return <Progress value={progress} className="w-[60%]" />;
}
