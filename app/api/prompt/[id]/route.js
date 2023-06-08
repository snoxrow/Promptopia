import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Cache-Control': 'no-store, no-cache, must-revalidate',
    //   Expires: '0',
    //   Pragma: 'no-cache',
    // };

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

// PATCH (update)

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE (delete)

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findOneAndRemove(params.id);

    return new Response("Prompt successfully deleted!", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete prompt, try again later...", {
      status: 500,
    });
  }
};