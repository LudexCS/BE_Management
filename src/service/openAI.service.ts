import openai from "../config/openAI.config";

export async function createEmbeddingVector(text: string) {
    try {
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text,
            encoding_format: "float"
        });
        return embedding.data[0].embedding;
    } catch (error) {
        console.error("Failed to create embedding vector:", (error as Error).message);
        throw new Error("Failed to create embedding vector");
    }
}