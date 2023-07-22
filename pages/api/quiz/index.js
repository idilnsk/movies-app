import dbConnect from "@/db/connect";
import Question from "../../../db/models/Question";


export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const questions = await Question.find();
    return response.status(200).json(questions);
  }

  response.status(405).end();
}
