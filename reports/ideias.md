Tema: Sistema de Logística de Transportes
Empresas médias/grandes = vários tipos de mercadorias

Developers: Todos
Team Manager: Pedro
Product owner: Leo
Architect: RR
DevOps master: RG

# Tecnologias
- IDE: IntelliJ IDEA
- Team repository: GitHub
- Backlog management: Atlassian Jira
- FRONTEND: HTML, CSS e React.js (TypeScript)
- BACKEND: SpringBoot (Java)
- Data acquisition & sensing: [RR]
- Message queue: RabbitMQ? [RR] https://www.g2.com/products/rabbitmq/competitors/alternatives
- DB: [RR] https://towardsdatascience.com/mysql-vs-oracle-sql-a97a7659f992
https://neovera.com/choosing-right-rdbms-oracle-mysql-sql-server/
- Plataforma cloud: [RG]

- https://wiremock.org/
- https://batchgeo.com/features/google-earth-kml/


## Foco:
- permitir a uma distribuidora gerir a sua frota incluindo packages
- permitir ao cliente dar track do package e receber notificaçoes
- transportadores gerir a sua rota

<br>

## Entidades envolvidas:
- produtor

- distribuidora 
- transportadores 
- cliente

<br>

## Features:

(empresa)
- tracking da frota
- tracking de packages (entrada e saida na rede de distribuição)
- adicionar veiculos à sua frota 
- adicionar packages à sua frota 
- organizar a rota de entrega dos packages

(cliente)
- permitir o cliente localizar o package com um codigo
- notificar o cliente (email) quando ha mudança de estado

(transportador)
- paragens destino (destino final ou armazens)
- tempo total
- packages a entregar em cada paragem
- atualizar estado do package (entregue, em viagem, etc)
