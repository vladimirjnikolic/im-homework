import {
  ReceiveMessageCommand,
  SendMessageCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";

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

export const getMessage = async () => {
  const command = new ReceiveMessageCommand({
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
  });

  const response = await sqsClient.send(command);
  return response.Messages ? response.Messages[0] : null;
};

const awsResultsQueue = process.env.RESULTS_QUEUE;
const resultsQueueUrl = `https://sqs.${awsRegion}.amazonaws.com/${awsCustomerId}/${awsResultsQueue}`;

export const sendMessage = async (
  size: string,
  uploadId: string,
  fileNames: string[]
) => {
  const command = new SendMessageCommand({
    QueueUrl: resultsQueueUrl,
    MessageBody: JSON.stringify({
      size,
      uploadId,
      fileNames,
    }),
  });

  await sqsClient.send(command);
};
