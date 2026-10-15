# Build and load backend image into kind
build-back:
    docker build -t restaurant-backend:latest ./back
    kind load docker-image restaurant-backend:latest

# Build and load frontend image into kind
build-front:
    docker build \
      -t restaurant-frontend:latest \
      --build-arg VITE_API_URL=http://django:8000/api/ \
      ./front
    kind load docker-image restaurant-frontend:latest

# Build both images
build: build-back build-front