# Build and load backend image into minikube
build-back:
	docker build -t restaurant-backend:latest ./back
	minikube image load restaurant-backend:latest

# Build and load frontend image into minikube
build-front:
	docker build \
	  -t restaurant-frontend:latest \
	  --build-arg VITE_API_URL=/api/ \
	  ./front
	minikube image load restaurant-frontend:latest

# Build both images
build: build-back build-front