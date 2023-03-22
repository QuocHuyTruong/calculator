import { useEffect, useState } from "react";

const useLoadmore = (handleLoadMore = () => {}, hasMore) => {
  const [loading, setLoading] = useState(false);
  const handleScroll = () => {
    const percent =
      document.documentElement.scrollTop -
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);

    if (Math.ceil(percent) === 0 && hasMore) {
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (loading) {
      handleLoadMore();
    }
  }, [handleLoadMore, loading]);
  return [loading, setLoading];
};

export default useLoadmore;
