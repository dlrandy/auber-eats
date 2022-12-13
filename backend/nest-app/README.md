### Nest-app

postgreapp.com
ALTER USER "yyyxxyx" WITH PASSWORD "123456"

auth process
1. jwt middleware
2. GraphqlModule->context
3. resolver (guard->canActivate->context)
4. decorator -> user


