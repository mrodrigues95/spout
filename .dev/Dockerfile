ARG DOTNET_VARIANT=5.0
ARG NODE_VERSION=16

FROM mcr.microsoft.com/vscode/devcontainers/dotnetcore:0-${DOTNET_VARIANT}

# Install node and nx
RUN su -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1";
RUN su -c "source /usr/local/share/nvm/nvm.sh && npm install -g nx 2>&1";

ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Update UID/GID if needed
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        "groupmod --gid $USER_GID node" \
        "&& usermod --uid $USER_UID --gid $USER_GID node"; \
    fi