"use client";
import Spline from "@splinetool/react-spline";

interface SplineSceneProps {
  url: string;
}

export const SplineScene = ({ url }: SplineSceneProps) => {
  return (
    <div className="w-full h-[500px] md:h-[700px]">
      <Spline scene={url} />
    </div>
  );
};
