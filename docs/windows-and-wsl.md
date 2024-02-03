## Windows and WSL 

Sometimes on Windows and WSL (Ubuntu), the web container fails with permission denied issue. Please follow these instructions:

- Apply this git patch locally `scripts/local-wsl.patch` - No need to commit these changes

```
git apply scripts/local-wsl.patch
```

- Run the below command before running `docker-compose up --build` everytime.
```
sudo chmod -R 777 /home/kamlekar/projects/nestjs-starter/postgres
```
- Run docker-compose
```
docker-compose up --build
```
- Open container sh terminal
```
docker exec -it nestjs-starter-web-1 sh
```
- Inside the container's terminal run the below command
```
sh scripts/web-docker-entrypoint.sh
```
Note: sometimes running the above command fails. For example if each line has `^M`. Do check by opening the file using vim (`vi scripts/web-docker-entrypoint.sh`) and remove `^M` manually from each line.
- Once the above web-docker-entrypoint successfully ran, run the following command to start the server
```
yarn start:dev
```