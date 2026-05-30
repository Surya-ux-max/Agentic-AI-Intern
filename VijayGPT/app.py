from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

document = '''
Thalapthy Vijay is a popular Indian actor known for his versatile roles and charismatic screen presence.
He has a massive fan following and is celebrated for his contributions to Tamil cinema.
He is known for his philanthropic work and has a significant impact on the Tamil film industry.
He is Fabulous dancer who is known for his energetic performances and unique dance style.
He is also known for his singing.
He Started TVK in 2024 and conducted a meeting in vikravandi where more than 3 lakh people attended.
But, Unfortunately, in 2025 due to DMK planning ,stampede happenned in karur and 41 people died.
But, He is still loved by his fans and continues to be a major influence in the industry.
He rised above the tragedy and continues to inspire his fans with his resilience and dedication to his craft.
He campaigned entire Tamil Nadu in 2026 Assembly elections.
Number of poeple attended his meetings is more than 5 lakh.
People approached fro every direction to see him and his charisma was at its peak.
2026 elections , Thalapathy Vijay's party won 108 seats and he became the Chief Minister of Tamil Nadu.
He is a visionary leader who has brought positive changes to the state.
'''

print(document)

text = '''Thalapthy Vijay is a popular Indian actor known for his versatile roles and charismatic screen presence.
He has a massive fan following and is celebrated for his contributions to Tamil cinema.
He is known for his philanthropic work and has a significant impact on the Tamil film industry.
He is Fabulous dancer who is known for his energetic performances and unique dance style.
He is also known for his singing.
He Started TVK in 2024 and conducted a meeting in vikravandi where more than 3 lakh people attended.
But, Unfortunately, in 2025 due to DMK planning ,stampede happenned in karur and 41 people died.
But, He is still loved by his fans and continues to be a major influence in the industry.
He rised above the tragedy and continues to inspire his fans with his resilience and dedication to his craft.
He campaigned entire Tamil Nadu in 2026 Assembly elections.
Number of poeple attended his meetings is more than 5 lakh.
People approached fro every direction to see him and his charisma was at its peak.
2026 elections , Thalapathy Vijay's party won 108 seats and he became the Chief Minister of Tamil Nadu.
He is a visionary leader who has brought positive changes to the state.'''

chunks = text.split('.')
print(chunks)

chunks = [chunk.strip() for chunk in chunks if chunk.strip()]
print(chunks)

from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
chunks = ["Thalapthy Vijay is a popular Indian actor known for his versatile roles and charismatic screen presence.",
              "He has a massive fan following and is celebrated for his contributions to Tamil cinema.",
              "He is known for his philanthropic work and has a significant impact on the Tamil film industry.",
              "He is Fabulous dancer who is known for his energetic performances and unique dance style.",
              "He is also known for his singing.",
              "He Started TVK in 2024 and conducted a meeting in vikravandi where more than 3 lakh people attended.",
              "But, Unfortunately, in 2025 due to DMK planning ,stampede happenned in karur and 41 people died.",
              "But, He is still loved by his fans and continues to be a major influence in the industry.",
              "He rised above the tragedy and continues to inspire his fans with his resilience and dedication to his craft.",
              "He campaigned entire Tamil Nadu in 2026 Assembly elections.",
              "Number of poeple attended his meetings is more than 5 lakh.",
              "People approached fro every direction to see him and his charisma was at its peak.",
              "2026 elections , Thalapathy Vijay's party won 108 seats and he became the Chief Minister of Tamil Nadu.",
              "He is a visionary leader who has brought positive changes to the state."
             ]
embedding = model.encode(chunks)
print(embedding)

User_query = "Tell me about Thalapathy Vijay and his contributions to cinema."
print(User_query)


Query_embedding = model.encode([User_query])
print(Query_embedding)


from sklearn.metrics.pairwise import cosine_similarity
similarities = cosine_similarity([Query_embedding[0]], embedding)
print(similarities)

best_match_index = similarities.argmax()
print("Best matching chunk:", chunks[best_match_index])

prompt = f"Based on the following information, answer the question: {chunks[best_match_index]}\nQuestion: {User_query}"
print(prompt)