# Giai đoạn build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY WebApplication1.sln .
COPY WebApplication1/WebApplication1.csproj WebApplication1/
RUN dotnet restore WebApplication1.sln

COPY . .
WORKDIR /src/WebApplication1
RUN dotnet publish -c Release -o /app/publish

# Giai đoạn chạy
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WebApplication1.dll"]
