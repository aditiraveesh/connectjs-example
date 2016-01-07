# Overcoming CORS

Let’s say we are developing the front-end of an application, which invokes API from a remote server. The first problem that we are likely to encounter is a blocked Cross Origin request, since we are making the request to a remote server on a different domain. However, we would still want to make the cross-domain request.

For example, consider we have two servers, potato:3000 and tomato:3001, if potato makes an xhr request to tomato, we’ll get an error which looks like this:
```error
XMLHttpRequest cannot load http://tomato:3001/remote/someJson. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://potato:3000' is therefore not allowed access.
```

Using grunt-connect-proxy, we can allow this cross origin request.

### Let’s see this in action:

The code is available at: **https://github.com/aditiraveesh/connectjs-example**

### Step 0:
Set up your hosts file to create two domains, both pointing to localhost:
potato 127.0.0.1
tomato 127.0.0.1

### Step 1:
This creates a server which acts as our remote server.
The API end-point is http://tomato:3001/remote/someJson

Run it using:
```sh
git checkout tomato-server
npm install
node tomato-server.js
```
You can check the response by opening http://tomato:3001/remote/someJson on any browser.

### Step 2:
This creates another server which acts as our local server.
The API end-point is http://potato:3000/

Run it using:
```sh
git checkout potato-server
npm install
grunt serve
```
On another terminal, run:
```sh
node tomato-server.js
```
You can check the response by opening http://potato:3000 on any browser.

Next, if we click on the Click button, we get the cross origin request blocked error. (Clicking on the button would do nothing, and you will see the error if you open up the javascript console.)
This is because the button click is making an ajax request to the remote server, i.e. potato:3000 invokes the someJson Api on tomato:3001.

### Step 3:
Making it work.
Use connect to create a middleware proxy, which routes requests to tomato:3001 with CORS enabled.

Run it using:
On one terminal:
```sh
git checkout cors
npm install
grunt serve
```
On another terminal, run:
```sh
node tomato-server.js
```
You’ll see that it works without error.

