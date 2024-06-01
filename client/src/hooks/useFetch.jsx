import { handleRequest } from "@/lib/services";
import { useEffect, useState } from "react";

export default function useFetch(endpoint, headers) {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await handleRequest(
        endpoint,
        "GET",
        null,
        null,
        null,
        (response) => {
          setData(response.data);
          setLoading(false);
        },
        headers,
        (err) => setError(err.message)
      );
    };
    fetchData();
  }, []);
  return { data, loading, error };
}
