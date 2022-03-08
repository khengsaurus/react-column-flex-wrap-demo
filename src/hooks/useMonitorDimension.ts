import { useCallback, useEffect } from "react";

const useMonitorDimension = (
  id: string,
  dimension: "height" | "width",
  callback: (width: string) => void,
  dependencies: any[] = []
) => {
  const getDimension = useCallback(() => {
    const sampleColumn = document.getElementById(id);
    const _dimension = sampleColumn
      ? window.getComputedStyle(sampleColumn)[dimension] || ""
      : "";
    callback(_dimension);
  }, [id, dimension, callback]);

  useEffect(() => {
    getDimension();
    window.addEventListener("resize", getDimension);

    return () => window.removeEventListener("resize", getDimension);
  }, [getDimension]);

  useEffect(() => {
    getDimension();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);
};

export default useMonitorDimension;
