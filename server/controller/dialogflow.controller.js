import { GoogleAuth } from "google-auth-library";

const auth = new GoogleAuth({
  keyFile: "./utils/cicsev-ohcp-0a22e8586716.json",
  scopes: "https://www.googleapis.com/auth/cloud-platform",
});

export const getAccessToken = async (req, res) => {
  try {
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    res.json({ token: tokenResponse.token });
  } catch (error) {
    console.error("Error getting token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
};
