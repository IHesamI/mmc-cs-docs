---
sidebar_position: 2
title: Identity and Access Management (IAM)
description: Learn about Identity and Access Management (IAM), least-privilege IAM policies, RBAC architecture, MFA enforcement, and comparison of AWS, Azure, and GCP access models.
---

Identity and Access Management (IAM) is the foundational boundary of cloud security. In the cloud, **identity is the new perimeter**. IAM controls who (authentication) can do what (authorization) on which resources under specific conditions.

---

### Core Concepts

* **Authentication (AuthN):** Verifying *who* an entity is (e.g., logging in with a password and MFA).
* **Authorization (AuthZ):** Determining *what* an authenticated entity is allowed to do (e.g., read vs. delete a storage bucket).
* **Principal:** An entity that can request an action (Users, Groups, Roles, or Workloads/Services).
* **Least Privilege:** Giving a principal only the exact permissions needed to perform their task—nothing more, nothing less.

---

### 1. Writing Least-Privilege IAM Policies

Cloud access policies use structural formats like JSON or YAML. AWS uses policy evaluation based on **Explicit Deny > Explicit Allow > Implicit Deny (default)**.

#### Bad Practice: Overly Permissive Policy

This policy grants full access to all S3 buckets and objects:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}
```

#### Good Practice: Least-Privilege JSON Policy

This policy restricts a developer to **only reading objects** from a specific production data bucket (`app-prod-data`), preventing deletion or modifications across other buckets:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowReadAccessToProdBucketOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::app-prod-data",
        "arn:aws:s3:::app-prod-data/*"
      ]
    }
  ]
}
```

---

### 2. Role-Based Access Control (RBAC) Architecture

RBAC groups permissions into roles and assigns roles to users or systems based on job functions rather than assigning raw permissions directly to individuals.

```
[ Principals ]                   [ Roles ]                   [ Permissions ]
  - User: Alice   ───────────►   Data Analyst   ───────────►  s3:GetObject (Read Only)
  - User: Bob     ───────────►   Cloud Admin    ───────────►  *:* (Full Access)
  - App: EC2 Server ─────────►   App-Worker     ───────────►  sqs:SendMessage
```

#### Trust Policies vs. Permission Policies

In platforms like AWS, roles require two distinct policy types:

1. **Trust Policy (Who can assume the role?):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

2. **Permission Policy (What can the role do once assumed?):** Controls actual actions on resources.

---

### 3. Multi-Factor Authentication (MFA) Enforcement

MFA adds a critical second layer of defense. In cloud security, you enforce MFA directly inside IAM policies using conditions.

#### Policy Example: Require MFA for High-Risk Actions

This policy denies key infrastructure modification actions unless the session was authenticated using MFA:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyUnauthenticatedMFAActions",
      "Effect": "Deny",
      "Action": [
        "ec2:TerminateInstances",
        "s3:DeleteBucket"
      ],
      "Resource": "*",
      "Condition": {
        "BoolIfExists": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}
```

Every major cloud provider—Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP)—solves access control using a distinct architectural mental model.

If you try to translate AWS IAM policies line-by-line into Azure or GCP, you will run into permission gaps or overly permissive access. Below is an breakdown of how their core models compare, their underlying structures, and real-world implementation examples.

---

### Core Architectural Mental Models

| Cloud | Primary IAM Mechanism | Core Mental Model | Key Characteristic |
| --- | --- | --- | --- |
| **AWS** | **Policy-Centric** (JSON Documents) | **Who can do What on Which Resource under What Conditions?** | Extremely granular. Explicit Deny overrides Allow. |
| **Azure** | **Azure RBAC** (Entra ID + Scopes) | **Who gets What Role at Which Scope?** | Hierarchical inheritance managed via directory identity (Entra ID). |
| **GCP** | **IAM Policy Bindings** (Resource Hierarchy) | **Who (Member) has What Role on Which Resource?** | Strict resource hierarchy (Org → Folder → Project → Resource) with resource-bound policies. |

---

### 1. Amazon Web Services (AWS) IAM

AWS uses **JSON Policy Documents** attached directly to identity principals (Users, Groups, Roles) or resources (Resource-based policies like S3 bucket policies).

* **Structure:** Explicit statement declarations containing `Effect`, `Action`, `Resource`, and optional `Condition`.
* **Evaluation Rule:** Default Deny &rarr; Explicit Allow &rarr; **Explicit Deny overrides everything**.

**AWS Example:** Allow reading from a single S3 bucket only if MFA is present:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::company-app-data",
        "arn:aws:s3:::company-app-data/*"
      ],
      "Condition": {
        "Bool": { "aws:MultiFactorAuthPresent": "true" }
      }
    }
  ]
}
```

---

### 2. Microsoft Azure IAM (Azure RBAC)

Azure separates identity management (Microsoft Entra ID) from access assignment (Azure RBAC). Instead of writing raw permission policy documents for every assignment, permissions are defined in **Roles** (Built-in like *Reader*, *Contributor*, or Custom Roles) and applied to principals using **Role Assignments** tied to a **Scope**.

* **Azure Scope Hierarchy:**
`Management Group` &rarr; `Subscription` &rarr; `Resource Group` &rarr; `Resource`
* **Inheritance:** Permissions granted at a parent scope automatically flow down to child resources. Deny assignments take precedence over allows.

**Azure Custom Role Definition Example (JSON/Bicep):**

```json
{
  "Name": "S3-Equivalent Bucket Reader",
  "IsCustom": true,
  "Description": "Allows reading blob storage containers.",
  "Actions": [
    "Microsoft.Storage/storageAccounts/blobServices/containers/read",
    "Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read"
  ],
  "NotActions": [],
  "AssignableScopes": [
    "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/prod-rg"
  ]
}
```

*To grant this permission to a developer, you create a **Role Assignment** linking `User Object ID` + `Role ID` + `Scope (prod-rg)`.*

---

### 3. Google Cloud Platform (GCP) IAM

GCP IAM centers around **IAM Policy Bindings** attached directly to nodes in its **Resource Hierarchy**.

* **GCP Resource Hierarchy:**
`Organization` &rarr; `Folder` &rarr; `Project` &rarr; `Resource`
* **The Binding Equation:** An IAM Policy on a GCP resource is essentially an array of bindings:

```
Binding = Members (Who) + Role (What Permissions)
```

* **Inheritance:** Child resources inherit all policy bindings set on parent nodes (e.g., granting a role at the *Folder* level flows down to all *Projects* and *Cloud Storage Buckets* inside it). GCP IAM does **not** have explicit deny rules in standard IAM (though organization policies can enforce restrictions).

**GCP IAM Policy Binding Example (YAML):**

```yaml
bindings:
- members:
  - "user:dev-lead@company.com"
  - "serviceAccount:app-backend@my-gcp-project.iam.gserviceaccount.com"
  role: "roles/storage.objectViewer"
- members:
  - "group:secops-team@company.com"
  role: "roles/storage.admin"
```

---

### Direct Feature Comparison

| Security Feature | AWS IAM | Azure RBAC | GCP IAM |
| --- | --- | --- | --- |
| **Primary Identity Source** | AWS IAM / Identity Center | Microsoft Entra ID | Google Workspace / Cloud Identity |
| **Resource-Based Policies** | Supported (e.g., S3 Bucket Policies, KMS Keys) | Limited (mostly Managed Identity / Service Endpoints) | Supported (Resource-level IAM policies) |
| **Granularity / Conditions** | Very High (`aws:PrincipalTag`, `aws:SourceIp`) | Medium (Attribute-Based Access Control - ABAC) | Medium/High (IAM Conditions based on time, headers, or resources) |
| **Cross-Account Access** | AssumeRole via Trust Policies | Guest Users (B2B) or Cross-Tenant Subscriptions | Granting access across Project / Organization boundaries directly |
| **Non-Human Authentication** | IAM Roles / Roles Anywhere | Managed Identities | Workload Identity Federation / Service Accounts |

---

### Key Takeaway for Cloud Security Engineers

1. **AWS** offers the most granular policy engine (`Action` + `Resource` + `Condition`), but carries the highest complexity and risk of misconfiguration due to competing Identity and Resource policies.
2. **Azure** simplifies management for enterprise directory structures by using strict scope hierarchies and assigning roles rather than writing low-level json statements for every user.
3. **GCP** utilizes a clean, top-down inheritance model where access is controlled by binding principals to predefined or custom roles on specific hierarchy nodes.
