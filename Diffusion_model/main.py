from diffusers import StableDiffusionPipeline
import torch
import matplotlib.pyplot as plt


def generate_image(prompt):
    print("Loading Stable Diffusion model...")

    pipe = StableDiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        torch_dtype=torch.float16
    ).to("cuda")

    print(f"Generating image for prompt: {prompt}")

    with torch.autocast("cuda"):
        image = pipe(prompt).images[0]

    image.save("generated_image.png")
    print("Image saved as generated_image.png")

    plt.imshow(image)
    plt.axis("off")
    plt.title(prompt)
    plt.show()


def main():
    prompt = input("Enter image prompt: ")
    generate_image(prompt)


if __name__ == "__main__":
    main()