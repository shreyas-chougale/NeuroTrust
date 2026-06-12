# Use the official Python 3.11 image
FROM python:3.11

# Set the working directory
WORKDIR /code

# Copy the requirements file into the container
COPY ./requirements.txt /code/requirements.txt

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Set permissions for Hugging Face Spaces
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# Change working directory to user home
WORKDIR $HOME/app

# Copy the current directory contents into the container
COPY --chown=user . $HOME/app

# Train the model during the build phase (fixes sklearn version mismatch!)
RUN python src/generate_dataset.py && python -m src.train

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

# Run the Flask API on the port required by Hugging Face
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app.app:app"]
