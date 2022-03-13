ARG DOTNET_VARIANT=5.0
FROM mcr.microsoft.com/vscode/devcontainers/dotnetcore:0-${DOTNET_VARIANT}

ARG USERNAME=vscode
ARG NODE_VERSION=16
ENV NODE_VERSION=${NODE_VERSION}
ENV NVM_DIR=/usr/local/share/nvm

# Set PATH for dotnet tools
ENV PATH=${PATH}:/home/${USERNAME}/.dotnet/tools

# Install node, nx and yarn
RUN su -c "umask 0002 && source ${NVM_DIR}/nvm.sh && nvm install ${NODE_VERSION} 2>&1";
RUN su -c "source ${NVM_DIR}/nvm.sh && npm install -g nx && npm install -g yarn 2>&1";

ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG INSTALL_AZURE_CLI=false
ARG INSTALL_EF_DOTNET_TOOLS=false

# App specific variables
ENV APP_URL=https://spout.dev

# Install additional tools
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        groupmod --gid ${USER_GID} node \
        && usermod --uid ${USER_UID} --gid ${USER_GID} node; \
    fi \
    && if [ "$INSTALL_AZURE_CLI" = "true" ]; then \
        curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash; \
    fi \
    && if [ "$INSTALL_EF_DOTNET_TOOLS" = "true" ]; then \
        dotnet tool install dotnet-ef --tool-path /home/${USERNAME}/.dotnet/tools \
        && chown -R ${USERNAME} /home/${USERNAME}/.dotnet; \
    fi \