import axios from "axios";

// Rethrows errors so SWR can surface them (error state), instead of silently
// returning null and rendering blank pages.
export const fetcher = async (url: string) => {
  const resp = await axios.get(url);

  if (resp.status !== 200) {
    throw new Error(`Request failed with status code ${resp.status}`);
  }

  if (resp.data === undefined) {
    throw new Error("Data not found");
  }

  return resp.data;
};
