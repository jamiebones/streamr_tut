import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import LoadingSpinner from "@/components/loading";
import { useClient } from "streamr-client-react";

export default function PubData() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamId, setStreamId] = useState(null);

  const client = useClient();

  const publishDatatoStream = async () => {
    try {
      setLoading(true);
      if (streamId && data) {
        await client.publish(streamId, data);
      }
      setLoading(false);
      alert("Message published succesfully");
    } catch (error) {
      setLoading(false);
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  };

  const createStream = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/create-stream", {
        method: "POST",
        body: data,
      });
      if (response.status !== 200) {
        alert("Oops! Something went wrong. Please refresh and try again.");
        setLoading(false);
      } else {
        alert("stream created");
        let responseJSON = await response.json();
        const streamId = responseJSON.streamId;
        console.log("streamID ", streamId);
        setStreamId(streamId);
        setLoading(false);
      }
      // check response, if success is false, dont take them to success page
    } catch (error) {
      setLoading(false);
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  };

  return (
    <div className={styles.main}>
      {loading && <LoadingSpinner />}

      <h1>Click To Create Stream </h1>

      <button
        onClick={createStream}
        disabled={loading}
        className={styles.button}
      >
        Create Stream
      </button>
      <div>
        <p>Write Message to Publish</p>
        <input
          type="text"
          onChange={(e) => setData(e.target.value)}
          value={data}
          className={styles.input}
        />
      </div>

      <button
        onClick={publishDatatoStream}
        disabled={loading}
        className={styles.button}
      >
        Publish Message
      </button>
    </div>
  );
}
