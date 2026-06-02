import ollama

# Importing the dataset - in this case, a simple text file with cat facts.
# Each line is a separate fact.
dataset = []

with open("cat-facts.txt", "r", encoding="utf-8") as file:
    dataset = file.readlines()

print(f"Loaded {len(dataset)} entries")

# Using Ollama's embedding API to create vector representations of the text chunks
EMBEDDING_MODEL = "hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF"
LANGUAGE_MODEL = "hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF"

# Each element in VECTOR_DB will be a tuple (chunk, embedding)
VECTOR_DB = []


def add_chunk_to_database(chunk):
    embedding = ollama.embed(
        model=EMBEDDING_MODEL,
        input=chunk
    )["embeddings"][0]

    VECTOR_DB.append((chunk, embedding))


# Create embeddings for all chunks
for i, chunk in enumerate(dataset):
    add_chunk_to_database(chunk)
    print(f"Added chunk {i + 1}/{len(dataset)} to the database")


# Function to compute cosine similarity
def cosine_similarity(a, b):
    dot_product = sum(x * y for x, y in zip(a, b))

    norm_a = sum(x ** 2 for x in a) ** 0.5
    norm_b = sum(y ** 2 for y in b) ** 0.5

    # Prevent division by zero
    if norm_a == 0 or norm_b == 0:
        return 0

    return dot_product / (norm_a * norm_b)


# Retrieval function
def retrieve(query, top_n=3):
    query_embedding = ollama.embed(
        model=EMBEDDING_MODEL,
        input=query
    )["embeddings"][0]

    similarities = []

    for chunk, embedding in VECTOR_DB:
        similarity = cosine_similarity(query_embedding, embedding)
        similarities.append((chunk, similarity))

    # Sort by similarity in descending order
    similarities.sort(key=lambda x: x[1], reverse=True)

    return similarities[:top_n]


# Ask user for queries in a loop (1-5 questions)
print("\n" + "="*50)
print("CAT FACTS Q&A SYSTEM")
print("You can ask up to 5 questions about cats.")
print("Type 'quit' or 'exit' to stop early.")
print("="*50 + "\n")

for question_num in range(1, 6):  # Questions 1-5
    print(f"\n--- Question {question_num}/5 ---")
    input_query = input("Ask me a question: ").strip()
    
    # Allow user to exit early
    if input_query.lower() in ['quit', 'exit', 'q', 'stop']:
        print("Thanks for using the Cat Facts Q&A system!")
        break
    
    if not input_query:  # Skip empty questions
        print("Please enter a question.")
        continue
    
    # Retrieve relevant chunks
    retrieved_knowledge = retrieve(input_query)
    
    print("\nRetrieved knowledge:")
    for chunk, similarity in retrieved_knowledge:
        print(f" - (similarity: {similarity:.2f}) {chunk.strip()}")
    
    # Build context string separately (fixes f-string error)
    context = "\n".join(
        f" - {chunk.strip()}"
        for chunk, similarity in retrieved_knowledge
    )
    
    # Create system prompt
    instruction_prompt = f"""
You are a helpful chatbot.

Use only the following pieces of context to answer the question.
Do not make up any information that is not present in the context.

Context:
{context}
"""
    
    # Chat with the language model
    stream = ollama.chat(
        model=LANGUAGE_MODEL,
        messages=[
            {
                "role": "system",
                "content": instruction_prompt
            },
            {
                "role": "user",
                "content": input_query
            }
        ],
        stream=True
    )
    
    # Print the response in real time
    print("\nChatbot response:")
    print("-" * 40)
    
    for chunk in stream:
        print(
            chunk["message"]["content"],
            end="",
            flush=True
        )
    
    print("\n" + "-" * 40)
    
    # Ask if user wants to continue (except on last question)
    if question_num < 5:
        continue_choice = input("\nPress Enter to ask another question, or type 'quit' to exit: ").strip()
        if continue_choice.lower() in ['quit', 'exit', 'q', 'stop']:
            print("Thanks for using the Cat Facts Q&A system!")
            break

print("\n" + "="*50)
print("SESSION COMPLETE - Thanks for using Cat Facts Q&A!")
print("="*50)