import dbConnect from "../../../db/connect.js";
import Question from "../../../db/models/Question.js";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const questions = await Question.find();
    console.log("questions in bCKEND", questions);
    return response.status(200).json(questions);
  }

  response.status(405).end();
}