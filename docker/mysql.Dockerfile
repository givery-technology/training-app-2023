FROM mysql:8.0.28

RUN apt-get update && apt-get install -y locales
RUN sed -i -E 's/# (ja\_JP.UTF-8 UTF-8)/\1/' /etc/locale.gen && locale-gen
ENV LANG ja\_JP.UTF-8
