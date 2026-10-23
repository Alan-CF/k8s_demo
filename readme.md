# Kubernetees

## How to run

1. Run all the k8s files starting by the namespace

2. Applying nginx

   ```Bash
   kubectl create deployment nginx --image=nginx:latest
   kubectl expose deployment nginx --port=80 --type=LoadBalancer
   ```

## Exposing k8s to host machine

1. Minikube tunnel

   ```Bash
   minikube tunnel
   ```

2. Exposing the tunnel

   ```Bash
   ssh -L 8080:10.108.161.182:80 azureuser@10.70.250.15
   ```

## Exposing k8s to internet with Cloudflare

1. Apply the deployment file
2. Inspect the logs for tunnel url

   ```Bash
   2026-10-23T03:24:45Z INF +--------------------------------------------------------------------------------------------+
   2026-10-23T03:24:45Z INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
   2026-10-23T03:24:45Z INF |  https://pee-aim-fun-here.trycloudflare.com                                                |
   2026-10-23T03:24:45Z INF +--------------------------------------------------------------------------------------------+
   ```
