import openai from "../config/openAI.config";

export async function createEmbeddingVector(text: string) {
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float"
    });
    return embedding.data[0].embedding;
}