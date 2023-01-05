package main

import (
	"fmt"
	"log"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage! Call 'http://localhost:10000/init/payment' to check how to init a payment with OP API!")
	fmt.Println("Endpoint Hit: homePage")
}

func payment(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Well hello there")
	fmt.Println("Endpoint Hit: payment")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/init/payment", payment)
	log.Fatal(http.ListenAndServe(":10000", nil))
}

// go run main.go
func main() {
	handleRequests()
}
