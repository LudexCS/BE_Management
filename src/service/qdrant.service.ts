import qdrantClient from '../config/qdrant.config';

const client = qdrantClient;

// Qdrant 컬렉션이 없으면 생성
export async function ensureGameCollection() {
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
}

export async function upsertGameEmbedding(gameId: number, embedding: number[]) {
  await client.upsert('game', {
    points: [
      {
        id: gameId.toString(),
        vector: embedding
      },
    ],
  });

  console.log('Game embedding upserted' + JSON.stringify(embedding));
}

export async function searchSimilarGames(queryEmbedding: number[], threshold: number = 0.8) {
  const result = await client.search('game', {
    vector: queryEmbedding,
    limit: 50, // fallback upper bound
  });

  return result
    .filter(item => item.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .map(item => (
      Number(item.id)));
}