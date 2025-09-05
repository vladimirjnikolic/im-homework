import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

const awsRegion = process.env.REGION;

const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
  endpoint: `https://sqs.${awsRegion}.amazonaws.com`,
  region: `${awsRegion}`,
  apiVersion: "2012-11-05",
});

const awsCustomerId = process.env.CUSTOMER;
const awsQueue = process.env.MESSAGE_QUEUE;
const queueUrl = `https://sqs.${awsRegion}.amazonaws.com/${awsCustomerId}/${awsQueue}`;

export const sendMessage = async (
  size: string,
  uploadId: string,
  fileNames: string[]
) => {
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify({
      size,
      uploadId,
      fileNames,
    }),
  });

  await sqsClient.send(command);
};
