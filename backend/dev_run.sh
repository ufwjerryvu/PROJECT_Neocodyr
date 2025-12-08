#!/bin/sh

IMAGE_NAME="local-postgres"

# Check if the image exists
if docker image inspect "$IMAGE_NAME" > /dev/null 2>&1; then
    echo "Docker image '$IMAGE_NAME' is present."
    echo "Running docker build..."
    docker build -t "$IMAGE_NAME" .
else
    echo "Docker image '$IMAGE_NAME' is NOT present. Skipping build."
fi

docker run -d -p 5432:5432 $IMAGE_NAME && python3 manage.py runserver

