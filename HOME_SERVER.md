# 🖥️ Home Server Project — Setup Notes & Accomplishments

> Personal home server built on an old Ubuntu laptop, running 24/7 for file storage, media hosting, and remote access.

---

## 📋 What Was Accomplished

### 1. Ubuntu Server Setup
- Installed and configured **Ubuntu Server** on an old laptop
- Disabled lid-close sleep via `/etc/systemd/logind.conf`
  - `HandleLidSwitch=ignore`, `HandleLidSwitchExternalPower=ignore`, `IdleAction=ignore`
- Masked sleep targets to guarantee 24/7 uptime:
  ```bash
  sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
  ```
- Controlled the backlight via CLI for a headless-style setup (`/sys/class/backlight/`)

### 2. Networking — Wi-Fi with Netplan
- Connected the server to Wi-Fi using **Netplan** (Ubuntu's declarative network config tool)
- Edited `/etc/netplan/*.yaml` to define the SSID and credentials
- Applied config with `sudo netplan apply`
- Disabled **Wi-Fi power saving** to prevent the interface from dropping under idle load:
  ```bash
  # /etc/NetworkManager/conf.d/wifi-powersave-off.conf
  [connection]
  wifi.powersave = 2
  ```

### 3. Understood Local IP vs Remote IP
- **Local IP** (`192.168.x.x`): assigned by the home router (DHCP), reachable only within the LAN
- **Remote / Public IP**: the IP exposed to the internet (ISP-assigned, often dynamic)
- Used **Tailscale** to create a private overlay network, providing a stable remote address (`100.x.x.x`) that works regardless of the public IP changing

### 4. Samba (SMB) File Sharing
- Configured **Samba** for cross-platform network file sharing (Windows / macOS / Linux)
- Mapped shares to specific directories and set per-user access credentials

### 5. Tailscale — Remote Access from Anywhere
- Installed **Tailscale** for zero-config VPN-based remote access
- Enabled **Taildrop** for seamless file transfers between devices
- Verified connectivity from external networks using the Tailscale-assigned IP

### 6. Shell Script as a Background Service
- Wrote a **Bash shell script** (`server_auto_login.sh`) that authenticates the network/internet on startup
- Registered it as a **systemd service** so it runs automatically in the background at boot:
  ```ini
  # /etc/systemd/system/server_auto_login.service
  [Unit]
  Description=Server Auto Login / Internet Auth
  After=network-online.target
  Wants=network-online.target

  [Service]
  ExecStart=/usr/local/bin/server_auto_login.sh
  Restart=on-failure
  StandardOutput=journal
  StandardError=journal

  [Install]
  WantedBy=multi-user.target
  ```
  ```bash
  sudo systemctl enable --now server_auto_login.service
  ```
- Logs visible via `journalctl -u server_auto_login.service`

### 7. CasaOS — System Dashboard & App Management
- Installed **[CasaOS](https://casaos.io/)** — an open-source home-cloud OS with a clean web dashboard
- Discovered that CasaOS manages applications as **Docker containers** and provides a GUI to:
  - Monitor CPU, RAM, disk, and network usage in real time
  - Install apps from an app store (each app = Docker container)
  - Manage container lifecycle (start / stop / update)

### 8. Docker — Learned by Doing
- Understood that CasaOS apps are **Docker containers** (isolated environments running apps with all dependencies bundled)
- Learned key Docker concepts through real use:
  - **Images vs Containers**: image is the blueprint; container is the running instance
  - **Port mapping**: `-p host_port:container_port` exposes services to the LAN
  - **Volumes**: persist data outside the container lifecycle
  - **Docker Compose**: define multi-container setups in a single YAML file
  - Inspected running containers with `docker ps`, viewed logs with `docker logs <name>`

### 9. Media Hosting Applications
Installed the following media apps via CasaOS (each running as a Docker container):

| App | Purpose |
|-----|---------|
| **Jellyfin** | Self-hosted media server (movies, TV, music) |
| **Immich** | Google Photos alternative — photo/video backup |
| **Filebrowser** | Web-based file manager |
| *(others as added)* | |

---

## 💡 Key Learnings

| Concept | Summary |
|---------|---------|
| **Netplan** | Declarative YAML-based network configuration for Ubuntu; replaces older `ifupdown` |
| **Local IP** | LAN-only address (`192.168.x.x`); only reachable on the same network |
| **Remote/Public IP** | Internet-facing address assigned by ISP; needed for external access |
| **Tailscale** | Overlay VPN that assigns stable `100.x.x.x` addresses across devices |
| **systemd services** | Any script can become a managed background service with auto-restart |
| **Docker** | Containerisation makes apps portable, isolated, and easy to deploy |
| **CasaOS** | Turns Docker complexity into a one-click app install experience |

---

## 🔗 LinkedIn Post Draft

---

🚀 **Turned an old laptop into a fully functional Ubuntu Home Server — here's everything I built and learned!**

Over the past week I took an old laptop, installed **Ubuntu Server**, and turned it into a 24/7 home server. Here's what I accomplished — and the things I genuinely learned along the way:

✅ **Installed CasaOS** — an open-source home-cloud dashboard that manages apps as Docker containers, giving me real-time system monitoring and a one-click app store  
✅ **Deployed media hosting apps** (Jellyfin, Immich, Filebrowser) — each running as an isolated **Docker container**, which forced me to learn Docker properly  
✅ **Learned Docker from scratch** — images, containers, volumes, port mapping, Docker Compose — all clicked once I had real apps running  
✅ **Understood Local IP vs Remote IP** — why my server is at `192.168.x.x` on the LAN but needs Tailscale (`100.x.x.x`) for remote access from anywhere  
✅ **Connected the server to Wi-Fi using Netplan** — Ubuntu's declarative YAML network config, and disabled Wi-Fi power saving to keep it stable 24/7  
✅ **Wrote a shell script and turned it into a systemd background service** — so it runs automatically at boot, logs to journald, and restarts on failure  
✅ Configured **Samba** for network file sharing and **Tailscale** for secure remote access with no port forwarding needed  
✅ Disabled lid-close sleep and backlight so the laptop runs headless, always on

The most satisfying part? **Understanding why things work** — not just following tutorials. Knowing the difference between a local and remote IP, seeing a shell script become a proper Linux service, and watching CasaOS spin up Docker containers behind the scenes made every step feel real.

If you've set up a home server or self-hosted apps, I'd love to hear what you're running — drop a comment! 👇

\#Linux \#Ubuntu \#HomeServer \#Docker \#CasaOS \#SelfHosted \#Networking \#Tailscale \#Netplan \#LearningByDoing \#DevOps \#OpenSource

---

*Feel free to copy and personalise the post above before sharing.*
