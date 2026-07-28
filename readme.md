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

