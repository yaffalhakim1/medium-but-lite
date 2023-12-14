import axios from "axios";

export const fetcher = async (url: string) => {
  try {
    const resp = await axios.get(url);

    if (resp.status !== 200) {
      throw new Error(`Request failed with status code ${resp.status}`);
    }

    if (!resp.data) {
      throw new Error("Data not found");
    }
    return resp.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `Server responded with status code ${error.response.status}`
        );
        console.error(error.response.data);
      } else if (error.request) {
        console.error("No response received");
      } else {
        console.error(`Request failed with message ${error.message}`);
      }
    }
  }

  return null;
};
