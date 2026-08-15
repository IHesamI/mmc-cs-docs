---
sidebar_position: 6
title: Terraform Infrastructure Configuration
description: Hands-on Infrastructure as Code (IaC) configuration examples for GCP VPC networks, firewall rules, and Compute Engine VMs using Terraform.
---

# ⚙️ Terraform Infrastructure Configuration

## Before

```hcl
resource "google_compute_network" "vpc_network" {
	name = "my-custom-mode-network"
	auto_create_subnetworks = false
	mtu = 1460
}
resource "google_compute_subnetwork" "default" {
	name = "my-custom-subnet"
	ip_cidr_range = "10.0.1.0/24"
	region = "us-west1"
	network = google_compute_network.vpc_network.id
}
# Create a single Compute Engine instance
resource "google_compute_instance" "default" {
	name = "flask-vm"
	machine_type = "f1-micro"
	zone = "us-west1-a"
	tags = ["ssh"]

	boot_disk {
		initialize_params {
		image = "debian-cloud/debian-11"
	}
}
# Install Flask
metadata_startup_script = "sudo apt-get update; sudo apt-get install -yq build-essential python3-pip rsync; pip install flask"
	network_interface {
		subnetwork = google_compute_subnetwork.default.id
		access_config {
		# Include this section to give the VM an external IP address
		}
	}
}
```

## After

```hcl
# 1. VPC Network Definition
resource "google_compute_network" "vpc_network" {
  name                    = "my-custom-mode-network"
  auto_create_subnetworks = false
  mtu                     = 1460
}

# 2. Subnetwork Definition
resource "google_compute_subnetwork" "default" {
  name          = "my-custom-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = "us-west1"
  network       = google_compute_network.vpc_network.id
}

# 3. Firewall Rule: Allow SSH (Port 22)
resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh"
  network = google_compute_network.vpc_network.id

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"] # Consider restricting this to your local IP address for security
  target_tags   = ["ssh"]
}

# 4. Firewall Rule: Allow Flask Web Traffic (Port 5000 & 80)
resource "google_compute_firewall" "allow_flask" {
  name    = "allow-flask"
  network = google_compute_network.vpc_network.id

  allow {
    protocol = "tcp"
    ports    = ["5000", "80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["flask"]
}

# 5. Compute Engine Instance
resource "google_compute_instance" "default" {
  name         = "flask-vm"
  machine_type = "e2-micro" # Upgraded to e2-micro
  zone         = "us-west1-a"
  tags         = ["ssh", "flask"] # Network tags matching firewall rules

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12" # Upgraded to Debian 12
    }
  }

  # Clean multiline script using standard Heredoc syntax
  metadata_startup_script = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -yq build-essential python3-pip python3-flask rsync
  EOF

  network_interface {
    subnetwork = google_compute_subnetwork.default.id
    access_config {
      # Grants an ephemeral external public IP
    }
  }
}
```
