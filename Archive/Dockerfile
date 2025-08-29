FROM alpine

RUN apk add npm bash git
WORKDIR /app
RUN npm install -g --force expo-cli @expo/ngrok npm-check
CMD tail -f /dev/null