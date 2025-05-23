import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
    url: 'http://qdrant:6333', // 클러스터 내부 주소
});

export default client;