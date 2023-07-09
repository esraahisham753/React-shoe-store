const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getShippingAddress(userId) {
  return fetch(baseUrl + "shippingAddress/" + userId).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}

export async function saveShippingAddress(address) {
  console.log("address", address);
  console.log("url", baseUrl + "shippingAddress");
  return fetch(baseUrl + "shippingAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(address),
  });
}
