# installing Ubuntu in Docker then

## in bash

```bash

FROM ubuntu:24.04


RUN apt-get update && apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get install -y nodejs


CMD ["sleep", "infinity"]
```
paste in docker filr in root folder.


## in Docker compose.yml 

```bash
services:
  ubuntu-learning-lab:
    build: .
    container_name: basic-ubuntu-lab
    environment:
      - WATCHPACK_POLLING=true
      - CHOKIDAR_USEPOLLING=true
    volumes:
      - ./workspace:/workspace
    ports:
      - "3000:3000"
```

then your basic ubuntu is ready for use.