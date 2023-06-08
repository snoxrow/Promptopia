import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id
    }).populate("creator");

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Expires: '0',
      Pragma: 'no-cache',
    };

    return new Response(JSON.stringify(prompts), { status: 200, headers });
  } catch (error)  {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
