package handlers

import (
	"fmt"
	"net/http"
)

func payment(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Well hello there from payment route")
	fmt.Println("Endpoint Hit: payment")
}
