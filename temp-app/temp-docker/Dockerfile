FROM node:20

WORKDIR /MYAPP

COPY . .

RUN npm i
EXPOSE 3000
# Run Vite bound to all interfaces and port 3000 so the container is reachable from the host
CMD ["npm","run","dev","--","--host","0.0.0.0","--port","3000"]
