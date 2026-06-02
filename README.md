# Python ML & AI Repository

A collection of Machine Learning, Deep Learning, NLP, and Generative AI projects built using Python.

## Repository Structure

```text
Python/
├── BERT/                  # BERT experiments and fine-tuning
├── Langchain/             # LangChain projects
├── Logistic_regression/   # Classification models
├── ML-basics/             # Machine Learning fundamentals
├── NLP/                   # Natural Language Processing
├── RAG/                   # Retrieval-Augmented Generation
├── RAG_OpenAI/            # RAG with OpenAI and ChromaDB
├── sentence_embedding/    # Sentence embeddings
├── VijayGPT/              # Semantic search Q&A application
├── word2Vec_prj/          # Word2Vec project
├── prj1/                  # Python fundamentals
└── test/                  # Experimental notebooks
```

## Quick Start

### Clone the Repository

```bash
git clone <repository-url>
cd Python
```

### Create a Virtual Environment

```bash
python -m venv venv

# Linux / macOS
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Project Overview

### BERT

Experiments with BERT models using Hugging Face Transformers.

Topics:

* Tokenization
* Embeddings
* Fine-tuning
* Text Classification

### LangChain

Applications built using LangChain.

Topics:

* Chains
* Prompt Templates
* Retrieval
* LLM Integration

### Logistic Regression

Classification models implemented with Scikit-learn.

Topics:

* Data Preprocessing
* Feature Engineering
* Model Training
* Evaluation Metrics

### ML Basics

Fundamental Machine Learning concepts.

Contents:

* Introduction to ML
* Linear Regression
* Word Embeddings
* Pre-trained NLP Models

Datasets:

* Salary Dataset
* ArXiv Dataset
* Movie Dialogue Corpus

### NLP

Natural Language Processing techniques and models.

Topics:

* TF-IDF
* Word2Vec
* GloVe
* BERT
* LSTM

### RAG

Basic Retrieval-Augmented Generation pipeline.

Topics:

* Document Loading
* Text Chunking
* Embeddings
* Retrieval
* Question Answering

### RAG_OpenAI

Advanced RAG implementation using:

* LangChain
* ChromaDB
* OpenAI Models

Features:

* Vector Search
* Document Retrieval
* Conversational QA

### Sentence Embeddings

Sentence-level vector representations using Transformer models.

### VijayGPT

Interactive Question-Answering application with semantic search capabilities.

Features:

* Document Search
* Embedding-Based Retrieval
* Interactive CLI Interface

### Word2Vec Project

Project Structure:

```text
word2Vec_prj/
├── data/
├── models/
├── notebooks/
└── outputs/
```

Features:

* Custom Word2Vec Training
* Embedding Visualization
* Similarity Search
* FAISS Integration

### Python Fundamentals (prj1)

Practice programs covering:

* Variables
* Functions
* Loops
* OOP Concepts
* Problem Solving

### Test

Sandbox area for experimentation and prototyping.

---

## Technologies Used

* Python
* NumPy
* Pandas
* Matplotlib
* Scikit-learn
* Transformers
* LangChain
* ChromaDB
* FAISS
* PyTorch
* Jupyter Notebook

---

## Security Best Practices

* Never commit API keys
* Store secrets in `.env` files
* Use environment variables
* Verify `.gitignore` before pushing

---

## System Requirements

* Python 3.8+
* 8 GB RAM (recommended)
* 2 GB free storage
* Jupyter Notebook

---

## Common Issues

### Dependency Problems

```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

### Jupyter Kernel Issues

```bash
python -m ipykernel install --user --name ml-env
```

### Memory Constraints

* Use smaller datasets
* Process data in batches
* Consider cloud resources for large models

---

## Future Additions

* Fine-Tuning LLMs
* RAG with Local Models
* Agentic AI Workflows
* Vector Databases
* Multi-Agent Systems
* AI-Powered Applications

---

## License

This project is licensed under the MIT License.
