FROM ubuntu:22.04
WORKDIR /app
COPY myapp /app

ENTRYPOINT ["./myapp"]
