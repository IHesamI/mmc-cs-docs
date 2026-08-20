---
sidebar_position: 5
title: The Shared Fate Model
description: Learn about the Shared Fate Model, an evolution of the Shared Responsibility Model featuring secure-by-default blueprints, automated guardrails, and joint security response.
---

The **Shared Fate Model** is an evolution of the traditional **Shared Responsibility Model**.

Under shared responsibility, the cloud provider secures the infrastructure (*security OF the cloud*), while you secure your data, applications, and configurations (*security IN the cloud*). However, shared responsibility often creates a gap where customers misconfigure tools and experience breaches.

**Shared Fate** bridges this gap. The cloud provider doesn't just hand you tools and walk away; they actively partner with you by offering secure-by-default blueprints, automated guardrails, and joint response capabilities to ensure you succeed in securing your environment.

| Aspect | Shared Responsibility | Shared Fate |
| --- | --- | --- |
| **Approach** | Hands-off partition of tasks. | Active partnership and guided security. |
| **Configuration** | Blank slates; you build from scratch. | Secure-by-default templates and landing zones. |
| **Risk** | Customer bears all configuration risk. | Cloud provider helps actively mitigate misconfiguration. |

* **Example:** In a Shared Fate approach, instead of giving you a blank Google Cloud or AWS account and letting you accidentally leave an S3 bucket public, the provider deploys predefined policy constraints (e.g., *Organization Policy: Enforce public access block*) that prevent public storage buckets from being created in the first place.

```mermaid
graph TD
    subgraph SharedResponsibility["Traditional Shared Responsibility"]
        CSP1["Cloud Provider<br/>(Security OF the Cloud)"]
        GAP["Misconfiguration Gap / Risk"]
        CUST1["Customer<br/>(Security IN the Cloud)"]
        CSP1 -. Hands-off .-> GAP -. Blank Slates .-> CUST1
    end

    subgraph SharedFate["Shared Fate Model (Active Partnership)"]
        CSP2["Cloud Provider"]
        BLUE["Secure-by-Default Blueprints"]
        GUARD["Automated Guardrails & Org Policies"]
        JOINT["Joint Incident Response & Monitoring"]
        CUST2["Customer Workloads"]

        CSP2 --> BLUE
        CSP2 --> GUARD
        CSP2 --> JOINT
        BLUE --> CUST2
        GUARD --> CUST2
        JOINT --> CUST2
    end
```
