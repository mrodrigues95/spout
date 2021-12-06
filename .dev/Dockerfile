ARG DOTNET_VARIANT=5.0
FROM mcr.microsoft.com/vscode/devcontainers/dotnetcore:0-${DOTNET_VARIANT}

ARG NODE_VERSION=16
ENV NODE_VERSION=${NODE_VERSION}
ENV NVM_DIR=/usr/local/share/nvm

# Install node, nx and yarn
RUN su -c "umask 0002 && source ${NVM_DIR}/nvm.sh && nvm install ${NODE_VERSION} 2>&1";
RUN su -c "source ${NVM_DIR}/nvm.sh && npm install -g nx && npm install -g yarn 2>&1";

ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Update UID/GID if needed
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        groupmod --gid ${USER_GID} node \
        && usermod --uid ${USER_UID} --gid ${USER_GID} node; \
    fi