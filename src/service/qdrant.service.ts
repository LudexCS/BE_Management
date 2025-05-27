import qdrantClient from '../config/qdrant.config';

const client = qdrantClient;

// Qdrant 컬렉션이 없으면 생성
export async function ensureGameCollection() {
    try {
        const exists = await client.getCollections().then(res =>
            res.collections.some(c => c.name === 'game')
        );

        if (!exists) {
            await client.createCollection('game', {
                vectors: {
                    size: 1536,         // 임베딩 벡터 차원 수
                    distance: 'Cosine'  // cosine similarity
                }
            });
        }

        console.log('Qdrant collection created');
    } catch (error) {
        console.error('Failed to create Qdrant collection:', (error as Error).message);
        throw new Error('Failed to create Qdrant collection');
    }
}

export async function upsertGameEmbedding(gameId: number, embedding: number[]) {
    try {
        await client.upsert('game', {
            points: [
                {
                    id: gameId,
                    vector: embedding
                },
            ],
        });

        console.log('Game embedding upserted' + JSON.stringify(embedding));
    } catch (error) {
        console.error('Failed to upsert game embedding:', (error as Error).message);
        throw new Error('Failed to upsert game embedding');
    }
}

export async function searchSimilarGames(queryEmbedding: number[], threshold: number = 0.3) {
    try {
        const result = await client.search('game', {
            vector: queryEmbedding,
            limit: 50, // fallback upper bound
        });

        console.log('Raw Qdrant search results:', result.map(r => ({ id: r.id, score: r.score })));

        return result
            .filter(item => item.score >= threshold)
            .sort((a, b) => b.score - a.score)
            .map(item => (
                Number(item.id)));
    } catch (error) {
        console.error('Failed to search similar games:', (error as Error).message);
        throw new Error('Failed to search similar games');
    }
}