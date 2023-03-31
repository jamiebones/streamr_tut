const StreamrClient = require("streamr-client");

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { stream } = await createStreamrClient();
      return res.status(200).json({ success: true , streamId: stream.id});
    } else {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
  }

 
const createStreamrClient = async () => {
  // Initialize the client with an Ethereum account
  const streamr = new StreamrClient({
    auth: {
      privateKey: process.env.Private_Key,
    },
  });
  // Requires MATIC tokens (Polygon blockchain gas token)
  const stream = await streamr.createStream({
    id: "/testing/my-created-streamr", //topic must be unique
  });

  console.log("stream ID ", stream.id);

  return { streamr, stream };
};