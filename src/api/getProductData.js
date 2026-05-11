async function getProductData(url) {
  const baseUrl = import.meta.env.VITE_API_URL;

  const fullUrl = baseUrl + url;
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(fullUrl, options);
    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.error("Failed To fetch data", error);
    return 
  }
}

export { getProductData };
