start: up

up:
	docker-compose -f docker-compose.yml -p salestagram up --build

up-detach:
	docker-compose -f docker-compose.yml -p salestagram up --build --detach

down:
	docker-compose -f docker-compose.yml -p salestagram down

restart:
	docker-compose -f docker-compose.yml -p salestagram restart

clean: down
### Container
	docker container prune --force
### Volume
	docker volume prune --force
### Network
	docker network prune --force
### Image	
	docker image prune --force

re : clean start

re-detach : clean up-detach

.PHONY : up down restart clean re