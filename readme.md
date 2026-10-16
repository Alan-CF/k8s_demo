# Kubernetees

## How to run

1. Run all the k8s files starting by the namespace

2. Applying nginx

   ```Bash
   kubectl create deployment nginx --image=nginx:latest
   kubectl expose deployment nginx --port=80 --type=LoadBalancer
   ```

## Exposing k8s

1. Minikube tunnel

   ```Bash
   minikube tunnel
   ```

2. Exposing the tunnel

   ```Bash
   ssh -L 8080:10.108.161.182:80 azureuser@10.70.250.15
   ```
