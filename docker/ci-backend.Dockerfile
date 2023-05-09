FROM ubuntu:20.04
WORKDIR /app
COPY myapp /app

ENTRYPOINT ["./myapp"]
