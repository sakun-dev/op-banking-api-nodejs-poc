package main

import (
	"fmt"
	"log"
	"net/http"
	//"golang-poc/handlers"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, `<!DOCTYPE html>
<html>
	<head>
		<title>Golang OP-API POC</title>
	</head>
	<body>
		<h1>Hello World!</h1>
		<span>Welcome to the HomePage!</span>
		<span>Call <a href="http://localhost:10000/init/payment">http://localhost:10000/init/payment</a> to check how to init a payment with OP API!"</span>
	</body>
</html>`)
	fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/init/payment", handlers.payment)
	log.Fatal(http.ListenAndServe(":10000", nil))
}

// go run main.go
func main() {
	fmt.Println("Server launched at http://localhost:10000")
	fmt.Println("Start POC:ing at http://localhost:10000/init/payment")
	handleRequests()
}
