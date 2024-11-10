VERSION 0.8
FROM denoland/deno:alpine
WORKDIR /app

deps:
  COPY deno.json ./
  RUN deno install
  SAVE ARTIFACT deno.lock AS LOCAL ./deno.lock

build:
  FROM +deps
  COPY src src
  COPY main.ts .
  RUN deno compile -o sco main.ts
  SAVE ARTIFACT sco

