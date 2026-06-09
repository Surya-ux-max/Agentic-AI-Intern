import torch 
print("PyTorch version:", torch.__version__)
if torch.cuda.is_available():
    print("CUDA is available. GPU will be used.")