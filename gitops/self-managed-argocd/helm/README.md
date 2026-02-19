# Self-Managed ArgoCD Helm Chart

This Helm chart installs ArgoCD using the official argo-cd chart as a dependency.

## Prerequisites

- Kubernetes cluster
- Helm 3.x
- kubectl configured to access your cluster

## Installation

### 1. Update dependencies

```bash
cd gitops/self-managed-argocd/helm
helm dependency update
```

### 2. Install the chart

```bash
helm install self-managed-argocd . -n argocd --create-namespace
```

Or with custom values:

```bash
helm install self-managed-argocd . -n argocd --create-namespace -f custom-values.yaml
```

## Configuration

The main configuration is done through the `values.yaml` file. Key sections include:

- `argo-cd.global.domain`: Set your ArgoCD domain
- `argo-cd.server.ingress`: Configure ingress settings
- `argo-cd.controller`: Configure controller resources
- `argo-cd.repoServer`: Configure repo server resources
- `argo-cd.redis`: Configure Redis settings

## Accessing ArgoCD

After installation, you can access ArgoCD:

### Port Forward (development)

```bash
kubectl port-forward svc/self-managed-argocd-argo-cd-server -n argocd 8080:443
```

Then access at: https://localhost:8080

### Get admin password

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

## Upgrade

```bash
helm dependency update
helm upgrade self-managed-argocd . -n argocd
```

## Uninstall

```bash
helm uninstall self-managed-argocd -n argocd
```

## ArgoCD Version

This chart uses ArgoCD Helm chart version 9.4.3 (ArgoCD application version ~2.13.x)