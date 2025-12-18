#!/bin/sh

IMAGE_NAME="postgres:16"

# Check if the image exists

if docker image inspect "$IMAGE_NAME" > /dev/null 2>&1; then
    echo "Docker image '$IMAGE_NAME' is present."
    docker rmi -f "$IMAGE_NAME"
    docker build -t "$IMAGE_NAME" .
else
    echo "Docker image '$IMAGE_NAME' is NOT present."
    echo "Running docker build..."
    docker build -t "$IMAGE_NAME" .
fi

docker run -d --env-file .env -p 5432:5432 $IMAGE_NAME && python3 manage.py runserver