interface SWRError extends Error {
  status: number;
}

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as SWRError;
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
  return res.json();
};

export default fetcher;
