import openai from "../config/openAI.config";

export async function createEmbeddingVector(text: string) {
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float"
    });
    return embedding.data[0].embedding;
}

export function mergeWeightedNormalizedEmbeddingVectors(
    titleVec: number[],
    titleKoVec: number[],
    descVec: number[]
): number[] {
    const combined: number[] = [];

    // 1. 가중합 계산
    let weightTitle = 0.4;
    let weightKo = 0.4;
    let weightDesc = 0.3;

    if (titleKoVec.length > 0 && descVec.length === 0) {
        weightTitle = 0.5;
        weightKo = 0.5;
        weightDesc = 0;
    } else if (titleKoVec.length === 0 && descVec.length > 0) {
        weightTitle = 0.6;
        weightKo = 0;
        weightDesc = 0.4;
    } else if (titleKoVec.length === 0 && descVec.length === 0) {
        weightTitle = 1.0;
        weightKo = 0;
        weightDesc = 0;
    }

    for (let i = 0; i < titleVec.length; i++) {
        const weighted =
            weightTitle * titleVec[i] +
            weightKo * (titleKoVec?.[i] ?? 0) +
            weightDesc * (descVec?.[i] ?? 0);
        combined.push(weighted);
    }

    // 2. L2 norm 계산
    const norm = Math.sqrt(combined.reduce((sum, val) => sum + val * val, 0));

    // 3. L2 정규화
    return combined.map(val => val / norm);
}