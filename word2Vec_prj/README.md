# Word2Vec Project

A complete Word2Vec implementation using Gensim for natural language processing and word embeddings.

## Project Structure

```
word2Vec_prj/
├── data/
│   └── raw/
│       └── sample_text.txt          # Training text data
├── models/
│   └── word2vec.model              # Trained Word2Vec model
└── notebooks/
    └── word2vec_training.ipynb     # Training notebook
```

## Requirements

- Python 3.11+
- gensim 4.4.0
- pandas 2.1.3
- nltk 3.9.4
- numpy 1.26.3
- scipy 1.16.1

## Installation

```bash
pip install gensim pandas nltk
```

## Usage

### Training the Model

Run the Jupyter notebook:
```bash
jupyter notebook notebooks/word2vec_training.ipynb
```

### Loading Pre-trained Model

```python
from gensim.models import Word2Vec

model = Word2Vec.load("models/word2vec.model")
```

## Model Configuration

- **Vector Size**: 100 dimensions
- **Window Size**: 5 words
- **Min Count**: 1 (includes all words)
- **Workers**: 4 parallel threads
- **Vocabulary Size**: 18 unique words

## Key Features

- Text preprocessing and tokenization
- Word similarity analysis
- Vector representations for words
- Model persistence and loading

## Sample Operations

```python
# Get word vector
vector = model.wv['python']

# Find similar words
similar = model.wv.most_similar('python')

# Calculate similarity
similarity = model.wv.similarity('python', 'learning')
```

## Data

The project uses sample text covering:
- Programming languages (Python)
- Machine learning concepts
- Data science terminology
- Artificial intelligence topics

## Getting Started

1. Clone or download the project
2. Install dependencies: `pip install gensim pandas nltk`
3. Open `notebooks/word2vec_training.ipynb`
4. Run all cells to train the model
5. Use the saved model in `models/word2vec.model`

## Model Performance

The trained model contains embeddings for 18 vocabulary words with 100-dimensional vectors, suitable for basic NLP tasks and word similarity analysis.