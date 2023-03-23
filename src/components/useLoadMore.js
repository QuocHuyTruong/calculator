import { useEffect, useRef, useState } from "react";

const useLoadMore = (handleLoadmore = () => {}, isMoreItem) => {
  const elementRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleScroll = (e) => {
    const percent =
      e.target.scrollTop - (e.target.scrollHeight - e.target.clientHeight);

    if (Math.ceil(percent) === 0 && isMoreItem) {
      setLoading(true);
    }
  };
  useEffect(() => {
    if (elementRef && elementRef.current) {
      // Passing the same reference
      elementRef.current.addEventListener("scroll", handleScroll);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => elementRef.current.addEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (loading) {
      handleLoadmore();
    }
  }, [handleLoadmore, loading]);
  return [loading, setLoading, elementRef];
};

export default useLoadMore;
