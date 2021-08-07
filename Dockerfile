FROM alpine

RUN apk add openjdk8 npm bash git
WORKDIR /app
RUN npm install -g --force firebase-tools expo-cli turtle-cli @expo/ngrok
CMD tail -f /dev/null