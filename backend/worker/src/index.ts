import { getMessage } from "./services/sqsService";

setInterval(async () => {
  try {
    const message = await getMessage();
    if (message) {
      console.log("Received message:", message.Body);
    }
  } catch (error) {
    console.error("Error receiving message:", error);
  }
}, 2000);
