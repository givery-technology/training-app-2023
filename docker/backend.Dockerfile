FROM golang:1.18.0

RUN mkdir /go/src/myapp
WORKDIR /go/src/myapp

RUN go install github.com/cosmtrek/air@v1.29.0
