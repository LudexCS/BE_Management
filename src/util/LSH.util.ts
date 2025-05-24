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
    const normalized = combined.map(val => val / norm);
    console.log("embedding vector: ", normalized);
    return normalized;
}

/*
/**
 * n개의 랜덤 하이퍼플레인을 d차원 공간에서 생성합니다.
 * 각 하이퍼플레인은 단위 벡터 (normalized vector)입니다.
 *
 * @param n - 생성할 하이퍼플레인의 수 (비트 수)
 * @returns number[][] - 각 하이퍼플레인은 길이 dimension인 단위 벡터

export function generateRandomHyperplanes(n: number): number[][] {
    const dimension = 1536; // 하이퍼플레인이 위치할 공간의 차원 (예: 1536 for OpenAI)
    const hyperplanes: number[][] = [];
    const rng = seedrandom('lsh-default-seed'); // 고정된 시드로 결정적 난수 생성

    for (let i = 0; i < n; i++) {
        // 1. 무작위 벡터 생성
        const plane = Array.from({ length: dimension }, () => rng() * 2 - 1);

        // 2. 단위 벡터로 정규화
        const norm = Math.sqrt(plane.reduce((sum, val) => sum + val * val, 0));
        const normalized = plane.map(val => val / norm);

        hyperplanes.push(normalized);
    }

    return hyperplanes;
}*/