FROM mcr.microsoft.com/dotnet/sdk:5.0 as dev

ENV HTTPS_PORT 5001
ENV HTTP_PORT 5000
ENV ASPNETCORE_ENVIRONMENT Development
ENV ASPNETCORE_URLS https://+:${HTTPS_PORT};http://+:${HTTP_PORT}
ENV DOTNET_USE_POLLING_FILE_WATCHER true
ENV DOTNET_RUNNING_IN_CONTAINER true

WORKDIR /srv/backend

COPY . .

RUN dotnet restore "API/API.csproj"

EXPOSE ${HTTPS_PORT}
EXPOSE ${HTTP_PORT}
CMD ["dotnet", "watch", "--project", "API", "run", "--no-launch-profile"]
