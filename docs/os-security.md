---
sidebar_position: 3
title: OS Security
description: Learn about operating system security in cloud environments, Linux administration, Windows Event Logs, and IAM vs OS permissions.
---

Operating systems are the backbone of cloud cybersecurity. Cloud virtual machines (like AWS EC2 or Azure VMs), container hosts, and backend microservices run almost entirely on Linux, while enterprise identity environments (Active Directory) heavily leverage Windows Server. Understanding how to manage, secure, and inspect these systems is fundamental to cloud defense.

---

**Operating Systems in Cloud Security**

In cloud environments, operating systems are decoupled from physical hardware via hypervisors or container runtimes.

* **Linux:** Powers over 90% of cloud workloads, web servers, microservices, and container platforms (Docker, Kubernetes).
* **Windows Server:** Used predominantly for corporate directory services, enterprise application servers, and legacy cloud workloads.

Securing cloud OS environments involves **hardening** (disabling unnecessary services/ports), **least privilege access**, and **continuous logging** to catch unauthorized modifications or breaches.

---

**Linux Command Line: System Administration & Permissions**

Linux permissions follow a strict tripartite structure: **Owner (u)**, **Group (g)**, and **Others (o)**, defined across three permissions: **Read (4)**, **Write (2)**, and **Execute (1)**.

**Key System Administration Commands**

* `ps aux` or `top` / `htop` – Lists running processes to identify suspicious activity or resource exhaustion.
* `netstat -tulnp` or `ss -tulnp` – Shows open network ports and listening services.
* `systemctl status <service>` – Inspects background service health (e.g., `systemctl status sshd`).
* `journalctl -u <service>` – Inspects system logs for specific services.

**Permission Management Commands & Examples**

Permissions are expressed as octal numbers by adding the values together:

* `4 (Read) + 2 (Write) + 1 (Execute) = 7` (Full access)
* `4 (Read) + 0 + 1 (Execute) = 5` (Read & Execute)

```bash
# 1. View file permissions
ls -la /var/www/html/app.py
# Output: -rw-r--r-- 1 root root 1024 Aug 15 10:00 app.py

# 2. Grant Owner full permissions (7), Group read/execute (5), Others no access (0)
chmod 750 /var/www/html/app.py

# 3. Change file ownership to web server user
chown www-data:www-data /var/www/html/app.py

# 4. Check administrative privileges escalation safely
sudo -l

```

*Security Context:* Overly permissive files (like `chmod 777` on scripts or SSH private keys set to `644` instead of `600`) are among the most common misconfigurations exploited during cloud lateral movement.

---

**Windows Event Logs for Cloud Defense**

Windows records system activities, security audits, and application events using **Windows Event Log**. Security Analysts use these logs to detect compromised cloud virtual machines or privilege escalation attempts.

**Core Event Log Categories**

* **Security Log:** Audit data including authentication, file access, and privilege changes.
* **System Log:** OS components, driver load failures, and system reboots.
* **Application Log:** Application-level events and errors.

**Critical Security Event IDs to Know**

| Event ID | Event Description | Security Relevance |
| --- | --- | --- |
| **4624** | An account was successfully logged on | Tracks user access patterns; monitor for unusual IPs or off-hours logons. |
| **4625** | An account failed to log on | Indicates potential brute-force or password spraying attacks. |
| **4672** | Special privileges assigned to new logon | Indicates administrative/Superuser access (e.g., Administrator elevation). |
| **4720** | A user account was created | Detects persistence mechanisms created by an attacker after compromise. |
| **1102** | The audit log was cleared | High-severity indicator; adversaries clear logs to cover their tracks. |

**Querying Event Logs via PowerShell**

```powershell
# Search for failed login attempts (Event 4625) in the last 24 hours
Get-WinEvent -FilterHashtable @{
    LogName = 'Security'
    Id = 4625
    StartTime = (Get-Date).AddDays(-1)
} | Select-Object TimeCreated, Message

```
Cloud Identity and Access Management (IAM) controls access **to** cloud resources (Control Plane), while Operating System permissions control access **within** the cloud virtual machine or instance (Data Plane). Understanding how these two distinct security boundaries interact is crucial for cloud security engineering.

---

**1. Control Plane vs. Data Plane Boundary**

Think of your cloud environment as a secure office building:

* **Cloud IAM (Control Plane):** Acts as the **building security badge**. It determines whether a user can walk up to the door (the Virtual Machine) and use a tool like AWS Systems Manager, SSH, or RDP to start a session.
* **OS Permissions (Data Plane):** Act as the **locks on individual office desk drawers**. Once inside the server, the Linux/Windows kernel controls which files, processes, and sockets that user account can touch.

```
+-----------------------------------------------------------------------+
| CLOUD CONTROL PLANE (IAM)                                             |
| User / Service Account -> Checks Cloud Policy -> Grants Access to VM  |
+-----------------------------------------------------------------------+
                                  |
                                  v
+-----------------------------------------------------------------------+
| OPERATING SYSTEM DATA PLANE (Linux / Windows Kernel)                  |
| Local User / Group    -> Checks chmod/ACLs    -> Grants File Access |
+-----------------------------------------------------------------------+

```

---

**2. How Cloud IAM Integrates with OS Permissions**

There are three primary ways Cloud IAM permissions map directly down into Operating System permissions:

**A. Instance Identity Roles (Application Access)**
Cloud applications running inside a Virtual Machine often need to read or write to other cloud services (like an AWS S3 bucket or Google Cloud Storage).

* **The IAM Side:** An **IAM Role / Service Account** with specific API permissions (e.g., `s3:GetObject`) is attached to the Virtual Machine instance via a Metadata Service (IMDS).
* **The OS Side:** Any local OS process running on that machine inherits those cloud permissions by default unless restricted. To secure this, administrators use **Linux permissions** (such as iptables rules or dedicated service accounts like `www-data`) so that unprivileged local users cannot query the IMDS endpoint at `169.254.169.254` to steal the IAM role credentials.

**B. Federated OS Access (OS Login / Instance Connect)**
Modern cloud environments avoid managing static SSH keys on servers. Instead, Cloud IAM authenticates human users and automatically provisions temporary Linux accounts.

* **Example (GCP OS Login / AWS EC2 Instance Connect):**
1. A user runs `gcloud compute ssh instance-1`.
2. Google Cloud IAM checks if the user has the IAM role `roles/compute.osLogin`.
3. If allowed, the cloud agent inside Linux automatically creates a local OS user account (e.g., `user_domain_com`), maps it to a UID, and assigns Linux group permissions dynamically.
4. If the user also holds `roles/compute.osAdminLogin`, the agent adds that local user to the `sudo` or `wheel` group in Linux, allowing `sudo` privileges.



---

**3. Practical Scenario: Privilege Escalation Misconfiguration**

A common security vulnerability occurs when Cloud IAM roles and OS permissions are misaligned:

**Scenario Details**

1. **The Application:** A web app running as the Linux user `www-data` on an AWS EC2 instance.
2. **The Cloud IAM Role:** The EC2 instance is attached to an IAM Role intended for backup scripts, granting `s3:*` (full access to all S3 buckets).
3. **The OS Misconfiguration:** The file permissions on the local backup script are set incorrectly to `chmod 777`.

```bash
# An attacker finds a Remote Code Execution (RCE) flaw in the web app
# They execute commands as the Linux user 'www-data'

# 1. The attacker checks local OS user context
id
# Output: uid=33(www-data) gid=33(www-data) groups=33(www-data)

# 2. Even as an unprivileged Linux user, they query the AWS IMDS metadata service
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/BackupRole

# 3. Output exposes temporary SecretAccessKey and SessionToken
# The attacker now has full S3 Admin access across the ENTIRE AWS account.

```

**How to Fix This Security Hole**

* **At the IAM Level:** Restrict the EC2 instance's IAM role using the **Least Privilege Principle** (grant access *only* to the specific backup bucket, not `s3:*`).
* **At the OS Level:** Block non-root users from querying the IMDS endpoint using Linux local firewall rules:
```bash
# Block 'www-data' from accessing the instance metadata service
sudo iptables -A OUTPUT -m owner --uid-owner www-data -d 169.254.169.254 -j DROP

```



---

**Summary Matrix**

| Dimension | Cloud IAM Role Permissions | Operating System Permissions |
| --- | --- | --- |
| **Scope** | Cloud APIs, Control Plane, Cloud Infrastructure | Local Filesystem, Memory, Processes, Sockets |
| **Enforcement Point** | Cloud Provider API Gateway / Identity Provider | OS Kernel (POSIX/Linux Permissions, Windows ACLs) |
| **Identifiers** | ARNs, Emails, Service Accounts, IAM Users | UIDs, GIDs, SID strings, Local Users/Groups |
| **Primary Risk** | Cloud resource takeover, data exfiltration | Local privilege escalation (`sudo`), lateral movement |
