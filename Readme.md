# Socket Stream

## To do

- <del>setup project (done)</del>
- <del>setup test (done)
- <del>reading data from given json file (done)
- <del>building socke.io services (done)
- <del>add subscribe services (done)
- add unsubscribe services
- setup mongoDB & user in mongoDB
- record stocks subscribed for users
- Authorization
- Add authorization to socket
-

## Run

```bush
yarn dev
```

# Test

```
yarn test
```

## Socket.io Event

The app would load as localhost:4001, to test the `subscribe` event, user can use socket.io tester to send json message like following:

```json
{
  "stocks": ["5 HK", "CINE LN"]
}
```

and listen event `subscribe` to receive data string
